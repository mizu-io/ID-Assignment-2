//
$( document ).ready(function() {

    const loginText = document.querySelector(".title-text .login");
    const loginForm = document.querySelector("form.login");
    const loginBtn = document.querySelector("label.login");
    const signupBtn = document.querySelector("label.signup");
    const signupLink = document.querySelector("form .signup-link a");
    const signupsuccessfulbtn = document.querySelector("#Register-Button-input");

    //moves the text when the different buttons are clicked.
    signupBtn.onclick = (() => {
        loginForm.style.marginLeft = "-50%";
        loginText.style.marginLeft = "-50%";
    });
    loginBtn.onclick = (() => {
        loginForm.style.marginLeft = "0%";
        loginText.style.marginLeft = "0%";
    });
    signupLink.onclick = (() => {
        signupBtn.click();
        return false;
    });
    signupsuccessfulbtn.onclick = (() => {
        loginBtn.click();
        return false;
    });

    //post
    //event listener for register
    $("#Register-Button-input").on("click", function(){
        var Password = $("#Register-Password-input").val()
        $("#Register-Password-input").val("")
        var Email = $("#Register-Email-input").val()
        $("#Register-Email-input").val("")
        var Name = $("#Register-Name-input").val()
        $("#Register-Name-input").val("")

        //gamification
        var Level = 1
        var Exp = 0

        var jsondata = {"Email": Email,
                        "Name": Name,
                        "Password":Password,
                        "Level":Level,
                        "Exp":Exp};
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://idassignment2test-7562.restdb.io/rest/userinfo",
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "x-apikey": "63e5bdaf478852088da67fc0",
                "cache-control": "no-cache"
            },
            "processData": false,
            "data": JSON.stringify(jsondata)
        }
    
        $.ajax(settings).done(function (response) {
        console.log(response);
        });
    })

    //get
    //event listener for login 
    $("#Login-Button-input").on("click", function(){

        var Password = $("#Login-Password-input").val()
        var Email = $("#Login-Email-input").val()

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://idassignment2test-7562.restdb.io/rest/userinfo",
            "method": "GET",
            "headers": {
            "content-type": "application/json",
            "x-apikey": "63e5bdaf478852088da67fc0",
            "cache-control": "no-cache"
            }
        }
        

        $.ajax(settings).done(function (response) {
            console.log(response)
            for (var i = 0; i < response.length; i++ )
            {
                if (response[i].Email == Email && response[i].Password == Password)
                {
                    console.log(response[i].Email)
                    console.log(response[i].Password)
                    //return the user's name or smth
                    //gamification
                    
                    console.log(response[i].Level)
                    console.log(response[i].Exp)


                    localStorage.setItem("id", response[i]._id)

                    window.location.href = "index.html";
                }
                

            }
        });

    })

});