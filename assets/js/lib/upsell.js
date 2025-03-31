// 閉じる
const closeUpsell = document.querySelectorAll(".btn-closeUpsell");
closeUpsell.forEach((btn) => {
  btn.addEventListener("click", () => {
    const disabled = btn.getAttribute("aria-disabled");

    if (disabled !== "true") {
      const content = btn.closest(".content");
      content.classList.remove("is-show");
    }
  });
});
