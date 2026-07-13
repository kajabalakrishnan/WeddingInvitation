// ==========================================
// WEDDING INVITATION V4
// SCRIPT - PART 1
// ==========================================

// ---------- WELCOME SCREEN ----------

const welcome = document.getElementById("welcome");
const invitation = document.getElementById("mainInvitation");
const openBtn = document.getElementById("openInvitation");

openBtn.addEventListener("click", () => {

    welcome.style.opacity = "0";

    setTimeout(() => {

        welcome.style.display = "none";
        invitation.style.display = "flex";

    }, 800);

});


// ---------- SCRATCH CARD ----------

const canvas = document.getElementById("scratchCanvas");
const ctx = canvas.getContext("2d");

let scratching = false;

function setupCanvas() {

    const area = document.querySelector(".scratchArea");

    canvas.width = area.offsetWidth;
    canvas.height = area.offsetHeight;

    ctx.globalCompositeOperation = "source-over";

    // Silver gradient
    const gradient = ctx.createLinearGradient(0,0,canvas.width,canvas.height);

    gradient.addColorStop(0,"#efefef");
    gradient.addColorStop(0.5,"#bdbdbd");
    gradient.addColorStop(1,"#efefef");

    ctx.fillStyle = gradient;
    ctx.fillRect(0,0,canvas.width,canvas.height);

    // Border

    ctx.strokeStyle = "#888";
    ctx.lineWidth = 2;
    ctx.strokeRect(0,0,canvas.width,canvas.height);

    // Text

    ctx.fillStyle = "#444";
    ctx.textAlign = "center";
    ctx.font = "bold 24px Arial";

    ctx.fillText(
        "Scratch Here",
        canvas.width/2,
        canvas.height/2
    );

}

setupCanvas();

window.addEventListener("resize",setupCanvas);


// ---------- MOUSE POSITION ----------

function getPosition(e){

    const rect = canvas.getBoundingClientRect();

    if(e.touches){

        return{

            x:e.touches[0].clientX-rect.left,
            y:e.touches[0].clientY-rect.top

        };

    }

    return{

        x:e.clientX-rect.left,
        y:e.clientY-rect.top

    };

}


// ---------- SCRATCH ----------

function scratch(e){

    if(!scratching) return;

    e.preventDefault();

    const pos = getPosition(e);

    ctx.globalCompositeOperation = "destination-out";

    ctx.beginPath();

    ctx.arc(
        pos.x,
        pos.y,
        22,
        0,
        Math.PI*2
    );

    ctx.fill();

    revealProgress();

}


// ---------- EVENTS ----------

canvas.addEventListener("mousedown",()=>{

    scratching = true;

});

canvas.addEventListener("mouseup",()=>{

    scratching = false;

});

canvas.addEventListener("mouseleave",()=>{

    scratching = false;

});

canvas.addEventListener("mousemove",scratch);

canvas.addEventListener("touchstart",()=>{

    scratching = true;

});

canvas.addEventListener("touchend",()=>{

    scratching = false;

});

canvas.addEventListener("touchmove",scratch);


// ---------- CHECK REVEAL ----------

function revealProgress(){

    const image = ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
    );

    let transparent = 0;

    for(let i=3;i<image.data.length;i+=4){

        if(image.data[i]===0){

            transparent++;

        }

    }

    const percent =
    transparent/(canvas.width*canvas.height);

    if(percent>0.55){

        canvas.style.transition=".8s";
        canvas.style.opacity="0";

        setTimeout(()=>{

            canvas.style.display="none";

            alert("🎉 Wedding Details Revealed!");

        },800);

    }

}


// ==========================================
// WEDDING INVITATION V4
// SCRIPT - PART 2
// ==========================================

// ---------- COUNTDOWN ----------

const countdown = document.getElementById("countdown");

const weddingDate = new Date("August 23, 2026 09:00:00").getTime();

function updateCountdown(){

    const now = new Date().getTime();

    const distance = weddingDate - now;

    if(distance <= 0){

        countdown.innerHTML = "<h2>🎉 Today is the Wedding! 💍</h2>";

        return;

    }

    const days = Math.floor(distance/(1000*60*60*24));

    const hours = Math.floor((distance%(1000*60*60*24))/(1000*60*60));

    const minutes = Math.floor((distance%(1000*60*60))/60000);

    const seconds = Math.floor((distance%(1000*60))/1000);

    countdown.innerHTML = `
        <div class="time-box">
            <span class="number">${days}</span>
            <span class="label">Days</span>
        </div>

        <div class="time-box">
            <span class="number">${hours}</span>
            <span class="label">Hours</span>
        </div>

        <div class="time-box">
            <span class="number">${minutes}</span>
            <span class="label">Minutes</span>
        </div>

        <div class="time-box">
            <span class="number">${seconds}</span>
            <span class="label">Seconds</span>
        </div>
    `;

}

updateCountdown();

setInterval(updateCountdown,1000);


// ---------- VENUE BUTTON ----------

const mapBtn = document.getElementById("mapBtn");

if(mapBtn){

    mapBtn.addEventListener("click",function(){

        window.open(
            "https://maps.app.goo.gl/3JuG7avH27duzP7a7",
            "_blank"
        );

    });

}


// ---------- MUSIC BUTTON ----------

const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

if(musicBtn){

    let playing = false;

    musicBtn.addEventListener("click",function(){

        if(!playing){

            music.play();

            musicBtn.innerHTML="⏸ Pause Music";

            playing=true;

        }else{

            music.pause();

            musicBtn.innerHTML="🎵 Music";

            playing=false;

        }

    });

}


// ---------- END ----------
console.log("Wedding Invitation V4 Loaded Successfully ❤️");