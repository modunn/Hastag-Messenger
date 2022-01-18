

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

