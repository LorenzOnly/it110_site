
const quoteText = document.getElementById("quote-text");
const quoteAuthor = document.getElementById("quote-author");
const newQuoteBtn = document.getElementById("new-quote-btn");
const copyQuoteBtn = document.getElementById("copy-quote-btn");
const statusMessage = document.getElementById("status-message");

const API_URL = "https://www.drivebird.com/api/quotes/random";

async function getRandomQuote() {
    newQuoteBtn.disabled = true;
    statusMessage.textContent = "Loading a new quote...";

    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to fetch quote.");
        }

        const result = await response.json();

        const quote = result.data?.[0];

        if (!quote || !quote.quote) {
            throw new Error("No quote was returned.");
        }

        // Display the quote and author on the website
        quoteText.textContent = `“${quote.quote}”`;
        quoteAuthor.textContent = quote.author
            ? `— ${quote.author}`
            : "— Unknown author";

        statusMessage.textContent = "Here's your new quote!";

    } catch (error) {
        console.error("API Error:", error);
        statusMessage.textContent =
            "Unable to load a quote. Please try again.";
    } finally {
        newQuoteBtn.disabled = false;
    }
}

// Make the New Quote button work
newQuoteBtn.addEventListener("click", getRandomQuote);

// Make the Copy Quote button work
copyQuoteBtn.addEventListener("click", async () => {
    const quote = quoteText.textContent;
    const author = quoteAuthor.textContent;

    if (!quote || quote === "Click the button below to discover a quote.") {
        statusMessage.textContent = "Please get a quote first.";
        return;
    }

    try {
        await navigator.clipboard.writeText(`${quote} ${author}`);
        statusMessage.textContent = "Quote copied to clipboard!";
    } catch (error) {
        console.error("Copy Error:", error);
        statusMessage.textContent =
            "Unable to copy. Try using localhost or HTTPS.";
    }
});

getRandomQuote();
