var style_noti = document.createElement('style')
style_noti.innerText = `
    .div_noti {
        background-color:#242526;
        position:absolute;
        bottom:10px;
        left:10px;
        display:flex;
        padding:10px 20px;
        align-items:center;
        gap:20px;
        border-radius:8px;
        opacity:0;
        transition: .5s esea;
        z-index:-1;
    }
    .div_noti_container {
        position:relative;
        min-height:35px;
        display:flex;
        align-items:center;
        min-width:270px;
        justify-content:space-between;
    }

    .close_noti {
        width:25px;
        height:25px;
        border-radius:50%;
        font-size:11px;
        font-weight:bold;
        text-align:center;
        border:none;
        background:transparent;
        color:#bec7d0;
        cursor:pointer;
        background: #484A4C
    
    }
    .close_noti:hover {
        background:#000
    }

    .text_noti {
        color:#bec7d0;
        font-size:15px;
        display:flex;
        align-items:center;
        gap:10px

    }
    .text_noti img {
        height:30px;

    }
    .text_noti a {
        font-weight:bold;
        color:#CCDDFF;

    }

    .div_noti.activate {
        opacity:1;
        z-index:1;
    }

`
style_noti.rel = 'stylesheet';
style_noti.type = 'text/css'
document.head.appendChild(style_noti)


var div_noti = document.createElement("div")
div_noti.className = "div_noti"


var div_noti_container = document.createElement("div")
div_noti_container.className = "div_noti_container"

div_noti.appendChild(div_noti_container)




var text_noti = document.createElement("div")
text_noti.className = "text_noti"
div_noti_container.appendChild(text_noti)




var close_noti = document.createElement("button")
close_noti.className = "close_noti"
close_noti.textContent = '✖'
close_noti.onclick = ()=>{
    div_noti.classList.toggle("activate")
}
div_noti_container.appendChild(close_noti)

document.body.appendChild(div_noti);



chrome.runtime.onMessage.addListener(function(msg, sender, response){
    
    if (msg.msg=="editNote" || msg.msg =="deleteNote") {
        if (div_noti.classList.toggle("activate")){
            div_noti.classList.toggle("activate")
        }
        div_noti.classList.toggle("activate")
        text_noti.innerHTML = msg.nofitication
        let intId = setInterval(() => {
            div_noti.classList.toggle("activate")
            clearInterval(intId)
        }, 1500)
        console.log(msg.nofitication)
    }else if(msg.msg =="notification"){
        if (div_noti.classList.toggle("activate")){
            div_noti.classList.toggle("activate")
        }
        div_noti.classList.toggle("activate")
        text_noti.innerHTML = msg.message
        console.log(msg.nofitication)

        }
    }
);

