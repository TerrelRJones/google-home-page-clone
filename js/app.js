const API_KEY = "m4G7b4UBSAQdWyoe2tg7lyv_YXGqJuGMpSSi3MMcUxc";

let imageWidth = window.innerWidth;
let imageHeight = window.innerHeight;
console.log(imageWidth, imageHeight);

function fetchData() {
	fetch(
		`https://api.unsplash.com/photos/?client_id=${API_KEY}&orientation=landscape&count=15`
	) //Tried to query orientation and count
		.then((response) => response.json())
		.then((data) => {
			// console.log(data);

			data.map((photo) => {
				// const bgPhoto = photo.urls.thumb;
				const bgName = photo.user.name;
				// const id = photo.id;

				let pic = document.querySelector(".modal__right");
				let fullpic = document.createElement("div");
				pic.appendChild(fullpic);
				fullpic.innerHTML = `<div class="photo__card" onclick='chooseBg(${JSON.stringify(
					photo.urls.raw + "&w=" + imageWidth + "&dpr=2"
				)})'>
        <div class="photo__bg" style="background-image: url('${
					photo.urls.raw + "&w=175&dpr=2"
				}');>
        <img src="" />
        </div>
        <div class="photo__description">
          <h3>${bgName}</h3>
        </div>
      </div>`;
			});
		})
		.catch((error) => {
			console.log("Error:", error);
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

// Close BG Modal & returning background to original
function closeModal() {
	cancelBtn.addEventListener("click", () => {
		modal.style.display = "none";

		getBgFromStorage();
	});
}

// Choosing background -- preview
const bodyBg = document.body;
let bgPhoto = "";

function chooseBg(url) {
	bgPhoto = url + `&auto=format`;
	console.log(bgPhoto);
	bodyBg.style.backgroundImage = `url("${bgPhoto}")`;
}

// Setting background to body & local storage once DONE is clicked
function setBg() {
	let bgImage = localStorage.setItem("backgroundImage", `${bgPhoto}`);
	bgImage = localStorage.getItem("backgroundImage");

	bodyBg.style.backgroundImage = `url("${bgImage}")`;

	modal.style.display = "none";
}

// Getting background photo from local storage
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
		userModal.style.display = "flex";
		// console.log("clicked user modal");
	});
}

// close user modal when clicked anywhere outside of modal
function closeUserModal() {
	window.addEventListener("mouseup", (e) => {
		if (
			// seems sketch
			e.target != userModal &&
			e.target.parentNode != userModal &&
			e.target.parentNode.parentNode != userModal &&
			e.target.parentNode.parentNode.parentNode != userModal
		) {
			userModal.classList.remove("user__modal--show");

			// setTimeout(displayNoneUserModal(), 600);
		}
	});
}

// Gives user__modal a display of none
// function displayNoneUserModal() {
// 	userModal.style.display = "none";
// }

const cameraBtn = document.querySelector(".user__modal-camera-icon");

function userSelectFromPhotos() {
	cameraBtn.addEventListener("click", () => {
		console.log("shows pop up window to choose photo from computer");
	});
}
userSelectFromPhotos();

// function resetBg(){
//   // localStorage.clear();
//    let defaultImg = localStorage.setItem("backgroundImage", 'https://images.unsplash.com/photo-1474224017046-182ece80b263?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80');
//         defaultImg = localStorage.getItem("backgroundImage");
//       bodyBg.style.backgroundImage = defaultImg;
// };

const userSelect = document.querySelector(".user__modal-avatar-circle");
const userIcon = document.querySelector(".user__modal-avatar");
const userMainIcon = document.querySelector(".nav__user-icon-img");
const userDefaultIcon = document.querySelector(".nav__user-icon-img").src;

// Setting users Icon
function setUserIcon(img) {
	userIcon.src = img;
	localStorage.setItem("userIcon", img);

	getUserIcon();
}

// Loading users icon from localStorage
function getUserIcon() {
	let avatar = localStorage.getItem("userIcon");
	if (!avatar) {
		userMainIcon.src = userDefaultIcon;
	} else {
		userMainIcon.src = avatar;
		userIcon.src = avatar;
	}
}

// Search GOOGLE
let userSearch = document.querySelector(".main__search-input");

userSearch.addEventListener("keyup", function (e) {
	e.preventDefault;
	if (e.keyCode === 13) {
		searchGoogle();
	}
});

function searchGoogle() {
	searchValue = userSearch.value;
	window.open(`http://google.com/search?q=${searchValue}`);
}

fetchData();
showUserModal();
closeUserModal();
showModal();
closeModal();
getUserIcon();
getBgFromStorage();
