const modal = document.getElementById("modal");
const overlay = modal.querySelector(".overlay");

// 開いているウィンドウの数
let getCountModalWindows = () => {
  const count = modal.querySelectorAll(".content.is-show").length;

  if (count === 0) {
    modal.classList.remove("is-active");
    document.body.classList.remove("is-active");
  }
};

// 開く
const modalOpen = document.querySelectorAll(".btn-openModal");
modalOpen.forEach((btn) => {
  btn.addEventListener("click", () => {
    const disable = btn.getAttribute("aria-disabled");

    if (disable !== "true") {
      const field = btn.getAttribute("data-modal");
      const content = modal.querySelector(`.content[data-modal="${field}"]`);

      if (content) {
        modal.classList.add("is-active");
        content.classList.add("is-show");
      }
    }
  });
});

// 閉じる
const modalClose = document.querySelectorAll(".btn-closeModal");
modalClose.forEach((btn) => {
  btn.addEventListener("click", () => {
    const disable = btn.getAttribute("aria-disabled");

    if (disable !== "true") {
      const content = btn.closest(".content.is-show");
      content.classList.remove("is-show");

      getCountModalWindows();
    }
  });
});

// すべて閉じる
overlay.addEventListener("click", () => {
  modal.querySelectorAll(".content.is-show").forEach((content) => {
    content.classList.remove("is-show");
  });
  modal.classList.remove("is-active");
  document.body.classList.remove("is-active");
});
