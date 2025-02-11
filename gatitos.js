//CONFIGURACION INICIAL

const canvas = document.getElementById('canvas');
const ctx= canvas.getContext('2d');
const canvasWidth= canvas.width;
const canvasHeight = canvas.height;


//GATITOS
const gatito = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 100,
    width: 50,
    height: 50,
    color: 'rgb(172, 108, 26)',
    speed: 50, //destancia de movimiento con click
}
    
//COMIDA/PUNTUACION
const peces = {
    x: Math.random() * (canvasWidth - 20),
    y: Math.random() * (canvasHeight - 200),
    width: 20,
    height: 20,
    color: 'orange',
};

//ENEMIGOS
const enemigo = [];
const numeroEnemigos = 5;
for(let i = 0; i < numeroEnemigos; i++){
    enemigo.push({
        x: Math.random()*(canvas.width - 40),
        y: Math.random()*(canvas.height / 2),
        width: 40,
        height: 40,
        color: 'black',
        speed: Math.random() * 3 + 1, //velocidad aleatoria
        laser: [],//array laser disparados
        laserSpeed: Math.random() * 3 + 2 //velocidad laser
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

//DISPARAR LASER
if (Math.random() < 0.02){
    enemigo.toLocaleString.push({
        x: enemigo.x + enemigo.width, / 2 - 2.5,
        y: enemigo.y + enemigo.height,
    });
}

//MOVER LASERES
enemigo.laser.forEach((laser, index)=> {
    laser.y += enemigo.laserSpeed;
 
//ELIMINAR LASER SI SALE DE CANVAS
    if (laser.y > canvasHeight) {
        enemigo.laser.splice(index, 1);
    }
});


