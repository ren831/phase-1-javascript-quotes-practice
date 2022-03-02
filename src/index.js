const baseURL = "http://localhost:3000/quotes?_embed=likes";
const quoteList = document.querySelector("#quote-list");
let newQuoteForm = document.querySelector("#new-quote-form");

fetch(baseURL)
  .then((r) => r.json())
  .then((quotesArr) => {
    quotesArr.forEach((quoteObj) => {
      quoteStructure(quoteObj);
    });
  });

newQuoteForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let author = e.target.author.value;
  let quoteContent = e.target["new-quote"].value;

  fetch("http://localhost:3000/quotes", {
    method: "POST",
    body: JSON.stringify({
      author: author,
      content: quoteContent,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((r) => r.json())
    .then((newQuote) => {
      newQuote.likes = [];
      turnQuoteIntoHTML(newQuote);
    });
});

function quoteStructure(quoteObj) {
  let quoteLi = document.createElement("li");
  quoteLi.className = "quote card";
  quoteLi.innerHTML = `<blockquote class="blockquote">
  <p class="mb-0">${quoteObj.quote}</p>
  <footer class="blockquote-footer">${quoteObj.author}</footer>
  <br>
  <button class='btn-success'>Likes: <span>${quoteObj.likes.length}</span></button>
  <button class='btn-danger'>Delete</button>
</blockquote> `;

  quoteList.append(quoteLi);

  let deleteBtn = quoteLi.querySelector(".btn-danger");
  let likeBtn = quoteLi.querySelector(".bnt-sucess");
  let likespan = quoteLi.querySelector("span");

  deleteBtn.addEventListener("click", () => {
    fetch(`http://localhost:3000/quotes/${quoteObj.id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then((r) => console.log(response));
  });

  likeBtn.addEventListener("click", () => {
    fetch("http://localhost:3000/likes", {
      method: "POST",
      headers: {
        "Conent-Type": "application/json",
      },
      body: JSON.stringify({
        quoteid: quoteObj.id,
      }),
    })
      .then((r) => r.json())
      .then((newLike) => {
        quoteObj.likes.push(newLike);
        likespan.innerText = quoteObj.likes.length;
      });
  });
}
