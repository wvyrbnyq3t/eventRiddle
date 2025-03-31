// カルーセルの子要素の個数
document.addEventListener("DOMContentLoaded", () => {
  const carousels = document.querySelectorAll(".carousel");
  carousels.forEach((carousel) => {
    const children = carousel.querySelectorAll(".carousel-item").length;
    if (children !== 1) {
      carousel.setAttribute("style", `--i: ${children}`);
    }
  });
});

// 一度だけ押下することができるボタン
const btnOneTime = document.querySelectorAll(".btn-oneTime");
btnOneTime.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.setAttribute("aria-disabled", true);
  })
})