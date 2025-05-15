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
function dibujarGatito() {
    const x = gatito.x + gatito.width / 2;
    const y = gatito.y + gatito.height / 2;
    const scale = 1; // Puedes ajustar tamaño aquí

    // Colores
    const gray = '#d3d3d3';
    const pink = '#ffb6c1';
    const black = '#222';

    // Cabeza
    ctx.beginPath();
    ctx.arc(x, y - 40 * scale, 30 * scale, 0, Math.PI * 2);
    ctx.fillStyle = gray;
    ctx.fill();

    // Orejas
    ctx.beginPath();
    ctx.moveTo(x - 25 * scale, y - 55 * scale);
    ctx.lineTo(x - 35 * scale, y - 85 * scale);
    ctx.lineTo(x - 5 * scale, y - 60 * scale);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(x + 25 * scale, y - 55 * scale);
    ctx.lineTo(x + 35 * scale, y - 85 * scale);
    ctx.lineTo(x + 5 * scale, y - 60 * scale);
    ctx.fill();

    // Ojos
    ctx.beginPath();
    ctx.arc(x - 12 * scale, y - 42 * scale, 5 * scale, 0, Math.PI * 2);
    ctx.fillStyle = black;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x + 12 * scale, y - 42 * scale, 5 * scale, 0, Math.PI * 2);
    ctx.fillStyle = black;
    ctx.fill();

    // Brillitos ojos
    ctx.beginPath();
    ctx.arc(x - 14 * scale, y - 44 * scale, 1.5 * scale, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x + 10 * scale, y - 44 * scale, 1.5 * scale, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();

    // Mejillas
    ctx.beginPath();
    ctx.arc(x - 20 * scale, y - 30 * scale, 3.5 * scale, 0, Math.PI * 2);
    ctx.fillStyle = pink;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x + 20 * scale, y - 30 * scale, 3.5 * scale, 0, Math.PI * 2);
    ctx.fillStyle = pink;
    ctx.fill();

    // Nariz
    ctx.beginPath();
    ctx.moveTo(x - 3 * scale, y - 33 * scale);
    ctx.lineTo(x, y - 28 * scale);
    ctx.lineTo(x + 3 * scale, y - 33 * scale);
    ctx.fillStyle = pink;
    ctx.fill();

    // Boca
    ctx.beginPath();
    ctx.arc(x, y - 25 * scale, 5 * scale, 0, Math.PI, false);
    ctx.strokeStyle = black;
    ctx.lineWidth = 1;
    ctx.stroke();

    // Cuerpo
    ctx.beginPath();
    ctx.ellipse(x, y + 5 * scale, 25 * scale, 30 * scale, 0, 0, Math.PI * 2);
    ctx.fillStyle = gray;
    ctx.fill();

    // Patitas delanteras
    ctx.beginPath();
    ctx.arc(x - 12 * scale, y + 35 * scale, 6 * scale, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x + 12 * scale, y + 35 * scale, 6 * scale, 0, Math.PI * 2);
    ctx.fill();

    // Patitas traseras
    ctx.beginPath();
    ctx.arc(x - 20 * scale, y + 25 * scale, 4 * scale, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x + 20 * scale, y + 25 * scale, 4 * scale, 0, Math.PI * 2);
    ctx.fill();
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





