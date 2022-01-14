


var div = document.createElement("div")
div.style.cssText = `
    background-color:black;
    position:absolute;
    width:300px;
    height:200px;
    top:200px;
    left:400px;
    display:flex;
    padding:24px;
    flex-direction:column;
    align-items:center;
    gap:20px;
`
document.body.appendChild(div);

var showmess = document.createElement("TextArea")
showmess.id = "msg-show"
showmess.style.width = "100%"
showmess.style.height = "80px"
showmess.setAttribute("readonly",'')
div.appendChild(showmess)

var inp = document.createElement("input")
inp.id = "myMessage"
inp.style.width = "100%"
inp.style.height = "40px"
div.appendChild(inp)

var btn = document.createElement("button")
btn.id="sendbutton"


btn.style.width = "100%"
btn.style.height = "40px"
btn.innerText = "Sending"

btn.addEventListener('click', ()=> {    
    msg = {
        msg:"noteRealtime",
        value : document.getElementById("myMessage").value,
        room:getCookie("c_user")  
    }
    chrome.runtime.sendMessage(msg)
});


div.appendChild(btn)


chrome.runtime.onMessage.addListener(function(msg, sender, response){
    console.log(msg)
    showmess.innerText += msg.msg+ '\n'
});