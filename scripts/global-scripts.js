const HOME = "../pages/home.html"
const GALLERY = "../pages/gallery.html"
const ABOUT = "../pages/about.html"

const windowWidth = window.innerWidth;

var path = window.location.pathname;
var fileName = path.split("/").pop();

const dropdowns = document.getElementsByClassName("menu-dropdown");

function toggleShorcutsView() {
  const modal = document.querySelector(".shortcuts-modal");

  const isVisible = window.getComputedStyle(modal).display === "block";

  if (isVisible) {
    modal.style.display = "none";
  } else {
    modal.style.display = "block";
  }
}

for (const dropdown of dropdowns) {
  const content = dropdown.querySelector(".dropdown-content");

  if (content) {
    dropdown.addEventListener("mouseenter", () => {
      content.classList.add("show");
    });

    dropdown.addEventListener("mouseleave", () => {
      content.classList.remove("show");
    });
  }
}

document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
});

document.addEventListener("keydown", (e) => {
  if (e.key === '1') {
    window.location.assign(HOME);
  }

  if (e.key === '2') {
    window.location.assign(GALLERY);
  }

  if (e.key === '3') {
    window.location.assign(ABOUT);
  }

  if (fileName === "gallery.html") {
    if (e.key === 'ArrowLeft') {
      previous();
    }

    if (e.key === 'ArrowRight') {
      next();
    }
  }
});

function debug() {
  console.log("Windows Width: " + windowWidth)
  console.log("Page: " + fileName)
  console.log("Image index: " + actualImageIndex + "/" + totalImages);
  console.log("Images total: " + totalImages);
}