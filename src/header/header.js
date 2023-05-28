const header = document.querySelector("#header");
const windowWidth = window.innerWidth;

export function displayHeader() {
  header.innerHTML = "";

  const baseImageSrc = "./assets/static-job-listings-master/images/bg-header";
  const resizeImageProp = "-mobile.svg";

  const html = `
      <img
        id="header_image"
        src=${baseImageSrc}${resizeImageProp}
        alt="header"
      />
  `;
  header.insertAdjacentHTML("afterbegin", html);

  const img = document.querySelector("#header_image");

  if (windowWidth > 375) {
    img.src = `${baseImageSrc}-desktop.svg`;
    img.style.width = "100%";
  }
}
displayHeader();

window.addEventListener("resize", displayHeader);
