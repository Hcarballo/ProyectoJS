//----Variables Globales----//
let continuar = "s"
let vehiculoelegido = ""
let planelegido = ""
let entrega = ""
let presupuesto = ""
//----Constantes------//
const importeconiva = x => x * 1.21

//----Constructor----//
const Vehiculo = function (codigo, marca, modelo, motor, tipo, preciolista) {
   this.codigo = codigo;
   this.marca = marca;
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
let vehiculo1 = new Vehiculo("A", "Chevrolet", "Cruze", "1.6", "Sedan", 8000000)
let vehiculo2 = new Vehiculo("B", "Chevrolet", "Cruze", "1.6", "5 Puertas", 8500000)
let vehiculo3 = new Vehiculo("C", "Chevrolet", "Onix", "1.6", "Sedan", 6700000)
let lista = [vehiculo1, vehiculo2, vehiculo3]

let plan12 = new Plan("12", "15%",1.15)
let plan24 = new Plan("24", "35%",1.35)
let plan36 = new Plan("36", "41%",1.41)
let plan48 = new Plan("48", "60%",1.60)
let lisplan = [plan12, plan24, plan36, plan48]

//----Main----//
while ((continuar == "s") && (continuar != "n")) {
   console.clear()
   if (lista.length > 0) {
      console.table(lista)
   }
   vehiculoelegido = elegir_auto()
   while (vehiculoelegido.length == 0) {
      vehiculoelegido = elegir_auto()
   }
   if (lisplan.length > 0) {
      console.table(lisplan)
   }
   planelegido = elegirplan()
   while (planelegido == 0) {
      planelegido = elegirplan()
   }
   entrega = elegirentrega()
   while (entrega == "Null") {
      entrega = elegirentrega()
   }

   calcular(vehiculoelegido, planelegido, entrega)

   continuar = prompt("Continuar? S/N").toLowerCase()
}
//----Funciones----//

function elegir_auto() {
   let opcion = prompt("Elija un Auto: (A,B ó C)")
   let resultado = lista.filter((x) => x.codigo.includes(opcion.toUpperCase()))
   return resultado
}

function elegirplan() {
   let opcion = prompt("Elija un plan (12/24/36/48 meses): ")
   let resultado = lisplan.filter((x) => x.meses.includes(opcion))
   return resultado
}

function elegirentrega() {
   let entrega = parseFloat(prompt("Dinero a entregar: "))
   if (isNaN(entrega) || entrega < 0) {
      entrega = "Null"
   }
   return entrega
}

function calcular(ivehiculo, iplan, ientrega) {
   let monto_adeudado = ivehiculo[0].preciofinal - ientrega
   let valorcuota = monto_adeudado*iplan[0].valor/iplan[0].meses

   console.log("PRESUPUESTO")
   console.log("************************")
   console.log("El auto elegido es: " + ivehiculo[0].marca +"-"+ivehiculo[0].modelo+"-"+ivehiculo[0].tipo)
   console.log("Precio de Lista: $" + ivehiculo[0].preciolista.toFixed(1))
   console.log("Precio Total (+iva): $" + ivehiculo[0].preciofinal.toFixed(1))
   console.log("Entrega: $" + ientrega.toFixed(1))
   console.log("Plan elegido es: " + iplan[0].meses + "meses - " + iplan[0].interes)
   console.log("Monto a financiar: $" + monto_adeudado.toFixed(1))
   console.log("Valor de la cuota es: $" + valorcuota.toFixed(1))
}

