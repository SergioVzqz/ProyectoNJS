window.onload = init;

function init() {
    if (!localStorage.getItem("token")) {
        // Si no esta logeado se manda a iniciar sesión
        window.location.href = "login.html"
        
    } else {
        // Si esta logeado puede agregar usuarios
        document.querySelector('.btn-primary').addEventListener('click', singin);
    }


}

function singin() {
    var name = document.getElementById('input-name').value;
    var mail = document.getElementById('input-mail').value;
    var pass = document.getElementById('input-password').value;


    axios({
        method: 'post',
        url: 'http://localhost:3000/user/signin',
        data: {
            user_name: name,
            user_mail: mail,
            user_password: pass
        }
    }).then(function (res) {
        console.log(res);
        alert('Registro correcto')
        window.location.href = 'dashboard.html'
    }).catch(function (err) {
        console.log(err);
    })
}