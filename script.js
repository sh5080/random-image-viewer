const randomizeButton = document.getElementById("randomize-button");
const randomImage = document.getElementById("random-image");
const repoOwner = "sh5080";
const repoName = "randomImageViewer";
const imageDir = "public";

// GitHub 레포지토리에서 이미지 파일 이름 목록을 가져오는 함수
async function fetchImages() {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${imageDir}`
    );
    if (!response.ok) {
      throw new Error("네트워크 응답이 실패했습니다");
    }
    const data = await response.json();
    const imageFiles = data.filter(
      (file) => file.type === "file" && file.name.endsWith(".png")
    );
    return imageFiles.map((file) => file.download_url);
  } catch (error) {
    console.error("이미지 가져오기 오류:", error);
    return [];
  }
}

// 리스트에서 랜덤한 이미지를 화면에 표시하는 함수
async function getRandomImage() {
  const images = await fetchImages();
  if (images.length > 0) {
    const randomIndex = Math.floor(Math.random() * images.length);
    randomImage.src = images[randomIndex];
  }
}

// "다음 문제" 버튼에 이벤트 리스너를 추가합니다.
randomizeButton.addEventListener("click", getRandomImage);

// 페이지 로드시 랜덤한 이미지를 보여줍니다.
getRandomImage();
