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

function toggleShorcutsView() {
    const modal = document.querySelector(".shortcuts-modal");

    const isVisible = window.getComputedStyle(modal).display === "block";

    if (isVisible) {
        modal.style.display = "none";
    } else {
        modal.style.display = "block";
    }
}

function updatePreview(selectedRow, imgSrc, title, desc, date, camera = "Desconhecida") {
    const mainImg = document.getElementById("main-view-img").src = imgSrc;
    const viewTitle = document.getElementById("view-title").innerText = title.toUpperCase();
    const viewMetaTitle = document.getElementById("view-meta-title").innerText = title;
    const metaFile = document.getElementById("meta-file").innerText = imgSrc.substring(imgSrc.lastIndexOf('/') + 1);
    const metaDesc = document.getElementById("meta-desc").innerText = desc;
    const metaDate = document.getElementById("meta-date").innerText = date;
    const metaCamera = document.getElementById("meta-camera").innerText = camera;
    const metaStatus = document.getElementById("meta-status");

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

    const rows = document.getElementsByClassName("file-row");
    for (const row of rows) {
        row.classList.remove("active");
        const btn = row.querySelector(".tui-inline-btn");
        if (btn) btn.innerText = "[ SELECIONAR ]";
    }

    if (selectedRow) {
        selectedRow.classList.add("active");
        const activeBtn = selectedRow.querySelector(".tui-inline-btn");
        if (activeBtn) activeBtn.innerText = "[ VISUALIZANDO ]";
    }
}

function loadGallery() {
    const tableBody = document.querySelector(".tui-file-table tbody");
    if (!tableBody) return;

    tableBody.innerHTML = "";

    const foldersByDevice = {
        "A03": "a03",
        "MotoG9": "moto-g9",
        "Samsung_ES25": "recup-photorec"
    };

    let fileList = [];

    for (const device in foldersByDevice) {
        const currentDevicePhotos = galleryData[device];

        if (currentDevicePhotos) {
            for (const img of currentDevicePhotos) {
                img.path = `../imgs/${foldersByDevice[device]}/${img.filename}`;
                fileList.push(img);
            }
        }
    }

    for (let index = 0; index < fileList.length; index++) {
        const img = fileList[index];

        const tr = document.createElement("tr");

        tr.className = index === 0 ? "file-row active" : "file-row";
        tr.tabIndex = 0;

        const permissions = "-rw-r--r--";
        const visualisingBtn = index === 0 ? "[ VISUALIZANDO ]" : "[ SELECIONAR ]";

        tr.innerHTML = `
            <td>${permissions}</td>
            <td class="file-name blue">${img.filename}*</td>
            <td><button class="tui-inline-btn">${visualisingBtn}</button></td>
        `;

        tr.addEventListener("click", () => {
            const descricao = img.description || img.desc;
            updatePreview(tr, img.path, img.title, descricao, img.date, img.camera);
        });

        tr.addEventListener("keydown", (event) => {
            if (event.key === "Enter") tr.click();
        });

        tableBody.appendChild(tr);
    }

    if (fileList.length > 0) {
        const firstImg = fileList[0];
        const firstRow = tableBody.querySelector(".file-row");
        const firstDesc = firstImg.description || firstImg.desc;

        updatePreview(firstRow, firstImg.path, firstImg.title, firstDesc, firstImg.date, firstImg.camera);
    }

    const storageItem = document.querySelector(".sidebar-item");
    const countFiles = document.getElementById("file-count");
    const totalFiles = document.getElementById("total-files");
    const filesFound = document.getElementById("files-found");

    storageItem.innerText = `TOTAL: ${fileList.length} arquivos`;
    countFiles.innerText = `FILES: ${fileList.length}/${fileList.length}`;
    totalFiles.innerText = `TOTAL: ${fileList.length} arquivos`;
    filesFound.innerText = `-- File Index: ${fileList.length} items found --`;
}

document.addEventListener('DOMContentLoaded', loadGallery);