var webcamImage;
var webcamWidth, webcamHeight;
let eyeModel;
var eyeXpos, eyeYpos;

var glitchNum;
var glitchWebcam = [];
var newWebcam;



function preload() {
    webcamImage = createCapture(VIDEO);
    eyeModel = loadModel('asset/eye3d.obj', true);
}

function setup() {
    pixelDensity(10);

    webcamWidth = windowWidth/2;
    webcamHeight = windowHeight/1.5;

    eyeXpos = 0;
    eyeYpos = 0;
 
    var myCanvas = createCanvas(windowWidth-2, windowHeight-2, WEBGL);
    myCanvas.position(0, 0);
    myCanvas.style('z-index', '-1');
    // createCanvas(windowWidth-10, windowHeight-10, WEBGL);

    frameRate(7);

    webcamImage.style('z-index', '-1');
    webcamImage.size(webcamWidth*2.2, webcamHeight*2.2);
    webcamImage.position(windowWidth/2-webcamWidth/2, windowHeight/2-webcamHeight/2);

    glitchNum = 30;


}

function draw() {

    // background(0);

    // webcamImage.style('z-index', '-1');
    // webcamImage.size(webcamWidth*2, webcamHeight*2);
    // webcamImage.position(windowWidth/2-webcamWidth*2/2, windowHeight/2-webcamHeight*2/2);
    

    webcamImage.loadPixels();
    webcamImage.hide();


    for(let i=0; i<glitchNum; i++){

        newWebcam = [];

        newWebcam.img = webcamImage;

        newWebcam.sx = webcamImage.width / glitchNum * i;
        newWebcam.sy = 0;
        newWebcam.sw = webcamImage.width / glitchNum;
        newWebcam.sh = webcamImage.height;

        newWebcam.dx = webcamImage.width / glitchNum * i + random(-20, 20);
        newWebcam.dy = webcamImage.height / glitchNum + random(-20, 20);
        newWebcam.dw = webcamImage.width / random(glitchNum-20, glitchNum+20);
        newWebcam.dh = webcamImage.height;

        // print(newWebcam);
        glitchWebcam.push(newWebcam);

        glitchWebcam.splice(0, glitchWebcam.length-glitchNum);

    }


    scale(-1, 1);
    translate(-webcamWidth*2.2/2, -webcamHeight*2.2/2);
    for(let i=0; i<glitchWebcam.length; i++){
        drawGlitch(glitchWebcam[i]);
    }
    resetMatrix();

   
    ambientLight(60, 60, 60);
    pointLight(255, 255, 255, -200, -200, 500);


    eyeXpos = random(-10,10);
    eyeYpos = random(-10,10);

    translate(eyeXpos, eyeYpos);
    scale(3);
    rotateX(random(-PI/12, PI/12));
    rotateY(random(-PI/12, PI/12));
    noStroke();
    fill(230);
    model(eyeModel);
    
    
    translate(0, 0, 70);
    scale(-1, 1);
    rotateX(-PI/30);
    rotateY(PI);
    texture(webcamImage);
    sphere(35);
    

}


function drawGlitch(imgIn) {

    image(imgIn.img, imgIn.dx, imgIn.dy, imgIn.dw, imgIn.dh, imgIn.sx, imgIn.sy, imgIn.sw, imgIn.sh);

}





//fullscreen--from p5js reference
function mousePressed() {
    if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
      let fs = fullscreen();
      fullscreen(!fs);
    }
  }