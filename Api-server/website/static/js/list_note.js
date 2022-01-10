const table = document.querySelectorAll(".card-name");
const inputSearchingByName = document.querySelector("#search-user");

inputSearchingByName.addEventListener('input', SearchUser)
function SearchUser() {
    var a = 0
    var filter = inputSearchingByName.value.toUpperCase();
    for (let i = 0; i < table.length; i++) {
        var txtValue = table[i].textContent || table[i].innerText

        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            table[i].parentNode.parentNode.style.display = "";
        } else {
            table[i].parentNode.parentNode.style.display = "none";
        }

    }
}



const innderHtmlNewContactPopup = `
    <div class="card-arrow">
    </div>
    <div class="card-add-new-contact card-bordered"> 

        <div class="card-btn-x" style="right:13px">
            <i class='bx bxs-x-circle'></i>
        </div>
        <div class="new-contact-top">
            <div class="new-contact-image">
                <label class="edit-img-new-contact">
                    <input type="file" name="upload-avartar-contact" id="upload-avartar-contact"
                        style="display: none;" accept="image/*">
                    <i class='bx bx-camera'></i>
                </label>
                <div class="hidden-image">
                    <img src="/static/icon/user.png">
                </div>
            </div>
        </div>
        <div class="new-contact-bottom">
            <div class="new-contact-info">
                <div class="contact-input">
                    <div class="rename-icon">
                        <i class='bx bx-user-circle'></i>
                    </div>
                    <input type="text" id="contact-name" class="new-input" placeholder='Tên'>
                </div>
                <div class="contact-input">
                    <div class="rename-icon" id="notes">
                        <i class='bx bxs-bookmarks'></i>
                    </div>
                    <input type="text"  id="contact-note" class="new-input" placeholder='Ghi chú'>
                    <button class="card-btn card-btn-input">
                        <i class='bx bx-palette'></i>
                        <input type="color" class="pick-color" id="pick-color" title="chọn màu">
                    </button>
                </div>
                    <div class="contact-input">
                        <div class="rename-icon">
                            <i class='bx bx-location-plus'></i>
                        </div>
                        <input type="text" id="contact-address" class="new-input" placeholder='Địa chỉ'>
                    </div>
                    <div class="contact-input">
                        <div class="rename-icon">
                            <i class='bx bx-phone'></i>
                        </div>
                        <input type="text" id="contact-phone" class="new-input" placeholder='Số điện thoại'>
                    </div>
                    <div class="contact-input">
                        <div class="rename-icon">
                            <i class='bx bxl-facebook-square'></i>
                        </div>
                        <input type="text" id="contact-facebook" class="new-input" placeholder='facebook'>
                    </div>
                    <div class="contact-input">
                        <div class="rename-icon">
                            <i class='bx bxs-alarm-snooze'></i>
                        </div>
                        <input type="text" id="contact-zalo"class="new-input" placeholder='Zalo'>
                    </div>
                    <div class="contact-input">
                        <div class="rename-icon">
                            <i class='bx bxl-telegram'></i>
                        </div>
                        <input type="text" id="contact-telegram"class="new-input" placeholder='Telegram'>
                    </div>
                    <button class="card-btn card-btn-primary w-full" id="add-contact-btn" style="margin-top:10px">Thêm</button>
                </div>
            </div>
        </div>
  
`
function contactCard(data) {
    return `
    <div class="card-col card-bordered" card-data-id="${data['id']}">
    <div class="edit-card-hidden">
        <div class="card-edit-contact padding24 grid-2-row-auto">
            <div class="card-edit-contact-top">
                <div class="card-edit-img">
                    <div class="overlay"></div>
                    <img src="data:image/png;base64, ${data['image']}" alt="" id="img-contact-${data['id']}">
                    <label class="edit-btn">
                        <input type="file" name="upload-avartar-contact" id="edit-avartar-contact-${data['id']}"
                            style="display: none;" accept="image/*">
                        <i class='bx bxs-camera'></i>
                    </label>
                </div>
                <div class="card-edit-info">
                    <div class="contact-input">
                        <div class="rename-icon">
                            <i class='bx bx-user-circle'></i>
                        </div>
                        <input type="text" class="new-input" placeholder='Tên' value="${data['name']}" id="name-${data['id']}">
                    </div>
                    <div class="contact-input" style="color:${data['color']};" id="bookmarks-${data['id']}">
                        <div class="rename-icon">
                            <i class='bx bxs-bookmarks'></i>
                        </div>
                        <input type="text" class="new-input" placeholder='Ghi chú' value="${data['note']}" id="note-${data['id']}">
                        <button class="card-btn card-btn-input">
                            <i class='bx bx-palette'></i>
                            <input type="color" class="pick-color" title="chọn màu" value="${data['color']}" id="color-${data['id']}">
                        </button>
                    </div>
                    <div class="contact-input">
                        <div class="rename-icon">
                            <i class='bx bx-location-plus'></i>
                        </div>
                        <input type="text" class="new-input" placeholder='Địa chỉ' value="${data['address']}" id="address-${data['id']}">
                    </div>
                </div>
            </div>
            <div class="card-edit-contact-center">
                <div class="card-edit-info">
                    <div class="contact-input">
                        <div class="rename-icon">
                            <i class='bx bx-phone'></i>
                        </div>
                        <input type="text" class="new-input" placeholder='Số điện thoại' value="${data['phone']}" id="phone-${data['id']}">
                    </div>
                    <div class="contact-input">
                        <div class="rename-icon">
                            <i class='bx bxl-facebook-square'></i>
                        </div>
                        <input type="text" class="new-input" placeholder='facebook' value="${data['facebook']}" id="facebook-${data['id']}">
                    </div>
                    <div class="contact-input">
                        <div class="rename-icon">
                            <i class='bx bxs-alarm-snooze'></i>
                        </div>
                        <input type="text" class="new-input" placeholder='Zalo' value="${data['zalo']}" id="zalo-${data['id']}">
                    </div>
                    <div class="contact-input">
                        <div class="rename-icon">
                            <i class='bx bxl-telegram'></i>
                        </div>
                        <input type="text"  class="new-input" placeholder='Telegram' value="${data['telegram']}" id="telegram-${data['id']}">
                    </div>
                </div>
            </div>
            <div class="card-edit-contact-bottom">
                <button class="card-btn card-btn-primary" edit-id="${data['id']}">Lưu chỉnh sửa</button>
                <button class="card-btn card-btn-default">Quay lại</button>
                <button class="card-btn card-btn-dangerous absolute-btn" remove-id="${data['id']}">Xóa</button>
            </div>
        </div>
    </div>
    <div class="card-contact padding24">
        <div class="card-contact-img card-center card-mg-20">
            <img src="data:image/png;base64, ${data['image']}" 
            alt="Ảnh đại diện" 
            id="avartar-${data['id']}">
        </div>
        <h2 class="card-typography card-name text-nowrap" title="${data['name']}">
            <div class="card-color-circle" 
                style="background-color: ${data['color']};"
                id="card-color-circle-${data['id']}"></div>
            <span 
                class="text-nowrap" id="text-name-${data['id']}">${data['name']}</span>
        </h2>
        <span class="card-typography card-note text-nowrap" 
            title="${data['note']}"
            id="text-note-${data['id']}">
            ${data['note']}
        </span>

        <div class="card-col">
            <h2 class="card-typography card-title">
                Contact
            </h2>
            <div class="card-contact-info">
                <div class="card-col card-col-lg-24 text-nowrap" title="${data['address']}" >
                    <span>Địa chỉ: <strong class="text-nowrap" id="text-address-${data['id']}">${data['address']}</strong></span>
                </div>
                <div class="card-col card-col-lg-24 text-nowrap" title="${data['phone']}" >
                    <span>số điện thoại: </span>
                    <span><strong class="text-nowrap" id="text-phone-${data['id']}">${data['phone']}</strong></span>
                </div>
            </div>
            <h2 class="card-typography card-title">
                Social
            </h2>
            <div class="card-contact-social card-center">
                <a href="${data['telegram']}" class="telegram card-center" target="blank"
                    title="${data['telegram']}"
                    id="text-telegram-${data['id']}">
                    <i class='bx bxl-telegram'></i>
                </a>
            <a href="${data['zalo']}" 
                    class="phone card-center" 
                    target="blank" 
                    title="${data['zalo']}" 
                    id="text-zalo-${data['id']}">
                    <i class='bx bxs-alarm-snooze'></i>
                </a>
                <a href="https://facebook.com/${data['facebook']}" 
                    target="blank" 
                    class="facebook card-center"
                    title="${data['facebook']}"
                    id="text-facebook-${data['id']}">
                    <i class='bx bxl-facebook-square'></i>
                </a>
            </div>
        </div>
        <div class="card-action">
            <div class="card-col card-col-lg-24 card-padding-r-10">
                <button class="card-btn card-btn-primary w-full edit-card-btn"
                    id="edit-contact-btn-card-id-${data['id']}" data-id="card-id-${data['id']}">Chỉnh sửa</button>
            </div>
        </div>
    </div>
</div>
        `
}












