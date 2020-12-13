var video;

var vScale = 9;

let poseNet;
let noseX = 0;
let noseY = 0;
let eyelX = 0;
let eyelY = 0;
let eyelX2 = 0;
let eyelY2 = 0;
let sizex = 1280;
let sizey = 960;

let on = 0;

function preload() {

  // video.hide();
}

function setup() {
  createCanvas(sizex, sizey);
  video = createCapture(VIDEO);
  pixelDensity(1);
  video.size(width / vScale, height / vScale);
  // video.hide();


  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', gotPoses);
}

function gotPoses(poses) {
  // console.log(poses);
  if (poses.length > 0) {
    let nX = poses[0].pose.keypoints[0].position.x;
    let nY = poses[0].pose.keypoints[0].position.y;
    let eX = poses[0].pose.keypoints[1].position.x;
    let eY = poses[0].pose.keypoints[1].position.y;
    let eX2 = poses[0].pose.keypoints[2].position.x;
    let eY2 = poses[0].pose.keypoints[2].position.y;
    noseX = lerp(noseX, nX, 0.5);
    noseY = lerp(noseY, nY, 0.5);
    eyelX = lerp(eyelX, eX, 0.5);
    eyelY = lerp(eyelY, eY, 0.5);
    eyelX2 = lerp(eyelX2, eX2, 0.5);
    eyelY2 = lerp(eyelY2, eY2, 0.5);
  }
}

function modelReady() {
  console.log('model ready');
}

function draw() {
  background(51);
  if (on == 0){
    fill(255);
    textSize(55);
    textAlign(CENTER)
    text('Would you like to begin the experience?', width/2, height/5);
    text('Skin Tone: The Interface of Judgement', width/2, height/5+60)
    text('Press Enter to begin', width/2, height/5+120)
    text('Press B for Black', width/2, height/5+180)
    text('Press R for Red', width/2, height/5+240)
    text('Press W for White', width/2, height/5+300)
    text('Press N for you will see', width/2, height/5+360)
    video.hide();
  }
if (on == 1){
  scale(vScale)
  image(video, 0, 0);
}
if (on == 2){
  pixelizationRed();
  fill('white')
  // textAlign(CENTER)
  text('R is for Red', width/2, height/5+240)
}
if (on == 3){
  pixelizationBlack();
  fill('white')
  text('B is for Black', width/2, height/5+240)
}
if (on == 4){
  pixelizationWhite();
  fill('black')
  text('W is for White', width/2, height/5+240)
}
if (on == 5){

  text('This option does not exist', width/2, height/5+240)
}
}
function keyPressed(){
  if (keyCode === ENTER){
    on = 1;
  }
  // Letter R red pixels
  if (keyCode === 82){
    on = 2;
  }
  // Letter B black pixels
  if (keyCode === 66){
    on = 3;
  }
  //Letter W white pixels
  if (keyCode === 87){
    on = 4;
  }
  //Letter N no pixels
  if (keyCode === 78){
    on = 5;
  }
}

function pixelizationBlack() {
  push();
  scale(vScale);
  tint(255, 50)
  image(video, 0, 0);
  pop();

  // video.size(width / vScale, height / vScale);
  video.loadPixels();
  for (var y = 0; y < video.height; y++) {
    for (var x = 0; x < video.width; x++) {
      var index = (video.width - x + 1 + (y * video.width)) * 4;
      var r = video.pixels[index + 0];
      var g = video.pixels[index + 1];
      var b = video.pixels[index + 2];
      var bright = (r + g + b) / 3;
      var w = map(bright, 0, 255, 0, vScale);
      noStroke();
      fill(0);
      rectMode(CENTER);
      rect(x * vScale, y * vScale, w, w);

    }
  }
  video.hide()
}
function pixelizationRed() {
  push();
  scale(vScale);
  tint(255, 50)
  image(video, 0, 0);
  pop();

  // video.size(width / vScale, height / vScale);
  video.loadPixels();
  for (var y = 0; y < video.height; y++) {
    for (var x = 0; x < video.width; x++) {
      var index = (video.width - x + 1 + (y * video.width)) * 4;
      var r = video.pixels[index + 0];
      var g = video.pixels[index + 1];
      var b = video.pixels[index + 2];
      var bright = (r + g + b) / 3;
      var w = map(bright, 0, 255, 0, vScale);
      noStroke();
      fill('red');
      rectMode(CENTER);
      rect(x * vScale, y * vScale, w, w);

    }
  }
  video.hide()
}
function pixelizationWhite() {
  push();
  scale(vScale);
  tint(255, 50)
  image(video, 0, 0);
  pop();

  // video.size(width / vScale, height / vScale);
  video.loadPixels();
  for (var y = -5; y < video.height+10; y++) {
    for (var x = 0; x < video.width; x++) {
      var index = (video.width + x + 1 + (y * video.width)) * 4;
      var r = video.pixels[index + 0];
      var g = video.pixels[index + 1];
      var b = video.pixels[index + 2];
      var bright = (r + g + b) / 3;
      var w = map(bright, 0, 255, 0, vScale);
      noStroke();
      fill('white');
      rectMode(CENTER);
      rect(x * vScale+10, y * vScale+15, w, w);

    }
  }
  video.hide()
}
