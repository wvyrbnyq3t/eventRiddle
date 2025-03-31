const slider = document.getElementById("slider");

// 開いているウィンドウの数
let getCountSliderWindows = () => {
  const count = slider.querySelectorAll(".content.is-show").length;

  if (count === 0) {
    slider.classList.remove("is-active");
    document.body.classList.remove("is-active");
  }
};

// 開く
const openSlider = document.querySelectorAll(".btn-openSlider");
openSlider.forEach((btn) => {
  btn.addEventListener("click", () => {
    const disabled = btn.getAttribute("aria-disabled");

    if (disabled !== "true") {
      const field = btn.getAttribute("data-slider");
      const content = slider.querySelector(`.content[data-slider="${field}"]`);

      if (content) {
        content.classList.add("is-show");
        document.body.classList.add("is-active");
      }
    }
  });
});

// 閉じる
const closeSlider = document.querySelectorAll(".btn-closeSlider");
closeSlider.forEach((btn) => {
  btn.addEventListener("click", () => {
    const content = btn.closest(".content");
    content.classList.remove("is-show");

    getCountSliderWindows();
  });
});

// すべて閉じる
const closeAllSlider = document.querySelectorAll(".btn-closeAllSlider");
closeAllSlider.forEach((btn) => {
  btn.addEventListener("click", () => {
    slider.querySelectorAll(".content.is-show").forEach((content) => {
      content.classList.remove("is-show");
    });
  });
});
