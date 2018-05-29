var c=document.querySelector("#c");
var ctx=c.getContext("2d");
var time=0;
var xA,xB,yA,yB,velocityx,velocityy;
ctx.translate(50,50);
var r=Math.random()*5;//r stores a random no.
var a=Math.random()*50+25;   //start x-postion of tank a
var b=Math.random()*50+1050; //start x-postion of tank b
xA=a+25;//bullet start x-postion from tank A
yA=475; //bullet start x-postion from tank A
xB=b+25;//bullet start x-postion from tank B
yB=475; //bullet start x-postion from tank B
var velocity=100;
var angleA;
var angleB;
var inc=0.02;
var turn=0;
var interval;
var counter=0;

var x;
var y;
var columnCount=70+r;
var height=10;
var width=20;
var scoreA=0;
var scoreB=0;
var timeOut;

//function to close the start window
function start(){         
    console.log("hey!"); 
    document.getElementById("startWindow").style.display="none";
}

//checks for collision in mountain
function  collisionMountain() {
    for(var i=0; i<columnCount; i++) {
        for(var j=0; j<i; j++) {
            var b = stones[i][j];
            if(b.status == 1) {
              
              if(turn==1)
              {  
                  if(xA > b.x && xA < b.x+3*width && yA > b.y && yA < b.y+2*height) {
                   
                       b.status = 0;
                       clearInterval(interval);
                       drawstones();
                       drawTanks();
                       document.getElementById("fire").disabled=false;
                       document.getElementById("A").style.color="white";
                       document.getElementById("B").style.color="blue";
                       clearTimeout(timeOut);
         
                  }
              }
              else if(turn==0)
                   if(xB > b.x && xB < b.x+3*width && yB > b.y && yB < b.y+2*height) {
                    
                    
                       b.status = 0;
                       clearInterval(interval);
                       drawstones();
                       drawTanks();
                       document.getElementById("fire").disabled=false;
                       document.getElementById("B").style.color="white";
                      document.getElementById("A").style.color="blue";
                      clearTimeout(timeOut);

                }
            
            }
        }
    } 
}



//checks for collision in tanks
function  collisionTanks() {

    if(turn==1){
        if(xA-2 >=b-10 && xA+2 <= b+60 && yA-2 >=465  && yA+2 <=500 ) {
            scoreA++;
            document.getElementById("scoreA").innerHTML=scoreA;
            clearInterval(interval);
            drawstones();
            drawTanks();
            console.log("yayA");

          }
    }
    else if(turn==0)
        if(xB-2 >=a-10 && xB+2 <= a+60 && yB-2 >=465  && yB+2 <=500 ) {
            console.log("yayB");
            scoreB++;
            document.getElementById("scoreB").innerHTML=scoreB;
            clearInterval(interval);
            drawstones();
            drawTanks();
       }
            
        
}



//store the structure of mountain
var stones = [];
for(var i=0; i<columnCount; i++) {
    stones[i] = [];
    for(var j=0; j<i; j++) {
        stones[i][j] = { x: 0, y: 0 , status:1 };
    }
}
//defines the structure of mountain
function drawstones() {
    ctx.fillStyle="rgba(135,206,245,1)";
    ctx.fillRect(5,5,1250,500);
    for(var i=0,X=675+3*r,Y=120-2*r,j; i<columnCount; i++,X=600-(j*10.5)/2,Y+=5.5) {
        for( j=0; j<i; j++,X+=10.5) {

            if(stones[i][j].status==1){
                stones[i][j].x =  X;
                stones[i][j].y =  Y;
                ctx.beginPath();
                ctx.rect( X,  Y, width+r, height);
                ctx.fillStyle="rgba(150,60,40,1)";
                ctx.fill();
                ctx.closePath();
            }

        }

    }
    ctx.fillRect(5,493,1250,7);
}

drawstones();
drawTanks();



