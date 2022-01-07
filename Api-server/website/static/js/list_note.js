const table = document.querySelectorAll(".card-name");
const inputSearchingByName = document.querySelector("#search-user");

inputSearchingByName.addEventListener('input',SearchUser)
function SearchUser() {
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