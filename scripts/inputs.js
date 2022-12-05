const showInput = document.getElementById("show-title-input");
const characterInput = document.getElementById("character-input");

const highlightInputText = (event) => {
  event.target.select();
};

showInput.addEventListener("focus", highlightInputText);
characterInput.addEventListener("focus", highlightInputText);
