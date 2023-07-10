let continuar = "s"
let vehiculo = ""
let plan = ""
let entrega = ""

const precio_cruze = parseFloat(8000000.5)
const precio_onix = parseFloat(6000000.5)
const iva = x => x * 0.21
const financiacion12 = x => x * 1.15
const financiación24 = x => x * 1.35
const financiacion48 = x => x * 1.65
const cuota12 = x => x / 12
const cuota24 = x => x / 24
const cuota48 = x => x / 48

while (continuar != "n" && continuar == "s") {
   console.clear()
   vehiculo = elegir_auto()
   while (vehiculo == "Null") {
      vehiculo = elegir_auto()
   }
   plan = elegirplan()
   while (plan == "Null") {
      plan = elegirplan()
   }
   entrega = elegirentrega()
   while (entrega == "Null") {
      entrega = elegirentrega()
   }

   calcular(vehiculo, plan, entrega)
   continuar = prompt("Continuar? S/N").toLowerCase()
}


function calcular(ivehiculo, iplan, ientrega) {
   let lista = 0
   let monto = 0
   let monto_adeudado = 0
   let valorcuota = 0
   let resto = 0
   let observacion = "---"
   if (ivehiculo == "Cruze") {
      monto = precio_cruze + iva(precio_cruze)
      lista = precio_cruze
   }
   if (ivehiculo == "Onix") {
      monto = precio_onix + iva(precio_onix)
      lista = precio_onix
   }
   if (monto > ientrega && iplan != "total") {
      monto_adeudado = monto - ientrega
   }
   if (monto < ientrega && iplan != "total") {
      iplan = "0"
   }
   if (monto > ientrega && iplan == "total") {
      iplan = "No Aplica"
   }
   if (monto < ientrega && iplan == "total"){
      iplan = "Pago Total"
   }

   

   switch (iplan) {
      case "12 meses":
         monto_adeudado = financiacion12(monto_adeudado)
         valorcuota = cuota12(monto_adeudado)
         resto = ientrega - monto
         break
      case "24 meses":
         monto_adeudado = financiación24(monto_adeudado)
         valorcuota = cuota24(monto_adeudado)
         resto = ientrega - monto
         break
      case "48 meses":
         monto_adeudado = financiacion48(monto_adeudado)
         valorcuota = cuota48(monto)
         resto = ientrega - monto
         break
      case "Pago Total":
         resto = ientrega - monto
         observacion = "Esta entregando mas dinero"      
         break
      case "0":
         observacion = "El monto ingregresado es mayor que el costo del vehiculo"
         resto = ientrega - monto
         break
      case "No Aplica":
         observacion = "El dinero entregado no es suficiente"
         resto = ientrega - monto

   }

   console.log("El auto elegido es: " + ivehiculo)
   console.log("Precio de Lista: " + lista.toFixed(1))
   console.log("Precio Total (+iva): $" + monto.toFixed(1))
   console.log("Entrega: $" + ientrega.toFixed(1))
   console.log("Plan elegido es: " + iplan)
   console.log("Monto a financiar: $" + monto_adeudado.toFixed(1))
   console.log("Valor de la cuota es: $" + valorcuota.toFixed(1))
   console.log("Observación: " + observacion)
   console.log("Diferencia: $" + resto.toFixed(1))
  
}


function elegir_auto() {
   let opcion = prompt("Elija un Auto (A: Cruze precio $ " + (precio_cruze + iva(precio_cruze)).toFixed(1) + " /B: Onix precio $" + (precio_onix + iva(precio_onix)).toFixed(1) + ")")
   switch (opcion.toLowerCase()) {
      case "a":
         auto = "Cruze"
         break
      case "b":
         auto = "Onix"
         break
      default:
         auto = "Null"
         break
   }
   return auto
}

function elegirplan() {
   let opcion = prompt("Elija un plan (A: 12 cuotas / B: 24 cuotas / C: 48 cuotas / D: Total): ")
   switch (opcion.toLowerCase()) {
      case "a":
         plan = "12 meses"
         break
      case "b":
         plan = "24 meses"
         break
      case "c":
         plan = "48 meses"
         break
      case "d":
         plan = "total"
         break
      default:
         plan = "Null"
         break
   }
   return plan
}

function elegirentrega() {
   let entrega = parseFloat(prompt("Dinero a entregar: "))
   if (isNaN(entrega) || entrega < 0) {
      entrega = "Null"
   }
   return entrega
}