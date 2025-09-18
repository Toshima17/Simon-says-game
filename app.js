let gameSeq=[];
let userSeq=[];

let started=false;
let level=0;

let btns=["red", "yellow", "green", "blue"];


let h2=document.querySelector("h2");
document.addEventListener("keypress", function (){
    //ek baar game start hoga
    if(started==false){
        console.log("Game Started");
        started=true;
        //game is now stared, call levelUp()
        levelUp();
    }
});

function levelUp(){
    userSeq=[] ; //empty because user have to press butoon from start
    level++;
    //h2 me level ki value => change ho jae
    h2.innerText=`level ${level}` ;
     
    //1st choose random button,1-4 and generate random color btn jispr flash ho
    let randomIdx=Math.floor(Math.random()*3);
    let randomColor= btns[randomIdx];
    //jo btn aaya us color ki class select kr ske
    let randomBtn= document.querySelector(`.${randomColor}`);
    //then call function to flash that random button.
    
    // console.log(randomIdx);
    // console.log(randomColor);
    // console.log(randomBtn);
    
    gameSeq.push(randomColor);
    console.log(gameSeq);
    gameFlash(randomBtn);
    
}

function gameFlash(btn){
    //adding flash class to buttons
    btn.classList.add("flash");
    setTimeout(() => {
       btn.classList.remove("flash"); 
    }, 250); //1s= 1000ms 
}

function userFlash(btn){
    //adding flash class to buttons
    btn.classList.add("userflash");
    setTimeout(() => {
       btn.classList.remove("userflash"); 
    }, 250); //1s= 1000ms 
}


function btnPress(){
    let btn=this;

    //user ke button oress krne se button pr flash aaya.
    userFlash(btn);

    //us corresponding button ka jo color hai wo id me uska color hai.
    userColor=btn.getAttribute("id");
    console.log(userColor);
    userSeq.push(userColor);
    checkSeq(userSeq.length-1);
    
}
//function to check the user ne jo color press kiya hai kya wo game ke sequence ko match krta hai
function checkSeq(idx){
    // console.log("Current level: ", level);
    //jo level ki value hogi utne hi elements honge userSeq & gameSeq me
    // let idx=level-1;
    if(userSeq[idx]===gameSeq[idx]){
        if(userSeq.length==gameSeq.length){
            // levelUp();
            setTimeout(levelUp,1000);
        }
    }
    else{
        h2.innerHTML=`Game Over! Your Score was <b>${level}</b> <br> Press any key to start.`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        }, 150);
        //jaise hi game over => sari chije reset krna padega
        reset();
        }

}

let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click", btnPress); 
}

function reset(){
    //game is not started till now
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}
