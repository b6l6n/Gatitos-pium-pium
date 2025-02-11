//CONFIGURACION INICIAL

const canvas = document.getElementById('canvas');
const img = canvas.getContext('2d');


//GATITOS
const gatito = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 100,
    width: 50,
    height: 50,
    color: 'rgb(172, 108, 26)',
    speed: 50, //destancia de movimiento con click
}
    

//ENEMIGOS
 
const enemigo = [];
const numeroEnemigos = 5;
for(let i = 0; i < numeroEnemigos; i++){
    enemigo.push({
        x: Math.random()*(canvas.width - 40),
        y: Math.random()*(canvas.height / 2),
        width: 40,
        height: 40,
        color: 'pink',
        speed: Math.random() * 3 + 1,
    });
}

//PUNTUACION
let score = 0;

//DIBUJAR GATITOS
function dibujarGatito(){
    ctx.fillStyle = gatito.color;
    ctx.fillRect(gatito.x, gatito.y, gatito.width, gatito.height);
}

//DIBUJAR ENEMIGOS
function dibujarEnemigos(){
    enemigo.forEach((enemigo) => {
        ctx.fillStyle = enemigo.color;
        ctx.fillRect(enemigo.x, enemigo.y, enemigo.width, enemigo.height);
    });
}

//MOVER ENEMIGOS
function moverEnemigos(){
    enemigo.forEach((enemigo) => {
        enemigo.y += enemigo.speed;
    });

//REINICIAR POSICION ENEMIGOS
    if(enemigo.y > canvas.height){
        enemigo.y = -enemigo.height;
        enemigo.x = Math.random() * (canvas.width - enemigo.width);
    }
};