//to draw tanks
function drawTanks(){
    ctx.fillStyle="red";
 
    ctx.beginPath();
    ctx.moveTo(a,490);
 	  ctx.lineTo(a+50,490);
 	  ctx.lineTo(a+50,480);
 	  ctx.lineTo(a+35,480);
 	  ctx.lineTo(a+25,475);
 	  ctx.lineTo(a+10,480);
 	  ctx.lineTo(a,480);
 	  ctx.lineTo(a,490);
 	  ctx.fill();
 	  ctx.stroke();
 
    ctx.fillStyle="yellow";
    
 	  ctx.beginPath();
 	  ctx.moveTo(b,490);
 	  ctx.lineTo(b+50,490);
 	  ctx.lineTo(b+50,480);
 	  ctx.lineTo(b+35,480);
 	  ctx.lineTo(b+25,475);
 	  ctx.lineTo(b+10,480);
 	  ctx.lineTo(b,480);
 	  ctx.lineTo(b,490);
 	  ctx.fill();
 	  ctx.stroke();
}


//velocityx = 100;
//velocityy=100;

//function that calls appropriate projectile func 
function fire(){
    console.log(counter);
    if(counter==10){
        document.getElementById("gameOver").style.display="block"; 
        if(scoreB<scoreA)
            document.getElementById("win").innerHTML="Player A wins!!";
        else if(scoreA==scoreB)
            document.getElementById("win").innerHTML="It's a tie!";
        else
            document.getElementById("win").innerHTML="Player B wins!!"

    }
    if(counter<10){
        if(turn==0){ 
            
            clearInterval(interval);
            angleA=document.getElementById("angleA").value;
            xA=a+25;//bullet start x-postion from tank A
            yA=475; //bullet start x-postion from tank A
            velocityx =velocity*Math.cos(angleA*Math.PI/180);
            velocityy=velocity*Math.sin(angleA*Math.PI/180);
            time=0;
            console.log("heyA");
            setTimeout(projectileA);
            interval=setInterval(projectileA,100); 
            document.getElementById("fire").disabled=true;
         timeOut=setTimeout(function(){
                document.getElementById("A").style.color="white";
                document.getElementById("B").style.color="blue";
                document.getElementById("fire").disabled = false;
     }, 10000);
    
            turn=1;


        }
    else{
      
        clearInterval(interval);
        angleB=document.getElementById("angleB").value;
        xB=b+25;//bullet start x-postion from tank B
        yB=475; //bullet start x-postion from tank B
        velocityx =velocity*Math.cos(angleB*Math.PI/180);
        velocityy=velocity*Math.sin(angleB*Math.PI/180);
        time=0;
        console.log("heyB");

        setTimeout(projectileB);
        interval= setInterval(projectileB,100); 
        document.getElementById("fire").disabled=true;
         timeOut=setTimeout(function(){
                document.getElementById("B").style.color="white";
                document.getElementById("A").style.color="blue";
       document.getElementById("fire").disabled = false;
     }, 9000);
        turn=0;
        }
    counter++;
   }


}

//projectile for A
function projectileA(){
    drawstones();
    drawTanks();
    velocityy = velocityy - 8.5*time;
    ctx.beginPath();
    
    
    
    xA=xA+velocityx*time;
    yA=yA-velocityy*time;
    ctx.arc(xA,yA,2,0,Math.PI*2);
    ctx.fillStyle="black";
    ctx.fill();
    time +=inc;
    collisionMountain();
    collisionTanks();
}

//projectile for B
function projectileB(){
    
    drawstones();
    drawTanks();
    velocityy = velocityy - 8.5*time;
    ctx.beginPath();
    
    
    xB=xB-velocityx*time;
    yB=yB-velocityy*time;
    ctx.arc(xB,yB,2,0,Math.PI*2);
    ctx.fillStyle="black";
    ctx.fill();
    time +=inc;
     collisionMountain();
     collisionTanks();
}


function leftA(){ //controls for reducing angles in A
    var A= document.getElementById("angleA").value;
    if(A>0)
    A--;
    document.getElementById("angleA").value=A;
}

//controls for increasing angles in A
function rightA(){  
    var A= document.getElementById("angleA").value;
    if(A<90)
    A++;
    document.getElementById("angleA").value=A;

}

//controls for reducing angles in B
function leftB(){ 
    var B= document.getElementById("angleB").value;
    if(B>0)
    B--;
    document.getElementById("angleB").value=B;
}



//controls for increasing angles in B
function rightB(){  
    var B= document.getElementById("angleB").value;
    if(B<90)
    B++;
    document.getElementById("angleB").value=B;

}

