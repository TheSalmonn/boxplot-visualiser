/** @type {HTMLCanvasElement} */
var canvas = document.getElementById("canvas");
/** @type {CanvasRenderingContext2D} */
var ctx = canvas.getContext("2d");

var canvasWidth = 800;
var canvasHeight = 600;

var currentDataSets = [];
var boxplotHeight = 16;
var boxplotSpacer = 32;

var numberLineMin = -Infinity;
var numberLineMax = Infinity;
var numberLineRange = numberLineMax-numberLineMin;
var numberLineMag;
var numberLineRoundingFactor;
var numberLineMajorFreq = 10;
var numberLineMinorFreq = 5;

var numberLineCentre;
var numberLineWidth;
var numberLineStart;
var numberLineEnd;
var numberLineYPos;

function start() {
    numberLineCentre = canvasWidth/2;
    numberLineWidth = 700;
    numberLineStart = numberLineCentre-numberLineWidth/2;
    numberLineEnd = numberLineCentre+numberLineWidth/2;
    numberLineYPos = 50;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx.translate(0, canvasHeight);
    ctx.scale(1, -1);

    for (let c = 0; c < 16; c++) {
        let subjectSet = [];
        for (let i = 0; i < 20; i++) {
            let num = Math.random()*3;
            subjectSet.push(num);
        }
        currentDataSets.push(new DataSet([...subjectSet]));
    }

    defineNumberLine();
    drawNumberLine();
    for (let i = 0; i < currentDataSets.length; i++) {
        currentDataSets[i].drawBoxPlot();
    }

    // loop();
}

function loop() {
    setInterval(() => {
        
    }, 1000/30);
}

function defineNumberLine() {
    // Define number line extremeties
    var mins = [];
    var maxs = [];
    currentDataSets.forEach(dataSet => {
        mins.push(dataSet.min);
        maxs.push(dataSet.max);
    });
    numberLineMin = Math.min(...mins);
    numberLineMax = Math.max(...maxs);
    
    // Snap extremeties to zero
    numberLineRange = numberLineMax-numberLineMin;
    if (numberLineMin-numberLineRange*0.2 < 0 && numberLineMin > 0) numberLineMin = 0;
    if (numberLineMax+numberLineRange*0.2 > 0 && numberLineMax < 0) numberLineMax = 0;
    
    // Snap extremeties to 10^(mag-1)
    numberLineMag = Math.floor(Math.log10(numberLineRange));
    numberLineRoundingFactor = Math.pow(10, numberLineMag-1);
    numberLineMin = Math.floor(numberLineMin/numberLineRoundingFactor)*numberLineRoundingFactor;
    numberLineMax = Math.ceil(numberLineMax/numberLineRoundingFactor)*numberLineRoundingFactor;
}

function drawNumberLine() {
    ctx.beginPath();
    // Line
    ctx.moveTo(numberLineStart, numberLineYPos);
    ctx.lineTo(numberLineEnd, numberLineYPos);
    // Extremeties
    ctx.moveTo(numberLineStart, numberLineYPos-20);
    ctx.lineTo(numberLineStart, numberLineYPos);
    ctx.moveTo(numberLineEnd, numberLineYPos-20);
    ctx.lineTo(numberLineEnd, numberLineYPos);
    ctx.stroke();

    // Draw numbers
    ctx.scale(1, -1);
    ctx.translate(0, -canvasHeight);

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    
    // Extremety text
    ctx.font = "12px Arial";
    ctx.fillText(Math.round(numberLineMin/numberLineRoundingFactor)*numberLineRoundingFactor, numberLineStart, canvasHeight-numberLineYPos+30);
    ctx.fillText(Math.round(numberLineMax/numberLineRoundingFactor)*numberLineRoundingFactor, numberLineEnd, canvasHeight-numberLineYPos+30);
    
    // Major whiskers and text
    ctx.font = "10px Arial";
    for (let i = 1; i < numberLineMajorFreq; i++) {
        let num = lerp(numberLineMin, numberLineMax, i/numberLineMajorFreq);
        let pos = lerp(numberLineStart, numberLineEnd, inverseLerp(numberLineMin, numberLineMax, num));
        ctx.fillText(parseFloat((Math.round(num/numberLineRoundingFactor)*numberLineRoundingFactor).toFixed(6)), pos, canvasHeight-numberLineYPos+20);
        ctx.beginPath();
        ctx.moveTo(pos, canvasHeight-numberLineYPos);
        ctx.lineTo(pos, canvasHeight-numberLineYPos+10);
        ctx.stroke();
    }

    ctx.translate(0, canvasHeight);
    ctx.scale(1, -1);
}