const newContactDiv = document.querySelector('.new-contact-card')
const newContactBtn = document.querySelector('#new-contact-btn')
newContactBtn.addEventListener('click', showCardContact)

function showCardContact() {
    if (document.querySelector('.new-contact-top')) return
    newContactDiv.innerHTML = innderHtmlNewContactPopup
    document.querySelector(".card-btn-x").addEventListener('click', () => {
        newContactDiv.innerHTML = ''
    })

    document.querySelector('#upload-avartar-contact').onchange = () => {
        const img = document.querySelector('#upload-avartar-contact').files[0];
        document.querySelector(".hidden-image img").src = URL.createObjectURL(img)

    }

    const changeColor = document.querySelector('#pick-color')
    changeColor.addEventListener('input', () => {
        document.querySelector('#notes').style.color = changeColor.value
    })
    document.querySelector("#add-contact-btn").onclick = addNewContact


}

async function addNewContact() {
    const data = new FormData();
    const name = document.querySelector('#contact-name').value;
    if (!name) {
        messageBox('error', 'Tên không được để trống')
        return
    }

    const image = document.querySelector('#upload-avartar-contact').files[0];

    const note = document.querySelector('#contact-note').value;
    const address = document.querySelector('#contact-address').value;
    const phone = document.querySelector('#contact-phone').value;
    const facebook = document.querySelector('#contact-facebook').value;
    const zalo = document.querySelector('#contact-zalo').value;
    const telegram = document.querySelector('#contact-telegram').value;
    const color = document.querySelector('#pick-color').value


    data.append("image", image)
    data.append("username", username)
    data.append("name", name)
    data.append("note", note)
    data.append("address", address)
    data.append("phone", phone)
    data.append("facebook", facebook)
    data.append("zalo", zalo)
    data.append("telegram", telegram)
    data.append("color", color)


    const response = await fetchAddNewContact(data)
    if (!response.code == 0) return
    messageBox("check", response.msg)
    newContactDiv.innerHTML = ""
    document.querySelector('.card-grid-4-gap-20').insertAdjacentHTML("afterbegin", contactCard(response))
    const btnEditCard = document.querySelector(`#edit-contact-btn-card-id-${response.id}`)

    btnEditCard.addEventListener('click', () => {
        showContactEditCard(response.id)
    });
    const colorPicker = document.querySelector(`#color-${response.id}`)
    
    colorPicker.addEventListener('input',()=> {
        document.querySelector(`#bookmarks-${response.id}`).style.color = colorPicker.value
    });
}

