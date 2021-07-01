API_KEY = 'm4G7b4UBSAQdWyoe2tg7lyv_YXGqJuGMpSSi3MMcUxc';

fetch(`https://api.unsplash.com/photos/?client_id=${API_KEY}`)
.then((response) => response.json())
.then((data) => {


    data.map((photo) => {
        let pic = document.querySelector('.test');
        let fullpic = document.createElement('div');
            pic.appendChild(fullpic);
            fullpic.innerHTML = `<img src="${photo.urls.full}" alt=""></img>`
        console.log(photo.urls.full)
    });

});