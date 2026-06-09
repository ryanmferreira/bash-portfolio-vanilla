const dropdowns = document.getElementsByClassName("menu-dropdown");

for (const dropdown of dropdowns) {
    const content = dropdown.querySelector('.dropdown-content');

    if (content) {
        dropdown.addEventListener('mouseenter', () => {
            content.classList.add('show');
        });

        dropdown.addEventListener('mouseleave', () => {
            content.classList.remove('show');
        });
    }
}

function updatePreview(imgSrc, title, filename, desc, date) {
    const mainImg = document.getElementById('main-view-img');
    const viewTitle = document.getElementById('view-title');
    const metaFile = document.getElementById('meta-file');
    const metaDesc = document.getElementById('meta-desc');
    const metaDate = document.getElementById('meta-date');

    if (mainImg) mainImg.src = imgSrc;
    if (viewTitle) viewTitle.innerText = title;
    if (metaFile) metaFile.innerText = filename;
    if (metaDesc) metaDesc.innerText = desc;
    if (metaDate) metaDate.innerText = date;

    const rows = document.getElementsByClassName('file-row');
    for (const row of rows) {
        row.classList.remove('active');
    }

    window.event.currentTarget.classList.add('active');
}