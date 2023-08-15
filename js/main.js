//----Constantes------//
const importeconiva = x => x * 1.21
//----Constructor----//
const Vehiculo = function (codigo, marca, imagen, modelo, motor, tipo, preciolista) {
   this.codigo = codigo;
   this.marca = marca;
   this.imagen = imagen;
   this.modelo = modelo;
   this.tipo = tipo;
   this.motor = motor;
   this.preciolista = preciolista;
   this.preciofinal = importeconiva(preciolista)
}

//----Creacion de Objetos----//
let vehiculo1 = new Vehiculo("1", "Chevrolet", "assets/l_onix5p.webp", "Onix", "1.6", "Sedan", 8000000)
let vehiculo2 = new Vehiculo("2", "Chevrolet", "assets/l_onix4p.webp", "Onix", "1.6", "5 Puertas", 8500000)
let vehiculo3 = new Vehiculo("3", "Chevrolet", "assets/l_s10.webp", "S10", "1.8", "Sedan", 6700000)


let contenedor = document.getElementById("cuerpo")
let lista = [vehiculo1, vehiculo2, vehiculo3]

//----Mostrar Listado de vehiculos----//

for (const l of lista) {
   let listado = document.createElement("tr")   
   listado.innerHTML =
      `  
         <th scope="row">${l.codigo}</th>
         <td id="marca">${l.marca}</td>
         <td>${l.modelo}</td>
         <td><img src=${l.imagen} alt=""></td>
         <td>${l.motor}</td>
         <td>$${l.preciolista}</td>
         <td>$${l.preciofinal}</td>
         <td><button type="button" id="btn" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
             Consultar</button></td>`              
         contenedor.appendChild(listado)
}

//----Funciones----//
const a = document.getElementById("btn_calcular")

a.addEventListener("click",calcular)

function calcular(){
   console.log("prueba")
}

var myModal = document.getElementById('myModal')
var myInput = document.getElementById('myInput')

myModal.addEventListener('shown.bs.modal', function () {
  myInput.focus()
})

const email = document.getElementById("email").value
const entrega = document.getElementById("entrega").value

function calcular(){
   console.log("email: ", email)
   console.log("Entrega: ", entrega)
}