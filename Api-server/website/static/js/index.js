(function () {
    var current = location.pathname.split('/')[1];
    if (current === "") return;
    var menuItems = document.querySelectorAll('.nav__bar--link');
    for (var i = 0, len = menuItems.length; i < len; i++) {
        if (menuItems[i].getAttribute("href").indexOf(current) !== -1) {
            menuItems[i].className += " current";
        }
    }
})();

function copyToClipboard() {
    /* Get the text field */
    var copyText = document.getElementsByClassName("code__block--white")[0];

  
     /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText.innerText);
  
  }

var state_menu = document.querySelector('#menu-btn-on').querySelector('.close')

function openMenu() {
    var on = document.querySelector('#menu-btn-on')
    var close = document.querySelector('#menu-btn-close')
    var modal = document.querySelector('.menu__modal--popup')
    var nav   = document.querySelector('.nav__bar--center')
    if (state_menu) {
        on.classList.remove('close')
        close.classList.add('close')
        state_menu = false
        document.querySelector('.nav__bar').appendChild(nav)
        modal.parentNode.style.display = 'none'
        document.body.classList.remove('stop-scrolling')
    }else {
        on.classList.add('close')
        close.classList.remove('close')
        state_menu = true
        modal.appendChild(nav)
        modal.parentNode.style.display = 'block'
        document.body.classList.add('stop-scrolling')
    }
    // window.addEventListener('mouseup', e => {
    //     if (modal && e.target != modal && e.target.parentNode != modal && e.target.parentNode != document.querySelector('.nav__bar--center')) {
    //         on.classList.remove('close')
    //         close.classList.add('close')
    //         document.querySelector('.nav__bar').appendChild(nav)
    //         modal.parentNode.style.display = 'none'
    //         document.body.classList.remove('stop-scrolling')
    //     }
    // })

}

