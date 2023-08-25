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

const Plan = function (meses, interes, valor) {
   this.meses = meses;
   this.interes = interes;
   this.valor = valor;
}


//----Creacion de Objetos----//
let vehiculo1 = new Vehiculo("1", "Chevrolet", "assets/l_onix5p.webp", "Onix", "1.6", "Sedan", 8000000)
let vehiculo2 = new Vehiculo("2", "Chevrolet", "assets/l_onix4p.webp", "Onix", "1.6", "5 Puertas", 8500000)
let vehiculo3 = new Vehiculo("3", "Chevrolet", "assets/l_s10.webp", "S10", "1.8", "Sedan", 6700000)
let lista = [vehiculo1, vehiculo2, vehiculo3]

let plan12 = new Plan("12", "15%",1.15)
let plan24 = new Plan("24", "35%",1.35)
let plan36 = new Plan("36", "41%",1.41)
let plan48 = new Plan("48", "60%",1.60)
let lisplan = [plan12, plan24, plan36, plan48]

//----DOM "Listado de vehiculos"----//

let contenedor = document.getElementById("cuerpo")

for (const l of lista) {
   let listado = document.createElement("tr")   
   listado.innerHTML =
      `  
         <td>${l.codigo}</th>
         <td>${l.marca}</td>
         <td>${l.modelo}</td>
         <td><img src=${l.imagen} alt=""></td>
         <td>${l.motor}</td>
         <td>$${l.preciofinal}</td>
         <td><button type="button" id="btn_consulta" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
             Consultar</button></td>`              
         contenedor.appendChild(listado)
}

//-----Desarrollo localstorage/JSON-----//
const btn= document.querySelectorAll('#btn_consulta')
const btn_calculo = document.querySelectorAll('#btn_calcular')
const modal_1 = document.querySelector('#exampleModal')
const modal_2 = document.querySelector('#presupuesto')
const btn_close = document.querySelectorAll('#close')
const dato = document.querySelector('#dato')


btn.forEach(btn => {
   btn.addEventListener('click',() => {
      const fila = btn.closest('tr')
      const datofila = Array.from(fila.querySelectorAll('td'))
      .slice(0,-1)
      .map(td => td.textContent)
      .join(", ")

      let veh = lista.find(x => x.codigo === datofila[0])
      keepveh(veh)

      dato.textContent = datofila
      modal_1.style.display = 'block'   
   })
})

function keepveh(v){
   const dato = JSON.stringify(v);
   localStorage.setItem("vehiculo",dato)
}

btn_calculo.forEach(btn_calculo => {
   btn_calculo.addEventListener('click',() => {
      const correo = document.getElementById('email').value
      const entrega = parseFloat(document.getElementById('entrega').value)
      const cuotas = document.querySelector('input[name="flexRadioDefault"]:checked').value

      if(!isNaN(correo) || correo == ""){
         alert('Completar el correo')
      } else if(isNaN(entrega) || entrega === ""){
         alert('Coloque un valor')
      }
      else{
         presupuesto(correo,entrega,cuotas)      
      }
   })   
})


function presupuesto(correo,entrega,cuotas){
   let obj_vehiculo = JSON.parse(localStorage.getItem('vehiculo'))
   let plan = lisplan.find(x => x.meses === cuotas)
   let monto_adeudado = obj_vehiculo.preciofinal - entrega
   let valor_cuota = monto_adeudado*plan.valor/plan.meses 

   document.getElementById('exampleModal').style.display = 'none'   

   const imarca = document.querySelector('#marca')
   imarca.textContent = obj_vehiculo.marca
   const imodelo = document.querySelector('#modelo')
   imodelo.textContent = obj_vehiculo.modelo
   const itransmision = document.querySelector('#transmision')
   itransmision.textContent = obj_vehiculo.motor
   const ipreciofinal = document.querySelector('#preciofin')
   ipreciofinal.textContent = obj_vehiculo.preciofinal.toFixed(1)
   const ientrega = document.querySelector('#entregado')
   ientrega.textContent = entrega.toFixed(1)
   const imonto = document.querySelector('#montofin')
   imonto.textContent = monto_adeudado.toFixed(1)
   const imeses = document.querySelector('#meses')
   imeses.textContent = plan.meses
   const icuota = document.querySelector('#valorcuota')
   icuota.textContent = valor_cuota.toFixed(1)
   
   modal_2.style.display = 'block'      
}

btn_close.forEach(btn_close => {
   btn_close.addEventListener('click', ()=>{
    modal_2.style.display = 'none'
    location.reload()
   })
})