const LOG_INTERVAL_MS = 750;
const PROGRESS_BAR_START_DELAY_MS = 250;
const REDIRECT_FADE_OUT_MS = 1500;

const logs = [
    "[  <span class='boot-ok'>OK</span>  ] Loading kernel 6.8.0-fatec",
    "[  <span class='boot-ok'>OK</span>  ] Initializing initial ramdisk...",
    "[  <span class='boot-ok'>OK</span>  ] Checking hardware integrity and core components...",
    "[  <span class='boot-ok'>OK</span>  ] Detecting processor topology and CPU cache grids...",
    "[  <span class='boot-ok'>OK</span>  ] Mounting local storage devices and partition layout...",
    "[  <span class='boot-ok'>OK</span>  ] Initializing physical volume manager and journaling filesystems...",
    "[  <span class='boot-ok'>OK</span>  ] Setting up networking subsystem and routing engines...",
    "[ <span class='boot-warn'>WARN</span> ] The website creator doesn't know what he's doing.",
    "[  <span class='boot-ok'>OK</span>  ] Connecting to default network gateway via DHCP server...",
    "[  <span class='boot-ok'>OK</span>  ] Starting local security and firewall daemon services...",
    "[ <span class='boot-error'>FAIL</span> ] The website creator is too lazy to formulate error messages.",
    "[  <span class='boot-ok'>OK</span>  ] Allocating kernel memory blocks for user environment...",
    "[ <span class='boot-error'>FAIL</span> ] Coffee provider service down: 0 cups detected.",
    "[  <span class='boot-warn'>WARN</span>  ] Bypassing simulation crash... Kernel state restored to nominal.",
    "[  <span class='boot-ok'>OK</span>  ] Disregarding fatal coffee deficit... Continuing on pure caffeine debt.",
    "[  <span class='boot-ok'>OK</span>  ] Loading customized environment parameters and user configs...",
    "[  <span class='boot-ok'>OK</span>  ] Initializing terminal graphical server..."
];

const logContainer = document.getElementById('bootLog');
const progressBar = document.getElementById('bootProgress');
let currentLog = 0;

const totalLogTime = logs.length * LOG_INTERVAL_MS;

setTimeout(() => {
    progressBar.style.transition = `width ${totalLogTime}ms ease-out`;
    progressBar.style.width = '100%';
}, PROGRESS_BAR_START_DELAY_MS);

const bootInterval = setInterval(() => {
    if (currentLog < logs.length) {
        const line = document.createElement('div');
        line.innerHTML = logs[currentLog];

        logContainer.appendChild(line);
        logContainer.scrollTop = logContainer.scrollHeight;

        currentLog++;
    } else {
        document.body.style.opacity = '0';
        document.body.style.transition = `opacity ${REDIRECT_FADE_OUT_MS}ms ease`;

        setTimeout(() => {
            window.location.href = "pages/home.html";
        }, REDIRECT_FADE_OUT_MS);
    }
}, LOG_INTERVAL_MS);