$(document).ready(function () {
    $('form#loginForm').on('submit', function(e) {
        $(".loader").css("visibility","visible");

        e.preventDefault();

        let email = document.forms["loginForm"]["email"].value
        let password = document.forms["loginForm"]["password"].value

        if (validateForm(email, password) === true) {
            $.ajax({
                type: 'GET',
                url: `${window.location.protocol}//${window.location.host}/login?email=${document.forms["loginForm"]["email"].value}&password=${document.forms["loginForm"]["password"].value}`,
                contentType: "text/plain"
            }).done(function(response) { 
                let jsonDataLog = JSON.parse(response);
                
                $(".loader").css("visibility","hidden");

                if (jsonDataLog.success === "true") {
                    $(".login-main-block").css("visibility","hidden");
                    $(".card").css("visibility","hidden");
                    $(".verified").css("visibility","hidden");
                    $("#streamersOnAccount").val(jsonDataLog.data.streamers);

                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Logged in',
                        text: 'Welcome!',
                        showConfirmButton: false,
                        timer: 1000,
                        width: 280
                      })

                      $(".login_regis_header").css("visibility","hidden")
                      $(".logout_header").css("visibility","visible")
    
                } else {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Unsuccessful login',
                        text: "Incorrect email or password",
                      })
                }
    
            });
        } else {
            $(".loader").css("visibility","hidden");
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Oops!',
                text: "Bad email or password",
            })
        }
    });
});

$(document).ready(function () {
    $('form#registerForm').on('submit', function(e) {
        $(".loader").css("visibility","visible");

        e.preventDefault();

        let email = document.forms["registerForm"]["email"].value
        let password = document.forms["registerForm"]["password"].value
        let name = document.forms["registerForm"]["regName"].value
        let gender = document.forms["registerForm"]["gender"].value

        if (validateForm(email, password) !== false) {
            $.ajax({
                type: 'GET',
                url: `${window.location.protocol}//${window.location.host}/registration?email=${email}&password=${password}&name=${name}&gender=${gender}`,
                contentType: "text/plain"
            }).done(function(response) { 
                let jsonDataReg = JSON.parse(response);

                $(".loader").css("visibility","hidden");

                if (jsonDataReg.success === "true") {
                    $("main-block").css("visibility","hidden");
    
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Successfully registerd',
                        text: 'Login to your new account!',
                        width: 280
                    })
    
                } else {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Oops!',
                        text: 'An error occurred!',
                        width: 280
                    })
                }
    
            });
        } else {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Oops!',
                text: `Bad email or password. Password must have at least 8 characters and a number`,
              })
        }
    });
});

function validateForm(email, password) {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passwordRegex = /^(?=[a-zA-Z0-9#@$£&?]{8,}$)(?=.*?[a-z])(?=.*?[0-9]).*/;

    if (emailRegex.test(email) && passwordRegex.test(password)) {
        return true;
    } else {
        return false;
    }
}
