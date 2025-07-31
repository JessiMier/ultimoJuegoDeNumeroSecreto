let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 20;
let intentosMaximos = 5;

function asignarTextoElemento(selector, texto) {
  let elemento = document.querySelector(selector);
  elemento.innerHTML = texto;
}

function verificarIntento() {
  let numeroDeUsuario = parseInt(document.getElementById("valorUsuario").value);

  if (numeroDeUsuario === numeroSecreto) {
    asignarTextoElemento(
      "p",
      `🎉 ¡Excelente! Adivinaste el número secreto en ${intentos} ${intentos > 1 ? "intentos" : "intento"}`
    );
    document.getElementById("reiniciar").removeAttribute("disabled");
    document.getElementById("intento").setAttribute("disabled", "true");
  } else {
    if (numeroSecreto > numeroDeUsuario) {
      asignarTextoElemento("p", "🔼 El número secreto es mayor.");
    } else {
      asignarTextoElemento("p", "🔽 El número secreto es menor.");
    }

    intentos++;

    if (intentos >= intentosMaximos) {
      asignarTextoElemento("p", `❌ Se acabaron los ${intentosMaximos} intentos. El número era ${numeroSecreto}.`);
      document.getElementById("reiniciar").removeAttribute("disabled");
      document.getElementById("intento").setAttribute("disabled", "true");
    }

    limpiarValor();
  }
}

function limpiarValor() {
  document.querySelector("#valorUsuario").value = "";
}

function asignarNumero() {
  let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;

  if (listaNumerosSorteados.length === numeroMaximo) {
    asignarTextoElemento("p", "Todos los números posibles ya fueron sorteados.");
  } else {
    if (listaNumerosSorteados.includes(numeroGenerado)) {
      return asignarNumero();
    } else {
      listaNumerosSorteados.push(numeroGenerado);
      return numeroGenerado;
    }
  }
}

function condicionesIniciales() {
  asignarTextoElemento("h1", "🎯 Juego del número secreto");
  asignarTextoElemento(".texto__parrafo", `Indica un número del 1 al ${numeroMaximo}. Tenés ${intentosMaximos} intentos.`);
  

  numeroSecreto = asignarNumero();
  intentos = 1;


  document.getElementById("intento").removeAttribute("disabled");
  document.getElementById("reiniciar").setAttribute("disabled", "true");
}

function reiniciarJuego() {
  limpiarValor();
  condicionesIniciales();
}

condicionesIniciales();
