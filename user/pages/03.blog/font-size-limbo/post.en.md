---
title: 'font-size Limbo'
date: 2024-08-12 13:37
taxonomy:
  category:
    - Webdesign
    - Gedanken
    - Barrierefreiheit
  tag:
    - Browser
    - Responsive Webdesign
---
One point from [Alvaro Montoro's CSS One-Liners post](https://alvaromontoro.com/blog/68055/ten-css-one-liners-for-almost-every-project) triggered me.

> Increase the text size
> 
> `body { font-size: 1.25rem; }`
> 
> Let's face reality: *browsers' default 16px font size is small*. Although that may be a personal opinion based on me getting old 😅

When I stumbled into web design in 1998, we had 13 or 15 inch CRT monitors and a resolution of 1024×768 was already a lot. A font size of 10 pixels slapped hard onto the `<body>` and everything looked classy.

10 years later, accessibility was an important (albeit still undervalued) part of the work and people got carried away with 12px after all - we now had 19 inch flat screens!

In 2012/2023, responsive design turned everything upside down again. We respected the fact that people simply set the font size that works best for them in the browser and used this as the initial value (1em).

Often users don't touch this value and we simply changed our calculations to 1em=16px.

But the screens grew more and more or had much finer resolutions. 24 or 27 inch screens are usually further away from the user, which makes 16px font size seem quite small again.

The so-called retina displays have also given me a headache. Displaying a website on a 13-inch laptop screen as if it were a 24-inch screen has led to problems with space utilisation (aesthetics) and readability for customers and users. I developed [Superscale CSS](/blog/superscale-css) back then to scale the website easily.

In the system settings, a zoom is often set for the entire user interface of the operating system because the fine resolution makes everything on the laptop or the 32-inch ultrawide appear much too small.

I also notice that I still have to zoom in on many websites on my 27-inch screen so that I don't have to lean forwards.

I wouldn't adopt Alvaro's suggestion without further ado, as I would waste so much space on a smartphone, for example, and many users would probably be irritated by the large font.

I set a font size of `1.2rem` from a certain viewport size. But this also has to be done carefully, because then grey areas arise in which media queries suddenly fall back into another area...

Should browsers perhaps use a larger font size on large screens from the outset if the user does not specify otherwise? Or do we need an information campaign to make them aware that they should check their system settings or set a different default font size in the browser?

This form of workplace ergonomics is not only relevant for the disabled, even if developers often still have the idea that only people with visual problems use such settings at all.