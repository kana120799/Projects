// ======================    Player Name =========================

let changeName = () => {
  let player1 = prompt("Enter Player1 Name");
  let player2 = prompt("Enter Player2 Name");
  document.querySelector(".play1").innerHTML = player1;
  document.querySelector(".play2").innerHTML = player2;
};

// ==================        Dice   =======================

let changeDice = () => {
  let randomNumber1 = Math.floor(Math.random() * 6 + 1);
  let randomImage1 = "img/" + randomNumber1 + ".png";
  let image1 = document.querySelectorAll("img")[0];
  image1.setAttribute("src", randomImage1);
  //   -----------------  image 2------------------
  let randomNumber2 = Math.floor(Math.random() * 6 + 1);
  let randomImage2 = "img/" + randomNumber2 + ".png";
  var image2 = document.querySelectorAll("img")[1];
  image2.setAttribute("src", randomImage2);
  if (randomNumber1 > randomNumber2) {
    document.querySelector(".text h1").innerHTML =
      document.querySelector(".play1").innerHTML + " Win!";
  } else if (randomNumber1 === randomNumber2) {
    document.querySelector(".text h1").innerHTML = "Ooops!! Draw";
  } else {
    document.querySelector(".text h1").innerHTML =
      document.querySelector(".play2").innerHTML + " Win!";
  }
};
document.querySelector(".name").addEventListener("click", changeName);

document.querySelector(".play").addEventListener("click", changeDice);
