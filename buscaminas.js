var bombs = []
var leftBorders = []
var rightBorders = []
var topBorders = []
var bottomBorders = []
var numGlobal = 0;
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
function generate(num,bomb) {
    numGlobal = num;
    var contJoc = document.getElementById("contJoc");
    var tmny = 30*num;
    contJoc.setAttribute("style","width:"+tmny+"px;") 
    var casfinal = num*num;
    // BUCLE CREAR CASILLES
    for (let index = 0; index < casfinal; index++) {
        el = document.createElement("div")
        el.setAttribute("class","casilla")
        el.setAttribute("id",index)
        el.value = 0
        contJoc.appendChild(el)
    }

    // BUCLE IDENTIFICAR BOMBES
    for (let index = 0; index < bomb; index++) {
        numBomb = Math.floor(Math.random() * (casfinal - 0 + 1) + 0);
        bombs.push(numBomb.toString())
        toB=document.getElementById(numBomb.toString())
        toB.classList.add("bomba")
        toB.value = "bomb"
    }

    // BUCLE TRAURE BORDES
    for (let index = 0; index < num; index++) {
        leftBorders.push((index*num).toString())
        rightBorders.push(((index*num)-1).toString())
        topBorders.push(index.toString())
        bottomBorders.push((casfinal-index).toString())
    }
    rightBorders[0] = casfinal;
    

}
function sumValue(num) {
    toSum = document.getElementById(num.toString())
    console.log(toSum);
    // if (toSum.value != "bomb") {
        toSum.value++
    // } 
}

    function addValBombs() {
    sleep(10000)
console.log("asdasd");
    // Bucle indicar valors
    for (let index = 0; index < bombs.length; index++) {
        if (!topBorders.includes(bombs[index])) {
            document.getElementById(parseInt(bombs[index]) - numGlobal).value++
            top = false;
        } else {
            top = true
        }
        console.log(numGlobal);
        if (!bottomBorders.includes(bombs[index])) {
            document.getElementById(parseInt(bombs[index]) + numGlobal).value++
            bottom = false
        } else {
            bottom = true
        }
        if (!leftBorders.includes(bombs[index])) {
            document.getElementById(parseInt(bombs[index]) - 1).value++
            bottom = false
        }
        if (!rightBorders.includes(bombs[index])) {
            document.getElementById(parseInt(bombs[index])+1).value++
            bottom = false
        }
        if (!rightBorders.includes(bombs[index]) && !topBorders.includes(bombs[index])) {
            document.getElementById(parseInt(bombs[index])-(numGlobal-1)).value++
            bottom = false
        }
        if (!rightBorders.includes(bombs[index]) && !bottomBorders.includes(bombs[index])) {
            document.getElementById(parseInt(bombs[index])+(numGlobal+1)).value++
            bottom = false
        }
        if (!leftBorders.includes(bombs[index]) && !bottomBorders.includes(bombs[index])) {
            document.getElementById(parseInt(bombs[index])+(numGlobal-1)).value++
            bottom = false
        }
        if (!leftBorders.includes(bombs[index]) && !topBorders.includes(bombs[index])) {
            document.getElementById(parseInt(bombs[index])-(numGlobal+1)).value++
            bottom = false
        }
    }
}

