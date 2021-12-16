

var link = document.createElement('link'); 
link.rel = 'stylesheet'; 
link.type = 'text/css';
link.href = 'https://pro.fontawesome.com/releases/v5.10.0/css/all.css'; 
link.integrity = 'sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p'
link.crossorigin ='anonymous' 


var css = '.edit_tag ,.remove_tag {border: none;background: transparent;display: inline-block;outline: unset;padding: 0px 2px 2px 2px;}button:focus {outline: none;}button:hover {background-color: #3aad1a;}';
var style = document.createElement('style')
style.innerText = css
style.type = 'text/css' 
style.rel = 'stylesheet'; 



document.head.appendChild(style)
document.head.appendChild(link); 

function createTag(parent_tag) {
    var tag = document.createElement('div')
    var uid = parent_tag.href.split('t/')[1].split('/')[0]
    tag.style.cssText = 'dislay:flex;z-index:999;margin:0 10px;min-width:130px;height:30px;background-color:#5AD539 ;border-radius:15px;border:none; align-items: center;justify-content: center;'

    tag.id = 'tag_' + uid
    parent_tag.appendChild(tag)

    var notes = document.createElement('span')
    notes.className = 'tag_name'
    notes.style.cssText = 'font-size: 14px;font-weight: 500;color: white;padding: 0px 10px 2px 20px;line-height:30px;text-align:left'
    notes.innerHTML = uid
    tag.appendChild(notes)



    var edit_tag = document.createElement('button')
    edit_tag.className = 'edit_tag'
    edit_tag.innerHTML = '<i class="fa fa-trash-o" aria-hidden="true"></i>';
    tag.appendChild(edit_tag)

    var remove_tag = document.createElement('button')
    remove_tag.className = 'remove_tag'
    remove_tag.innerHTML = '<i class="fa fa-trash-o" aria-hidden="true"></i>';

    tag.appendChild(remove_tag)


    parent_tag.appendChild(document.createElement('hr'))
}

var list_msg = document.getElementsByClassName('rpm2j7zs k7i0oixp gvuykj2m j83agx80 cbu4d94t ni8dbmo4 du4w35lb q5bimw55 ofs802cu pohlnb88 dkue75c7 mb9wzai9 d8ncny3e buofh1pr g5gj957u tgvbjcpo l56l04vs r57mb794 kh7kg01d eg9m0zos c3g1iek1 l9j0dhe7 k4xni2cv')[0]

list_msg.addEventListener('scroll', (event) => setInterval(function() {
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
}),100)