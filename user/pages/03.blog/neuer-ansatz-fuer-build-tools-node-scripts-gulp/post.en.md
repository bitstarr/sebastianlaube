---
title: 'My new approach to build my frontend assets'
date: 2023-02-21 13:37
taxonomy:
  category:
    - Entwicklung
    - Code
  tag:
    - Frontend
    - grav
    - node
    - Tools
metadata:
  description: How I switched from gulp as a build tool and task runner to node scripts.
slug: new-approach-for-build-tools-node-scripts-gulp
---
For years I was using [gulp](https://gulpjs.com/) as a task runner to do all the routine things we used to do by hand over 10 years ago. First, somewhat around 2012 or 2013, I went with [grunt](https://gruntjs.com/), but as I felt it got abandoned, I switched to gulp. Meanwhile, some parts of this setup also seem to have been neglected. But I finally had the time and opportunity these days to tackle the problem and reduce dependencies.

===

## A bit more context

In the past years, some modules I used for the gulp processes stopped working in their most current versions because dependencies weren't up-to-date. So I had to freeze more and more versions instead of always going current (I know this is not the best practice). Nailing the versions of dependencies to issues from years ago felt really annoying.

In 2018, I was trying different approaches to overhaul my build process. webpack got a lot of hype at that time, but it failed to match my expectations, so I tried plain shell scripting and a bit of node scripting. None of which was superior to my comfort-zone-grunt-workflow at that time. So I just moved from grunt to gulp.

Now in 2023, it felt like the scratch was itching again. Also, the number of vulnerabilities seemed to rise with every new project I started. Luckily, I had some time to spare to give node scripting a new try.

I'm transforming the workflow of my [theme boilderplate 'chassis'](https://github.com/bitstarr/grav-theme-chassis) for [grav](getgrav.org/) as an example here.

## What am I expecting?

I'm not that fancy JS framework type of person. I'm more based around universal web standards and love to do frontends in solid HTML and CSS, using JS mostly for accessibility reasons or progressive enhancement.

### CSS 

PostCSS is doing the heavy lifting here. It will inline `@import`, resolve nesting and autoprefix.

`/assets/css/main.css` is the main CSS file and hub. There are only imports inside, which will be inlined in processing. If I need to, I can add other CSS files in parallel to main.css to provide other subsets or differently scoped styles. Every CSS file stored directly in `/assets/css/` will be processed and the result stored in `/dist/css/`.

Additionally, this will also happen to CSS files in `/assets/css/page`. So you can create per page/view additions or overwrites that can be referenced by templates.

### JS Files and Bundles

Since there are no frameworks, I will just need to bundle (concatenate) some JS files (mostly independent functional components) and maybe some libraries, which we manage via npm/package.json.

In `/assets/js`, there are.js and .json files as well as a `src` folder. JSON files are the base for bundles. With these, I order to concatenate multiple components from the `src` folder as well as libraries from `/node_modules`. In bundles, the order is important. The libs will appear before the code from `src`.

Every JS (not JSON) file in `/assets/js` will simply be copied in `/dist/js`. Bundles should run through a concatenation of their parts and the result will be saved as .js in `/dist/js` as well. On build uglifying will be added those steps.

````json
{
    "lib": [
        "choices.js/public/assets/scripts/choices.min.js"
    ],
    "src": [
        "address.js",
        "userprofile.js"
    ]
}
````

### Images

All image files in `/assets/img` will be optimized on build (svgo, pngQuant, mozJpeg, gifsicle, Zopfli) and stored in `/dist/img`. When using the watch task, images will simply be copied to avoid waiting times in development.

### Icons

All icons in `/assets/icon` are going to be optimized and saved in `/dist/icons/`. Optimization will be done no matter if watching (dev) or build, because it cleans up the files from code that will break direct injections as markup in HTML.


### Webfonts

The .woff2 files in `/assets/fonts` should be copied to `/dist/fonts` on demand. These fonts should already be subsetted, but using node seems like a good chance to include subsetting in this process.

### Favicons

I need a way to optimize all necessary favicon files. There could be a chance to skip visiting realfavicongenerator and process the files from an SVG locally.

### Watch / Browsersync / LiveReload

Of course, I don't want to trigger the automation manually after every file-safe. So there needs to be a watch job. Also including some live relaoding or BrowserSync for multi device testing would be very nice.

## Going from gulp to pure node

The gulp setup had 29 dependencies, while the new one has only one fewer, but we omit the gulp wrappers around most of them. But looking at the number of their dependencies (`npm ls --depth=1 | wc -l`) the number dropped from 280 to 247. Second level dependencies fell from 781 to 606. Also, the number of deprecation warnings while `npm install` dropped significantly.

Since I'm not an experienced JengaScript or Node pro, I had to wrap my head around JS promises quite often but eventually got it all working. Compared with the gulp setup, there is now the `.tasks` folder in the node setup. It holds a bunch of `.mjs` files, a config for BrowserSync and a shell script for creating favions (there is no npm package that can make use of all of Image Magick's power properly).

