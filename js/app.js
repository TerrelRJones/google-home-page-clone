const API_KEY = 'm4G7b4UBSAQdWyoe2tg7lyv_YXGqJuGMpSSi3MMcUxc';

function fetchData(){
fetch(`https://api.unsplash.com/photos/?client_id=${API_KEY}`)
.then((response) => response.json())
.then((data) => {
// console.log(data);

    data.map((photo) => {
        const bgPhoto = photo.urls.full;
        const bgName = photo.user.name;
        const id = photo.id;

        let pic = document.querySelector('.modal__right');
        let fullpic = document.createElement('div');
            pic.appendChild(fullpic);
            fullpic.innerHTML = `<div class="photo__card" onclick='chooseBg(${JSON.stringify(photo)})'>
            <div class="photo__bg">
              <img src="${bgPhoto}" alt="">
            </div>
            <div class="photo__description">
              <h3>${bgName}</h3>
            </div>
          </div>`
        // console.log(id)
    });

});
}

// Modal functionality
const modal = document.querySelector('.modal');

const settingsBtn = document.querySelector('.footer__settings-icon');
const cancelBtn = document.querySelector('.modal__btn-cancel');

//Open Modal
function showModal(){
  settingsBtn.addEventListener('click', () => {
    modal.classList.add('modal--show')
  })
}

// Close Modal
function closeModal(){
  cancelBtn.addEventListener('click', () => {
    modal.classList.remove('modal--show');
  });
}

const bodyBg = document.querySelector('.body__bg');

function chooseBg(url){
  const bgPhoto = url.urls.full;
  localStorage.setItem('backgroundImage', `${bgPhoto}`);
}


function setBg(){
  let bgImage = localStorage.getItem('backgroundImage');
        bodyBg.style.backgroundImage = `"url(${bgImage})"`;
        console.log(bgImage)
}



fetchData();
showModal();
closeModal();

