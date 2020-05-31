/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function loadPosts() {
    xhr = new XMLHttpRequest();
    var url = "http://localhost:8084/api/posts";
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            decode_json_post(this.responseText);
            document.getElementById("messages").innerHTML = "Sucess";
        }
    };
    xhr.open("GET", url, true);
    xhr.send();
}

function decode_json_post(data) {
    var r = '<div class="container">';
    var parsedJson = JSON.parse(data);
    for (var i = 0; i < parsedJson.response.length; i++) {
        r += ('<div class="row"><div class="col">' + parsedJson.response[i].title + " " + '</div><div class="col"><button type="button" class="btn btn-danger btn-lg"' +
                " onclick='deletePost(" + parsedJson.response[i].id +
                ");'>Delete</button></div></div><br>");
    }
    document.getElementById("posts").innerHTML = r;
}

function deletePost(id) {
    xhr = new XMLHttpRequest();
    var url = "http://localhost:8084/api/posts/" + id;
    xhr.open("DELETE", url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            switch (xhr.status) {
                case 204:
                    document.getElementById("messages").innerHTML = "Deleted";
                    loadPosts(); //se cancellato ricarico la lista degli posts
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



function insertPosts() {
    xhr = new XMLHttpRequest();
    var url = "http://localhost:8084/api/posts";
    xhr.open('POST', url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.withCredentials = false;
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            switch (xhr.status) {
                case 201:

                    document.getElementById("title").value = "";
                    document.getElementById("content").value = "";
                    document.getElementById("autore").value = "";

                    loadPosts(); //se inserito ricarico la lista degli posts
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
        "title": document.getElementById("title").value,
        "content": document.getElementById("content").value,
        "user": {"id": document.getElementById("autore").value}
    });
    //var p = alert(data);
    xhr.send(data);
}

