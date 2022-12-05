const submitBtn = document.getElementById("submit");

const showInput = document.getElementById("show-title-input");
const characterInput = document.getElementById("character-input");

const handleButtonState = () => {
  if (showInput.value === "" || characterInput.value === "") {
    submitBtn.disabled = true;
  } else {
    submitBtn.disabled = false;
  }
};

showInput.addEventListener("input", handleButtonState);
characterInput.addEventListener("input", handleButtonState);
