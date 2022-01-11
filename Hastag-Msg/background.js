


//Listen for messages
chrome.runtime.onMessage.addListener((msg, sender, response) => {
  if (msg.msg == "getData") {
    sendData(msg,response)
  }
  return true;
})


async function sendData(msg,response) {
  const data = await getData(msg)
  response(data)
}

async function getData(msg) {
  const api_url = `http://localhost:8080/api/facebook-connect`;
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



