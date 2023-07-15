const randomizeButton = document.getElementById("randomize-button");
const randomImage = document.getElementById("random-image");
const imageDir = "public/";
let images = []; // 이미지 파일 이름들을 저장할 배열

// 이미지를 랜덤으로 보여주는 함수
function getRandomImage() {
  if (images.length > 0) {
    const randomIndex = Math.floor(Math.random() * images.length);
    const imageName = images[randomIndex];
    randomImage.src = imageName; // 이미지의 URL을 그대로 설정
  }
}

// 이미지 파일들을 불러오는 함수
async function fetchImages() {
  try {
    const response = await fetch(imageDir);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.text();
    const fileList = new DOMParser()
      .parseFromString(data, "text/html")
      .getElementsByTagName("a");
    for (let i = 0; i < fileList.length; i++) {
      const fileName = fileList[i].getAttribute("href");
      if (fileName.endsWith(".png")) {
        // images.push(fileName); // 로컬 테스트
        images.push(imageDir + encodeURIComponent(fileName));
      }
    }

    // 모든 이미지를 로드하고 랜덤 이미지를 보여줌
    getRandomImage();
  } catch (error) {
    console.error("Error fetching images:", error);
  }
}

randomizeButton.addEventListener("click", getRandomImage); // 랜덤 버튼 클릭시 이미지 변경
fetchImages(); // 페이지 로드시 이미지 파일들을 불러옴
