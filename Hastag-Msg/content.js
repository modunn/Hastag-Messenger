function getCookie(name) {
    function escape(s) { return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, '\\$1'); }
    var match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape(name) + '=([^;]*)'));
    return match ? match[1] : null;
}


let ok = setInterval(()=>{
    var facebook_id = getCookie('c_user')
    var avartar_url = document.querySelector("g")
    var name = document.querySelector(`svg`)
    if (avartar_url) {
        const msg = {
            msg: "getData",
            facebook_id: facebook_id,
            avartar_url: avartar_url.firstChild.href.baseVal,
            name: name.getAttribute("aria-label")
        }
        chrome.runtime.sendMessage(msg, function (response) {
            document.body.innerHTML = `<div>${response['facebook_data']['name']}</div>
            <img src="data:image/png;base64, ${response['facebook_data']['contacts']['12']['image']}">
            `
        })        
    }
},1000)




