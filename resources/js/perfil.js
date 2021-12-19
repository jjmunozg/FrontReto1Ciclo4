$( document ).ready(function() {
    console.log( "Estas en la página Perfil" );
    init();
});
function init()
{
    var MiNombreUsuario = sessionStorage.getItem("NombreUsuario");
    $(".nombreUsuario").html(MiNombreUsuario);
}