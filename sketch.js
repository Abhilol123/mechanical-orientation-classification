// Setup
const inputSignal = [];
const res = 1654; // Samples per second
const startFreq = 0;
const endFreq = 100;

// graph
const resfact = 100;
const rowno = 1;
const colno = 1;
const fileName = "test5_tight"; // File Name

let myFFT = [];
let factor;

let table;
let c;
let fftSolution = [];

function preload() {
    table = loadTable("datanew/" + fileName + ".csv", "csv");
}

function setup() {
    c = createCanvas(1000, 400);
    for (let i = colno; i < table.rows.length; i++) {
        inputSignal.push(parseFloat(table.rows[i]["arr"][rowno]));
    }
    drawSomething();
}

function drawSomething() {
    background(51);

    let valX = 0;
    let valY = 0;

    myFFT.maxi = 0;
    myFFT.freq = 0;

    let frequency = startFreq;

    for (let j = startFreq * resfact; j < endFreq * resfact; j++) {
        factor = 2 * j/resfact * Math.PI / res;
        valX = 0;
        valY = 0;
        for (let i = 0; i < inputSignal.length; i++) {
            const r = 100 * inputSignal[i];
            let x = r * Math.cos(i * factor);
            let y = r * Math.sin(i * factor);
            valX += x;
            valY += y;
        }

        frequency = frequency + (endFreq - startFreq)/(resfact * 100);
        const num = dist(valX, valY, 0, 0, 0, 0);

        myFFT.push([frequency, num]);

        if (num > myFFT.maxi) {
            myFFT.maxi = num;
            myFFT.freq = j/resfact;
        }
    }

    stroke(255);
    strokeWeight(1);
    noFill();

    beginShape();
    fftSolution.push(["Frequency", "value"]);
    for (let i = 0; i < myFFT.length; i++) {
        fftSolution.push([myFFT[i][0], height - map(myFFT[i][1], 0, myFFT.maxi, height, 0)]);
        vertex(map(i, 0, myFFT.length, 0, width), map(myFFT[i][1], 0, myFFT.maxi, height, 0));
    }
    endShape();

    // saveCanvas(c, "graph-" + fileName, "jpg");
    // save(fftSolution, "FFT-" + fileName + ".csv", "csv");
}

function mousePressed() {
    if (mouseX > 0 && mouseX < width && mouseY < height && mouseY > 0) {
        let a = map(mouseX, 0, width, startFreq, endFreq);
        alert(a);
    }
}
