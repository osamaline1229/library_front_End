const formOpenBtn = document.querySelector("#form-open"),
  home = document.querySelector(".home"),
  formContainer = document.querySelector(".form_container"),
  formCloseBtn = document.querySelector(".form_close"),
  signupBtn = document.querySelector("#signup"),
  loginBtn = document.querySelector("#login"),
  pwShowHide = document.querySelectorAll(".pw_hide");

formOpenBtn.addEventListener("click", () => home.classList.add("show"));
formCloseBtn.addEventListener("click", () => home.classList.remove("show"));

pwShowHide.forEach((icon) => {
  icon.addEventListener("click", () => {
    let getPwInput = icon.parentElement.querySelector("input");
    if (getPwInput.type === "password") {
      getPwInput.type = "text";
      icon.classList.replace("uil-eye-slash", "uil-eye");
    } else {
      getPwInput.type = "password";
      icon.classList.replace("uil-eye", "uil-eye-slash");
    }
  });
});

signupBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formContainer.classList.add("active");
});
loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formContainer.classList.remove("active");
});


const getAllElements = document.getElementById("The_List_of_Books");

    function RemoveBook(bookelment){
      getAllElements.appendChild(bookelment);
    }

    fetch("https://localhost:7032/api/Book")
      .then((Response) => {
        return Response.json();
      })
      .then((parsedResponse) => {
        parsedResponse.forEach((element) => {
          console.log(element.title);

          const list_books = document.createElement("li");
          list_books.innerHTML = `${element.title} <button href="something.com"> remove....</button>`;
          list_books.classList.add("book-item");
          getAllElements.appendChild(list_books);
        });

        const getbookForm = document.getElementById("getbookForm");
        getbookForm.addEventListener("submit", (event) => {
          event.preventDefault();

          const bookTitle = document.getElementById("bookTitle").value;
          const bookAuthor = document.getElementById("bookAuthor").value;
          const bookpublicationYear = document.getElementById(
            "bookpublicationYear"
          ).value;

          console.log(
            `${bookTitle.value}, ${bookAuthor.value}, ${bookpublicationYear.value}`
          );

          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");

          var raw = JSON.stringify({
            title:  bookTitle,
            author: bookAuthor,
            publicationYear: bookpublicationYear,
          });

          var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
         
          };

          fetch("https://localhost:7032/API/Book", requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.log("error", error));
        });
      });