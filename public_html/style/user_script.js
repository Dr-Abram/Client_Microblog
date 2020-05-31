/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function loadUtenti() {
    xhr = new XMLHttpRequest();
    var url = "http://localhost:8084/api/users";
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            decode_json_user(this.responseText);
            document.getElementById("messages").innerHTML = "Success";
        }
    };
    xhr.open("GET", url, true);
    xhr.send();
}

function decode_json_user(data) {
    var r = '<div class="container">';
    var parsedJson = JSON.parse(data);
    for (var i = 0; i < parsedJson.response.length; i++) { //<div class="container"><div class="row">
        r += ('<div class="row"><div class="col">' + parsedJson.response[i].username + " " + '</div><div class="col"><button type="button" class="btn btn-danger btn-lg"' +
                " onclick='deleteUtenti(" + parsedJson.response[i].id +
                ");'>Delete</button></div></div><br>");
    }

    document.getElementById("utenti").innerHTML = r + '</div>';
}

function deleteUtenti(id) {
    xhr = new XMLHttpRequest();
    var url = "http://localhost:8084/api/users/" + id;
    xhr.open("DELETE", url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            switch (xhr.status) {
                case 204:
                    //document.getElementById("messages").innerHTML = "Deleted";
                    loadUtenti(); //se cancellato ricarico la lista degli utenti
                    break;
                case 404:
                    document.getElementById("messages").innerHTML = "Error 404";
                    break;
                default:
                    document.getElementById("messages").innerHTML = "Something went wrong please try again";
            }
        }
    };
    xhr.send();
}

function insertUtenti() {
    xhr = new XMLHttpRequest();
    var url = "http://localhost:8084/api/users";
    xhr.open('POST', url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.withCredentials = false;
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            switch (xhr.status) {
                case 201:
                    // var frm = document.querySelector('[name="f1"]');
                    document.getElementById("username").value = "";
                    document.getElementById("email").value = "";
                    document.getElementById("password").value = "";

                    loadUtenti(); //se inserito ricarico la lista degli utenti
                    break;
                case 404:
                    document.getElementById("messages").innerHTML = "Error 404 ";
                    break;
                default:
                    document.getElementById("messages").innerHTML = "Something went wrong please try again";
            }
        }
    };

    var data = JSON.stringify({
        "username": document.getElementById("username").value,
        "email": document.getElementById("email").value,
        "password": document.getElementById("password").value
    });
    xhr.send(data);
}