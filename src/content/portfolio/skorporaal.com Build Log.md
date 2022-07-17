---
title: "Build Log: skorporaal.com"
date: 2022-07-14
updated: 2022-07-14
---

Constantly updating the article really downplays the process of figuring out these technologies, so I'm starting a build log here, so I can remember what I was actually doing.

## Earlier

### Stay hydrated... but not always

One challenge I ran into was passing class instances across the build-time Astro/run-time Vue boundary. I was passing the `MarkdownInstance`s returned by `Astro.glob` as a property of a `Post` class, but passing this as a prop to an Astro component hydrated with `client:load` or `client:only` doesn't work. As far as I can tell, the prototype of the object gets reset to `Object`.

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

<Feed client:load instances={instances} />
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

## 2022-07-14

### localStorage, finally

After a lot of mucking about, it turns out that the problem was `client:load`.

When using `client:load`, Astro renders the component to HTML/CSS so it can be loaded immediately and hydrates it afterwards, which causes lots of strange and hard-to-debug behavior. Replacing it by `client:only="vue"` means that the entire page is rendered dynamically in the browser only.

Before, `localStorage` (and `window` in general) was only accessible in Vue's `onMounted`-hook, whereas the expectation is that it should simply be accessible in `<script setup>`. As described above, Astro wanted to pre-render the page, which led to it trying to access `localStorage` outside of the browser, which, of course, doesn't work.

This had the same implication for `FeedItem`'s handling of the title.

The difference in client directives is described [here](https://docs.astro.build/en/reference/directives-reference/#client-directives).

## 2022-07-17

### nanostores

My original solution for stores was lifted straight from the [Vue docs](https://vuejs.org/guide/scaling-up/state-management.html#simple-state-management-with-reactivity-api).

I recently found out that Astro [has a recommendation](https://docs.astro.build/en/core-concepts/sharing-state/) for cross-framework state management, namely [Nano Stores](https://github.com/nanostores/nanostores).

So I replaced my original solution with Nano Stores. It was a fairly straightforward conversion. The main difference is functions aren't reactive.

With Vue you can do the following:

```ts
const colors = reactive(["red", "blue", "green"]);

return {
  add(color: string): {
    ...
  }
  includes(color: string): boolean {
    return colors.includes(color);
  },
};
```

This means that anything that uses `includes()` is automatically reactive, and updates if `colors` changes. Nano Stores has so-called `action`s, which are intended to be used for updating or mutating the store, but a similar `includes`-function would not be reactive, and can't be passed to `useStore()`.

The workaround I have employed here is to make `includes` a computed store that returns a function. The only slight annoyance is that `@nanostores/vue`'s `useStore()` returns reactive variables as a `Ref`, so you need to use `store.includes.value(color)` if you want to call the function directly inside your `<script setup>`. Instead, I pass the value to `filter`, as in `array.filter(includes.value)`.
