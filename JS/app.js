let postbtn = document.querySelector(".postbtn");
//
let card_plhold = document.getElementById("cardDiv");
let cons = 0;
let page = 0;
let num = 0;
postbtn.addEventListener("click", function () {
  let card_plhold_title = document.querySelector(".card_plhold_title");

  fetch(`https://jsonplaceholder.typicode.com/posts?_limit=20`)
    .then((response) => response.json())
    .then(function (data) {
      // console.log(data);
     

      for (let i = 0; i < 10; i++) {
        card_plhold.innerHTML += `
        <div class="card_plhold_inner" data-name="${data[cons].id}">
        <div class="card_body" data-name="${data[cons].id}">
        <h2 class="card_plhold_title">${data[cons].title}</h2>
        </div>
        <div class="button_pop" data-name="${data[cons].id}">
        <button class="button-86" data-name="${data[cons].id}" role="button">More >> </button></div>
        </div>
        `;
        cons = cons + 1;
      }

      let btnR = document.querySelectorAll(".button-86");
      let allbtnR = Array.from(btnR);
      // console.log(btnR);
      // console.log(allbtnR);

      let popup = document.querySelector(".popup");
      let popup_content = document.querySelector(".popup_content");
      let closePopup = document.querySelector(".popup_close");
      let popup_card = document.querySelector(".popup_card");
      allbtnR.forEach((elem) => {
        elem.addEventListener("click", function (event) {
          if (event.target.classList.contains("button-86")) {
            let parentMin = event.target.parentElement;
            let parentId = event.target.dataset.name;
            fetch(
              `https://jsonplaceholder.typicode.com/posts/${parentId}?_limit=20`
            )
              .then((response) => response.json())
              .then(function (data) {
                // console.log(data);
                // console.log(+parentId);
                if (+parentId === data.id) {
                  popup.classList.add("active");
                  popup_card.innerHTML = `
                    <div class="popup_card_inner" data-name="${data.id}"> 
                    <div class="popup_card_inn" data-name="${data.id}">
                    ${data.title}
                    </div>
                    <div class="popup_card_imag"> ${popupImg(data.id)}
                    </div>
                    <div class="popup_card_body" data-name="${data.id}">${
                    data.body
                  }
                    </div>
                    </div>
                    `;
                } else {
                  popup.classList.add("notActive");
                }
              });

            function popupImg() {
              fetch(
                `https://jsonplaceholder.typicode.com/albums/1/photos?_limit=20`
              )
                .then((response) => response.json())
                .then(function (data) {
                  for (let i = 0; i < data.length; i++) {
                    let popup_card_imag =
                      document.querySelector(".popup_card_imag");
                    // console.log(data[i].thumbnailUrl);
                    if (+parentId === data[i].id) {
                      popup_card_imag.innerHTML = `<img class="popup_card_imag_img" src="${data[i].thumbnailUrl}">`;
                    }
                  }
                });
            }
          }
        });
        closePopup.addEventListener("click", (e) => {
          e.preventDefault();
          popup.classList.remove("active");
        });
        popup.addEventListener("click", (e) => {
          if (!e.target.closest(".popup_content")) {
            popup.classList.remove("active");
          }
        });
      });
    })
    .catch(function () {
      //catch any errors
    });
});
