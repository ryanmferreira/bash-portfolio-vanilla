const fullscreenImg = document.getElementById("fullscreen-image");
var scale = 0.25;
var actuallZoom = 1;

var currentFilter = 'all';

var actualImageIndex = 0;
var totalImages = 0;

function zoomIn() {
    actuallZoom += scale;
    updateImageScale();
}

function zoomOut() {
    if (actuallZoom > 0.25) {
        actuallZoom -= scale;
        updateImageScale();
    }
}

function resetZoom() {
    actuallZoom = 1;
    updateImageScale();
}

function updateImageScale() {
    fullscreenImg.style.transform = `scale(${actuallZoom})`;
}

document.getElementById("main-view-img").addEventListener("click", () => {
    toggleImageFullscreen();
});


function updateImagePreview(selectedRow, imgSrc, title, desc, date, camera = "Desconhecida", photog = "Desconhecido") {
    const mainImg = document.getElementById("main-view-img");
    const fullscreenImg = document.getElementById("fullscreen-image");
    const viewTitle = document.getElementById("view-title").innerText = title.toUpperCase();
    const viewMetaTitle = document.getElementById("view-meta-title").innerText = title.toUpperCase();
    const metaFile = document.getElementById("meta-file").innerText = imgSrc;
    const metaDesc = document.getElementById("meta-desc").innerText = desc.toUpperCase();
    const metaDate = document.getElementById("meta-date").innerText = date.toUpperCase();
    const metaCamera = document.getElementById("meta-camera").innerText = camera.toUpperCase();
    const metaPhotog = document.getElementById("meta-photog").innerText = photog.toUpperCase();
    const metaStatus = document.getElementById("meta-status");

    mainImg.alt = "Nome da imagem: " + title;
    fullscreenImg.alt = "Nome da imagem: " + title;

    mainImg.src = imgSrc;
    fullscreenImg.src = imgSrc;

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

function loadGallery(deviceFilter = 'all') {
    currentFilter = deviceFilter;

    const tableBody = document.querySelector(".tui-file-table tbody");

    tableBody.innerHTML = "";

    const foldersByDevice = {
        "SamsungES25": "recup-photorec",
        "A03": "a03",
        "MotoG9": "moto-g9",
    };

    let fileList = [];

    for (const device in foldersByDevice) {
        const currentDevicePhotos = galleryData[device];

        if (deviceFilter === 'all' || deviceFilter === device) {
            if (currentDevicePhotos) {
                for (const img of currentDevicePhotos) {
                    img.path = `../imgs/${foldersByDevice[device]}/${img.filename}`;
                    fileList.push(img);
                }
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
            updateImagePreview(tr, img.path, img.title, img.description, img.date, img.camera, img.photographer);
            actualImageIndex = index;
        });

        tr.id = "tr-" + index;

        tableBody.appendChild(tr);
    }

    if (fileList.length > 0) {
        const firstImg = fileList[0];
        const firstRow = tableBody.querySelector(".file-row");
        const firstDesc = firstImg.description;

        updateImagePreview(firstRow, firstImg.path, firstImg.title, firstDesc, firstImg.date, firstImg.camera, firstImg.photographer);
    }

    totalImages = (fileList.length - 1);
    updateFileCount()
}

function filterGallery(device) {
    actualImageIndex = 0;

    loadGallery(device);

    const buttons = document.querySelectorAll(".filter-btn");
    buttons.forEach(btn => btn.classList.remove("active"));

    event.target.classList.add("active");
}

document.addEventListener("DOMContentLoaded", () => {
    loadGallery();
});

function next() {
    if (actualImageIndex < totalImages) {
        actualImageIndex++;
    }
    else {
        actualImageIndex = 0;
    }

    selectImage();
    resetZoom();
    debug();
}

function previous() {
    if (actualImageIndex > 0) {
        actualImageIndex--;
    }
    else {
        actualImageIndex = totalImages;
    }

    selectImage();
    resetZoom();
    debug();
}

function selectImage() {
    var imgID = "tr-" + actualImageIndex;

    var element = document.getElementById(imgID);

    if (element) {
        element.click();
        updateFileCount()

        if (windowWidth > 720) {
            element.scrollIntoView({
                behavior: 'auto',
                block: 'nearest',
                inline: 'end'
            });
        }
    }
}

function updateFileCount() {
    const storageItem = document.querySelector(".sidebar-item").innerText = `TOTAL: ${totalImages + 1} arquivos`;;
    const countFiles = document.getElementById("file-count").innerText = `FILES: ${totalImages + 1}/${totalImages + 1}`;
    const totalFiles = document.getElementById("total-files").innerText = `TOTAL: ${totalImages + 1} arquivos`;;
    const filesFound = document.getElementById("files-found").innerText = `-- File Index: ${totalImages + 1} items found --`;
    const filePos = document.getElementById("pos").innerText = `${actualImageIndex + 1} / ${totalImages + 1}`;
}

function toggleImageFullscreen() {
    const fullscreenImage = document.querySelector(".gallery-div");

    const isVisible = window.getComputedStyle(fullscreenImage).display === "flex";

    if (isVisible) {
        fullscreenImage.style.display = "none";
    } else {
        fullscreenImage.style.display = "flex";
    }

    resetZoom();
}