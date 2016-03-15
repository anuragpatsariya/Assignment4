/*jshint browser:true*/
/*globals $*/
/* jshint unused: false */
"use strict";
$(document).ready(function() {    
    $.ajax({
        url: "http://localhost:3000/actors",
        type: "GET",
        dataType: "json",
        success: function(data) {
            //alert(data);
            $.each(data, function(i, item) {
                /*
                $("#actor")[0].innerHTML += '<div class="mdl-list__item"><span class="mdl-list__item-primary-content"><i class="material-icons mdl-list__item-avatar">person</i><span>' + item.name + '</span></span><a class="mdl-list__item-secondary-action" href="#"><i class="material-icons">star</i></a></div>';*/
                var s;
                if (item.starred === true) {
                    s = "star";
                }
                else {
                    s = "star_border";
                }
                var text = "<div class=\"mdl-list__item\"><span class=\"mdl-list__item-primary-content\"><i class=\"material-icons mdl-list__item-avatar\">person</i><span>" + item.name + "</span></span><a class=\"mdl-list__item-secondary-action\" href=\"#\"><i id = \"" + item.id + "\" data-name=\"" + item.name + "\" data-id=\"" + item.id + "\" data-starred=\"" + item.starred + "\" class=\"material-icons\" onclick=\"toggleStar(this)\">" + s + "</i></a></div>";
                $("#actor")[0].innerHTML += text;
            });
        },
        Error: function(xhr, status, error) {
            window.alert("Error: " + xhr.status + status + error);
        }
    });

});

function toggleStar(param) {
    var id = $(param).data("id");
    console.log(id);
    var name = $(param).data("name");
    var starred = $(param).data("starred");
    console.log(id, name, starred);
    var new_toggle_value;
    if (starred === true) {
        new_toggle_value = false;
    }
    else {
        new_toggle_value = true;
    }
    $.ajax({
        url: "http://localhost:3000/actors/" + id,
        type: "put",
        dataType: "JSON",
        data: { "id": id, "name": name, "starred": new_toggle_value },
        success: function(data) {
            var s;
            if (data.starred === true) {
                s = "star";
                $(param).data("starred", true);
            }
            else {
                s = "star_border";
                $(param).data("starred", false);
            }
            $("#" + id)[0].innerHTML = s;
        }
    });
}

function saveactor() {
    var actorName = $("#new_actor")[0].value;
    console.log(actorName);
    $.ajax({
        url: "http://localhost:3000/actors",
        type: "post",
        data: { "name": actorName, "starred": false },
        //contentType : 'application/json', 
        dataType: "JSON",
        success: function(data) {
            console.log(data.name);
            /*
            $("#actor")[0].innerHTML += '<div class="mdl-list__item"><span class="mdl-list__item-primary-content"><i class="material-icons mdl-list__item-avatar">person</i><span>' + item.name + '</span></span><a class="mdl-list__item-secondary-action" href="#"><i class="material-icons">star</i></a></div>';*/
            var s;
            if (data.starred === true) {
                s = "star";
            }
            else {
                s = "star_border";
            }
            var text = "<div class=\"mdl-list__item\"><span class=\"mdl-list__item-primary-content\"><i class=\"material-icons mdl-list__item-avatar\">person</i><span>" + data.name + "</span></span><a class=\"mdl-list__item-secondary-action\" href=\"#\"><i id= \"" + data.id + "\"data-id=\"" + data.id + "\" data-starred=\"" + data.starred + "\" data-name=\"" + data.name + "\" class=\"material-icons\" onclick=\"toggleStar(this)\">" + s + "</i></a></div>";
            $("#actor")[0].innerHTML += text;
            $("#new_actor")[0].value = "";
        },
        error: function(xhr, status, error) {
            window.alert("Error: " + xhr.status + status + error);
        }
    });
}