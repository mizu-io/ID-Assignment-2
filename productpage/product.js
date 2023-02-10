
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

    var name;

    $.ajax(settings).done(function (response) {
        console.log(response)
        for (var i = 0; i < response.length; i++ )
        {
            if (localStorage.getItem("id") == response[i]._id)
            {
                name = response[i].Name;
                
                updateProgressBar(response[i].Exp)
            }
        }
        if (localStorage.getItem("id") != null)
        {
            localStorage.getItem("id")
            document.querySelector(".header-right-btn").innerHTML = "<img src=\"../images/usericon.svg\">";
            document.querySelector(".header-right-btn").innerHTML += "<div style=\"display: inline-block; width: 20px\">    </div>" + name;
            $("div.header-right-btn").append("<div style=\"white-space: nowrap\;overflow: hidden\;display:inline-block\">Level" + Level + "<div class=\"progress\"> <div class=\"progress-fill\"><span class=\"progress-text\">0%</span></div></div></div>")
            //document.querySelector(".header-right-btn").innerHTML += "<div style=\"\">    </div>";
        }
    });

})


function updateProgressBar(value) {
    value = Math.round(value);
    document.querySelector(".progress-fill").style.width = `${value}%`;
    document.querySelector(".progress-text").textContent = `${value}%`;
}

