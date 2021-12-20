

//Listen for messages
chrome.runtime.onMessage.addListener((msg, sender, response) => {
  if (msg.name == "fetchWords") {
      const apiCall = `http://127.0.0.1:8888/api/notes?user_id=${msg.user_id}`;
      console.log(apiCall);
      //We call api..
      fetch(apiCall, {
        method: 'GET',
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" }
      })
      .then(function (res) {
        //wait for response..
        if (res.status !== 200) {
          response(res.status);
          return;
        }
        res.json().then(function (data) {
          var d = data['100004966174890']
          console.log(data)
          if (d === undefined) {
            console.log(d);
            response({user:'undefined',color:'undefined',text:'undefined'});
            return
          }
          console.log(d);
          response({user:'qqqq',color:d.color,text:d.text});
        });
      })
    }else if(msg.name=='signup'){
        const apiCall = `http://127.0.0.1:8888/api/signup`;
    }
    return true;
})