function lerp(a, b, t) {
    return a + (b - a) * t;
}

function inverseLerp(a, b, value) {
    if (a != b)
        return (value - a) / (b - a);
    else
        return 0;
}

class DataSet {
    data = [];
    sorted = [];

    /** @param {number[]} initalData */
    constructor(initalData = []) {
        this.data = initalData;
        this.sorted = [...this.data].sort((a, b) => a - b);
    }

    drawBoxPlot() {
        var offset = currentDataSets.indexOf(this)*boxplotSpacer+boxplotSpacer;

        var minPos = lerp(numberLineStart, numberLineEnd, inverseLerp(numberLineMin, numberLineMax, this.min));
        var q1Pos = lerp(numberLineStart, numberLineEnd, inverseLerp(numberLineMin, numberLineMax, this.q1));
        var medPos = lerp(numberLineStart, numberLineEnd, inverseLerp(numberLineMin, numberLineMax, this.median));
        var q3Pos = lerp(numberLineStart, numberLineEnd, inverseLerp(numberLineMin, numberLineMax, this.q3));
        var maxPos = lerp(numberLineStart, numberLineEnd, inverseLerp(numberLineMin, numberLineMax, this.max));

        // Fills
        ctx.fillStyle = "gainsboro";
        ctx.fillRect(q1Pos, numberLineYPos+offset-boxplotHeight/2, q3Pos-q1Pos, boxplotHeight);
        
        // Strokes
        ctx.fillStyle = "black";
        ctx.beginPath();
        // Min
        ctx.moveTo(minPos, numberLineYPos+offset-boxplotHeight/2);
        ctx.lineTo(minPos, numberLineYPos+offset+boxplotHeight/2);
        // Max
        ctx.moveTo(maxPos, numberLineYPos+offset-boxplotHeight/2);
        ctx.lineTo(maxPos, numberLineYPos+offset+boxplotHeight/2);
        // Quartile lines
        ctx.moveTo(minPos, numberLineYPos+offset);
        ctx.lineTo(q1Pos, numberLineYPos+offset);
        ctx.moveTo(q3Pos, numberLineYPos+offset);
        ctx.lineTo(maxPos, numberLineYPos+offset);
        // Inter-quartile range
        ctx.rect(q1Pos, numberLineYPos+offset-boxplotHeight/2, q3Pos-q1Pos, boxplotHeight);
        // Median
        ctx.moveTo(medPos, numberLineYPos+offset-boxplotHeight/2);
        ctx.lineTo(medPos, numberLineYPos+offset+boxplotHeight/2);
        ctx.stroke();
    }
    
    get min() {
        return this.sorted[0]
    }

    get max() {
        return this.sorted[this.sorted.length-1];
    }

    get range() {
        return this.max-this.min;
    }

    get size() {
        return this.data.length;
    }

    get sum() {
        var sum = 0;
        this.data.forEach(item => {
            sum+=item;
        });
        return sum;
    }
    
    get mean() {
        return this.sum/this.data.length;
    }

    get median() {
        var pos = (this.data.length+1)/2-1;
        return (this.sorted[Math.floor(pos)] + this.sorted[Math.ceil(pos)]) / 2;
    }

    get mode() {
        //
    }

    get midrange() {
        return (this.min+this.max)/2;
    }

    get q1() {
        var odd = this.sorted.length%2==0 ? 0 : 1;
        var h1 = [...this.sorted].splice(0, Math.ceil(this.sorted.length/2)+odd);
        var pos = (h1.length+1)/2-1;
        return (h1[Math.floor(pos)] + h1[Math.ceil(pos)]) / 2;
    }


    get q3() {
        var odd = this.sorted.length%2==0 ? 0 : 1;
        var h3 = [...this.sorted].splice(-Math.ceil(this.sorted.length/2)+odd);
        var pos = (h3.length+1)/2-1;
        return (h3[Math.floor(pos)] + h3[Math.ceil(pos)]) / 2;
    }

    get IQR() {
        return this.q3-this.q1;
    }

    get lowerFence() {
        return this.q1-1.5*this.IQR;
    }

    get upperFence() {
        return this.q3+1.5*this.IQR;
    }
}

start();