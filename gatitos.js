//CONFIGURACION INICIAL

const canvas = document.getElementById('canvas');
const img = canvas.getContext('2d');


//GATITOS

const gatito = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 100,7
    width: 50,
    height: 50,
    color: 'rgb(172, 108, 26)'
    speed: 50, //destancia de movimiento con click
}
    

//ENEMIGOS
 
const enemigo = [];
const numeroEnemigos = 5;

