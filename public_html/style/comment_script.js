/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function loadComments() {
    xhr = new XMLHttpRequest();
    var url = "http://localhost:8084/api/comments";
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            decode_json_comment(this.responseText);
            document.getElementById("messages").innerHTML = "Sucess";
        }
    };
    xhr.open("GET", url, true);
    xhr.send();
}

function decode_json_comment(data) {
    //var deb = alert(data); //debugger
    var r = '<div class="container">';
    var parsedJson = JSON.parse(data);
    for (var i = 0; i < parsedJson.response.length; i++) {
        r += ('<div class="row"><div class="col">' + parsedJson.response[i].titleC + " " + '</div><div class="col"><button type="button" class="btn btn-danger btn-lg"' +
                " onclick='deleteComment(" + parsedJson.response[i].id +
                ");'>Delete</button></div></div><br>");
    }
    document.getElementById("comments").innerHTML = r + '</div>';
}

function deleteComment(id) {
    xhr = new XMLHttpRequest();
    var url = "http://localhost:8084/api/comments/" + id;
    xhr.open("DELETE", url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            switch (xhr.status) {
                case 204:
                    //document.getElementById("messages").innerHTML = "Deleted";
                    loadComments(); //se cancellato ricarico la lista dei commenti
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



function insertComments() {
    xhr = new XMLHttpRequest();
    //var deb__ = alert(xhr); //debugger
    var url = "http://localhost:8084/api/comments";
    xhr.open('POST', url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.withCredentials = false;
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            switch (xhr.status) {
                case 201:

                    document.getElementById("titleC").value = "";
                    document.getElementById("content").value = "";
                    document.getElementById("post").value = "";
                    document.getElementById("autore").value = "";

                    loadComments(); //se inserito ricarico la lista dei commenti
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
        "titleC": document.getElementById("titleC").value,
        "content": document.getElementById("content").value,
        "post": {"id": document.getElementById("post").value},
        "user": {"id": document.getElementById("autore").value}
    });
    //var p = alert(data); //debugger
    xhr.send(data);
}