async function fetchAddNewContact(data) {
    const options = {
        method: "POST",
        body: data
    }
    const response = await fetch('/api/add-contact', options)
    const json = await response.json()
    return json
}









function showContactEditCard(id) {
    const parent = document.querySelector(`[card-data-id='${id}']`)
    const editParent = parent.querySelector(".card-edit-contact")
    const backBtn = editParent.querySelector(".card-btn-default")
    const editBtn = document.querySelector(`[edit-id="${id}"]`)
    const removeBtn = document.querySelector(`[remove-id="${id}"]`)

    editParent.classList.toggle("show-card-edit")
    backBtn.onclick = () => {
        editParent.classList.toggle("show-card-edit")
    }
    editBtn.onclick = () => {
        conssole.log(this)
    }
    const image = document.querySelector(`#img-contact-${id}`)
    const editImg = document.querySelector(`#edit-avartar-contact-${id}`)
    editImg.onchange = () => {
        image.src = URL.createObjectURL(editImg.files[0])
    }
    editBtn.onclick = () => {
        editContact(editBtn.getAttribute("edit-id"))
    }
    removeBtn.onclick = () => {
        if (confirm('Bạn chắc chắn muốn xóa liên hệ (không thể khôi phục)')) {
            removeContact(id)
        }
    }
    removeBtn.onclick = () => {
        if (confirm('Bạn chắc chắn muốn xóa liên hệ (không thể khôi phục)')) {
            removeContact(id)
        }
    }

}




