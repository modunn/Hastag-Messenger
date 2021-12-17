


// var css = '.edit_tag ,.remove_tag {border: none;background: transparent;display: block;outline: unset;height:30px}button:focus {outline: none;}button:hover {background-color: #3aad1a;}';
// var style = document.createElement('style')
// style.innerText = css
// style.rel = 'stylesheet'; 



// document.head.appendChild(style)

function createTag(parent_tag) {
    var tag = document.createElement('div')
    var uid = parent_tag.href.split('t/')[1].split('/')[0]
    tag.style.cssText = 'display:flex;z-index:999999;margin:0 10px;min-width:130px;height:30px;background-color:#5AD539 ;border-radius:15px;border:none; align-items: center;justify-content: space-between'

    tag.id = 'tag_' + uid
    parent_tag.appendChild(tag)

    var notes = document.createElement('span')
    notes.className = 'tag_name'
    notes.style.cssText = 'padding-left:20px;font-size: 14px;font-weight: 500;color: white;padding-right:30px'
    notes.innerHTML = uid
    tag.appendChild(notes)

    var action_tag = document.createElement('div')
    action_tag.className ='aciton_tag'
    action_tag.style.paddingRight ='20px'


    var edit_tag = document.createElement('button')
    edit_tag.className = 'edit_tag'

    edit_tag.style.cssText = 'border:none;background:transparent;color:white;font-size:18px;font-weight:bold;'
    edit_tag.innerText ='✍🏻'
    edit_tag.style.cursor ='pointer'
    edit_tag.onclick = function(){
        document.getElementById(tag.id).style.backgroundColor ='blue'
        
    }
    action_tag.appendChild(edit_tag)

    

    // var remove_tag = document.createElement('button')
    // remove_tag.className = 'remove_tag'
    // remove_tag.style.cssText = 'border:none;background:transparent;color:white;font-size:18px;font-weight:bold;'
    // remove_tag.innerText ='🗑︎'
    // remove_tag.style.cursor ='pointer'
    // remove_tag.onclick = function(){
    //     console.log(tag.id)
    //     document.getElementById(tag.id).remove()
        
    // }

    // action_tag.appendChild(remove_tag)


    tag.appendChild(action_tag)

    parent_tag.appendChild(document.createElement('hr'))
}


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