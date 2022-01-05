
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

    const message = document.querySelector('.card-message')

    message.style.display = 'block'
    if (reNewPassword != newPassword) {

        message.innerHTML = '\
                    <div class="card-message-body card-center">\
                        <div class="card-message-icon card-center" style="color:red">\
                            <i class="bx bxs-error-circle"></i>\
                        </div>\
                        <div class="card-message-text card-center">\
                            <span>Nhập lại mật khẩu không chính xác</span>\
                        </div>\
                    </div>\
                    '
        let intId = setInterval(() => {
            message.style.display = 'none'
            clearInterval(intId)
        }, 2000)

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
        message.innerHTML = '\
                    <div class="card-message-body card-center">\
                        <div class="card-message-icon card-center" style="color:red">\
                            <i class="bx bxs-error-circle"></i>\
                        </div>\
                        <div class="card-message-text card-center">\
                            <span>Mật khẩu cũ không chính xác</span>\
                        </div>\
                    </div>\
                    '
        let intId = setInterval(() => {
            message.style.display = 'none'
            clearInterval(intId)
        }, 2000)
        return
    }
    message.innerHTML = '\
    <div class="card-message-body card-center">\
        <div class="card-message-icon card-center" style="color:#0dab32;">\
            <i class="bx bxs-check-circle"></i>\
        </div>\
        <div class="card-message-text card-center">\
            <span>Đổi mật khẩu thành công</span>\
        </div>\
    </div>\
    '
    let intId = setInterval(() => {
        message.style.display = 'none'
        clearInterval(intId)
    }, 2000)
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

    const message = document.querySelector('.card-message')

    message.style.display = 'block'
    if (data.code == 0) {
        message.innerHTML = '\
                    <div class="card-message-body card-center">\
                        <div class="card-message-icon card-center" style="color: #0dab32;">\
                            <i class="bx bxs-check-circle"></i>\
                        </div>\
                        <div class="card-message-text card-center">\
                            <span>Update thành công</span>\
                        </div>\
                    </div>\
                    '

        let intId = setInterval(() => {
            message.style.display = 'none'
            clearInterval(intId)
        }, 2000)
    } else {
        message.innerHTML = '\
                    <div class="card-message-body card-center">\
                        <div class="card-message-icon card-center" style="color: red;">\
                            <i class="bx bxs-error-circle"></i>\
                        </div>\
                        <div class="card-message-text card-center">\
                            <span>Có lỗi xảy ra</span>\
                        </div>\
                    </div>\
                    '
        let intId = setInterval(() => {
            const messageChild = message.querySelector('.card-message-body')
            message.style.display = 'none'
            message.remove(messageChild)
            clearInterval(intId)
        }, 2000)
    }

    console.log(data)
}







