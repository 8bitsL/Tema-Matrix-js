var unicosimbolo;
var tamanhoSimbolos = 20;
var streams = [];
function setup(){

    createCanvas(
        window.innerWidth,
        window.innerHeight
    );   
    background(0); 
    var x = 0; 
    for(var i = 0; i<= width / tamanhoSimbolos; i++){
        var unicaStream = new stream();
        unicaStream.gerarSimbolos(x,round(random(-800,0)));
        streams.push(unicaStream);
        x += tamanhoSimbolos;
    }
    textSize(tamanhoSimbolos);  
}

function draw(){
    background(0, 130)
    streams.forEach(function(stream){
        stream.render();
    });
}
function simbolo(x, y, velocidade, primeiraLetra){
    this.x = x;
    this.y = y;
    this.primeiraLetra = primeiraLetra;
    this.velocidade = velocidade
    this.letra;
    this.intervaloTroca = round(random(2,20));

    this.pegandoSimboloAleatorio =  function(){
        if(frameCount % this.intervaloTroca == 0){
            this.letra = String.fromCharCode(
                0x30A0 + round(random(0,96))
            );
        }
    }
    this.render = function(){
        if(primeiraLetra){
        fill(0,255,180);
        }else{
            fill(0,255,70)
        }
        text(this.letra, this.x, this.y);
        this.chuva();
        this.pegandoSimboloAleatorio();
    }
    this.chuva = function(){
        if(this.y > height){
            this.y = 0;
        }else{
            this.y += this.velocidade;
        }   
    }
}
function stream(){
    this.totalSimbolos = round(random(5,30));
    this.simbolos = [];
    this.velocidade = round(random(5,20));

    this.gerarSimbolos = function(x,y){
        var primeiraLetra = true;

        for(var i = 0; i <= this.totalSimbolos; i++){
            var brilhoLetra = round(random(0,10)) == 1; 
            unicosimbolo = new simbolo(x,y,this.velocidade, brilhoLetra);
            unicosimbolo.pegandoSimboloAleatorio();
            this.simbolos.push(unicosimbolo);
            y -= tamanhoSimbolos; 
        }
    }
    this.render = function(){
        this.simbolos.forEach(function(simbolo){
            simbolo.render();
        });
    }
}
