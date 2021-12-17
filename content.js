


var css = '@media screen and (max-width: 900px) {.hastag_msg{width:55px;}.tag_name {display:none}}';
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
                        margin:0 10px;\
                        min-width:130px;\
                        height:30px;\
                        background-color:#5AD539 ;\
                        border-radius:15px;border:none;\
                        align-items: center;\
                        justify-content: space-between;\
                        box-shizing:boder-box;'
    tag.className ='hastag_msg'
    tag.id = 'tag_' + uid
    //add tag vào tin nhắn
    parent_tag.appendChild(tag)

    //add ghi chú vào tag
    var notes = document.createElement('label')
    notes.className = 'tag_name'
    notes.style.cssText = 'padding-left:20px;\
                        font-size: 14px;\
                        font-weight: 500;\
                        color: white;\
                        padding-right:30px'
    notes.innerHTML = uid
    tag.appendChild(notes)

    var action_tag = document.createElement('div')
    action_tag.className ='aciton_tag'
    action_tag.style.cssText ='text-align:center;align-items:center;display:block'

    //add nút sửa ghi chú vào tag
    var edit_tag = document.createElement('button')
    edit_tag.className = 'edit_tag'
    edit_tag.style.cssText = 'line-height:20px;padding-bottom:5px;border-radius:15px'
    edit_tag.innerText ='✍🏻'
    edit_tag.style.cursor ='pointer'
    edit_tag.onclick = function(){
        document.getElementById(tag.id).style.backgroundColor ='blue'
        
    }
    action_tag.appendChild(edit_tag)

    
    tag.appendChild(action_tag)


    //add thẻ ngân cách phân biệt giữa các tin nhắn
    parent_tag.appendChild(document.createElement('hr'))
}

function createPopupEditTag() {
    var edit_popup = document.createElement('div')
    edit_popup.className ='edit_popup'
    edit_popup.style.cssText = 'width: 250px; \
                    height: 50px; \
                    background-color: rgb(255, 255, 255); \
                    position: absolute; \
                    top: 170px; \
                    left: 327px; \
                    border-radius:2px; \
                    border-top:3px solid #0084FF;\
                    display: flex; text-align: center; \
                    align-items: center; \
                    justify-content: space-evenly;\
                    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;'
    document.body.appendChild(edit_popup)

    var edit_tagname = document.createElement('input')
    edit_tagname.type='text'
    edit_tagname.className ='edit_tagname'
    edit_tagname.id ='edit_tagname'
    edit_tagname.value = 'Mundo 12345678910'
    edit_tagname.style.cssText = 'width: 180px;\
                                 height: 30px;\
                                 padding: 0px;\
                                 border-radius: 5px;\
                                 box-sizing: border-box;\
                                 padding: 5px;'
    edit_popup.appendChild(edit_tagname)

    var color_tag = document.createElement('input')
    color_tag.type="color" 
    color_tag.id="pick_color"
    color_tag.className = 'pick_color'
    color_tag.style.cssText ='height:30px;width:30px'
    edit_popup.appendChild(color_tag)

}createPopupEditTag()



setInterval(function () {
    var list_msg = document.getElementsByClassName('rpm2j7zs k7i0oixp gvuykj2m j83agx80 cbu4d94t ni8dbmo4 du4w35lb q5bimw55 ofs802cu pohlnb88 dkue75c7 mb9wzai9 d8ncny3e buofh1pr g5gj957u tgvbjcpo l56l04vs r57mb794 kh7kg01d eg9m0zos c3g1iek1 l9j0dhe7 k4xni2cv')[0]
    if (list_msg) {

        list_msg.addEventListener('scroll', (event) => setInterval(function () {
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
        clearInterval()
    }
}, 100)