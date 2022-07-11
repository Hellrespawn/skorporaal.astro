---
title: "skorporaal.com"
date: 2022-05-17
---

This site is powered by [Astro](https://astro.build/), [Vue](https://vuejs.org/), and [Tailwind](https://tailwindcss.com/).

## Why

Having spent time learning about Angular, a full-fledged frontend framework, I wanted to use some of that knowledge for a personal site.

I was not looking to build a SPA however, so using a static site generator seemed like the obvious answer.

### Astro

> One option that seemed promising was [Astro](https://astro.build/), which is a component-based static site generator, however the oft-changing API, poor TypeScript support and poor error reporting made me put it aside.
>
> -- <cite>An idiot, a fool[^1]</cite>

[^1]: Me in an [old version of this post](https://github.com/Hellrespawn/skorporaal.11ty/blob/main/src/11ty/content/portfolio/skorporaal.com.md).

Somewhere between version `0.24` and the latest version (`1.0-beta42` at the time of writing) the Astro team have really improved on these points, and I was pleasantly surprised at the speed and ease with which I could port this site from [Eleventy](https://www.11ty.dev/) to Astro.

The developers have, in fact, delayed the `1.0` release by almost two months, specifically to:

> - Invest in even more out-of-the-box performance optimizations
> - Improve error handling in our compiler
> - Deliver dev server improvements like more accurate stacktraces
> - Resolve incoming bug reports as quickly as possible
>
> -- <cite>[Astro 1.0 Release Update](https://astro.build/blog/astro-1-release-update/)</cite>

Which, to me, feel like the right priorities.

If I had to pick one issue that's still unresolved, it's that there is no easy way to quickly in-line the contents of a file into a component.

The main limitation of Astro components is, of course, that they are entirely static. All code is executed at compile time. You could simply add JavaScript, like for any static HTML, but Astro allows you to [hydrate](https://docs.astro.build/en/core-concepts/partial-hydration/) framework components!

### Vue

Vue promises:

> An approachable, performant and versatile framework for building web user interfaces.
>
> -- <cite>[vuejs.org](https://vuejs.org/)</cite>

Vue's composition API resembles Astro's syntax and feels quite logical to me, so I've been using Vue to add frontend functionality to the site. This includes:

- Sorting posts
- Filtering posts
- Toggling light/dark mode

One interesting side effect is that while Astro components can import all different kinds of framework components, those framework components can only import their own kind of framework component. This means that any component which I need within a Vue component must also be Vue component. You cannot import static Astro components from within Vue.

One challenge I ran into was passing class instances across the build-time Astro/run-time Vue boundary. I was passing the `MarkdownInstance`s returned by `Astro.glob` as a property of a `Post` class, but passing this as a prop to an Astro component hydrated with `client:load` doesn't work. As far as I can tell, the prototype of the object gets reset to `Object`.

```astro
---
// This won't work.

const feedItems = (await Astro.glob<Frontmatter>("../content/**/*.md")).map(
  (mdInstance) => new FeedItem(mdInstance)
);
---

<Feed client:load feedItems={feedItems} />
```

The (unexpectedly simple) solution is to pass the `MarkdownInstance`s directly to the hydrated component, and then transform them there.

```astro
---
// index.page
// This works!

const instances = await Astro.glob<Frontmatter>("../content/**/*.md");
---

<Feed client:load feedItems={feedItems} />
```

```vue
<script setup lang="ts">
// Feed.vue
const { instances } = defineProps<{
  instances: MarkdownInstance<Frontmatter>[];
}>();

const feedItems = instance.map((instance) => new FeedItem(instance));
</script>
```

### Tailwind

Tailwind is a CSS framework that lets you compose styles directly in your markup. It comes with great defaults and is just close enough to regular CSS that I'm never worried about not being able to translate one to the other. Combined with the sane defaults, it makes it really easy to create some nice looking CSS.

## a11y

I have tried to make this site at least somewhat accessible, having applied a lot of the items on [the A11Y Project](https://www.a11yproject.com/checklist/).

## Components

### Binary Clock

The binary clock (can you read it?) doesn't particularly add anything to the site, but it was a nice way of practicing with Vue's reactivity. Typing was a bit tricky. In VSCode `setInterval()` is assigned the type `NodeJS.Timer`, but this code runs in the browser! The solution was to explicitly call this on the `window` global, which returns the expected `number`.

### Navigation

I like having the buttons on both sides of the page, but this extending an element for the full width means it blocks links and buttons that are covered by the element. Furthermore, I need to set a positive z-index to keep the buttons from disappearing behind images. I've solved this by using `pointer events: none` on the wrapping `<nav>` elment and then setting `pointer-events: auto` on the buttons themselves. `pointers-events` is supported in modern browsers, and this particular use case should be supported on older ones too.

## Attribution

- General design was imitated from [Fuck I Wish I Knew That](https://fuckiwishiknewth.at/).

- Fancy links and source code structure inspired by [chrissy.dev](https://www.chrissy.dev/)

- Sun-, moon- and home-icons from [Hero Icons](https://heroicons.com/)

- GitHub icon from [Feather Icons](https://feathericons.com/)

- Favicon from [Twemoji](https://twemoji.twitter.com/) via [favicon.io](https://favicon.io)

- [Nunito](https://github.com/googlefonts/nunito) by Vernon Adams
