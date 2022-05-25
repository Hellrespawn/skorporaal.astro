---
title: 'skorporaal.com'
date: 2022-05-17
---

This site is powered by [Eleventy](https://www.11ty.dev/), and [Tailwind](https://tailwindcss.com/)

## Why

Having spent time learning about Angular, a full-fledged frontend framework, I wanted to use some of that knowledge for a personal site.

I was not looking to build a SPA however, so using a static site generator seemed like the obvious answer.

### Eleventy

One option that seemed promising was [Astro](https://astro.build/), which is a component-based static site generator, however the oft-changing API and poor error reporting made me put it aside.

I eventually settled on Eleventy, which is a quite popular, if minimal SSG. I like the flexibility it provides. What it lacks compared to frontend-frameworks is built-in scoped styles and code. Which led me to the following...

### Tailwind

Tailwind is a CSS framework that lets you compose styles directly in your markup. It comes with great defaults and is just close enough to regular CSS that I'm never worried about not being able to translate one to the other. In this instance, it emulates scoped styles within our templates.

### JavaScript

I originally used [Alpine](https://alpinejs.dev/), but with the limited amount of interactivity, I eventually removed this in favor of bespoke [TypeScript](https://www.typescriptlang.org/). [esbuild](https://esbuild.github.io/) is used to bundle it, TypeScript itself is used to check types.

## a11y

I have tried to make this site at least somewhat accessible, having applied a lot of the items on [the A11Y Project](https://www.a11yproject.com/checklist/).

## Attribution

- General design was imitated from [Fuck I Wish I Knew That](https://fuckiwishiknewth.at/).

- Fancy links and source code structure inspired by [chrissy.dev](https://www.chrissy.dev/)

- Sun-, moon- and home-icons from [Hero Icons](https://heroicons.com/)

- GitHub icon from [Feather Icons](https://feathericons.com/)

- Favicon from [Twemoji](https://twemoji.twitter.com/) via [favicon.io](https://favicon.io)

- [Nunito](https://github.com/googlefonts/nunito) by Vernon Adams
