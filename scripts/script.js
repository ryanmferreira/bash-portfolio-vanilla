const HOME = "../pages/home.html"
const GALLERY = "../pages/gallery.html"
const ABOUT = "../pages/about.html"

const dropdowns = document.getElementsByClassName("menu-dropdown");

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

document.addEventListener('contextmenu', function (event) {
    event.preventDefault();
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
});

function updatePreview(selectedRow, imgSrc, title, desc, date) {
    const mainImg = document.getElementById("main-view-img");
    const viewTitle = document.getElementById("view-title");
    const metaFile = document.getElementById("meta-file");
    const metaDesc = document.getElementById("meta-desc");
    const metaDate = document.getElementById("meta-date");
    const metaStatus = document.getElementById("meta-status");

    if (mainImg) mainImg.src = imgSrc;
    if (viewTitle) viewTitle.innerText = title;
    if (metaFile) metaFile.innerText = imgSrc;
    if (metaDesc) metaDesc.innerText = desc;
    if (metaDate) metaDate.innerText = date;

    if (metaStatus) {
        metaStatus.classList.remove("orange", "red");

        const img = new Image();

        img.onload = () => {
            metaStatus.innerText = "INDEXED_OK";
            metaStatus.classList.add("orange");
        };

        img.onerror = () => {
            metaStatus.innerText = "INDEXED_ERROR";
            metaStatus.classList.add("red");
        };

        img.src = imgSrc;
    }

    const rows = document.getElementsByClassName("file-row");

    for (const row of rows) {
        row.classList.remove("active");

        const btn = row.querySelector(".tui-inline-btn");

        if (btn) {
            btn.innerText = "[ SELECIONAR ]";
        }
    }

    if (selectedRow) {
        selectedRow.classList.add("active");

        const activeBtn = selectedRow.querySelector(".tui-inline-btn");

        if (activeBtn) {
            activeBtn.innerText = "[ VISUALIZANDO ]";
        }
    }
}