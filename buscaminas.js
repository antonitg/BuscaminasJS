var bombs = []
var leftBorders = []
var rightBorders = []
var toCheck = []
var topBorders = []
var bottomBorders = []
var numGlobal = 0;
var reveled = [];
var banderas = [];

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function clock() {
    sessionStorage.setItem("clock", 1);

    let minutos = 0;
    let segundos = 0;
    let show_minutos = "00";
    let show_segundos = "00";

    while (sessionStorage.getItem("clock") == 1) {
        // document.getElementById("puntos").innerText = "Puntos: "+ max_points;

        if (String(minutos).length < 2) {
            show_minutos = "0" + minutos;
        } else {
            show_minutos = minutos;
        }
        if (String(segundos).length < 2) {
            show_segundos = "0" + segundos;
        } else {
            show_segundos = segundos;
        }

        if (minutos > 0) {
            document.getElementById("clock").innerText = "Tiempo: " + show_minutos + ':' + show_segundos;
        } else {
            document.getElementById("clock").innerText = "Tiempo: " + show_segundos;
        }
        await sleep(1000);
        segundos++;
        if (segundos == 60) {
            segundos = 0;
            minutos++;
        }

    }
}
async function points(max_points, rest_points) {
    while (sessionStorage.getItem("clock") == 1) {
        document.getElementById("puntos").innerText = "Puntos: " + max_points;
        await sleep(100);
        var max_points = max_points - rest_points;
        if (max_points < 0) {
            max_points = 0;
        }
    }
}

function generate(num, bomb) {
    clock();
    points(num * 1000, 2);
    numGlobal = num;
    var contJoc = document.getElementById("contJoc");
    var tmny = 30 * num;
    contJoc.setAttribute("style", "width:" + tmny + "px;")
    var casfinal = num * num;
    // BUCLE CREAR CASILLES
    for (let index = 0; index < casfinal; index++) {
        el = document.createElement("div")
        el.setAttribute("class", "casilla")
        el.setAttribute("id", index)
        el.value = 0
        contJoc.appendChild(el)
    }

    // BUCLE IDENTIFICAR BOMBES
    for (let index = 0; index < bomb; index++) {
        numBomb = Math.floor(Math.random() * (casfinal) + 0);
        if (bombs.indexOf(numBomb.toString()) == -1) {
            bombs.push(numBomb.toString())
            toB = document.getElementById(numBomb.toString())
            // toB.classList.add("bomba")
            toB.value = "&#128163;"
        } else {
            index--;
        }
    }

    // BUCLE TRAURE BORDES
    for (let index = 0; index < num; index++) {
        leftBorders.push((index * num).toString())
        rightBorders.push(((index * num) - 1).toString())
        topBorders.push(index.toString())
        bottomBorders.push((casfinal - index).toString())
    }
    bottomBorders.push((casfinal - numGlobal).toString())
    rightBorders[0] = (casfinal - 1).toString();


}

function addValBombs() {
    // Bucle indicar valors
    for (let index = 0; index < bombs.length; index++) {
        if (!topBorders.includes(bombs[index])) {

            (bombs.indexOf(document.getElementById(parseInt(bombs[index]) - numGlobal).value) == -1) && document.getElementById(parseInt(bombs[index]) - numGlobal).value++
        }
        if (!bottomBorders.includes(bombs[index])) {
            (bombs.indexOf(document.getElementById(parseInt(bombs[index]) + numGlobal).value) == -1) && document.getElementById(parseInt(bombs[index]) + numGlobal).value++
        }
        if (!leftBorders.includes(bombs[index])) {
            (bombs.indexOf(document.getElementById(parseInt(bombs[index]) - 1).value) == -1) && document.getElementById(parseInt(bombs[index]) - 1).value++
        }
        if (!rightBorders.includes(bombs[index])) {
            (bombs.indexOf(document.getElementById(parseInt(bombs[index]) + 1).value) == -1) && document.getElementById(parseInt(bombs[index]) + 1).value++
        }
        if (!rightBorders.includes(bombs[index]) && !topBorders.includes(bombs[index])) {
            (bombs.indexOf(document.getElementById(parseInt(bombs[index]) - (numGlobal - 1)).value) == -1) && document.getElementById(parseInt(bombs[index]) - (numGlobal - 1)).value++
        }
        if (!rightBorders.includes(bombs[index]) && !bottomBorders.includes(bombs[index])) {
            (bombs.indexOf(document.getElementById(parseInt(bombs[index]) + (numGlobal + 1)).value) == -1) && document.getElementById(parseInt(bombs[index]) + (numGlobal + 1)).value++
        }
        if (!leftBorders.includes(bombs[index]) && !bottomBorders.includes(bombs[index])) {
            (bombs.indexOf(document.getElementById(parseInt(bombs[index]) + (numGlobal - 1)).value) == -1) && document.getElementById(parseInt(bombs[index]) + (numGlobal - 1)).value++
        }
        if (!leftBorders.includes(bombs[index]) && !topBorders.includes(bombs[index])) {
            (bombs.indexOf(document.getElementById(parseInt(bombs[index]) - (numGlobal + 1)).value) == -1) && document.getElementById(parseInt(bombs[index]) - (numGlobal + 1)).value++
        }
    }
}

