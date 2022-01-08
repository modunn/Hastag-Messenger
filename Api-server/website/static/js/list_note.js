const table = document.querySelectorAll(".card-name");
const inputSearchingByName = document.querySelector("#search-user");

inputSearchingByName.addEventListener('input',SearchUser)
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
                <input type="text"  id="contact-name" class="new-input" placeholder='Tên' required>
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
function contactCard(data){
    return  `<div class="card-col" data-id="${data['id']}">
                <div class="card-contact padding24 card-bordered">
                    <div class="card-contact-img card-center card-mg-20">
                        <img src="data:image/png;base64, ${data['image']}" alt="Ảnh đại diện">
                    </div>
                    <h2 class="card-typography card-name text-nowrap" title="${data['name']}">
                        <div class="card-color-circle" style="background-color: ${data['color']};"></div>
                        <span class="text-nowrap" >${data['name']}</span>
                    </h2>
                    <span class="card-typography card-note text-nowrap" title="${data['note']}">
                        ${data['note']}
                    </span>

                    <div class="card-col">
                        <h2 class="card-typography card-title">
                            Contact
                        </h2>
                        <div class="card-contact-info">
                            <div class="card-col card-col-lg-24 text-nowrap" title="${data['address']}">
                                <span >Địa chỉ: <strong class="text-nowrap">${data['address']}</strong></span>
                            </div>
                            <div class="card-col card-col-lg-24 text-nowrap" title="${data['phone']}">
                                <span>số điện thoại: </span>
                                <span><strong class="text-nowrap">${data['phone']}</strong></span>
                            </div>
                        </div>
                        <h2 class="card-typography card-title">
                            Social
                        </h2>
                        <div class="card-contact-social card-center">
                            <a href="${data['telegram']}" class="telegram card-center" target="blank" title="${data['telegram']}">
                                <i class='bx bxl-telegram'></i>
                            </a>
                            <a href="${data['zalo']}" class="phone card-center" target="blank" title="${data['zalo']}">
                                <i class='bx bxs-alarm-snooze'></i>
                            </a>
                            <a href="https://facebook.com/${data['facebook']}" target="blank" class="facebook card-center"
                                title="${data['facebook']}">
                                <i class='bx bxl-facebook-square'></i>
                            </a>
                        </div>
                    </div>
                    <div class="card-action">
                        <div class="card-row card-row-space-between">
                            <div class="card-col card-col-lg-12 card-padding-r-10">
                                <button class="card-btn card-btn-primary w-full ">Chỉnh sửa</button>
                            </div>
                            <div class="card-col card-col-lg-12">
                                <button class="card-btn card-btn-default w-full ">Xóa</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
}
const newContactDiv = document.querySelector('.new-contact-card')
const newContactBtn = document.querySelector('#new-contact-btn')
newContactBtn.addEventListener('click',showCardContact)

function showCardContact() {
    if(document.querySelector('.new-contact-top')) return
    newContactDiv.innerHTML = innderHtmlNewContactPopup
    document.querySelector(".card-btn-x").addEventListener('click',()=>{
        newContactDiv.innerHTML = ''
    })

    document.querySelector('#upload-avartar-contact').onchange = ()=>{
        const img = document.querySelector('#upload-avartar-contact').files[0];
        document.querySelector(".hidden-image img").src = URL.createObjectURL(img)
            
    }

    const changeColor= document.querySelector('#pick-color')
    changeColor.addEventListener('input',()=>{
        document.querySelector('#notes').style.color = changeColor.value
    })
    document.querySelector("#add-contact-btn").onclick = addNewContact

}

async function addNewContact() {
    const data = new FormData();
    const name = document.querySelector('#contact-name').value;
    if(!name) {
        messageBox('error','Tên không được để trống')
        return
    }

    const image = document.querySelector('#upload-avartar-contact').files[0];
    
    const note = document.querySelector('#contact-note').value;
    const address = document.querySelector('#contact-address').value;
    const phone = document.querySelector('#contact-phone').value;
    const facebook = document.querySelector('#contact-facebook').value;
    const zalo = document.querySelector('#contact-zalo').value;
    const telegram = document.querySelector('#contact-telegram').value;
    const color= document.querySelector('#pick-color').value


    data.append("image",image)
    data.append("username",username)
    data.append("name",name)
    data.append("note",note)
    data.append("address",address)
    data.append("phone",phone)
    data.append("facebook",facebook)
    data.append("zalo",zalo)
    data.append("telegram",telegram)
    data.append("color",color)


    const response = await fetchAddNewContact(data)
    if (!response.code==0) return
    messageBox("check",response.msg)
    newContactDiv.innerHTML = ""
    document.querySelector('.card-grid-4-gap-20').insertAdjacentHTML("afterbegin",contactCard(response))

}

async function fetchAddNewContact(data) {
    const options = {
        method : "POST",
        body :data
    }
    const response = await fetch('/api/add-contact',options)
    const json = await response.json()
    return json
}