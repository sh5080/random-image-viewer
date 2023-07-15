const randomImage = document.getElementById("random-image");
const imageDir = "https://sh5080.github.io/randomImageViewer/public/";

// 이미지를 랜덤으로 보여주는 함수
async function getRandomImage() {
  // async 키워드 추가
  const images = await fetchImages(); // await 키워드 추가
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

    const images = [];
    for (let i = 0; i < fileList.length; i++) {
      const fileName = fileList[i].getAttribute("href");
      if (fileName.endsWith(".png")) {
        images.push(fileName); // 이미지 파일의 절대 경로를 배열에 추가
      }
    }

    return images;
  } catch (error) {
    console.error("Error fetching images:", error);
    return [];
  }
}

// 페이지 로드시 랜덤 이미지를 보여줌
getRandomImage();

// 랜덤 버튼 클릭시 이미지 변경
document
  .getElementById("randomize-button")
  .addEventListener("click", getRandomImage);
