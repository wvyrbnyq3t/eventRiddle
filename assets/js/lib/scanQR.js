const video = document.createElement("video");
const canvasElement = document.getElementById("scanQRCanvas");
const canvas = canvasElement.getContext("2d", {
  desynchronized: true,
  willReadFrequently: true,
});

let isReadQR = false;
let code = null;

// HTML 要素
const upsellErr = document.getElementById("scanQRErr");
const sliderScanQR = document.getElementById("scanQR");
const modalScanQRSuccess = modal.querySelector(
  `.content[data-modal="scanQRSuccess"]`
);

// QRコードの読み込み
function scanQR() {
  navigator.mediaDevices
    .getUserMedia({
      video: {
        audio: false,
        facingMode: "environment",
        frameRate: { ideal: 30, max: 60 },
      },
    })
    .then((stream) => {
      video.srcObject = stream;
      video.setAttribute("playsinline", true);
      video.play();
      requestAnimationFrame(tick);
    })
    .catch((err) => {
      upsellErr.classList.add("is-show");
      sliderScanQR.classList.remove("is-show");
      console.log(err);
    });
}

// QRコードの解析
function tick() {
  if (video.readyState === video.HAVE_ENOUGH_DATA) {
    canvasElement.height = video.videoHeight;
    canvasElement.width = video.videoWidth;
    canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
    const imageData = canvas.getImageData(
      0,
      0,
      canvasElement.width,
      canvasElement.height
    );
    // jsQRのメソッド
    const code = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: "dontInvert",
    });
    if (code && isReadQR) {
      if (code.data !== "") {
        isReadQR = false;
        video.srcObject = null;

        modalScanQRSuccess.classList.add("is-show");
      }
    }
  }
  requestAnimationFrame(tick);
}

// 起動
const btnBoot = document.querySelectorAll(".btn-bootScanQR");
btnBoot.forEach((e) => {
  e.addEventListener("click", () => {
    const disabled = e.getAttribute("aria-disabled");

    if (disabled !== "true") {
      scanQR();
      isReadQR = true;
    }
  });
});

// 停止
const btnPause = document.querySelectorAll(".btn-pauseScanQR");
btnPause.forEach((e) => {
  e.addEventListener("click", () => {
    isReadQR = false;
    video.srcObject.getTracks().forEach((track) => {
      track.stop();
    });
    video.srcObject = null;
    canvas.clearRect(0, 0, canvasElement.width, canvasElement.height);
  });
});