In the `scripts` section of `package.json` these get addressed.

```json
    "scripts": {
        "js": "node .tasks/javascript-dev.mjs",
        "jsmin": "node .tasks/javascript-build.mjs",

        "css": "node .tasks/postcss-dev.mjs",
        "cssmin": "node .tasks/postcss-build.mjs",

        "fonts": "node .tasks/fonts.mjs",

        "lint:css": "npx stylelint $npm_package_config_css",
        "lint:js": "npx eslint $npm_package_config_js",
        "lint": "run-p lint:*",

        "img": "mkdir -p $npm_package_config_imgDist; cp -r $npm_package_config_img/* $npm_package_config_imgDist",
        "imagemin": "node .tasks/images.mjs",
        "icons": "node .tasks/icons.mjs",
        "sprite": "node .tasks/svgsprite.mjs",
        "favicons": "sh .tasks/favicons.sh $npm_package_config_favicons $npm_package_config_faviconsDist",
        "faviconsmin": "node .tasks/faviconsmin.mjs",

        "watch:css": "npx onchange $npm_package_config_css/**/*.css -- npm run css",
        "watch:js": "npx onchange $npm_package_config_js/**/*.{js,json} -- npm run js",
        "watch:img": "npx onchange $npm_package_config_img/**/*.{jpg,gif,png,svg} -- npm img",
        "watch:icons": "npx onchange $npm_package_config_icons/**/*.{svg} -- npm run icons",
        "watch:sprite": "npx onchange $npm_package_config_icons/**/*.{svg} -- npm run sprite",
        "watch": "run-p watch:*",

        "sync:devices": "npx browser-sync start --config .tasks/browsersyncrc.js",
        "sync:watch": "run-p watch:*",
        "sync": "run-p sync:*",

        "todo": "grep -lir --color --exclude-dir=node_modules --exclude-dir=vendor --exclude-dir=var --exclude=package.json 'todo'",
        "clean": "rm -rf $npm_package_config_dist/*",

        "dev": "run-s css js img icons",
        "build": "npm run lint && run-p cssmin jsmin imagemin icons fonts"
    }
```

To compare the results, I've set up two folders with the old workflow and the new one. One observation is that some linters and minifiers work a bit differently in newer versions (since the gulp ones are locked at an older version), which brings differences in file sizes with it.

| File | gulp | node |
| --- | --- | --- |
| dist/css/main.css | 26655 B | 27246 B |
| dist/icons/alert.svg | 542 B | 405 B |
| dist/icons/angl-left.svg | 215 B | 217 B |
| dist/icons/phone.svg | 462 B | 370 B |
| dist/img/social.png | 5278 B | 5278 B |
| dist/js/main.js | 3685 B | 3685 B |

For example, is `cssnano` not stripping anymore the unnecessary enclosing whitespace from CSS var() definitions like `color:var( --_txt,#fff );`.

I also learned about the decision of styelint to drop support for stylistic rules (on preferences of how you style your code, like tabs, where you set spaces, etc.). They tell you to migrate to use 'Prettier' instead. And this was a little rabbit hole into bro coder culture and ignoring user demands. There is no solution to this other than freezing stylint in a v14 until there is a practical alternative for CSS code-style things.

But overall, we can see there are no huge differences in the file size of the optimized files, which is an outcome I'm pretty happy with.


!! I made the code public in a [GitHub reopository](https://github.com/bitstarr/new-build-process). Feel free to take a look around the files and I'm looking forward to hearing from you if you can provide any further improvements.

! Since I was allowed to deal extensively with the topic during my working hours, I would like to thank [mindbox](https://mindbox.de/) at this point. By the way, we are currently looking for reinforcement in the development area ;)