function addBandera(id) {
    if (reveled.indexOf(id.toString()) < 0) {
        if (banderas.indexOf(id) >= 0) {
            document.getElementById(id).innerHTML = "";
            banderas.splice(banderas.indexOf(id), 1);
        } else {
            if (banderas.length <= bombs.length) {
                document.getElementById(id).innerHTML = "&#128681;";
                banderas.push(id);
                check_win();
            }
        }
    }
}

function check_win() {
    if (banderas.length == bombs.length) {
        bombs.sort();
        banderas.sort();

        let check = true;

        for (let i = 0; i < bombs.length; i++) {
            if (bombs[i] != banderas[i]) {
                check = false;
            }
        }

        if (check && (reveled.length + bombs.length) == (numGlobal * numGlobal)) {
            alert("You win with " + parseInt(document.getElementById("puntos").innerHTML.split(" ")[1]));
            send_score()
            window.location.reload();

        }
    }
}

function putEvLis() {
    listItems = document.getElementsByClassName("casilla");
    for (let index = 0; index < listItems.length; index++) {
        listItems[index].addEventListener("click", function () {
            click(this.id)
            toCheck = []
        });

        listItems[index].addEventListener('contextmenu', function (ev) {
            ev.preventDefault();
            addBandera(this.id);
            return false;
        }, false);

    }
}

function pintReveled() {
    reveled = reveled.filter(function (item, pos) {
        return reveled.indexOf(item) == pos;
    })
    for (let index = 0; index < reveled.length; index++) {
        document.getElementById(reveled[index]).classList.add("reveled")

    }
}

function click(id) {
    reveled.push(id)
    toCheck = toCheck.filter(function (el) {
        return reveled.indexOf(el) < 0;
    });
    if (document.getElementById(id).value == 0) {
        arr2 = getAr(id)
        toCheck = toCheck.concat(arr2)
        toCheck = toCheck.filter(function (el) {
            return reveled.indexOf(el) < 0;
        });
        for (let index = 0; index < toCheck.length; index++) {
            if (toCheck[index] < numGlobal * numGlobal) {
                if (document.getElementById(toCheck[index]).value != 0) {
                    document.getElementById(toCheck[index]).innerHTML = document.getElementById(toCheck[index]).value
                    reveled.push(toCheck[index])
                    pintReveled();
                } else {
                    click(toCheck[index])
                    pintReveled();
                }

            }
        }
    } else {
        if (bombs.indexOf(id.toString()) > -1) {
            //Es una bomba
            bombs.forEach(function (id_tnt) {
                document.getElementById(id_tnt).innerHTML = "&#128163;";
                document.getElementById(id_tnt).classList.add("reveled");
                reveled.push(id_tnt.toString);
            });

            document.getElementById(id).innerHTML = "&#128165;";
            for (let index = 0; index < bombs.length; index++) {
                document.getElementById(bombs[index]).classList.add("bomb")
            }
                alert("You lose :("); 
                window.location.reload();
            
        } else {
            //No es una bomba
            pintReveled();

            document.getElementById(id).innerHTML = document.getElementById(id).value
        }

    }

    check_win();
}

function getAr(id) {
    arr = []
    if (!topBorders.includes(id.toString())) {
        arr.push((parseInt(id) - numGlobal).toString())
    }
    if (!bottomBorders.includes(id.toString())) {
        arr.push((parseInt(id) + numGlobal).toString())
    }
    if (!leftBorders.includes(id.toString())) {
        arr.push((parseInt(id) - 1).toString())
    }
    if (!rightBorders.includes(id.toString())) {
        arr.push((parseInt(id) + 1).toString())
    }
    if (!rightBorders.includes(id.toString()) && !topBorders.includes(id.toString())) {
        arr.push((parseInt(id) - (numGlobal - 1)).toString())
    }
    if (!rightBorders.includes(id.toString()) && !bottomBorders.includes(id.toString())) {
        arr.push((parseInt(id) + (numGlobal + 1)).toString())
    }
    if (!leftBorders.includes(id.toString()) && !bottomBorders.includes(id.toString())) {
        arr.push((parseInt(id) + (numGlobal - 1)).toString())
    }
    if (!leftBorders.includes(id.toString()) && !topBorders.includes(id.toString())) {
        arr.push((parseInt(id) - (numGlobal + 1)).toString())
    }
    // console.log(arr);
    return arr
}

var start_game = false;

function start(num1, num2) {
    if (!start_game) {
        document.getElementById("container_lvl").remove()
        start_game = true;
        generate(num1, num2);
        addValBombs();
        putEvLis();

    }
}

function send_score() {
    var token = localStorage.getItem("token");
    if (token) {
        var http = new XMLHttpRequest();
        var url = 'http://0.0.0.0:4000/api/rank/update';
        var params = JSON.stringify({
            nameGame: "buscaminas_anja",
            score: parseInt(document.getElementById("puntos").innerHTML.split(" ")[1])
        });
        http.open('POST', url, true);

        //Send the proper header information along with the request
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        http.setRequestHeader('Authorization', 'Token ' + token);

        http.onreadystatechange = function () { //Call a function when the state changes.
            if (http.readyState == 4 && http.status == 200) {
                console.log(http.responseText);
            }
        }
        http.send(params);
    }
}