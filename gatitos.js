//CONFIGURACION INICIAL

const canvas = document.getElementById('canvas');
const ctx= canvas.getContext('2d');
const canvasWidth= canvas.width;
const canvasHeight = canvas.height;


//GATITO
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
    const orange = 'rgb(172, 108, 26)';
    const pink = '#ffb6c1';
    const black = '#222';

    // Cabeza
    ctx.beginPath();
    ctx.arc(x, y - 40 * scale, 30 * scale, 0, Math.PI * 2);
    ctx.fillStyle = orange;
    ctx.fill();

    // Orejas
    ctx.beginPath();
    ctx.moveTo(x - 25 * scale, y - 40 * scale);
    ctx.lineTo(x - 40 * scale, y - 80* scale);
    ctx.lineTo(x - 1 * scale, y -65 * scale);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(x + 25 * scale, y - 40 * scale);
    ctx.lineTo(x + 40 * scale, y - 80 * scale);
    ctx.lineTo(x + 1 * scale, y - 65 * scale);
    ctx.fill();

    // Ojos
    ctx.beginPath();
    ctx.arc(x - 12 * scale, y - 42 * scale, 7* scale, 0, Math.PI * 2);
    ctx.fillStyle = black;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x + 12 * scale, y - 42 * scale, 7 * scale, 0, Math.PI * 2);
    ctx.fillStyle = black;
    ctx.fill();

    // Brillitos ojos
    ctx.beginPath();
    ctx.arc(x - 13* scale, y - 44 * scale, 4 * scale, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x + 13 * scale, y - 44 * scale, 4 * scale, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();

    // Mejillas
    ctx.beginPath();
    ctx.arc(x - 20 * scale, y - 30 * scale, 4 * scale, 0, Math.PI * 2);
    ctx.fillStyle = pink;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x + 20 * scale, y - 30 * scale, 4 * scale, 0, Math.PI * 2);
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

  // *** CUERPO DE PIE ***
    ctx.beginPath();
    ctx.ellipse(x, y + 15 * scale, 30 * scale, 30 * scale, 8, 0, Math.PI * 2);
    ctx.fillStyle = orange;
    ctx.fill();

    // *** PATITAS DELANTERAS ***
    // Izquierda
    ctx.beginPath();
    ctx.ellipse(x - 30 * scale, y + 15 * scale, 5 * scale, 20 * scale, Math.PI / 8, 0, Math.PI * 2);
    ctx.fill();

    // Derecha (con espada)
    ctx.beginPath();
    ctx.ellipse(x + 30 * scale, y + 15 * scale, 5 * scale, 20 * scale, -Math.PI / 8, 0, Math.PI * 2);
    ctx.fill();


    // *** PATITAS TRASERAS (de pie) ***
    ctx.beginPath();
    ctx.arc(x - 20 * scale, y + 45 * scale, 10* scale, 1, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x + 20 * scale, y + 45 * scale, 10 * scale, 1, Math.PI * 2);
    ctx.fill();

     // *** COLA ***
    ctx.beginPath();
    ctx.moveTo(x + 20 * scale, y + 15 * scale);
    ctx.quadraticCurveTo(x + 60 * scale, y + 2 * scale, x + 50 * scale, y - 50 * scale);
    ctx.lineWidth = 6 * scale;
    ctx.strokeStyle = orange;
    ctx.stroke();

   
}

//DIBUJAR COMIDA
function dibujarPeces(){
    ctx.fillStyle= gatito.color;
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
    ctx.font = '20px gothic';
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
    gatito.x < peces.x + peces.width &&
    gatito.x + gatito.width > peces.x &&
    gatito.y < peces.y + peces.height &&
    gatito.y + gatito.height > peces.y
){
    score++;
    peces.x = Math.random() * (canvasWidth - peces.width);
    peces.y = Math.random() * (canvasHeight - 200);
}


//COLISION CON ENEMIGOS
enemigo.forEach((enemigo) => {
    if(
        gatito.x < enemigo.x + enemigo.width &&
        gatito.x + gatito.width > enemigo.x &&
        gatito.y < enemigo.y + enemigo.height &&
        gatito.y + gatito.height > enemigo.y
    ){
        alert('TE HA DERROTADO UN GATITO MALO, PUNTUACION Final: ${score}');
        document.location.reload();
    }


    //COLISION CON LASER
    enemigo.laser.forEach((laser) => {
        if(
            gatito.x < laser.x + 5 &&
            gatito.x + gatito.width > laser.x &&
            gatito.y < laser.y + 15 &&
            gatito.y + gatito.height > laser.y
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
        gatito.x += gatito.speed;
        if(gatito.x + gatito.width > canvasWidth) gatito.x = canvasWidth - gatito.width;
    }
});


//ACTUALIZAR JUEGO
function update(){
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    dibujarGatito();
    dibujarPeces();
    dibujarEnemigos();
    dibujarPuntos();
    moverEnemigos();
    checkColisiones();
    requestAnimationFrame(update);
}


//INICIO 
update();





