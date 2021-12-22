function getCookie(name) {
    function escape(s) { return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, '\\$1'); }
    var match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape(name) + '=([^;]*)'));
    return match ? match[1] : null;
}
var user_id =  getCookie('c_user')

chrome.runtime.sendMessage({ name: "login", user_id: user_id }, function (response) {
    window.localStorage.setItem("login", JSON.stringify(response['message']));
})

chrome.runtime.sendMessage({ name: "getData", user_id: user_id }, function (response) {
    window.localStorage.setItem("data", JSON.stringify(response));
})








var style = document.createElement('style')
style.innerText = '\
.edit_tagname:focus{\
    outline: 1px solid #C7EEFF;\
    box-shadow: rgba(0, 0, 0, 0.1) -4px 9px 25px -6px;\
}\
@media screen and (max-width: 900px) {\
    .hastag_msg{\
        width:56px;\
        border-radius:15px\
    }\
    .tag_name {display:none}\
    .edit_tag {display:none}\
    }';
style.rel = 'stylesheet';
style.type = 'text/css'


document.head.appendChild(style)

function createTag(parent_tag) {
    var tag = document.createElement('div')
    var uid = parent_tag.parentNode.parentNode.parentNode.href.split('t/')[1].split('/')[0]


    tag.style.cssText = 'display:flex;\
                        z-index:999999;\
                        margin: 7px 0 0 0;\
                        min-width:56px;\
                        max-width:232px;\
                        min-height:20px;\
                        background-color:transparent;\
                        border-radius:10px;\
                        border:none;\
                        align-items: center;\
                        justify-content: space-between;\
                        box-shizing:boder-box;\
                        '
    tag.className = 'hastag_msg'
    tag.id = 'tag_' + uid
    //add tag vào tin nhắn
    parent_tag.appendChild(tag)

    //add ghi chú vào tag
    var notes = document.createElement('label')
    notes.className = 'tag_name'
    notes.style.cssText = '\
                        max-width:225px;\
                        font-size: 12px;\
                        font-weight: 500;\
                        color: white;\
                        position: relative;\
                        padding:0px 15px 2px 15px;'


    let textInt = setInterval(() => {
        var meta1 = JSON.parse(window.localStorage.getItem("data"));
        if (meta1) {
            clearInterval(textInt)
            if (meta1[uid]) {
                notes.innerHTML = meta1[uid].text
                tag.style.backgroundColor = meta1[uid].color
            }
        }
    }, 50)
    tag.appendChild(notes)

    var action_tag = document.createElement('div')
    action_tag.className = 'aciton_tag'
    action_tag.style.cssText = 'text-align:center;align-items:center;display:flex,justify-content:center;'

    //add nút sửa ghi chú vào tag
    var edit_tag = document.createElement('button')
    edit_tag.className = 'edit_tag'
    edit_tag.style.cssText = 'border-radius:10px;\
                            width:50px;\
                            height:20px;\
                            font-size:12px;\
                            padding-bottom:2px;\
                            background-color:black;\
                            color:white;\
                            border:none;\
                            z-index:1;\
                            font-weight:bold;'
    edit_tag.innerText = 'Edit'
    edit_tag.style.cursor = 'pointer'


    edit_tag.onclick = function () {
        createPopupEditTag(tag)
    }
    action_tag.appendChild(edit_tag)


    tag.appendChild(action_tag)


    //add thẻ ngân cách phân biệt giữa các tin nhắn
    // parent_tag.appendChild(document.createElement('hr'))
}

