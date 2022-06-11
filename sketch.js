var raquettegauche, raquettedroite, balle;
var raquettegaucheImg, raquettedroiteImg, balleImg,audio;

var StatutJeu = "Start"
var ScorePlayer = 0;
var ScoreComputer = 0;
var Player = "Computer";
var StatutBall = "loin"; 
var bottomEdge
var Mode = "exact"; 
var topEdge;
var x=parseInt((Math.random() * 2), 10);
var y=parseInt((Math.random() * 2), 10);



function preload () {
  raquettegaucheImg = loadImage("raquettegauche.png");
  raquettedroiteImg = loadImage("raquettedroite.png");
  balleImg = loadImage("balle.png");
  audio = new Audio("audio.mp3");
  
}

function setup() {
   createCanvas(400, 400)
  
  
   raquettedroite = createSprite(390,200,40,70);
   raquettegauche = createSprite(10, 200, 40,70);
   balle = createSprite(200,200,20,20);

  raquettedroite.addAnimation("droite", raquettedroiteImg);
  raquettegauche.addAnimation("gauche",raquettegaucheImg);
  
  balle.addAnimation("balle",balleImg);  
  bottomEdge = createEdgeSprites("bottom");
  topEdge = createEdgeSprites("top");
  
  
}

function draw() {
  //mettre l'arrière plan 
  background("white");
  drawSprites();
  //créer le filet
Filet();
//afficher le texte "appuyez sur espace" au début du jeu
if (StatutJeu === "Start") {
  text("Appuyez sur espace", 150, 200); 
}
//afficher les scores
text(ScorePlayer, 250,20);
text (ScoreComputer, 150, 20);

  //créer les bords 
  createEdgeSprites();
  
  //la raquette droite doit suivre le mouvement de la souris(sur la verticale)
  raquettedroite.y=World.mouseY;
  
  //la raquette gauche doit suivre la position de la balle (sur la verticale)
 Robot();
 Joueur2();
  if (keyDown("t")) {
    Player="Joueur";
  }
  if (keyDown("p")) {
    Player="Computer";

  }
  //la balle doit bouger quand on appuie sur 'space'
  if (keyDown("space")&&StatutJeu==="Start"){
    balle.velocityX=-5*x+5*(1-x);
    balle.velocityY=-5*x+5*(1-y);
    if (balle.velocityX===0) {
      balle.velocityX=4;
    }
    if (balle.velocityY===0) {
      balle.velocityY=3;
    }
    StatutJeu="Play";
  }
  if (balle.isTouching(raquettedroite)||balle.isTouching(raquettegauche)) {
    audio.play ();
    
  }
  if (balle.isTouching(raquettedroite)) {
   balle.velocityX+=4;
   balle.velocityY+=4;
   }
  //la balle rebondit sur les bords du haut et du bas
  balle.bounceOff(bottomEdge);
  balle.bounceOff(topEdge);
  
  //la balle rebondit sur les raquettes
  balle.bounceOff(raquettedroite);
  balle.bounceOff(raquettegauche);
  
  //remettre la balle à sa position intiale lorsqu'un joueur perd le jeu
 if (balle.x<=10 || balle.x>=390) {
 //modifie le score du joueur
 if (balle.x<=10){
     ScorePlayer+=1;
   }
  //modifie le score de l'ordianteur
  if (balle.x>=390){
     ScoreComputer+=1;
   }
   // remet la balle à la position initiale
   Reset();
   StatutJeu="Start";
 }
 // fin du jeu
if (ScoreComputer===5 || ScorePlayer===5){
   text("GAME OVER",170,150);
   StatutJeu="GameOver";
 }
 // afficher "appuyez sur r"
 if (StatutJeu==="GameOver"){
    text("Appuyez sur R",170,250);
 }
 //remet le jeu au début
 if (keyDown("r")&&StatutJeu==="GameOver"){
   StatutJeu="Start";
   ScoreComputer=0;
   ScorePlayer=0;
 }
 
 //accélerer la balle à chaque fois qu'elle touche la raquette de gauche
 if (balle.isTouching(raquettegauche)) {
   balle.velocityX-=4;
   balle.velocityY-=4;
   }

  //afficher les objets
  
}
//crée le filet
function Filet() {
  for (var i = 0; i < 400; i=i+30) {
  line(200, i, 200, i+20); 
  }
}
//remet la balle à la position initiale
function Reset() {
   balle.x=200;
   balle.y=200;
   balle.velocityX=0;
   balle.velocityY=0;
}
//crée un joueur 2
function Joueur2 () {
  if (Player==="Joueur"){
   if (keyDown("down")) {
     raquettegauche.y+=4;
   }
   if (keyDown ("up")) {
     raquettegauche.y-=4;
   }
   }
}
   //crée le joueur robot
function Robot () {
  if (Player==="Computer") {
    
    //permet au robot de perdre
   if (balle.x-raquettegauche.x <20 && Mode=== "battable")  {
     StatutBall= "près";
    } else {
      StatutBall= "loin";
    }
   if (StatutBall=== "près") {
      raquettegauche.y=balle.y+randomNumber(1, 10)*10;
   } else {
      raquettegauche.y=balle.y;
    }
    }
    }