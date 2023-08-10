const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random'

const quoteInput = document.getElementById("quoteInput");
const quoteEl = document.getElementById("quote");
const quotespans = document.querySelectorAll(".quote-character");

newQuote("quote");

quoteInput.addEventListener("input", (e) => {
  const arrayQuote = quoteEl.querySelectorAll("span");
  const inputCharacters = e.target.value.split("");

  let allCorrect = true;

  arrayQuote.forEach((characterSpan, index) => {
    const inputCharacter = inputCharacters[index];

    if (inputCharacter === undefined) {
      characterSpan.classList.remove("correct");
      characterSpan.classList.remove("incorrect");
      allCorrect = false;
    } else if (inputCharacter === characterSpan.innerText) {
      characterSpan.classList.add("correct");
      characterSpan.classList.remove("incorrect");
    } else {
      characterSpan.classList.add("incorrect");
      characterSpan.classList.remove("correct");
      allCorrect = false;
    }
  });

  if (allCorrect) newQuote()
});

 async function newQuote() {
  
  quoteInput.value = ""
  quoteEl.innerText = "";
  const quote = await getRandomQuote() ;

  const quoteSpan = quote.split("");


  quoteSpan.forEach((character) => {
    const characterEl = document.createElement("span");

    characterEl.innerText = character;
    characterEl.classList.add("quote-character"); // Add a class to the span element
    quoteEl.append(characterEl);
  });

}

function getRandomQuote() {
  return fetch(RANDOM_QUOTE_API_URL)
    .then(response => response.json())
    .then(data => data.content )
    
}