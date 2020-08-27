var player = 0, sumCirc = 0, playDiv, pline, play1, play2, newPlay,
    finishPlay, num, firstScore = 0, secondScore = 0, max, min, climax = 0, l=0;
l = localStorage.getItem("climax")
function clock() {
    var time = new Date().getHours();
    var minute = new Date().getMinutes();
    var second = new Date().getSeconds();

    if (minute < 10)
        time += ":0" + minute;
    else
        time += ":" + minute;
    if (second < 10)
        time += ":0" + second;
    else
        time += ":" + second;
    document.getElementById("timeNow").innerText = time
}
setInterval(clock, 1000)
document.getElementById("maximum").innerText = "תוצאת השיא:" + l;
function tableCreate(input, text, btn) {

    num = document.getElementById("inp").value, y = 0;

    if (num >= 5 && num <= 15) {
      
        if (document.getElementById("playDiv") == null) {
            playDiv = document.createElement("div");
            playDiv.id = "playDiv";
            document.body.appendChild(playDiv)
            play1 = document.createElement("div");
            play2 = document.createElement("div");
            play1.id = "play1";
            play2.id = "play2";
            play1.innerText = "שחקן 1";
            play2.innerText = "שחקן 2";

            playDiv.appendChild(play1);
            playDiv.appendChild(play2);
        }
        var eshkol = document.createElement('div');
        eshkol.id = "eshkol";
        playDiv.appendChild(eshkol)
        for (var i = 0; i < num; i++) {

            var line = document.createElement("div");
            for (var s = 0; s < i; s++) {
                var space = document.createElement("div");
                space.setAttribute("id", "space");
                line.appendChild(space);
            }

            for (var j = num; j > i; j--) {
                pline = document.createElement("p");

                line.appendChild(pline);
                pline.className = "circ row" + i + " col" + j + " alach" + (j - i);
              

                pline.addEventListener("click", color);
                sumCirc++;
            }
            eshkol.appendChild(line);
        }

        document.getElementsByClassName("alach" + num)[0].style.backgroundColor = "#2d013e";
        document.getElementsByClassName("row" + (num - 1))[0].style.backgroundColor = "#2d013e";
        document.getElementsByClassName("col1")[0].style.backgroundColor = "#2d013e";
        document.getElementById(input).style.display = "none";
        document.getElementById(text).style.display = "none";
        btn.style.display = 'none';
       
        var br = document.createElement("br");
        playDiv.appendChild(br)
        var scoreA = document.createElement("div");
        var scoreB = document.createElement("div");
        scoreA.id = ("scoreA")
        scoreB.id = ("scoreB")
        scoreA.innerText = "שחקן 1:" + " " + firstScore;
        scoreB.innerText = "שחקן 2:" + " " + secondScore;
        playDiv.appendChild(scoreA);
        playDiv.appendChild(scoreB);
        var br = document.createElement("br");
        playDiv.appendChild(br)
        newPlay = document.createElement("div");
        newPlay.id = "newPlay";
        newPlay.innerText = "התחל משחק חדש";
        playDiv.appendChild(newPlay);
        newPlay.addEventListener("click", newgame);
        finishPlay = document.createElement("div");
        finishPlay.id = "finishPlay";
        finishPlay.innerText = "סיים משחק";
        playDiv.appendChild(finishPlay)
        finishPlay.addEventListener("click", finish);
    }

    else
        document.getElementById("noBetween").innerHTML = "לא הוקש מספר תקין. נא להקיש מספר בין 5 ל15";
    setInterval(function () {
        document.getElementById("noBetween").style.display = "none";
    }, 5000);

}

function color() {
    console.log("pline");
    var clickel = event.target
    if (clickel.style.backgroundColor == "") {
        if (player % 2 == 0) {
            play2.style.backgroundColor = "#ffffff";
            clickel.style.backgroundColor = "rgb(178, 0, 76)";
            play1.style.backgroundColor = "rgb(150, 5, 116)";

            player++;
        }
        else {
            play1.style.backgroundColor = "#ffffff";
            event.target.style.backgroundColor = "rgb(150, 5, 116)";
            play2.style.backgroundColor = "rgb(178, 0, 76)";
            player++;
        }
        if (player + 3 == sumCirc)
            endGame();
        else
            if (player < sumCirc)
                check(clickel);
    }

}
function finish() {
    endGame();
    setInterval(function () { location.reload() }, 5000);
   
}



function newgame() {
    document.getElementById("divWin").style.display = "none";
    player = 0;
    var allCircels = document.getElementsByClassName("circ")
    for (var i = 0; i < allCircels.length; i++) {
        allCircels[i].style.backgroundColor = "";
    }
    document.getElementsByClassName("alach" + num)[0].style.backgroundColor = "#2d013e";
    document.getElementsByClassName("row" + (num - 1))[0].style.backgroundColor = "#2d013e";
    document.getElementsByClassName("col1")[0].style.backgroundColor = "#2d013e";
    play1.style.backgroundColor = "#ffffff";
    play2.style.backgroundColor = "#ffffff";
    firstScore = 0;
    secondScore = 0;
    scoreA.innerText = "שחקן 1:" + " " + firstScore;
    scoreB.innerText = "שחקן 2:" + " " + secondScore;
}

function check(el) {

    var arrClass = el.classList;
    var arrEl;
    var text;
    for (var i = 1; i < arrClass.length; i++) {
        arrEl = document.getElementsByClassName(arrClass[i]);
        for (var j = 0; j < arrEl.length && arrEl[j].style.backgroundColor != ""; j++);
        if (j == arrEl.length) {
            if (el.style.backgroundColor == "rgb(150, 5, 116)") {
                firstScore += arrEl.length; 
            }
            if (el.style.backgroundColor == "rgb(178, 0, 76)") {
                secondScore += arrEl.length;
            }
        }
        scoreA.innerText = "שחקן 1:" + " " + firstScore;
        scoreB.innerText = "שחקן 2:" + " " + secondScore;
    }
}

function endGame() {
    Pwin = document.createElement("p");
    divWin = document.createElement("div");
    divWin.id="divWin";
    playDiv.appendChild(divWin);
    if (firstScore > secondScore) {
        max = firstScore;
        min = secondScore;
        divWin.innerText = play1.innerText + " ניצח" + "מספר הנקודות שצברת" + firstScore + "נקודות";
        divWin.innerText = play1.innerText + "צבר" + (max - min) + " נקודות יותר מ" + play2.innerText;
        if (firstScore > climax) {
            localStorage.setItem("climax", firstScore);
            climax = firstScore;
        }
        
    }
    if (firstScore < secondScore) {
        max = secondScore;
        min = firstScore;
        divWin.innerText = play2.innerText + " ניצח " + " מספר הנקודות שצבר " + secondScore + "נקודות";
        divWin.innerText += " " + play2.innerText + " צבר " + (max - min) + "נקודות יותר מ " + play1.innerText;
      
    }

    if (firstScore == secondScore) {
        if (firstScore == 0) {
            divWin.innerText = "אין נצחונות!";
        }
        else {
        max = secondScore = firstScore
            divWin.innerText = "תיקו";
        }
    }
    
   
}




