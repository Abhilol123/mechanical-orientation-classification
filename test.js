// Setup
const inputSignal = [];
const res = 1654;
const startFreq = 0;
const tillFreq = 100;

// graph
const resfact = 100;
const rowno = 1;
const colno = 1;
const fileName = "test1_tight";

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

    let frequency = 0;

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
        console.log(frequency);

        const num = dist(valX, valY, 0, 0, 0, 0);

        myFFT.push(num);

        if (num > myFFT.maxi) {
            myFFT.maxi = num;
            myFFT.freq = j/resfact;
        }
    }

    stroke(255);
    strokeWeight(1);
    noFill();

    beginShape();
    for (let i = 0; i < myFFT.length; i++) {
        fftSolution.push(height - map(myFFT[i], 0, myFFT.maxi, height, 0));
        vertex(map(i, 0, myFFT.length, 0, width), map(myFFT[i], 0, myFFT.maxi, height, 0));
    }
    endShape();
    
    // console.log(myFFT.freq);

    // saveCanvas(c, "graph-" + fileName, "jpg");
    // save(fftSolution, "graph-" + fileName + ".csv", "csv");
    // save(inputSignal, fileName + ".csv", "csv");
}

function mousePressed() {
    let a = map(mouseX, 0, width, startFreq, endFreq);
    alert(a);
    // console.log(a);
}
