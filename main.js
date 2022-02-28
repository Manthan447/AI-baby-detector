img = "";
status = "";
objects = [] ;
song ="";

function preload(){
 song =loadSound("ringing_old_phone.mp3");
}

function setup(){
    canvas = createCanvas(380 , 380);
    canvas.center();
    video= createCapture(VIDEO); 
    video.size(380,380);
    video.hide();
    Object_detector = ml5.objectDetector("cocossd" , Modeloaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects" ; 
}

function draw(){
    image(video,0,0,380,380);
    if(status != ""){
        r = random(255);
        g = random(255);
        b = random(255);
        Object_detector.detect(video , gotResult)
        for(i = 0 ;i< objects.length ; i++){
            document.getElementById("status").innerHTML = "Status : object detected" ;
            fill(r,g,b);
            percent = Math.floor(objects[i].confidence *100);
            stroke(r,g,b);
            noFill();
            text(objects[i].label + " "+ percent + "%" , objects[i].x + 15 , objects[i].y+15);
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
            if(objects[i].label == "person"){
            document.getElementById("no_of_Objects").innerHTML = "Baby Found" ;
            song.stop();
            }
            else{
              song.play();
              document.getElementById("no_of_Objects").innerHTML = "Baby not found";
            }

            if(objects.length == 0){
                document.getElementById("no_of_Objects").innerHTML  = "Baby not Found";
                song.play();
            }
        }
    }
}

function Modeloaded(){
    console.log("Model Initialized");
    status = true; 
}

function gotResult(error , results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects  = results;
    }
}