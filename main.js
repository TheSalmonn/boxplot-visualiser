/** @type {HTMLCanvasElement} */
var canvas = document.getElementById("canvas");
/** @type {CanvasRenderingContext2D} */
var ctx = canvas.getContext("2d");

var canvasWidth = 800;
var canvasHeight = 600;

var currentDataSet;

var preferredAccuracy = 20;

function start() {
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx.translate(0, canvasHeight);
    ctx.scale(1, -1);

    // currentDataSet = new DataSet([1459, 916, 11, 1201, 198, 159, 957, 294, 331, 664, 642, 764, 799, 473, 303, 1288, 1108, 222, 891, 319, 344, 1406, 611, 977, 182, 766, 179, 324, 674, 648, 1483, 973, 1440, 57, 1087, 1495, 1427, 455, 727, 726, 626, 321, 1197, 1259, 716, 1139, 1276, 1136, 126, 383, 433, 72, 640, 68, 1034, 458, 874, 500, 929, 820, 274, 494, 1438, 260, 134, 1076, 1255, 596, 9, 359, 1493, 1439, 202, 1453, 338, 794, 1454, 907, 983, 196, 1447, 88, 112, 1244, 487, 176, 1045, 1190, 163, 609, 591, 602, 238, 1424, 1343, 1065, 508, 646, 577, 683, 337, 982, 841, 1367, 1451, 219, 1123, 1476, 509, 1420, 166, 293, 17, 445, 339, 485, 931, 180, 797, 239, 249, 1316, 1400, 980, 5, 363, 791, 867, 14, 1012, 707, 809, 310, 955, 910, 817, 279,315, 855, 142, 568, 1426, 558, 102, 754, 330, 899, 329, 355, 758, 204, 978, 515, 785, 90, 230, 1496, 603, 1393, 1486, 654, 1233, 132, 479, 384, 796, 605, 563, 400, 1318, 1095, 1154, 1207, 1370, 511, 1004, 187, 967, 711, 1271, 1446, 349, 448, 739, 914, 876, 1422, 217, 31, 1162, 818, 236, 706, 13, 1365, 504, 607, 472, 1366, 1248, 1412, 1385, 1227, 523, 572, 1478, 55, 318, 1485, 892, 949, 753, 1113, 85, 1287, 218, 531, 1177, 965, 1098, 953, 497, 1330, 353, 696, 934, 1337, 20, 908, 100, 637, 1152, 803, 464, 1335, 744, 740, 66, 1048, 281, 571, 326, 608, 35, 1072, 1361, 257, 671, 490, 811, 1210, 662, 1281, 372, 1057, 1073, 896, 762, 1309, 1172, 1311, 677, 1163, 1058, 185, 1067, 614, 1213, 1246, 1341, 690, 1062, 966, 1445, 178, 1146, 175, 1040, 663, 1231, 482, 397, 1052, 77, 771, 1399, 827, 1122, 369, 70, 864, 156, 405, 1328, 869, 778, 552, 258, 895, 1414, 1342, 1260, 184, 1462, 526, 661, 942, 492, 545, 288, 974, 320, 120, 1480, 736, 107, 1186, 1247, 417, 833, 1403, 419, 670, 1166, 131, 1228, 927, 1475, 710, 1395, 795, 950, 860, 628, 1187, 1301, 399, 1405, 548, 358, 1350, 420, 1347, 484, 409, 755, 93, 1164, 189, 981, 1037, 570, 819, 501, 738, 1270, 1240, 229, 247, 140, 104, 1153, 906, 1008, 1010, 269, 407, 956, 1338, 457, 1310, 271, 1155, 507, 588, 901, 675, 884, 972, 633, 731, 1009, 191, 371, 1384, 807, 1266, 1059, 4, 623, 415, 1443, 1016, 54, 416, 649, 164, 1216, 1389, 149, 295, 255, 1391, 1000, 15, 356, 106, 466, 730, 16, 270, 878, 313, 302, 643, 1411, 201, 413, 647, 1120, 562, 1132, 1297, 996, 267, 847, 481, 460, 143, 583, 911, 1133, 1381, 195, 167, 719, 757, 825, 542, 210, 1180, 1204, 276, 280, 544, 1277, 8, 86, 1413, 389, 1472, 241, 913, 945, 426, 741, 246, 305, 551, 1081, 578, 1425, 73, 1474]);
    currentDataSet = new DataSet([2, 3, 4, 5, 6, 7, 8, 20, 14]);
    // console.log("min:", currentDataSet.min);
    // console.log("max:", currentDataSet.max);
    // console.log("range:", currentDataSet.range);
    // console.log("size:", currentDataSet.size);
    // console.log("sum:", currentDataSet.sum);
    // console.log("mean:", currentDataSet.mean);
    // console.log("median:", currentDataSet.median);
    // console.log("MR:", currentDataSet.midrange);
    // console.log("q1:", currentDataSet.q1);
    // console.log("q3:", currentDataSet.q3);
    // console.log("IQR:", currentDataSet.IQR);
    // console.log("LF:", currentDataSet.lowerFence);
    // console.log("UF:", currentDataSet.upperFence);

    drawNumberLine();

    // loop();
}

function loop() {
    setInterval(() => {
        
    }, 1000/30);
}

function drawNumberLine() {
    // Draw line and whiskers
    ctx.beginPath();
    ctx.moveTo(canvasWidth/16, canvasHeight/8);
    ctx.lineTo(canvasWidth-canvasWidth/16, canvasHeight/8);
    ctx.moveTo(canvasWidth/16, canvasHeight/8-10);
    ctx.lineTo(canvasWidth/16, canvasHeight/8+10);
    ctx.moveTo(canvasWidth-canvasWidth/16, canvasHeight/8-10);
    ctx.lineTo(canvasWidth-canvasWidth/16, canvasHeight/8+10);
    ctx.stroke();
    
    var numberLine = [];
    var min = currentDataSet.min;
    if (currentDataSet.min-currentDataSet.range*0.2 < 0 && currentDataSet.min > 0) min = 0;
    var max = currentDataSet.max;
    if (currentDataSet.max+currentDataSet.range*0.2 > 0 && currentDataSet.max < 0) max = 0;

    var minPos = lerp(canvasWidth/16, canvasWidth-canvasWidth/16, inverseLerp(min, max, currentDataSet.min));
    var maxPos = lerp(canvasWidth/16, canvasWidth-canvasWidth/16, inverseLerp(min, max, currentDataSet.max));
    ctx.beginPath();
    ctx.moveTo(minPos, canvasHeight/8-10);
    ctx.lineTo(minPos, canvasHeight/8+10);
    ctx.moveTo(maxPos, canvasHeight/8-10);
    ctx.lineTo(maxPos, canvasHeight/8+10);
    ctx.stroke();

    // Draw numbers
    ctx.font = "12px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.scale(1, -1);
    ctx.translate(0, -canvasHeight);

    ctx.fillText(min, canvasWidth/16, canvasHeight-canvasHeight/8+20);
    ctx.fillText(max, canvasWidth-canvasWidth/16, canvasHeight-canvasHeight/8+20);

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