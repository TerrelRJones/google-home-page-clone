const API_KEY = "m4G7b4UBSAQdWyoe2tg7lyv_YXGqJuGMpSSi3MMcUxc";

function fetchData() {
  fetch(`https://api.unsplash.com/photos/?client_id=${API_KEY}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      data.map((photo) => {
        const bgPhoto = photo.urls.small;
        const bgName = photo.user.name;
        const id = photo.id;

        let pic = document.querySelector(".modal__right");
        let fullpic = document.createElement("div");
        pic.appendChild(fullpic);
        fullpic.innerHTML = `<div class="photo__card" onclick='chooseBg(${JSON.stringify(
          photo
        )})'>
            <div class="photo__bg">
              <img class="photo__bg-img" src="${bgPhoto}" alt="">
            </div>
            <div class="photo__description">
              <h3>${bgName}</h3>
            </div>
          </div>`;
        // console.log(id)
      });
    });
}

// Modal functionality
const modal = document.querySelector(".modal");

const settingsBtn = document.querySelector(".footer__settings-icon");
const cancelBtn = document.querySelector(".modal__btn-cancel");

//Open BG Modal
function showModal() {
  settingsBtn.addEventListener("click", () => {
    modal.style.display = "flex";
  });
}

// Close BG Modal
function closeModal() {
  cancelBtn.addEventListener("click", () => {
    modal.style.display = "none";
    
    getBgFromStorage();
  });
}

// Choosing background
const bodyBg = document.querySelector(".body__bg");

function chooseBg(url) {
  const bgPhoto = url.urls.full;
  const image = document.querySelector(".photo__bg-img");
  const id = url.id;

  localStorage.setItem("backgroundImage", `${bgPhoto}`);
  bodyBg.style.backgroundImage = `url("${bgPhoto}")`;
  //  image[].classList.add('photo__bg-img--active');
}

// Setting background to body once DONE is clicked
function setBg() {
  let bgImage = localStorage.getItem("backgroundImage");
  bodyBg.style.backgroundImage = `url("${bgImage}")`;

  modal.style.display = "none";
  //  console.log(bgImage)
}

function getBgFromStorage() {
  let bgImage = localStorage.getItem("backgroundImage");
  if (bgImage) {
    bodyBg.style.backgroundImage = `url("${bgImage}")`;
  } else {
    bodyBg.style.backgroundImage = `url("https://images.unsplash.com/photo-1474224017046-182ece80b263?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2250&q=80")`;
  }
}

// Showing user modal
const userIconNav = document.querySelector(".nav__user-icon");
const userModal = document.querySelector(".user__modal");

function showUserModal() {
  userIconNav.addEventListener("click", () => {
    userModal.classList.add("user__modal--show");
    console.log("clicked user modal");
  });
}

// close user modal when clicked anywhere outside of modal
function closeUserModal() {
  window.addEventListener("mouseup", (e) => {
    if (e.target != userModal && e.target.parentNode != userModal) {
      userModal.classList.remove("user__modal--show");
      console.log("body clicked");
    }
  });
}

let userSearch = document.querySelector('.main__search-input').value;

console.log(userSearch)

fetchData();
showUserModal();
closeUserModal();
showModal();
closeModal();
getBgFromStorage();
