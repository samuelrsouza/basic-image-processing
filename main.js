var image = document.getElementById("image");
var canvas = document.getElementById('image-canvas');
var context;

let load = function (){
    
    context = canvas.getContext('2d');
    canvas.width = image.width;
    canvas.height = image.height;
    context.drawImage(image, 0, 0);
}

let drawImage = function(cv, ctx, img) {
    cv.width = img.width;
    cv.height = img.height;
    ctx.drawImage(img, 0, 0);
}

let greyScale = function() {
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    let img = new MatrixImage(imageData);
    for (var i = 0; i < img.width; i++) {
        for (var j = 0; j < img.height; j++) {
            var pixel = img.getPixel(i,j);
            var gray = (pixel.red + pixel.green + pixel.blue) / 3; 
            img.setPixel(i, j, new RGBColor(gray, gray, gray));
            
        }
    }
    context.putImageData(img.imageData, 0, 0);
}

let mean = function() {
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    let img = new MatrixImage(imageData);
    for (var i = 0; i < img.width; i++) {
        for (var j = 0; j < img.height; j++) {
            var pixel = Array();
            pixel.push(img.getPixel(i-1,j-1).red);
            pixel.push(img.getPixel(i,j-1).red);
            pixel.push(img.getPixel(i+1,j-1).red);
            pixel.push(img.getPixel(i-1,j).red);
            pixel.push(img.getPixel(i,j).red);
            pixel.push(img.getPixel(i+1,j).red);
            pixel.push(img.getPixel(i-1,j+1).red);
            pixel.push(img.getPixel(i,j+1).red);
            pixel.push(img.getPixel(i+1,j+1).red);
            var gray = pixel.reduce((a, b) => a + b, 0) / 9;
    
            img.setPixel(i, j, new RGBColor(gray, gray, gray));
        }
    }
    context.putImageData(img.imageData, 0, 0);
}

let thresholding = function() {
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    let img = new MatrixImage(imageData);

    for (var i = 0; i < img.width; i++) {
        for (var j = 0; j < img.height; j++) {
            
        }
    }
    context.putImageData(img.imageData, 0, 0);
}

let redFilter = function () {
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    let img = new MatrixImage(imageData);

    for (var i = 0; i < img.width; i++) {
        for (var j = 0; j < img.height; j++) {
            var pixel = img.getPixel(i,j);
            img.setPixel(i, j, new RGBColor(pixel.red, 48, 50));
        }
    }
    context.putImageData(img.imageData, 0, 0);
}

let blueFilter = function () {
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    let img = new MatrixImage(imageData);

    for (var i = 0; i < img.width; i++) {
        for (var j = 0; j < img.height; j++) {
            var pixel = img.getPixel(i,j);
            img.setPixel(i, j, new RGBColor(25, 25, pixel.blue));
        }
    }
    context.putImageData(img.imageData, 0, 0);
}

let greenFilter = function () {
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    let img = new MatrixImage(imageData);

    for (var i = 0; i < img.width; i++) {
        for (var j = 0; j < img.height; j++) {
            var pixel = img.getPixel(i,j);
            img.setPixel(i, j, new RGBColor(23, pixel.green, 32));
        }
    }
    context.putImageData(img.imageData, 0, 0);
}


let brightness = function () {
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    let img = new MatrixImage(imageData);

    for (var i = 0; i < img.width; i++) {
        for (var j = 0; j < img.height; j++) {
            var pixel = img.getPixel(i,j);
            img.setPixel(i, j, new RGBColor(pixel.red+10, pixel.green+10, pixel.blue+10));
        }
    }
    context.putImageData(img.imageData, 0, 0);
}

let invertColors = function(){
    let imageData = context.getImageData(0, 0, image.width, image.height);
    let img = imageData.data;

    for(var i = 0; i < img.length; i += 4){
        var r = img[i]; 
        var g = img[i + 1]; 
        var b = img[i + 2]; 
        var a = img[i + 3];
        var invertedRed = 255 - r;
        var invertedGreen = 255 - g;
        var invertedBlue = 255 - b;

        img[i] = invertedRed;
        img[i + 1] = invertedGreen;
        img[i + 2] = invertedBlue;
    }   
    context.putImageData(imageData, 0, 0);
}


let flip90R = function(){
    context.clearRect(0,0,canvas.width,canvas.height);
    context.save();
    canvas.width = image.height;
    canvas.height = image.width;
    context.translate(canvas.width/2,canvas.height/2);
    context.rotate(Math.PI/2);
    context.drawImage(image, -image.width/2, -image.height/2);
    context.restore();
}

let flip360 = function(){
    context.clearRect(0,0,canvas.width,canvas.height);
    context.save();
    context.translate(canvas.width/2,canvas.height/2);
    context.rotate(180*Math.PI/180);
    context.drawImage(image, -image.width/2, -image.height/2);
    context.restore();
}

let flip90L = function(){
    context.clearRect(0,0,canvas.width,canvas.height);
    context.save();
    canvas.width = image.height;
    canvas.height = image.width;
    context.translate(canvas.width/2,canvas.height/2);
    context.rotate(270*Math.PI/180);
    context.drawImage(image, -image.width/2, -image.height/2);
    context.restore();
}




class RGBColor {
    constructor(r, g, b) {
      this.red = r;
      this.green = g; 
      this.blue = b;
    }
}

class MatrixImage {
    constructor(imageData) {
      this.imageData = imageData;
      this.height = imageData.height; 
      this.width = imageData.width;
    }

    getPixel(x, y) {
        let position = ((y * (this.width * 4)) + (x * 4));

        return new RGBColor(
             this.imageData.data[position],   //red
             this.imageData.data[position+1], //green
             this.imageData.data[position+2], //blue
        );
    }

    setPixel(x, y, color) {
        let position = ((y * (this.width * 4)) + (x * 4));
        this.imageData.data[position] = color.red;
        this.imageData.data[position+1] = color.green;
        this.imageData.data[position+2] = color.blue;
    }
}

window.onload = load();
document.getElementById('btnLoad').addEventListener('click', load);
document.getElementById('btnGrayScale').addEventListener('click', greyScale);
document.getElementById('btnMean').addEventListener('click', mean);
document.getElementById('btnRedFlag').addEventListener('click', redFilter);
document.getElementById('btnBlueFlag').addEventListener('click', blueFilter);
document.getElementById('btnGreenFlag').addEventListener('click', greenFilter);
document.getElementById('btnBrightness').addEventListener('click', brightness);
document.getElementById('btnInvertColours').addEventListener('click', invertColors);


document.getElementById('btnFlip90R').addEventListener('click', flip90R);
document.getElementById('btnFlip90L').addEventListener('click', flip90L);
document.getElementById('btnFlip360').addEventListener('click', flip360);

