//
$( document ).ready(function() {
    $("#Register-Button-input").on("click", function(){
        var Password = $("#Register-Password-input").val()
        var Email = $("#Register-Email-input").val()
        var Name = $("#Register-Name-input").val()
    
        var jsondata = {"Email": Email,
                            "Name": Name,
                            "Password":Password};
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://idassignment2-4eb6.restdb.io/rest/userinfo",
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "x-apikey": "63df9aa93bc6b255ed0c46ac",
                "cache-control": "no-cache"
            },
            "processData": false,
            "data": JSON.stringify(jsondata)
        }
    
        $.ajax(settings).done(function (response) {
        console.log(response);
        });
    })
    
    $("#Login-Button-input").on("click", function(){

        var Password = $("#Login-Password-input").val()
        var Email = $("#Login-Email-input").val()

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
        

        $.ajax(settings).done(function (response) {
            console.log(response)
            for (var i = 0; i < response.length; i++ )
            {
                console.log(response[i].Email)
                console.log(response[i].Password)
                if (response[i].Email == Email && response[i].Password == Password)
                {
                    //return the user's name or smth
                }
            }
        });

    })

});