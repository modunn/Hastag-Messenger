function getCookie(name) {
    function escape(s) { return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, '\\$1'); }
    var match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape(name) + '=([^;]*)'));
    return match ? match[1] : null;
}



var style = document.createElement('style')
style.innerText = `
.notes-msg {
    display:flex;
    justify-content:space-between;
    align-items:center;

}
.edit-popup {
    background-color:#fff;
    width:200px;
    height:300px;
    position:absolute;
    z-index:10;
    right:5px;
    margin:-2px auto;
    border-radius:4px;
    padding:20px;
    box-shadow:0 12px 28px 0 var(--shadow-2),0 2px 4px 0 var(--shadow-1),inset 0 0 0 1px var(--shadow-inset)
}
.edit-popup img {
    width:60px;height:60px

}
.edit-popup h1 {
    font-size:16px;
    max-width:130px;
    white-space: nowrap;
    overflow: hidden !important;
    text-overflow: ellipsis;
}
.edit-top-info {
    display:flex;
    gap:10px;
    

}
.edit-top-uid {
    display:flex;
    flex-direction:column;
    gap:1px;
    justify-content:center;
}
.edit-center {
    margin-top :15px;
    display:flex;
    flex-direction:column;
    gap:7px;
}
.edit-center input {
    box-sizing: border-box;
    margin: 0;
    position: relative;
    display: inline-block;
    width: 100%;
    min-width: 0;
    padding: 4px 8px;
    color: #000000d9;
    font-size: 14px;
    line-height: 1;
    background-color: #fff;
    background-image: none;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    transition: all .3s;
}
.edit-center input:focus, .edit-center input-focused,.edit-center input:focus {
    border-color: #3f77e8;
    border-right-width: 1px!important;
    outline: 0;
    box-shadow: 0 0 0 3px #1853db33;
}

.notes-msg span {
    display: inline-block;
    border-radius:4px;
    min-height:16px;
    min-width:1px;
    max-width:110px;
    padding:0 8px;
    padding-bottom:1px;
    color:white;
    white-space: nowrap;
    overflow: hidden !important;
    text-overflow: ellipsis;
    box-shadow: 0 1px 3px #0000000d,0 1px 1px #00000006;

}
.action {
    padding-right:25px;

}
.btn {
    line-height:1;
    position: relative;
    display: inline-block;
    white-space: nowrap;
    text-align: center;
    border: 1px solid transparent;
    box-shadow: 0 1px 3px #0000000d,0 1px 1px #00000006;
    cursor: pointer;
    height: 22px;
    padding: 0px 8px;
    font-size: 12px;
    border-radius: 4px;
    color: #000000d9;
    background: #fff;
    border-color: #d9d9d9;
    transition: .3s;

}

.btn-default:hover, .btn-default:focus {
    color: #3f77e8;
    background: #fff;
    border-color: #3f77e8;
}

.btn-primary {
    color: #fff;
    background: #1853db;
    border-color: #1853db;
    text-shadow: none;
    box-shadow: 0 1px 3px #0000001a, 0 1px 1px #0000000d;
}
.btn-primary:hover, .btn-primary:focus {
    color: #fff;
    background: #3f77e8;
    border-color: #3f77e8;
}   
.btn-dangerous {
    color: #ff4d4f;
    background: #fff;
    border-color: #ff4d4f;
}
.btn-dangerous:hover, .btn-dangerous:focus {
    color: #ff7875;
    background: #fff;
    border-color: #ff7875;
}

.i224opu6 {
    background-color : #3D4457;
}
.i224opu6 span{
    color:#e8f3ff;
    font-weight:550;
}
`
style.rel = 'stylesheet';
style.type = 'text/css'


document.head.appendChild(style)



function getUserInfo() {
    var facebook_id = getCookie('c_user')
    var avartar_url = document.querySelector("g")
    var name_user = document.querySelector(`svg`)
    if (avartar_url) {
        const msg = {
            msg: "getData",
            facebook_id: facebook_id,
            avartar_url: avartar_url.firstChild.href.baseVal,
            name: name_user.getAttribute("aria-label")
        }
        return msg
    }

}


let int = setInterval(() => {
    var msg = getUserInfo();
    if (msg) {
        clearInterval(int)

        chrome.runtime.sendMessage(msg, function (response) {
            console.log(response);
            const data = response['facebook_data']
        
            const contacts = data['contacts']
            const list_chat_items =  document.querySelectorAll("[data-testid=mwthreadlist-item]")
            list_chat_items[0].insertAdjacentHTML('beforeend',`
            
            <div  class="edit-popup">
                <div class="edit-top">
                    <div class="edit-top-info" style="display: flex; gap: 10px;">
                      <img src="data:image/png;base64, ${contacts['100002221279634']['image']}">
                        <div class="edit-top-uid" > 
                        <h1>Trần Văn</h1><h1>
                            </h1><h1>100002221279634</h1><h1>
                        </h1></div>
                    </div>
                </div>
                <div class="edit-center">
                    <input type="text" >
                    <div class="edit-color"> 
                </div>
                </div></div>
            
            
            
            `)
            for (chatItem of list_chat_items) {
                var a_tag_user = chatItem.querySelector("a")


                var guest_id = a_tag_user.href.split('t/')[1].split("/")[0]
                var parent = chatItem.querySelector(".irj2b8pg")  
                var info = contacts[guest_id]
                if(info){
                    parent.insertAdjacentHTML("beforeend", `
                    <div class="notes-msg" id="${guest_id}">
                    <span style="background:${info['color']};">
                            ${info['note']}
                        </span>

                        <div class="action">
                            <button class="btn btn-primary">Sửa</button>
                            <button class="btn btn-dangerous">Xóa</button>
                        </div>
                    </div>`)
                }else {
                    parent.insertAdjacentHTML("beforeend",`
                    <div class="notes-msg" id="${guest_id}">
                        <span style="background:#000;border-radius:8px;"></span>
                        <div class="action">
                            <button class="btn btn-primary">Sửa</button>
                            <button class="btn btn-dangerous">Xóa</button>
                        </div>
                    </div>`)
                }

            }
        })
        
    }

},1000)








