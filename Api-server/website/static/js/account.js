



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
    if (currentPassword.length == 0 ||  newPassword.length == 0 || reNewPassword.length == 0) {
        messageBox("error","Bạn phải điền đầy đủ thông tin")
        return
    }

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
    if (name.length < 4 ) {
        messageBox('error','Tên người dùng quá ngắn')
        return
    }
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


const btnUpdateIdFacebook = document.querySelector("#update-facebook_id")
btnUpdateIdFacebook.addEventListener('click',connectFacebook)

async function connectFacebook() {
    const facebook_id = document.querySelector("#accountfacebook_id").value
    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({ username: username ,facebook_id:facebook_id})
    }
    const response = await fetch('/api/edit-facebook', options)
    const json = await response.json()
    if (json.code != 0) {
        messageBox('error',json.msg)
    }
    messageBox('check',json.msg)
}



document.querySelector("#remove-user").addEventListener("click",()=>{
    if (confirm('Xóa tài khoản đồng nghĩa với việc xóa bỏ toàn bộ dữ liệu của tài khoản, bạn chắc chắn chứ ?')) {
        logout();
        removeUser();
        
    }
    
})
async function removeUser() {
    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username })
    }
    const response = await fetch('/api/remove-user', options)
    const json = await response.json()
    if (json.code != 0) {
        messageBox('error',json.msg)
    }
    messageBox('check',json.msg)
    window.location.href = '/';
}
