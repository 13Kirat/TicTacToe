let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-button"); 
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn0 = true;

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

let count = 0;

const resetGame = () => {
    turn0 = true;
    enableBoxes();
    msgContainer.classList.add("hide");
} ;

boxes.forEach((box) => {
    box.addEventListener("click" , () => {
        if(turn0){
            box.style.color = "red";
            box.innerText = "O";
            turn0 = false;
            count++;
        }else {
            box.style.color = "blue";
            box.innerText = "X";
            turn0 = true;
            count++;
        }
        box.disabled = true;

        checkWinner();
    });
});

const disableBoxes = () => {
    for (const box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (const box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    msg.innerText = "Congratulation, Winner is " + winner;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const drawMatch = () => {
    msg.innerText = "This Match is Draw, Play Next Match";
    msgContainer.classList.remove("hide");
    disableBoxes();
    count = 0;
};

const checkWinner = () => {
    for (const pattern of winPatterns) {
        // console.log(pattern[0], pattern[1], pattern[2]);
        // console.log(boxes[pattern[0]].innerText, boxes[pattern[1]].innerText, boxes[pattern[2]].innerText,);

        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val != "" && pos2val != "" && pos3val != "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                // console.log("Winner" + pos1val);
                showWinner(pos1val);
            }else if (count === 9 && (pos1val !== pos2val || pos2val !== pos3val || pos1val !== pos3val)) {
                drawMatch();
            }
        }
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
