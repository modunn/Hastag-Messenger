function getCookie(name) {
    function escape(s) { return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, '\\$1'); }
    var match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape(name) + '=([^;]*)'));
    return match ? match[1] : null;
}


chrome.runtime.sendMessage({ name: "login", user_id: getCookie('c_user') }, function(response){
    window.localStorage.setItem("login", JSON.stringify(response['message']));
})

chrome.runtime.sendMessage({ name: "getData", user_id: getCookie('c_user') }, function(response){
    window.localStorage.setItem("data", JSON.stringify(response));
})






var css = '@media screen and (max-width: 900px) {\
            .hastag_msg{\
                width:56px;\
                height:30px;\
                border-radius:15px\
            }\
            .tag_name {display:none}\
            }';
var style = document.createElement('style')
style.innerText = css
style.rel = 'stylesheet';
style.type = 'text/css'


document.head.appendChild(style)

function createTag(parent_tag) {
    var tag = document.createElement('div')
    var uid = parent_tag.href.split('t/')[1].split('/')[0]


    tag.style.cssText = 'display:flex;\
                        z-index:999999;\
                        margin: 0 10px;\
                        min-width:56px;\
                        min-height:30px;\
                        background-color:#5AD539 ;\
                        border-radius:20px;\
                        border:none;\
                        align-items: center;\
                        justify-content: space-between;\
                        box-shizing:boder-box;'
    tag.className = 'hastag_msg'
    tag.id = 'tag_' + uid
    //add tag vào tin nhắn
    parent_tag.appendChild(tag)

    //add ghi chú vào tag
    var notes = document.createElement('label')
    notes.className = 'tag_name'
    notes.style.cssText = '\
                        max-width:240px;\
                        font-size: 13px;\
                        font-weight: 500;\
                        color: white;\
                        position: relative;\
                        padding:5px 30px 5px 20px;'

                            
    let textInt = setInterval(()=>{
        var meta1 = JSON.parse(window.localStorage.getItem("data"));
        if (meta1!=undefined || meta1 != null){
            if (meta1[uid]){
            notes.innerHTML = meta1[uid].text
            tag.style.backgroundColor = meta1[uid].color
            clearInterval(textInt)
            
        }else {
            notes.innerHTML = uid
            clearInterval(textInt)
        }
        
        
    }},100)
    tag.appendChild(notes)

    var action_tag = document.createElement('div')
    action_tag.className = 'aciton_tag'
    action_tag.style.cssText = 'text-align:center;align-items:center;display:flex,justify-content:center;'

    //add nút sửa ghi chú vào tag
    var edit_tag = document.createElement('button')
    edit_tag.className = 'edit_tag'
    edit_tag.style.cssText = 'padding-bottom:5px;border-radius:15px;width:30px;height:30px;text-align:center'
    edit_tag.innerText = '✍🏻'
    edit_tag.style.cursor = 'pointer'


    edit_tag.onclick = function () {
        createPopupEditTag(tag)
    }
    action_tag.appendChild(edit_tag)


    tag.appendChild(action_tag)


    //add thẻ ngân cách phân biệt giữa các tin nhắn
    parent_tag.appendChild(document.createElement('hr'))
}

function createPopupEditTag(tag = null) {
    var edit_popup = document.createElement('div')

    edit_popup.id = tag.id.replace('tag_','')
    edit_popup.className = 'edit_popup'
    edit_popup.style.cssText = '\
                    width: 250px; \
                    height: 70px; \
                    background-color: rgb(255, 255, 255); \
                    position: absolute; \
                    border-radius:2px; \
                    border-top:3px solid #0084FF;\
                    display: flex; \
                    text-align: center; \
                    align-items: center; \
                    justify-content: space-evenly;\
                    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;\
                    '

    var pos = tag.getBoundingClientRect()
    var x = pos.width + 3
    var y = pos.top - 67
    console.log(x, y)
    edit_popup.style.top = y + 'px'
    edit_popup.style.left = x + 'px'


    var edit_tagname = document.createElement('input')
    edit_tagname.type = 'text'
    edit_tagname.className = 'edit_tagname'
    edit_tagname.id = 'edit_tagname'
    // edit_tagname.maxLength ='35'

    edit_tagname.value = tag.querySelector('label').innerHTML
    edit_tagname.addEventListener("input", (e) => {
        tag.querySelector('label').innerHTML = e.target.value;
    }, false);


    edit_tagname.style.cssText = 'z-index:99999;\
                                width: 180px;\
                                height: 30px;\
                                padding: 0px;\
                                border-radius: 5px;\
                                box-sizing: border-box;\
                                border:1px solid #0084FF;\
                                padding: 5px;'
    edit_popup.appendChild(edit_tagname)

    var color_tag = document.createElement('input')
    color_tag.type = "color"
    color_tag.id = "pick_color"
    color_tag.className = 'pick_color'
    color_tag.style.cssText = 'height:30px;width:30px'

    color = tag.style.backgroundColor
    color_tag.value = '#' + color.substr(4, color.indexOf(')') - 4).split(',').map((color) => String("0" + parseInt(color).toString(16)).slice(-2)).join('');
    color_tag.addEventListener("input", (e) => {
        tag.style.backgroundColor = e.target.value;
    }, false);




    edit_popup.appendChild(color_tag)

    document.body.appendChild(edit_popup)


}

window.localStorage.setItem('len', 0)
setInterval(function () {
    var list_msg = document.getElementsByClassName('rpm2j7zs k7i0oixp gvuykj2m j83agx80 cbu4d94t ni8dbmo4 du4w35lb q5bimw55 ofs802cu pohlnb88 dkue75c7 mb9wzai9 d8ncny3e buofh1pr g5gj957u tgvbjcpo l56l04vs r57mb794 kh7kg01d eg9m0zos c3g1iek1 l9j0dhe7 k4xni2cv')[0]
    if (list_msg) {
        clearInterval()
        
        list_msg.addEventListener('scroll', (event) => setInterval(function () {
            var parent_tag = document.getElementsByClassName('ue3kfks5')
            
            for (i = len; parent_tag.length; i++) {
                try {
                    var uid = document.getElementById('tag_' + parent_tag[i].href.split('t/')[1].split('/')[0])
                    if (uid === null) {
                        createTag(parent_tag[i])
                        clearInterval()
                    }
                } catch {
                    window.localStorage.setItem('len', i)
                    break
                }
            }
        }), 100)
        clearInterval()
    }
}, 100)

window.addEventListener("load", (event) => setInterval(function () {
    var parent_tag = document.getElementsByClassName('ue3kfks5')
    for (i = 0; parent_tag.length; i++) {
        try {
            var uid = document.getElementById('tag_' + parent_tag[i].href.split('t/')[1].split('/')[0])
            if (uid === null) {
                createTag(parent_tag[i])
                clearInterval()
            }
        } catch {
            break
        }
    }
}), 100)

window.addEventListener('mouseup', e => {
    var close_popup = document.getElementsByClassName('edit_popup')[0]

    if (close_popup && e.target != close_popup && e.target.parentNode != close_popup) {
        close_popup.remove()
        var note = close_popup.querySelector('input').value
        var color = close_popup.querySelector('#pick_color').value
        chrome.runtime.sendMessage({name:"edit",user_id:getCookie('c_user'), id:close_popup.id,text: note,color:color }, (response) => {
            //Wait for Response
            console.log(response)
        
        });
    }
})


//Send Message To Background





