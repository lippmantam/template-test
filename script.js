const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loadSpinner = document.getElementById('loadSpinner');

let apiQuotes = [];

// show loading
function showLoadingSpinner() {
    loadSpinner.hidden = false;
    quoteContainer.hidden = true;
}

// hide loading
function removeLoadingSpinner() {
    quoteContainer.hidden = false;
    loadSpinner.hidden = true;
}



// Show New Quote
function newQuote() {
    showLoadingSpinner();
    // Pick a random quote from apiQuotes arrray
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // This is how to set the content on the html
    // authorText.textContent = "I love Nancy";
    console.log(quote);
    // Check if author field is blank and replace it with 'unknown'
    if (!quote.author) {
        authorText.textContent = 'Unknown'
    } else {
        authorText.textContent = quote.author;
    }
    // Dynamically change the styling
    // Check quote length for styling
    if (quote.text.length > 120) {
        // add long-quote class to change the styling
        quoteText.classList.add('long-quote');
        console.log('long text');
    } else {
        quoteText.classList.remove('long-quote');
    }

    // Set quote and hide loadSpinner
    quoteText.textContent = quote.text;
    removeLoadingSpinner();
    
}

// Get Quotes From API
async function retrieveQuotesOnLoad() {
    showLoadingSpinner();
    const apiUrl = 'https://type.fit/api/quotes';
    // const apiUrl = 'https://type.fit/api/quotesss';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        // displays all the quotes retrieved
        // console.log(apiQuotes);
        console.log('connected to quote service')
        newQuote();
    } catch (error) {
       // Catch Error Here 
       console.log('whoops, no quote', error);
        // if can't connectd to quote service, use local cache    
       apiQuotes = localQuotes;
    }
    removeLoadingSpinner();
}

// Tweet quote
function tweetQuote() {
    // template string uses `` below the esc key
    // template string allows us to pass a variable
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    // open a window using the twitter url, notice '_blank' like the href attribute
    window.open(twitterUrl, '_blank');
}

// Add event listeners. generally go at the bottom because you want to declare the functions before you call it.
// Event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// on Load
retrieveQuotesOnLoad();

