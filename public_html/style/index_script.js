/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function showList(address) {
    var loader = '<button class="btn btn-primary" disabled><span class="spinner-border spinner-border-sm"></span>&nbsp Attendere...</button>'
    document.getElementById("risultato-raw").innerHTML = "";
    document.getElementById("risultato").innerHTML = "starting..";

    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {  // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function () {

        if (this.readyState === 4 && this.status === 200) {
            visualJson(this.responseText);

        } else
            document.getElementById("risultato").innerHTML = loader;

    }
    xmlhttp.open("GET", address, true);
    xmlhttp.send();
}

function visualJson(json) {
    //var deb = alert(json); //debugger
    //var deb_ = alert(JSON.parse(json)); //debugger
    if (json[40] === 'a') {

        var parsedJson = JSON.parse(json);
        var output = '<div> HTTP responce code: ' + parsedJson.server + "</div><br>";
        var table = '<table class="table"><thead class="thead-dark"><tr><th scope="col">Id</th><th scope="col">Username</th><th scope="col">Email</th><th scope="col">Password</th></tr></thead>';
        for (i = 0; i < parsedJson.response.length; i++) {
            table += "<tr><td>" +
                    parsedJson.response[i].id + "</td></th><td>" +
                    parsedJson.response[i].username + "</td><td>" +
                    parsedJson.response[i].email + "</td><td>" +
                    parsedJson.response[i].password + "</td></tr>";
        }
        table += "</table>";
        document.getElementById("risultato").innerHTML = output + table;
    } else if (json[40] === '"') {
        var parsedJson = JSON.parse(json);
        var output = '<div> HTTP responce code: ' + parsedJson.server + "</div><br>";
        var table = '<table class="table"><thead class="thead-dark"><tr><th scope="col">Id</th><th scope="col">Title</th><th scope="col">Content</th><th scope="col">Autore</th></tr></thead>';
        for (i = 0; i < parsedJson.response.length; i++) {
            table += "<tr><td>" +
                    parsedJson.response[i].id + "</td></th><td>" +
                    parsedJson.response[i].title + "</td><td>" +
                    parsedJson.response[i].content + "</td><td>" +
                    parsedJson.response[i].user.username + "</td>";
        }
        table += "</table>";
        document.getElementById("risultato").innerHTML = output + table;
    } else if (json[40] === 'C') {
        var parsedJson = JSON.parse(json);
        var output = '<div> HTTP responce code: ' + parsedJson.server + "</div><br>";
        var table = '<table class="table"><thead class="thead-dark"><tr><th scope="col">Id</th><th scope="col">Title</th><th scope="col">Content</th><th scope="col">Post</th><th scope="col">Autore</th></tr></thead>';
        for (i = 0; i < parsedJson.response.length; i++) {
            table += "<tr><td>" +
                    parsedJson.response[i].id + "</td></th><td>" +
                    parsedJson.response[i].titleC + "</td><td>" +
                    parsedJson.response[i].content + "</td><td>" +
                    parsedJson.response[i].post.title + "</td><td>" +
                    parsedJson.response[i].user.username + "</td>";
        }
        table += "</table>";
        document.getElementById("risultato").innerHTML = output + table;
    }
}


