



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

    const user = document.querySelector('#user').textContent

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
            user: user,
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
    const username = document.querySelector('#accountName').value
    const user = document.querySelector('#user').textContent
    const options = {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            user: user,
            name: username
        })
    }
    const response = await fetch('/api/update-name', options)
    const data = await response.json()

    const showName = document.querySelector(".user-name")
    showName.textContent = username


    if (data.code == 0) {
        messageBox('check','Đổi tên thành công')

    } else {
        messageBox('error','Có lỗi xảy ra')

    }

    console.log(data)
}







