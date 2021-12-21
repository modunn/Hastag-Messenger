

//Listen for messages
chrome.runtime.onMessage.addListener((msg, sender, response) => {
  if (msg.name == "getData") {
      const apiCall = `http://127.0.0.1:8888/api/notes?user_id=${msg.user_id}`;
      // console.log(apiCall);
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
          
          if (data == null) {
            // console.log(d);
            response(null);
            return
          } 
          window.localStorage.setItem("data", JSON.stringify(data));

          var meta1 = JSON.parse(window.localStorage.getItem("data"));

          console.log(meta1);
          response(data);
        });
      })
    }else if(msg.name=='edit'){
        const apiCall = `http://127.0.0.1:8888/api/edit`;
        fetch(apiCall, {
          method: "post",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({user_id:msg.user_id,id:msg.id,color:msg.color,text:msg.text})
        }).then(function (res) {
          if (res.status !== 200) {
            response(res.status);
            return;
          }
          res.json().then(function(msg) {

            console.log(msg)
            response(msg);
            
          });
        })
    }
    else if(msg.name=='login'){
      const apiCall = `http://127.0.0.1:8888/api/login`;
      console.log(msg.user_id);
      fetch(apiCall, {
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({'user':msg.user_id})
      }).then(function (res) {
        if (res.status !== 200) {
          response(res.status);
          return;
        }
        res.json().then(function(msg) {

          console.log(msg)
          response(msg);
          
        });
      })
  }
    return true;
})