const btnEditCard = document.querySelectorAll(".edit-card-btn")
btnEditCard.forEach((btn) => {

    btn.addEventListener("click", () => {
        id = btn.getAttribute("data-id").split("-")[2];
        showContactEditCard(id)
    });
    const colorPicker = document.querySelector(`#color-${btn.getAttribute("data-id").split("-")[2]}`)
    
    colorPicker.addEventListener('input',()=> {
        document.querySelector(`#bookmarks-${id}`).style.color = colorPicker.value
    });
})


async function editContact(id) {
    const data = new FormData()

    const image = document.querySelector(`#edit-avartar-contact-${id}`).files[0]
    const name = document.querySelector(`#name-${id}`).value;
    const note = document.querySelector(`#note-${id}`).value;
    const address = document.querySelector(`#address-${id}`).value;
    const phone = document.querySelector(`#phone-${id}`).value;
    const facebook = document.querySelector(`#facebook-${id}`).value;
    const zalo = document.querySelector(`#zalo-${id}`).value;
    const telegram = document.querySelector(`#telegram-${id}`).value;
    const color = document.querySelector(`#color-${id}`).value



    data.append("id", id)
    data.append("image", image)
    data.append("username", username)
    data.append("name", name)
    data.append("note", note)
    data.append("address", address)
    data.append("phone", phone)
    data.append("facebook", facebook)
    data.append("zalo", zalo)
    data.append("telegram", telegram)
    data.append("color", color)


    const options = {
        method: "POST",
        body: data
    }
    const response = await fetch('/api/edit-contact', options)
    const json = await response.json()
    if (json.code != 0) {
        messageBox("error", "Có lỗi xảy ra")
        return
    }
    document.querySelector(`#text-name-${id}`).textContent = json.name
    document.querySelector(`#text-note-${id}`).textContent = json.note
    document.querySelector(`#text-address-${id}`).textContent = json.address
    document.querySelector(`#text-phone-${id}`).textContent = json.phone
    document.querySelector(`#text-facebook-${id}`).href = json.facebook
    document.querySelector(`#text-zalo-${id}`).href = json.zalo
    document.querySelector(`#text-telegram-${id}`).href = json.telegram

    document.querySelector(`#card-color-circle-${id}`).style.backgroundColor = json.color

    document.querySelector(`#avartar-${id}`).src = `data:image/png;base64, ${json.image}`

    messageBox("check", json.msg)


    const parent = document.querySelector(`[card-data-id='${id}']`)
    const editParent = parent.querySelector(".card-edit-contact")
    editParent.classList.toggle("show-card-edit")
}



async function removeContact(id) {
    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id })
    }
    const response = await fetch('/api/remove-contact', options)
    const json = await response.json()
    if (json.code != 0) {
        messageBox("error", "Có lỗi xảy ra")
        return
    }
    const card = document.querySelector(`[card-data-id="${id}"]`)
    card.remove()
    messageBox("check", json.msg)
}
