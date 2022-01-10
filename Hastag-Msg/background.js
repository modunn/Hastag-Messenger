


//Listen for messages
chrome.runtime.onMessage.addListener((msg, sender, response) => {
  if (msg.msg == "getData") {
    const api_url = `http://localhost:8080/api/facebook-connect`;
    const options = {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(msg)
    }
    
    fetch(api_url, options).then(function(res) {
        res.json().then(function(data) {
          console.log(data)
          response(data)
        })
    })
  }
  return true;
})







