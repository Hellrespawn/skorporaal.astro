// Directly imported JSON as a module, very cool feature!
// https://www.typescriptlang.org/tsconfig#resolveJsonModule
import QUOTES from "../quotes.json";

type Quote = {
  text: string;
  author: string;
  source?: string;
};

/* Fill in random quote. */
export default async function fillQuote(): Promise<void> {
  const quoteElem: HTMLElement | null = document.getElementById("quote-text")!;
  const authorElem: HTMLElement = document.getElementById("quoteAuthor")!;
  const sourceElem: HTMLElement = document.getElementById("quoteSource")!;

  const quote: Quote = QUOTES[Math.floor(Math.random() * QUOTES.length)];

  quoteElem.textContent = quote.text;
  authorElem.textContent = quote.author;

  if (quote.source) {
    sourceElem.classList.remove("hidden");
    sourceElem.textContent = "— " + quote.source;
  } else {
    sourceElem.classList.add("hidden");
  }
}
