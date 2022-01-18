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
    height:22px;
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
    margin-right:5px;
}
.action {
    padding-right:25px;
    display:none;
    gap:5px

}
.notes-msg:hover > .action {
    display:flex
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
    transition: .2s;

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
.btn-dangerous:hover{
    color: #ff7875;
    background: #fff;
    border-color: #ff7875;
}
.btn-dangerous:focus {
    color: #fff;
    background: #ff7875;
    border-color: #ff7875;
}




.edit-popup {
    background-color:#fff;
    width:240px;
    position:absolute;
    z-index:10;
    right:15px;
    margin: 5px auto;
    border-radius:4px;
    padding:15px;
    // box-shadow:0 12px 28px 0 var(--shadow-2),0 2px 4px 0 var(--shadow-1),inset 0 0 0 1px var(--shadow-inset);
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
.edit-popup::before {
    content: " ";
    position: absolute;
    background: #fff;
    width: 15px;
    height: 15px;
    top: -8px;
    right: 142px;
    transform: rotate(45deg);
    z-index: 9999;

}
.edit-popup img {
    width:58px;height:58px;
    border-radius:30px;
    border : 2px solid #93b6fc;
    object-fit: cover;


}
.edit-popup h1 {
    font-size:16px;
    max-width:160px;
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

.color-contact {
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 10px;
    left: 60px;
    top: 55px;
    z-index: 1;
}

.close-popup {
    position: absolute;
    width: 26px;
    height: 26px;
    right: 10px;
    top: 10px;
    border-radius: 13px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor:pointer;
}
.close-popup span {
    font-size: 12px;
    font-weight: bold;
    color: #1d1f23;
    display: flex;
    justify-content: center;
    align-items: center;
}
.close-popup:hover {background: #e4e6eb;}

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
    padding: 4px 12px;
    color: #000000d9;
    font-size: 14px;
    line-height: 1;
    background-color: #f3f3f5;
    background-image: none;
    border: none;
    border-radius: 15px;
    transition: all .3s;
}
.edit-center input:focus, .edit-center input-focused,.edit-center input:focus {
    border-color: #3f77e8;
    border-right-width: 1px!important;
    outline: 0;
    box-shadow: 0 0 0 3px #1853db33;
    background:#fff;
}

.edit-bottom {
    display:flex ;
    align-items :center;
    justify-content : space-between;
    margin-top:15px
}
.color-btn {
    width:30px;
    height:30px;
    cursor:pointer;
}
.color-defaut {
    border:none;
    out-line:none;
    border-radius:15px;

}

.i224opu6 {
    background-color : #3a3b3c;
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
    const storage_data = JSON.parse(window.localStorage.getItem("user_info"))
    if (storage_data) {
        return storage_data
    } else {
        var facebook_id = getCookie('c_user')
        var avartar_url = document.querySelector("g")
        var name_user = document.querySelector(`svg`)
        if (avartar_url) {
            const info = {
                facebook_id: facebook_id,
                avartar_url: avartar_url.firstChild.href.baseVal,
                name: name_user.getAttribute("aria-label")
            }
            window.localStorage.setItem("user_info", JSON.stringify(info))

            return info
        }
    }
}

window.addEventListener('load', (event) => {
    let int = setInterval(() => {
        var msg = getUserInfo();
        if (msg) {
            var join = msg
            join['msg'] = "joined"
            chrome.runtime.sendMessage(join)
            clearInterval(int)
            msg['msg'] = "getData"
            chrome.runtime.sendMessage(msg, function (response) {
                const data = response['facebook_data']
                window.localStorage.setItem("facebook_data", JSON.stringify(data))
                let checkInv = setInterval(() => {
                    if (data) {

                        createNote(data)
                        clearInterval(checkInv)
                    }

                }, 100)

                let scrollITV = setInterval(() => {
                    const scroll_chat = document.querySelector(".rpm2j7zs")
                    var target = document.querySelector(".dpja2al7")
                    if (target) {
                        clearInterval(scrollITV)
                        var observer = new MutationObserver(function (mutations) {
                            mutations.forEach(function (mutationRecord) {
                                var storage_data = JSON.parse(window.localStorage.getItem("facebook_data"))
                                if (!storage_data) {
                                    var storage_data = data;
                                }
                                createNote(storage_data)
                            });
                        });

                        observer.observe(target, { attributes: true, attributeFilter: ['style'] });
                    }
                })
            })
        }
    }, 1000)
})


document.addEventListener('keydown', function (event) {
    var popup = document.querySelector(".edit-popup")
    if (event.key === "Escape") {
        if (!popup) return
        editNoteApi();
        popup.remove()
    }
});

function editPopup(contacts, styles, contact_id) {
    if (!contacts[contact_id]) {
        var img = document.querySelector(`[contact-id="${contact_id}"]`).querySelector('image')
        if (!img) {
            var img = document.querySelector(`[contact-id="${contact_id}"]`).querySelector('img')
            var img_url = img.src
        } else {
            var img_url = img.href.baseVal
        }

        contacts[contact_id] = {
            'image': img_url,
            'name': document.querySelector(`[contact-id="${contact_id}"]`).querySelector("span.a8c37x1j").textContent,
            'note': "",
            'color': "#e4e6eb"
        }
    }

    const note = document.getElementById(contact_id).querySelector('span')
    var bgColor = note.style.backgroundColor
    var hexBgColor = '#' + bgColor.substr(4, bgColor.indexOf(')') - 4).split(',').map((bgColor) => String("0" + parseInt(bgColor).toString(16)).slice(-2)).join('');


    const popup = document.createElement("div")
    popup.className = "edit-popup"
    popup.id = "popup-" + contact_id

    popup.innerHTML = `
        <div class="edit-top">
            <div class="edit-top-info"style="display: flex; gap: 10px;">
            <img src="${contacts[contact_id]['image']}" alt="Ảnh đại diện">
            <div class="edit-top-uid" > 
                <h1 class="name-contact">${contacts[contact_id]['name']}</h1>
                <h1 class="id-contact" >${contact_id}</h1>
            </div>
            <div class='color-contact' style="background:${hexBgColor}" value="${hexBgColor}"></div>
            <div class="close-popup" title="close">
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24">
                        <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/>
                    </svg>
                </span>
            </div>
        </div>

        </div>
    `


    const div_center = document.createElement("div")
    div_center.className = "edit-center"
    const note_show = document.createElement("input")
    note_show.type = "text"
    note_show.value = note.innerText
    note_show.className = "note-input"
    note_show.name = "note"
    note_show.ariaAutoComplete = "on"
    note_show.id = 'note_show'
    // edit_tagname.maxLength ='35'
    note_show.placeholder = 'Nhập nội dung cần ghi chú'
    div_center.appendChild(note_show)
    popup.appendChild(div_center)


    const div_color_btn = document.createElement("div")
    div_color_btn.className = "edit-bottom"


    for (let color of styles['color_default']) {
        let btn_color = document.createElement("button")
        btn_color.className = "color-btn color-defaut"
        btn_color.style.backgroundColor = color
        btn_color.value = color
        btn_color.onclick = () => {
            note.style.backgroundColor = color
            document.querySelector(".color-contact").style.background = color
            document.querySelector(".color-contact").setAttribute('value', color)

            document.getElementById("color-btn").value = color

        }
        div_color_btn.appendChild(btn_color)
    }





    const pick_color = document.createElement("input")
    pick_color.type = "color"
    pick_color.className = "color-btn"
    pick_color.id = "color-btn"
    pick_color.title = "Tùy chỉnh màu"
    pick_color.addEventListener('input', () => {
        note.style.backgroundColor = pick_color.value
        document.querySelector(".color-contact").style.background = pick_color.value
        document.querySelector(".color-contact").value = pick_color.value
        document.getElementById("color-btn").value = pick_color.value
    })
    div_color_btn.appendChild(pick_color)

    popup.appendChild(div_color_btn)

    popup.querySelector('.close-popup').onclick = () => {
        editNoteApi();
        popup.remove()
    }

    const note_input = popup.querySelector(".note-input")
    note_input.addEventListener('input', () => {
        note.innerText = note_input.value
        note.style.borderRadius = "4px"
        if (note.innerText == '') {
            note.style.borderRadius = "8px"
        }
    })

    return popup
}



window.addEventListener('mouseup', e => {
    var close_popup = document.querySelector('.edit-popup')
    if (close_popup && e.target != close_popup && e.target.parentNode.parentNode.parentNode != close_popup && e.target.parentNode.parentNode.parentNode.parentNode != close_popup && e.target.parentNode.parentNode != close_popup && e.target.parentNode != close_popup) {
        editNoteApi();
        close_popup.remove();
    }
})


function createNote(data) {
    let itv = setInterval(() => {
        const list_chat_items = document.querySelectorAll("[data-testid=mwthreadlist-item]")
        if (list_chat_items) {
            clearInterval(itv)
            list_chat_items.forEach((div_contact_parent) => {
                createNoteHtml(data, div_contact_parent)
            })
        }

    }, 100)


}



function createNoteHtml(data, div_contact_parent) {
    if (!div_contact_parent.querySelector(".notes-msg")) {


        const styles = data['styles']

        const contacts = data['contacts']

        var div_contact_url = div_contact_parent.querySelector("a")
        var div_contact_info = div_contact_parent.querySelector(".irj2b8pg")

        var contact_id = div_contact_url.href.split('t/')[1].split("/")[0]

        div_contact_parent.setAttribute('contact-id', contact_id)


        // Tạo thẻ cha ghi chú
        div_note = document.createElement("div")
        div_note.className = "notes-msg"
        div_note.id = contact_id
        if (!div_contact_info) {
            var div_contact_info = div_contact_parent.querySelector('div.m9osqain').parentNode
        }
        div_contact_info.appendChild(div_note)


        //Tạo thẻ span hiển thị màu sắc, style và nội dung của ghi chú
        span_note = document.createElement("span")
        span_note.style.opacity = styles['opacity'] + '%'
        if (contacts[contact_id]) {
            span_note.style.background = contacts[contact_id]['color']
            span_note.innerText = contacts[contact_id]['note']
            if (!contacts[contact_id]['note']) {
                span_note.style.borderRadius = "8px"
            }

        } else {
            span_note.style.cssText = "background:transparent;border-radius:8px;"
            span_note.innerText = ""
        }
        div_note.appendChild(span_note)


        //Tạo thẻ cha chứa hành động với ghi chú
        div_action_note = document.createElement("div")
        div_action_note.className = "action"
        div_note.appendChild(div_action_note)

        //Tạo button mở cửa sổ chỉnh sửa ghi chú
        btn_edit = document.createElement("button")
        btn_edit.className = "btn btn-primary"
        btn_edit.setAttribute("edit-id", contact_id)
        btn_edit.setAttribute("actioned", "edit")
        btn_edit.innerText = "Sửa"



        btn_edit.onclick = () => {
            div_contact_parent.appendChild(editPopup(contacts, styles, contact_id)

            )

        }
        div_action_note.appendChild(btn_edit)

        //Tạo button xóa ghi chú

        btn_remove = document.createElement("button")
        btn_remove.className = "btn btn-dangerous"
        btn_remove.setAttribute("actioned", "remove")
        if (contacts[contact_id]) {
            btn_remove.setAttribute("remove-id", contacts[contact_id]['id'])
            btn_remove.addEventListener("click", () => {
                removeNote(contacts[contact_id]['id'])
            })
        }

        btn_remove.innerText = "Xóa"
        div_action_note.appendChild(btn_remove)
    }
}



function editNoteApi() {
    var msg = JSON.parse(window.localStorage.getItem("user_info"))
    if (!msg) {
        var msg = getUserInfo();
    }
    const popup = document.querySelector(".edit-popup")
    msg['msg'] = "handleNote"
    msg['contact_id'] = popup.querySelector(".id-contact").textContent
    msg['contact_name'] = popup.querySelector(".name-contact").textContent
    msg['color'] = popup.querySelector(".color-contact").getAttribute('value')
    msg['image'] = popup.querySelector('img').src
    msg['note'] = popup.querySelector(".note-input").value

    chrome.runtime.sendMessage(msg, function (response) {
        div_note_action = document.getElementById(response['facebook'])
        btn_remove = div_note_action.querySelector('[actioned="remove"]')
        btn_remove.setAttribute("remove-id", response['contact_id'])
        btn_remove.onclick = () => {
            removeNote(response['contact_id'])
        }

        response['msg'] = "noteChanged"
        chrome.runtime.sendMessage(response)
    })


}


function removeNote(contact_id) {
    var msg = JSON.parse(window.localStorage.getItem("user_info"))
    if (!msg) {
        var msg = getUserInfo();
    }
    msg['msg'] = "removeNoteApi"
    msg['id'] = contact_id
    chrome.runtime.sendMessage(msg, function (response) {
        var div_contact_info = document.getElementById(response.facebook)

        if (div_contact_info) {
            div_contact_info.querySelector("span").style.backgroundColor = ''
            div_contact_info.querySelector("span").textContent = ''
        }
        response['msg'] = "removeNoteSocket"
        chrome.runtime.sendMessage(response)
    })
}


chrome.runtime.onMessage.addListener(function (msg, sender, response) {

    if (msg.msg == "editNote") {
        const contact_div = document.getElementById(msg.facebook)
        if (contact_div) {
            var btn_remove = contact_div.querySelector('[actioned="remove"]')
            btn_remove.setAttribute("remove-id", msg.contact_id)
            btn_remove.addEventListener("click", () => {
                removeNote(msg.contact_id)
            })
            const note = contact_div.querySelector("span")
            note.style.backgroundColor = msg.color
            note.textContent = msg.note
            if (msg.note.length > 0) {
                note.style.borderRadius = "4px"
            } else {
                note.style.borderRadius = "8px"

            }
        };

        var data = JSON.parse(window.localStorage.getItem("facebook_data"));
        if (data) {
            var contacts = data['contacts']
            contacts[msg.facebook] = {
                'id': msg['contact_id'],
                'name': msg['name'],
                'address': msg['address'],
                'phone': msg['phone'],
                'zalo': msg['zalo'],
                'telegram': msg['telegram'],
                'facebook': msg['facebook'],
                'note': msg['note'],
                'color': msg['color'],
                'image': msg['image']
            };
            window.localStorage.setItem("facebook_data", JSON.stringify(data))
        } else {
            var msg = getUserInfo();
            msg['msg'] = "getData"
            chrome.runtime.sendMessage(msg, function (response) {
                const data = response['facebook_data']
                window.localStorage.setItem("facebook_data", JSON.stringify(data))
            })
        }
    } else if (msg.msg == "deleteNote") {
        var div_contact_info = document.getElementById(msg.facebook)
        if (div_contact_info) {
            div_contact_info.querySelector("span").style.backgroundColor = ''
            div_contact_info.querySelector("span").textContent = ''
        }
        var data = JSON.parse(window.localStorage.getItem("facebook_data"));
        if (data) {
            delete data["contacts"][msg.facebook]
            window.localStorage.setItem("facebook_data", JSON.stringify(data))
        }else{
            var msg = getUserInfo();
            msg['msg'] = "getData"
            chrome.runtime.sendMessage(msg, function (response) {
                window.localStorage.setItem("facebook_data", JSON.stringify(response['facebook_data']))
            })
        }

    }
});