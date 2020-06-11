window.onload = init;

function init() {
    if (localStorage.getItem("token")) {
        // Si esta logeado puede modificar
        document.querySelector('.btn-primary').addEventListener('click', edit());
        document.querySelector('.btn-danger').addEventListener('click', borrar());
        
    } else {
        // Si no esta logeado se manda a iniciar sesión
        window.location.href = "login.html"
    }


}

function edit() {
    var id = document.getElementById('id').value;
    var name = document.getElementById('input-name').value;
    var lastname = document.getElementById('input_lastname').value;
    var telefono = document.getElementById('input-telefono').value;
    var mail = document.getElementById('input-mail').value;
    var pass = document.getElementById('input-password').value;
    var direccion = document.getElementById('input-direccion').value;


    axios({
        method: 'post',
        url: 'http://localhost:3000/user/edit',
        data: {
            user_id: id,
            user_name: name,
            user_lastname: lastname,
            user_telefono: telefono,
            user_mail: mail,
            user_pass: pass,
            user_direccion: direccion,

        }
    }).then(function (res) {
        console.log(res);
        alert('Modificado correctamente')
        window.location.href = 'dashboard.html'
    }).catch(function (err) {
        console.log(err);
    })
}

function borrar() {
    var id = document.getElementById('id').value;
    axios({
        method: 'post',
        url: 'http://localhost:3000/user/delete',
        data: {
            user_id: id,

        }
    }).then(function (res) {
        console.log(res);
        alert('eliminado correctamente')
        window.location.href = 'dashboard.html'
    }).catch(function (err) {
        console.log(err);
    })
}