function createPopupEditTag(tag = null) {


    var edit_popup = document.createElement('div')

    edit_popup.id = tag.id.replace('tag_', '')
    edit_popup.className = 'edit_popup'
    edit_popup.style.cssText = '\
                    width: 350px; \
                    height: 90px; \
                    background-color: rgb(255, 255, 255); \
                    position: absolute; \
                    border-radius:5px; \
                    display: flex;\
                    flex-direction:column;\
                    padding:15px 0;\
                    background-color:#f3f3f5; \
                    text-align: center; \
                    align-items: center; \
                    justify-content: space-evenly;\
                    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;\
                    '

    var pos = tag.getBoundingClientRect()
    var x = pos.width + 3
    var y = pos.top - 107
    edit_popup.style.top = y + 'px'
    edit_popup.style.left = x + 'px'


    var edit_tagname = document.createElement('input')
    edit_tagname.type = 'text'
    edit_tagname.className = 'edit_tagname'
    edit_tagname.id = 'edit_tagname'
    // edit_tagname.maxLength ='35'
    edit_tagname.placeholder = 'Nhập nội dung cần ghi chú'
    edit_tagname.value = tag.querySelector('label').innerHTML
    edit_tagname.addEventListener("input", (e) => {
        tag.querySelector('label').innerHTML = e.target.value;
    }, false);


    edit_tagname.style.cssText = 'z-index:99999;\
                                height: 30px;\
                                width:80%;\
                                padding: 0px;\
                                border-radius: 15px;\
                                box-sizing: border-box;\
                                border:none;\
                                ouline:none;\
                                padding: 5px 10px;'
    edit_popup.appendChild(edit_tagname)

    var div_color = document.createElement('div')
    div_color.style.cssText = 'background-color: transparent; min-width: 80%; height: 30px; display: flex; justify-content: space-between;'

    var defaut_color = ['#ab68ca', '#3a58f0', '#d62f45', '#2ebf5e', '#fcba03']

    for (color of defaut_color) {
        var btn_color = document.createElement('button')
        btn_color.style.cssText = 'width:30px;height:30px;border:none;border-radius:4px;'
        btn_color.style.backgroundColor = color
        btn_color.id = color
        btn_color.onclick = function () {
            var pick_color = this.id
            tag.style.backgroundColor = pick_color
            document.getElementById('pick_color').value = pick_color
        }

        div_color.appendChild(btn_color)
    }

    var color_tag = document.createElement('input')
    color_tag.type = "color"
    color_tag.id = "pick_color"
    color_tag.className = 'pick_color'
    color_tag.style.cssText = 'height:30px;width:30px;border-radius:4px'

    color = tag.style.backgroundColor
    color_tag.value = '#' + color.substr(4, color.indexOf(')') - 4).split(',').map((color) => String("0" + parseInt(color).toString(16)).slice(-2)).join('');
    color_tag.addEventListener("input", (e) => {
        tag.style.backgroundColor = e.target.value;
    }, false);




    div_color.appendChild(color_tag)
    edit_popup.appendChild(div_color)


    document.body.appendChild(edit_popup)


}

let scroll_itv = setInterval(function () {
    var list_msg = document.getElementsByClassName('rpm2j7zs k7i0oixp gvuykj2m j83agx80 cbu4d94t ni8dbmo4 du4w35lb q5bimw55 ofs802cu pohlnb88 dkue75c7 mb9wzai9 d8ncny3e buofh1pr g5gj957u tgvbjcpo l56l04vs r57mb794 kh7kg01d eg9m0zos c3g1iek1 l9j0dhe7 k4xni2cv')[0]
    if (list_msg) {
        clearInterval(scroll_itv)
        list_msg.addEventListener('scroll', (event) => setInterval(function () {
            // var parent_tag = document.getElementsByClassName('ue3kfks5')
            var parent_tag = document.getElementsByClassName('gs1a9yip ow4ym5g4 auili1gw rq0escxv j83agx80 cbu4d94t buofh1pr g5gj957u i1fnvgqd oygrvhab cxmmr5t8 hcukyx3x kvgmc6g5 tgvbjcpo hpfvmrgz rz4wbd8a a8nywdso l9j0dhe7 du4w35lb rj1gh0hx')

            if (parent_tag.length) { 
                clearInterval() 
            }
            for (tag of parent_tag) {
                if (tag.parentNode.parentNode.parentNode.href) {
                    var uid = document.getElementById('tag_' + tag.parentNode.parentNode.parentNode.href.split('t/')[1].split('/')[0])
                    if (uid == null) {
                        createTag(tag)
                    } else { break }
                }
            }
        }), 100)

    }
}, 100)

window.addEventListener("load", (event) => setInterval(function () {
    // var parent_tag = document.getElementsByClassName('ue3kfks5')
    var parent_tag = document.getElementsByClassName('gs1a9yip ow4ym5g4 auili1gw rq0escxv j83agx80 cbu4d94t buofh1pr g5gj957u i1fnvgqd oygrvhab cxmmr5t8 hcukyx3x kvgmc6g5 tgvbjcpo hpfvmrgz rz4wbd8a a8nywdso l9j0dhe7 du4w35lb rj1gh0hx')

    if (parent_tag.length) { 
        clearInterval() 
    }
    for (tag of parent_tag) {
        if (tag.parentNode.parentNode.parentNode.href) {
            var uid = document.getElementById('tag_' + tag.parentNode.parentNode.parentNode.href.split('t/')[1].split('/')[0])
            if (uid === null) {
                createTag(tag)
                clearInterval()
            }
        }
    }
}), 100)

window.addEventListener('mouseup', e => {
    var close_popup = document.getElementsByClassName('edit_popup')[0]
    if (close_popup) {
        var close_popup_tiny = close_popup.querySelector('div')
    }
    if (close_popup && e.target != close_popup && e.target.parentNode != close_popup && e.target.parentNode != close_popup_tiny) {
        close_popup.remove()
        var note = close_popup.querySelector('input').value
        var color = close_popup.querySelector('#pick_color').value
        chrome.runtime.sendMessage({ name: "edit", user_id:user_id, id: close_popup.id, text: note, color: color }, (response) => {
            //Wait for Response
            console.log(response)

        });
    }
})


//Send Message To Background





