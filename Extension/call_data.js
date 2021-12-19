

fetch("http://localhost:8888/api/?user_id=mundo12345", {
    method: "GET",
    headers: [
        ["Content-Type", "application/json"],
        ["Content-Type", "text/plain"]
    ],
    credentials: "include",
    mode: 'no-cors'
})
    .then(function (response) {
        if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
                response.status);
            return;
        }

        // Examine the text in the response
        response.json().then(function (data) {
            console.log(data);
        });
    }
    )
    .catch(function (err) {
        console.log('Fetch Error :-S', err);
    });