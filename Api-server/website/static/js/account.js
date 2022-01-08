



const btnChangePass = document.querySelector("#change-password")
const xChangePass = document.querySelector(".card-btn-x")
const popupPassword = document.querySelector('#popup-password')
const updatePassBtn = document.querySelector('#update-password')


popupPassword.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
        showPopupPassword()
    }
})


xChangePass.addEventListener('click', showPopupPassword)
btnChangePass.addEventListener('click', showPopupPassword)

function showPopupPassword() {
    popupPassword.classList.toggle('popup-activate')
}

updatePassBtn.addEventListener('click', changePassword)

async function changePassword() {


    const currentPassword = document.querySelector("#oldPassword").value

    const newPassword = document.querySelector("#newPassword").value

    const reNewPassword = document.querySelector("#reNewPassword").value


    if (reNewPassword != newPassword) {
        messageBox('error','Nhập lại mật khẩu không chính xác')
        return
    }

    const options = {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: username,
            password: currentPassword,
            new_password: reNewPassword
        })
    }
    const response = await fetch('/api/update-password', options)
    const data = await response.json()
    if (data.code === 1) {
        messageBox('error','Mật khẩu cũ không chính xác')
        return
    }
    messageBox('check','Đổi mật khẩu thành công')

    return



}



const btnUpdateAccount = document.querySelector("#update-account")

btnUpdateAccount.addEventListener('click', changeAccountName)


async function changeAccountName() {
    const name = document.querySelector('#accountName').value
    const options = {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: username,
            name: name
        })
    }
    const response = await fetch('/api/update-name', options)
    const data = await response.json()

    const showName = document.querySelector(".user-name")
    showName.textContent = name


    if (data.code == 0) {
        messageBox('check','Đổi tên thành công')

    } else {
        messageBox('error','Có lỗi xảy ra')

    }

    console.log(data)
}


const uploadAvtBtn= document.querySelector('#update-avt-btn')
uploadAvtBtn.addEventListener('change',uploadAvartar)
async function uploadAvartar(){
    let photo = document.getElementById("upload-avartar").files[0];
    if (!photo)return
    const avartar = document.querySelector(".card-avartar")
    const data = new FormData()
    data.append('files',photo)
    data.append('filename' ,photo.name)
    data.append('user',user)
    console.log(data.get('files'))
    
    const response = await uploadAvt(data)

    document.querySelector('.avartar').src= 'data:image/png;base64, '+response.image_base64;
    avartar.src = 'data:image/png;base64, '+response.image_base64;
    messageBox('check','Thay đổi ảnh đại diện thành công')
}

async function uploadAvt(data) {
    const options = {
        method: 'POST',
        body: data
    }
    const response = await fetch('/api/upload',options)
    const json = await response.json()
    console.log(json)
    return json
}


