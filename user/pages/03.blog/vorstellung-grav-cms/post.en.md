---
title: 'Why grav is better than [your favourite CMS]'
date: 04-03-2021 21:00
taxonomy:
  category:
    - Entwicklung
    - Code
  tag:
    - grav
    - Content Management System
    - Frontend
slug: introducing-grav-cms
---
As I started working at [Zebra](https://zebra.de) in 2020, the mission was clear: We needed a tech stack that is much more flexible as the current setup in the agency. My (kindof) new team lead Danilo had something in mind already: [grav](https://getgrav.org).

===

* It's file based which makes it very fast.
* It uses the PHP Framework Symfony under the hood, so it can be extended comfortably.
* It uses Twig as templating engine.
* Content is stored in Mardown files.
* There is an admin interface (as plugin), but it will also work without.

I had already had a troubled relationship with the CMS used in the agency for 10 years. It's this system that is worshipped like a fetish mainly in the German-speaking world. I had jumped on the WordPress bandwagon earlier (somewhere just before version 1.5) because it ran fast, offered an intuitive admin interface and themes were quick to implement with simple PHP knowledge. I did a lot of projects with it over the years, but in the course of the 4 version it became more and more cluttered. But with version 5 and the angry fruit salad (a.k.a. Gutenberg) the fun was over. A former colleague summed it up very well later:

>In each version of #WordPress lands more snot, which you need to laboriously remove again :(
>
> — [@mirksch](https://twitter.com/mirksch/status/1287376452892217345)

So this shiny new toy came just in time. I love working with it, but getting started was sometimes bumpy because not all features are well documented. When I got stuck, the [discord Chat of grav](https://chat.getgrav.org/) was always a great help.

As already written, I like to work with grav very much and would like to give a "small" overview here.

## Simple Setup

To get started, [download the .zip](https://getgrav.org/downloads) (with or without admin interface), unzip it and run it from a PHP-enabled web server (LAMP, XAMPP, MAMP, docker, ddev, etc.). There is also the possibility to start a PHP own [webserver in the terminal](https://learn.getgrav.org/17/basics/installation#running-grav-with-the-built-in-php-webserver-using-router-php).

## Directories and Page Tree

After the installation of grav there are some [directories on the server](https://learn.getgrav.org/17/basics/folder-structure), the most important one is `user`.

```
├── /user
│   ├── /accounts
│   ├── /config
│   │   ├── /plugins
│   │   │   └── breadcrumbs.yaml
│   │   ├── site.yaml
│   │   └── system.yaml
│   ├── /data
│   ├── /pages
│   │   ├── /01.home
│   │   │   └── home.md
│   │   ├── /02.about
│   │   │   └── default.md
│   │   ├── /03.service
│   │   │   ├── /01._webdesign
│   │   │   │   └── default.md
│   │   │   ├── /02._development
│   │   │   │   └── default.md
│   │   │   ├── /03._hosting
│   │   │   │   └── default.md
│   │   │   └── modular.md
│   │   └── /04.blog
│   │       ├── /crazy-things-happen
│   │       │   └── post.md
│   │       ├── /new-website-live
│   │       │   └── post.md
│   │       └── blog.md
│   ├── /plugins
│   └── /themes
│       └── /quark
```

|Pfad|Funktion|
|---|---|
|accounts/|All users of the admin are created here as a file|
|config/|Configuration files for system, pages, plugins, themes|
|data/|Plugins store data here|
|pages/|Here is the page tree, which also contains all content|
|plugins/|Plugins are installed here|
|themes/|Themes are installed here|

The [folder structure in `pages`](https://learn.getgrav.org/17/content/content-pages) exactly maps the page tree that can also be output by the navigation or the sitemap plugin. The individual pages can contain properties that keep them out of this listing, display content from other pages (routing), or even redirect to other pages.

In the example above we have four pages on the first level, which get their sorting by the numbers in front of the dot in their names. The names of the files contained in them have the same meaning as the name of the template through which they are to be output. So the page "About" uses the template named "default".

Don't worry about the weird folder naming, grav will take care of it. So `02.about` will be available under `/about`. An entry in the blog, for example, under `/blog/new-website-live`.

In `03.service` we see another special feature of grav: Modulars. Modulars are defined by the underscore (_) at the beginning of the folder name. They are not treated like subpages by grav and can be used to structure a single page. More about this in the topic Templates.


## Content
grav has no database, but stores all content in simple text files - more precisely [Markdown](https://de.wikipedia.org/wiki/Markdown). Additional information about a page is stored in the so-called Frontmatter, which uses the syntax of [YAML](https://de.wikipedia.org/wiki/YAML).


```md
---
title: 'Title of the Page'
menu: 'Different name in the navigation'
hero_image: 'foobar.jpg'
---
Page content, Markdown fomatted

## Second Level Headline

More Text as **Markdown**.

![](image-in-the-same-folder.jpg)
```

What excited me most about this approach was that you can sprinkle in unlimited custom information in the Frontmatter. For an admin interface, you need some YAML here (more on that later), while WordPress requires at least one plugin and a handful of (fairly redundant) PHP functions.

Meta information and properties can be noted this way (not only strings, but also arrays/objects) and are then available in the template in the Twig object `page.header`. There is a small stack of [reserved properties in the frontmatter](https://learn.getgrav.org/17/content/headers) that grav works with, e.g. to affect the slug, routing or template.

Since version 1.7 there are also the so called [Flex Objects](https://learn.getgrav.org/17/advanced/flex). This is a kind of database that works on the basis of JSON files. Thereby the information can be stored independently from the page tree.

## Admin and Configuration

In my previous projects, the admin interface did not play such a big role, because all settings on the system can be made directly in YAML files. Also, the admin always rewrites the full config, so you no longer have only the deviations from the default in the file, which I personally find rather impractical.

But of course the admin area is quite usable for editors and admins. As easy as we can add our own additional information to the Markdown files, so easy it is to create our own fields in the admin. For this we need the so-called blueprints. These are YAML files, which are assigned to the corresponding template via the file name as well as the Markdown file.

```yaml
title: Page Content
extends@:
  type: default
  context: blueprints://pages

form:
  fields:
    tabs:
      type: tabs
      active: 1

      fields:
        content:
          type: tab
          fields:
            header.hero_image:
              type: filepicker
              label: Hero Image
              preview_images: true
              folder: '@self'
              accept:
                - image/*

            header.headline:
              type: text
              label: Headline on top of Hero Image
              toggleable: true
```

Using the example of the section from the `/user/themes/customtheme/blueprints/default.yaml` we can see how two fields are created on the "Content" tab of the default text page. One is an image selection for a title image and the other is a text field that places a text over this image in the template, for example.

## Themes and Blueprints

```
/user/themes/customtheme
├── /blueprints
│   ├── /modular
│   │   └── default.yaml
│   └── default.yaml
├── /classes
│   └── Utils.php
├── /templates
│   ├── /modular
│   │   └── default.html.twig
│   ├── /partials
│   │   └── base.html.twig
│   ├── /default.html.twig
│   ├── /modular.html.twig
│   └── /post.html.twig
├── /blueprints.yaml
├── /customtheme.php
└── /customtheme.yaml
```

Essential for a theme is the `blueprints.yaml`. It contains the most important things about the theme. In addition, fields can be provided for the admin to provide a graphical interface for the theme settings. Preferences can then be stored in a separate YAML file.

Twig is used for templating. The division or fragmentation of the templates is basically irrelevant. The important thing is that there is always a template in the `templates` folder with the same name as the Markdown file that is being loaded.

As mentioned above, we can put as much info as we want in the frontmatter of the pages. In the `blueprints` folder, we can create a YAML file for each template and define the admin interface for it, so that there are user-friendly input options for each piece of information.

In the templates we can also access all configurations, i.e. `system`, `site` and `theme`. So it will be possible to place an array for a footer navigation or global info like address, phone numbers etc. in one of these places.

## Plugins

The plugin ecosystem at grav is still manageable but many important things are already there: breadcrumb, sitemap, SEO, forms, embeds,…

## versioning and Development

There are different approaches to versioning themes, content or whole grav instances. A practical way are grav's so-called `skeletons`. The `user` folder is managed in a git repository. In addition to the page tree, there is also a `.dependencies` file that contains information about themes and plugins with which everything necessary can be installed. I will describe this way in more detail in another post, but you can already see this approach in the projects linked below.

There is also a git-sync plugin that can manage explicit parts of the user folder independently of the actual project in a git repository (and also syncronizes automatically).

In addition, grav also offers [<abbr title="command line interface">CLI</abbr> interfaces](https://learn.getgrav.org/17/cli-console/). This can be used to manage plugins and themes, perform updates, create backups, or interact with plugin interfaces.

By the way: A server move is nothing more than copying the root directory of the project to the new server.

## Closing Words

Compared to WordPress, grav is a lightweight - also in terms of distribution. But it offers me the freedom and performance I used to have with WordPress. Besides undocumented features or a learning curve for Symfony, the advantages outweigh the disadvantages for me.

I have to grav still a pair of blog posts in the drawer and still want to present some technical aspects and some of my solutions in more detail.

## Resources
I always learn a new system best through concrete examples. So I can see cause and effect and play around with it. For this reason, here are a few of my projects to dissect:

|Project|note|
|---|---|
|[kitchen](https://github.com/bitstarr/kitchen)|My personal recipe collection and first side projectbased on grav|
|[grav-ddev-kickstart](https://github.com/bitstarr/grav-ddev-kickstart)|To quickly create the basis for a new project I have automated some things. After initialization I can start working and the new project is also prepared for versioning. [ddev](https://ddev.com) provides me with a docker based local environment.|
|[sebastianlaube](https://github.com/bitstarr/sebastianlaube)|The git repo for this website|
|[chassis](https://github.com/bitstarr/grav-theme-chassis)|My theme boilerplate. On this basis I develop the frontends of my projects.|

! To translate this text I used the comfort of [DeepL](https://www.deepl.com/). I was very stunned by the quality of the translations. I would have used this all the time for my english courses as a student. So don't tell your kids about it ;)
