const randomizeButton = document.getElementById('randomize-button');
const randomImage = document.getElementById('random-image');
const imageDir = 'public/';
let images = []; // 이미지 파일 이름들을 저장할 배열

// XMLHttpRequest를 사용하여 이미지 파일을 불러옴
function fetchImages() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', imageDir);
  xhr.responseType = 'document';

  xhr.onload = function () {
    const fileList = xhr.response.getElementsByTagName('a');
    for (let i = 0; i < fileList.length; i++) {
      const fileName = fileList[i].getAttribute('href');
      if (fileName.endsWith('.png')) {
        images.push(fileName);
      }
    }
    getRandomImage(); // 이미지를 모두 불러왔으면 랜덤 이미지를 보여줌
  };

  xhr.send();
}

function getRandomImage() {
  if (images.length > 0) {
    const randomIndex = Math.floor(Math.random() * images.length);
    randomImage.src = images[randomIndex];
  }
}

randomizeButton.addEventListener('click', getRandomImage);
fetchImages(); // 이미지 파일들을 불러옴
