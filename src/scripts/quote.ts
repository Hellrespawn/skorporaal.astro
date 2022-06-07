// Directly imported JSON as a module, very cool feature!
// https://www.typescriptlang.org/tsconfig#resolveJsonModule
import QUOTES from "../quotes.json";

interface Quote {
  text: string;
  author: string;
  source?: string;
}

/* Fill in random quote. */
export default function fillQuote(): void {
  const quoteElem: HTMLElement = document.getElementById("quote-text")!;
  const authorElem: HTMLElement = document.getElementById("quoteAuthor")!;
  const sourceElem: HTMLElement = document.getElementById("quoteSource")!;

  const quotes = QUOTES as Quote[];

  const quote = quotes[Math.floor(Math.random() * quotes.length)];

  quoteElem.textContent = quote.text;
  authorElem.textContent = quote.author;

  if (quote.source) {
    sourceElem.classList.remove("hidden");
    sourceElem.textContent = "— " + quote.source;
  } else {
    sourceElem.classList.add("hidden");
  }
}
