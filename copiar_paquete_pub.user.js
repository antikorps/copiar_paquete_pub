// ==UserScript==
// @name         copiar_paquete_pub
// @namespace    copiar_paquete_pub
// @version      0.1
// @description  Copia en el portapapeles el comando para incorporar el paquete pub en tu proyecto de Dart o Flutter
// @author       antikorps
// @match        https://pub.dev/packages/*
// @icon         https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Dash%2C_the_mascot_of_the_Dart_programming_language.png/240px-Dash%2C_the_mascot_of_the_Dart_programming_language.png
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    function incorporarBotonesCopiar() {
        const selectorEncabezado = document.querySelector("div.detail-container")
        if (selectorEncabezado == null) {
            return
        }
        const selectorTitulo = document.querySelector("h1.title")
        if (selectorTitulo == null) {
            return
        }
        const selectorPaquete = selectorTitulo.querySelector(".code")
        if (selectorPaquete == null) {
            return
        }
        const paquete = selectorPaquete.innerText
        const infoPaquete = paquete.split(": ")
        if (infoPaquete.length != 2) {
            return
        }

        const comandoDart = `dart pub add ${infoPaquete[0]}`
        const comandoFlutter = `flutter pub add ${infoPaquete[0]}`

        const htmlBotones = `
        <div style="display:inline-flex">
           <div class="copiar-comando" style="cursor:pointer;margin:10px;width:20px;" data-comando="${comandoDart}">
              ${dartLogo}
           </div>

           <div class="copiar-comando" style="cursor:pointer;margin:10px;width:20px;" data-comando="${comandoFlutter}">
             ${flutterLogo}
           </div>
        </div>
        `

        selectorTitulo.style.display = "inline-block"
        selectorTitulo.insertAdjacentHTML("afterend", htmlBotones)

        const copiarComandos = document.querySelectorAll(".copiar-comando")
        for (const copiarComando of copiarComandos) {
            copiarComando.addEventListener("click", copiarComandoPersonalizado)
        }
    }

    function copiarComandoPersonalizado(evento) {
        const comando = evento.target.closest(".copiar-comando").getAttribute("data-comando")
        navigator.clipboard.writeText(comando)
        const selectorMensajeCopiar = document.querySelector(".pkg-page-title-copy-feedback")
        if (selectorMensajeCopiar == null) {
            return
        }
        selectorMensajeCopiar.style.display = "block";

        setTimeout(function(){
            selectorMensajeCopiar.style.display = "none"
        }, 2000)

    }

    const flutterLogo = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 166 202">
    <defs>
        <linearGradient id="triangleGradient">
            <stop offset="20%" stop-color="#000000" stop-opacity=".55"/>
            <stop offset="85%" stop-color="#616161" stop-opacity=".01"/>
        </linearGradient>
        <linearGradient id="rectangleGradient" x1="0%" x2="0%" y1="0%" y2="100%">
            <stop offset="20%" stop-color="#000000" stop-opacity=".15"/>
            <stop offset="85%" stop-color="#616161" stop-opacity=".01"/>
        </linearGradient>
    </defs>
    <path fill="#42A5F5" fill-opacity=".8" d="M37.7 128.9 9.8 101 100.4 10.4 156.2 10.4"/>
    <path fill="#42A5F5" fill-opacity=".8" d="M156.2 94 100.4 94 79.5 114.9 107.4 142.8"/>
    <path fill="#0D47A1" d="M79.5 170.7 100.4 191.6 156.2 191.6 156.2 191.6 107.4 142.8"/>
    <g transform="matrix(0.7071, -0.7071, 0.7071, 0.7071, -77.667, 98.057)">
        <rect width="39.4" height="39.4" x="59.8" y="123.1" fill="#42A5F5"/>
        <rect width="39.4" height="5.5" x="59.8" y="162.5" fill="url(#rectangleGradient)"/>
    </g>
    <path d="M79.5 170.7 120.9 156.4 107.4 142.8" fill="url(#triangleGradient)"/>
</svg>
`

    const dartLogo = `<?xml version="1.0" encoding="UTF-8" standalone="no"?">
<svg
   xmlns:svg="http://www.w3.org/2000/svg"
   xmlns="http://www.w3.org/2000/svg"
   version="1.1"
   id="Layer_1"
   x="0px"
   y="0px"
   viewBox="188 251.8 110.5 110.5"
   enable-background="new 188 251.8 415.8 110.5"
   xml:space="preserve">
<path
   d="m 217.7,281.7 -7.1,-7.1 v 51.2 l 0.1,2.4 c 0,1.1 0.2,2.4 0.6,3.7 l 56.2,19.8 14,-6.2 v 0 z"
   id="path2"
   style="fill:#00c4b3" />
<path
   d="m 211.3,331.9 v 0 c 0,0 0,0 0,0 0,0 0,0 0,0 z m 70.2,13.6 -14,6.2 -56.1,-19.8 c 1.1,4.1 3.4,8.7 6,11.3 l 18.3,18.2 40.8,0.1 z"
   id="path4"
   style="fill:#22d3c5" />
<path
   d="m 210.8,274.6 -21.8,33 c -1.8,1.9 -0.9,5.9 2,8.9 l 12.6,12.7 7.9,2.8 c -0.3,-1.3 -0.6,-2.6 -0.6,-3.7 l -0.1,-2.4 z"
   id="path6"
   style="fill:#0075c9" />
<path
   d="m 267.9,275.2 c -1.3,-0.3 -2.6,-0.5 -3.7,-0.6 l -2.5,-0.1 h -51.1 l 70.9,70.9 v 0 l 6.2,-14 z"
   id="path8"
   style="fill:#0075c9" />
<path
   d="m 267.8,275.2 c 0.1,0 0.1,0 0,0 v 0 c 0.1,0 0.1,0 0,0 z m 11.4,6 c -2.6,-2.6 -7.1,-5 -11.3,-6 l 19.8,56.2 -6.2,14 v 0 l 15.2,-4.9 v -41.7 z"
   id="path10"
   style="fill:#00a8e1" />
<path
   d="m 265.1,267.4 -12.7,-12.6 c -2.9,-2.9 -6.9,-3.8 -8.9,-2 l -33,21.8 h 51.1 l 2.5,0.1 c 1.1,0 2.4,0.2 3.7,0.6 z"
   id="path12"
   style="fill:#00c4b3" />
</svg>

    `

    incorporarBotonesCopiar()

})();
