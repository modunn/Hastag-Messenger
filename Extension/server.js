
var socket = io.connect('http://172.18.9.28:8888/');
   
socket.on('status', function(msg) {
  console.log(msg);
});


socket.on('notify', function(msg) {
  chrome.tabs.query({}, function(tabs){
    tabs.forEach(function (tab) {
      chrome.tabs.sendMessage(tab.id,msg);  

    })
  });
});


socket.on('change note', function(msg) {
  console.log(msg)
  chrome.tabs.query({}, function(tabs){
    tabs.forEach(function (tab) {
      chrome.tabs.sendMessage(tab.id,msg);  

    })
  });
});



//Listen for messages
chrome.runtime.onMessage.addListener((msg, sender, response) => {
  if (msg.msg == "getData") {
    
    sendData(msg,response)

  }else if (msg.msg=="handleNote"){
    sendNote(msg,response)

  }else if (msg.msg=="removeNote"){
    sendRemoveNote(msg,response)

  }else if (msg.msg=="joined") {
      socket.emit('joined', {name: msg.name,room: msg.facebook_id});


  }else if (msg.msg=="noteChanged") {
      socket.emit('notechange', msg);
    }
    
    return true;
})


// Api lấy dữ liệu từ server theo uid người dùng
async function sendData(msg,response) {
  const data = await getData(msg)
  response(data)
}

async function getData(msg) {
  const api_url = `http://172.18.9.28:8888/api/facebook-connect`;
  const options = {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(msg)
  }
  
  const response = await fetch(api_url, options)
  const data = await response.json()
  return data
}

// Api thêm hoặc sửa ghi chú
async function sendNote(msg,response) {
  const data = await editNote(msg)
  response(data)
}

async function editNote(msg) {
  const api_url = `http://172.18.9.28:8888/api/handle-note-facebook`;
  const options = {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(msg)
  }
  
  const response = await fetch(api_url, options)
  const data = await response.json()
  return data
}


// Api xóa ghi chú
async function sendRemoveNote(msg,response) {
  const data = await removeNote(msg)
  response(data)
}

async function removeNote(msg) {
  const api_url = `http://172.18.9.28:8888/api/remove-contact`;
  const options = {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(msg)
  }
  
  const response = await fetch(api_url, options)
  const data = await response.json()
  return data
}

    


