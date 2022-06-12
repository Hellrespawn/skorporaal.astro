<script>
  import { onMount } from "svelte";
  import fillQuote from "@scripts/quote";

  onMount(fillQuote);
</script>

<figure id="quote" class="prose-full">
  <!-- Whitespace is preserved here, so the placeholder quote needs to all be
  on one line. -->
  <!-- prettier-ignore -->
  <blockquote
    id="quote-text"
    class="whitespace-pre-wrap"
  >Sometimes understanding comes and the temporary words can be replaced with words that have more meaning. More often, however, the patch words will take on a life of their own and no one will remember that they were only intended to be placeholders.</blockquote>
  <figcaption id="quote-caption">
    <span id="quoteAuthor">Scott Adams</span>
    <cite id="quoteSource">God's Debris: A Thought Experiment</cite>
  </figcaption>
</figure>
