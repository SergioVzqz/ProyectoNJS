window.onload = init;
var headers = {};
var url = "http://localhost:3000";

function init() {
    if (localStorage.getItem("token")) {
        headers = {
            headers: {
                'Authorization': "bearer " + localStorage.getItem("token")
            }
        }

        document.querySelector('.btn-primary').addEventListener('click', function () {
            window.location.href = "signin.html"
        });

        document.querySelector('.btn-secondary').addEventListener('click', function () {
            window.location.href = "muser.html"
        });
        
        loadUser()
        
    } else {
        window.location.href = "login.html"
        
    }


}

function loadUser() {
    axios.get(url + "/sistema", headers)
    .then(function (res) {
        console.log(res);
        displayUser(res.data.message);
    }).catch(function (err) {
        console.log(err);
    })
}

function  displayUser(users) {
    var body = document.querySelector("body");
    for(var i = 0; i < users.length; i++){
        body.innerHTML += `<h3> ${users[i].nombre} </h3>`;
    }
}



