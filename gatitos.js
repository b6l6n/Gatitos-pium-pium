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


//DIBUJAR COMIDA
function dibujarComida(){
    ctx.fillStyle= jugador.color;
    ctx.fillRect(peces.x, peces.y, peces.width, peces.height);
}


//DIBUJAR ENEMIGOS
function dibujarEnemigos(){
    enemigo.forEach((enemigo) => {
        ctx.fillStyle = enemigo.color;
        ctx.fillRect(enemigo.x, enemigo.y, enemigo.width, enemigo.height);
    

    //DIBUJAR LASER
    enemigo.laser.forEach((laser)=> {
        ctx.fillStyle='red';
        ctx.fillRect(laser.x, laser.y, 5, 15);
    });
    });
}


//DIBUJAR PUNTUACION
function dibujarPuntos(){
    ctx.fillStyle = 'black';
    ctx.front = '20px gothic';
    ctx.fillText('Puntuacion: ${score}', 10, 30);
}


//MOVER ENEMIGOS
function moverEnemigos(){
    enemigo.forEach((enemigo) => {
        enemigo.y += enemigo.speed;
    });


//REINICIAR POSICION ENEMIGOS
    if(enemigo.y > canvasHeight){
        enemigo.y = -enemigo.height;
        enemigo.x = Math.random() * (canvas.width - enemigo.width);
    }


//DISPARAR LASER
if (Math.random() < 0.02){
    enemigo.laser.push({
        x: enemigo.x + enemigo.width / 2 - 2.5,
        y: enemigo.y + enemigo.height,
    });
};


//MOVER LASERES
enemigo.laser.forEach((laser, index)=> {
    laser.y += enemigo.laserSpeed;
 

//ELIMINAR LASER SI SALE DE CANVAS
    if (laser.y > canvasHeight) {
        enemigo.laser.splice(index, 1);
    }
});
}


//COLISIONES
function checkColisiones(){


//COLISION CON COMIDA
if(
    jugador.x < comida.x + comida.width &&
    jugador.x + jugador.width > comida.x &&
    jugador.y < comida.y + comida.height &&
    jugador.y + jugador.height > comida.y
){
    score++;
    comida.x = Math.random() * (canvasWidth - peces.width);
    comida.y = Math.random() * (canvasHeight - 200);
}


//COLISION CON ENEMIGOS
enemigo.forEach((enemigo) => {
    if(
        jugador.x < enemigo.x + enemigo.width &&
        jugador.x + jugador.width > enemigo.x &&
        jugador.y < enemigo.y + enemigo.height &&
        jugador.y + jugador.height > enemigo.y
    ){
        alert('TE HA DERROTADO UN GATITO MALO, PUNTUACION Final: ${score}');
        document.location.reload();
    }


    //COLISION CON LASER
    enemigo.laser.forEach((laser) => {
        if(
            jugador.x < laser.x + 5 &&
            jugador.x + jugador.width > laser.x &&
            jugador.y < laser.y + 15 &&
            jugador.y + jugador.height > laser.y
        ){
            alert('TE HA MATADO UN LASER, PUNTUACION Final: ${score}');
            document.location.reload();
        }
    });
});
}


//MOVER GATITO
canvas.addEventListener('click', (e) => {
    const clickX = e.offsetX;
    if(clickX > canvasWidth / 2){
        //CLICK IZQUIERDA
        jugador.x += jugador.speed;
        if(jugador.x + jugador.width > canvasWidth) jugador.x = canvasWidth - jugador.width;
    }
});


//ACTUALIZAR JUEGO
function update(){
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    dibujarGatito();
    dibujarComida();
    dibujarEnemigos();
    dibujarPuntos();
    moverEnemigos();
    checkColisiones();
    requestAnimationFrame(update);
}


//INICIO 
update();





