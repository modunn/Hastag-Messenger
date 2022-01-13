


const inputOpacityhNote = document.querySelector("#opacity-note")
inputOpacityhNote.addEventListener("input", (e) => {
    document.querySelector("#note-opacity-value").textContent = e.target.value + "%";
})

const saveBtn = document.querySelector("#save-btn")
saveBtn.addEventListener('click', handleNotes)

const pickColors = document.querySelectorAll('.pick-color')
pickColors.forEach(color=> {
    color.addEventListener('input', () => {
        color.parentNode.value = color.value
        color.parentNode.style.backgroundColor = color.value
    })
})

// Get dữ liệu custom note
function dataNotes() {
    const colorDefault = []

    const colorBtns = document.querySelectorAll('#color-default button')
    const opacityNote = document.querySelector('#opacity-note').value
    colorBtns.forEach(color => {
        colorDefault.push(color.value)
    })
    return {
        username: username,
        color_default: colorDefault,
        opacity: opacityNote
    }
}

async function handleNotes() {
    FormData = dataNotes()
    const options = {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(FormData)
    }
    const response = await fetch('/api/edit-style', options)
    const data = await response.json()
    const notiMsg = document.querySelector(".card-notification")
    const notiMsgText = document.querySelector(".card-notification-text")
    notiMsg.style.display = 'block'
    if (data.code==0) {
        notiMsgText.innerText ='Lưu thành công!'
    }else {
        notiMsgText.innerText ='Có lỗi xảy ra!'
    }
    
    let int = setInterval(()=>{
        notiMsg.style.display = 'none'
        clearInterval(int)
    },1000)
    console.log(data)

}