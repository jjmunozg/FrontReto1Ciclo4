$( document ).ready(function() {
    console.log( "Estas en la página Inicio" );
    init();
});
function init()
{
    $(".confirmacionRegistro").hide();
}

function validarEmail(email) {
    if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email)){
     //alert("La dirección de email " + email + " es correcta!.");
     return true;
    } else {
     //alert("La dirección de email es incorrecta!.");
     return false;
    }
  }

  function emailexite(email) {
    validar = null;   
  $.ajax({
        url:"http://152.70.128.175:9090/api/user/"+email,
        type: "GET",
        datatype:"JSON",
        async: false,
        success:function(respuesta){
                     
            console.log("emailexite "+respuesta);
            validar = respuesta;
            console.log("validar "+validar);
            
        }
    });

    return validar;
   
  }

function registrarUsuario()
{
    console.log("Mi boton Registro Funciona");
    ///Variables
    var banderaRegistro = 0;
    ////Recoger los valores de los inputs
    var name = $.trim($("#nombre").val());
    var email = $.trim($("#mail").val());
    var password = $.trim($("#pwd").val());
    var password_r = $.trim($("#pwr_r").val());
    ////
    console.log("name = "+name);
    console.log("email = "+email);
    console.log("password = "+password);
    console.log("password_r = "+password_r);
    ////validación
    var miContador = $('.miFormRegistro input').length;
    console.log("contadorRegistro = "+miContador);
    console.log("emailexiste en registro = "+emailexite(email));
    $('.miFormRegistro input').each(function (index){
        if($(this).val() == "")
        {
            $(this).focus();
            $('.alertaRegistro').html("El campo "+$(this).attr("name")+" no puede estar vacío");
            return false;
        }
        banderaRegistro = banderaRegistro + 1;
        //alert("No estan vacios" + banderaRegistro);
    });
    ////Fin validación
    if(banderaRegistro == miContador)
    {
        if(password != password_r)
        {
            $('.alertaRegistro').html("Los password deben coincidir");

        }else if(!validarEmail(email)){

            $('.alertaEmail').html("Email incorrecto");

        }else if(emailexite(email)){

            $('.alertaEmailexiste').html("Email ya existe");

        }else { 

            let myData = {
                email:email,
                password:password,
                name:name
            }
            let dataToSend=JSON.stringify(myData);
            console.log(dataToSend);
            $.ajax({
                type: "POST",
                contentType: "application/json",
                url:"http://152.70.128.175:9090/api/user/new",
                data: dataToSend,
                datatype:"json",
                cache: false,
                timeout: 600000,
                success:function(respuesta){
                    $(".confirmacionRegistro").show();
                    $(".miFormRegistro").hide();
                },
                error : function(e) {
                    alert("No FUNCIONA");
                },
                done : function(e) {
                    alert("No FUNCIONA");
                }
            });
        }
    }

}
function login()
{
    console.log("Mi boton Login Funciona");
    ///Variables
    var banderaLogin = 0;
    ////Recoger los valores de los inputs
    var usuario_login = $.trim($("#usr_login").val());
    var password_login = $.trim($("#pwd_login").val());
    ////
    console.log("usuario_login = "+usuario_login);
    console.log("password_login = "+password_login);
    ////validación
    var miContador = $('.miFormLogin input').length;
    console.log("contadorRegistro = "+miContador);

    $('.miFormLogin input').each(function (index){
        if($(this).val() == "")
        {
            $(this).focus();
            $('.alertaLogin').html("El campo "+$(this).attr("name")+" no puede estar vacío");
            return false;
        }
        banderaLogin = banderaLogin + 1;
        //alert("No estan vacios" + banderaRegistro);
    });
    ////Fin validación
    if(banderaLogin == miContador)
    {
        $.ajax({
            url:"http://152.70.128.175:9090/api/user/"+usuario_login+"/"+password_login,
            type: "GET",
            datatype:"JSON",
            success:function(respuesta){
                console.log(respuesta);
                console.log("nombre Usuario "+respuesta.name);
                if(respuesta.name === "NO DEFINIDO")
                {
                    $("#usr_login").focus();
                    $(".alertaLogin").html("Usuario o contraseña INCORRECTOS");
                }
                else
                {
                    window.location.href = "perfil.html";
                    ///////PASAR INFO de una pagina a otra
                    sessionStorage.setItem("NombreUsuario",respuesta.name);
                }
            }
        });
    }
}


function login2()
{
    console.log("Mi boton Login2 Funciona");
    ///Variables
    var banderaLogin = 0;
    ////Recoger los valores de los inputs
    var usuario_login2 = $.trim($("#usr_login2").val());
    var password_login2 = $.trim($("#pwd_login2").val());
    ////
    console.log("usuario_login2 = "+usuario_login2);
    console.log("password_login2 = "+password_login2);
    ////validación
    var miContador = $('.miFormLogin2 input').length;
    console.log("contadorRegistro = "+miContador);

    $('.miFormLogin2 input').each(function (index){
        if($(this).val() == "")
        {
            $(this).focus();
            $('.alertaLogin').html("El campo "+$(this).attr("name")+" no puede estar vacío");
            return false;
        }
        banderaLogin = banderaLogin + 1;
        //alert("No estan vacios" + banderaRegistro);
    });
    ////Fin validación
    if(banderaLogin == miContador)
        if(!validarEmail(usuario_login2)){
            $('.alertaEmail2').html("Email incorrecto");
        }
        else{
                $.ajax({
                    url:"http://152.70.128.175:9090/api/user/"+usuario_login2+"/"+password_login2,
                    type: "GET",
                    datatype:"JSON",
                    success:function(respuesta){
                        //console.log(respuesta);
                        console.log("nombre Usuario "+respuesta.name);
                        console.log("ffff" + (!(respuesta.name === "NO DEFINIDO")))
                        //console.log(respuesta.email === usuario_login2);
                        if(!(respuesta.name === "NO DEFINIDO"))
                        {
                            window.location.href = "perfil.html";
                            ///////PASAR INFO de una pagina a otra
                            sessionStorage.setItem("NombreUsuario",respuesta.name);
                            console.log("Perfil");
                        }
                        else
                        {
                            $("#usr_login").focus();
                            $(".alertaLogin").html("Usuario o contraseña INCORRECTOS");
                            console.log("No Perfil");
                        }
                    }
                });
            }
}


$(document).on("click",".btn_registrarse",function() {
    registrarUsuario();
});
$(document).on("click",".btn_login",function() {
    login();
});

$(document).on("click",".btn_login2",function() {
    login2();
});