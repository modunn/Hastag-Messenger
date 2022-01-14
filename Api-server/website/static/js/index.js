


(function () {
    var current = location.pathname.split('/')[1];
    if (current === "") return;
    var menuItems = document.querySelectorAll('.nav__bar--link');
    for (var i = 0, len = menuItems.length; i < len; i++) {
        if (menuItems[i].getAttribute("href")) {
            if (menuItems[i].getAttribute("href").indexOf(current) !== -1){
                menuItems[i].className += " current";

            }
        }
    }
})();

function copyToClipboard() {
    /* Get the text field */
    var copyText = document.querySelector(".code__block--white");


    /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText.innerText);

}



var modal = document.querySelector('.menu__modal--bg')
var onBtn = document.querySelector('#menu-btn-on')
var closeBtn = document.querySelector('#menu-btn-close')
var modal_popup = document.querySelector('.menu__modal--popup')
var nav = document.querySelector('.nav__bar--center')
var nav_right = document.querySelector('.nav__bar--right')


function toggleMenu() {
    var on_modal = onBtn.classList.toggle('close')
    closeBtn.classList.toggle('close')
    modal.classList.toggle('modal__show')
    nav.classList.toggle('modal__show')
    nav_right.classList.toggle('modal__show')
 

    if (on_modal) {
        modal_popup.appendChild(nav)
        nav.appendChild(nav_right)
    }
    else {
        document.querySelector('.nav__bar').appendChild(nav)
        document.querySelector('.nav__bar').appendChild(nav_right)
    }
}


modal.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
        toggleMenu()
        
    }
    console.log( e.currentTarget)
});



var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta =100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 100;
    }

    setTimeout(function() {
    that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #af38a6}";
    document.body.appendChild(css);
};





