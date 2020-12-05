const quoteContainer = document.querySelector("#quote-container");
const quoteText = document.querySelector("#quote");
const authorText = document.querySelector("#author");
const twitterBtn = document.querySelector("#twitter");
const newQuoteBtn = document.querySelector("#new-quote");
const loader = document.querySelector("#loader");

let apiQuotes = [];

// Show Loading
const loading = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

// Hide Loading
const complete = () => {
  loader.hidden = true;
  quoteContainer.hidden = false;
};

// Show New Quote
const newQuote = () => {
  loading();
  // Pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  // Check Quote length to determine styling
  if (quote.text.length > 75) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  

  // Check if Author field is blank and replace it with 'Unknown'
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }
  // Set Quote, Hide Loader
  quoteText.textContent = quote.text;
  complete();
};

// Get Quote From API
const getQuote = async () => {
  loading();
  const apiUrl = "https://type.fit/api/quotes";

  try {
    // const response = await fetch(apiUrl);
    const response = await fetch("/quotes.json");
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    // Catch Error Here
    getQuote();
    console.log("whoops, no quote", error);
  }
};

// Tweet Quote
const tweetQuote = () => {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
};

// Event Listeners
twitterBtn.addEventListener("click", tweetQuote);
newQuoteBtn.addEventListener("click", newQuote);

// On Load
getQuote();
