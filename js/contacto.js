let formulario = document.querySelector("#formulario");
let error = document.querySelector(".error");
let enviar = document.querySelector("#enviar");
// let email = document.querySelector('input[type="email"]')
// let mensaje = document.querySelector('input[type="mensaje"]')

formulario.addEventListener("submit", validar);
//Validaciones
function validar(e) {
  e.preventDefault();
  let formArray = e.target;
  let nombre = formArray[0];
  let email = formArray[1];
  let mensaje = formArray[2];
  //console.log(nombre, email, mensaje)
  if (!nombre.value.length & !email.value & !mensaje.value) {
    error.style.display = "block";
    error.innerText = "* Debe completar todos los campos!";
    error.style.color = "white";
  } else if (nombre.value.length < 3) {
    error.style.display = "block";
    error.innerText = "* Error! El nombre debe tener mas de 2 caracteres!";
    error.style.color = "white";
  } else if (!email.value) {
    error.innerText = "* Debe ingresar un email!";
  } else if (!mensaje.value) {
    error.innerText = "* El mensaje no puede quedar vacio!";
  } else {
    (error.style.display = "none"),
      Swal.fire({
        title: "Mensaje enviado.",
        width: 400,
        padding: "3em",
        color: "#716add",
        backdrop: `
      rgba(0,0,123,0.4)
      url("https://sweetalert2.github.io/images/nyan-cat.gif")
      left
      no-repeat
    `,
      });
  }
}
