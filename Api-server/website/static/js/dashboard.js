
const username = document.querySelector('#user').textContent


function messageBox(icon, text) {
    const message = document.querySelector('.card-message')
    message.style.display = 'block'
    var color = "#167D2E"
    if (icon == "error") {
        color = 'red'
    }

    message.innerHTML = `
    <div class="card-message-body card-center">
        <div class="card-message-icon card-center" style="color:${color}">
            <i class="bx bxs-${icon}-circle"></i>
        </div>
        <div class="card-message-text card-center">
            <span>${text}</span>
        </div>
    </div>
    `
    let intId = setInterval(() => {
        message.style.display = 'none'
        clearInterval(intId)
    }, 2000)
}



var header_dropdown = document.querySelector('.sidebar-header')
var arrow = header_dropdown.querySelector('i')
var menu_dropdown = document.querySelector('.ant-dropdown')
var menu_dropdown_user = document.querySelector('.ant-dropdown-user')
var user_button = document.querySelector('#cta-button-user')

function showDropdownHeader() {
    arrow.classList.toggle('bx-rotate-180')
    menu_dropdown.classList.toggle('ant-dropdown-show-left')
}

function showDropdownUser() {
    menu_dropdown_user.classList.toggle('ant-dropdown-show-right')
};

header_dropdown.addEventListener('click', showDropdownHeader);

user_button.addEventListener('click', showDropdownUser);


(function () {
    var current = location.pathname;
    if (current === "") return;
    var menuItems = document.querySelectorAll('.menu-item  a[href="' + current + '"]');

    for (var i = 0, len = menuItems.length; i < len; i++) {
        if (menuItems[i].getAttribute("href")) {
            if (menuItems[i].getAttribute("href").indexOf(current) !== -1) {
                menuItems[i].classList.add('activate');

            }
        }
    }
})();




const btnSidebarMenu = document.querySelector('#sidebar-menu')
btnSidebarMenu.addEventListener('click', () => {
    const sidebarMenu = document.querySelector('.main-sidebar')
    const cardUpgrade = document.querySelector('.ant-card')
    const btnUpgrade = document.querySelector('#btn-upgrade')

    btnUpgrade.classList.toggle('hide-rocket-btn')
    cardUpgrade.classList.toggle('hide-ant-card')
    sidebarMenu.classList.toggle('sidebar-nimimum')
})




