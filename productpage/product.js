
$( document ).ready(function() {


    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://id2tes-fe40.restdb.io/rest/userinfo",
        "method": "GET",
        "headers": {
        "content-type": "application/json",
        "x-apikey": "63e5fe33478852088da67ff1",
        "cache-control": "no-cache"
        }
    }
    console.log(localStorage.getItem("id"));

    var exp;
    var level;
    var name;

    $.ajax(settings).done(function (response) { 
        for (var i = 0; i < response.length; i++ )
        {
            if (localStorage.getItem("id") == response[i]._id)
            {
                name = response[i].Name;
                level = response[i].Level;
                exp = response[i].Exp;
            }
        }
        if (localStorage.getItem("id") != null)
        {
            console.log(exp)
            if (exp >= 100)
            {
                exp -= 100;
                level += 1;
            }
            localStorage.getItem("id")
            document.querySelector(".header-right-btn").innerHTML = "<img src=\"../images/usericon.svg\">";
            document.querySelector(".header-right-btn").innerHTML += "<div style=\"display: inline-block; width: 20px\">    </div>" + name;
            $("div.header-right-btn").append("<div style=\"white-space: nowrap\;overflow: hidden\;display:inline-block\;\">Level " + level + "<div class=\"progress\"> <div class=\"progress-fill\"><span class=\"progress-text\">0%</span></div></div></div>")
            updateProgressBar(exp);
        }
    });

})


function updateProgressBar(value) {
    value = Math.round(value);
    document.querySelector(".progress-fill").style.width = `${value}%`;
    document.querySelector(".progress-text").textContent = `${value}%`;
}

