
$( document ).ready(function() {



    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://idassignment2-4eb6.restdb.io/rest/userinfo",
        "method": "GET",
        "headers": {
        "content-type": "application/json",
        "x-apikey": "63df9aa93bc6b255ed0c46ac",
        "cache-control": "no-cache"
        }
    }
    console.log(localStorage.getItem("id"));

    $.ajax(settings).done(function (response) {
        console.log(response)
        for (var i = 0; i < response.length; i++ )
        {
            if (localStorage.getItem("id") == response[i]._id)
            {
                var name = response[i].Name;
                
                updateProgressBar(response[i].Exp)
            }
        }
    });
})

if (localStorage.getItem("id") != null)
{
    localStorage.getItem("id")
}

function updateProgressBar(value) {
    value = Math.round(value);
    document.querySelector(".progress-fill").style.width = `${value}%`;
    document.querySelector(".progress-text").textContent = `${value}%`;
}

