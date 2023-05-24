const playerNameEl = document.querySelector(".player-name");
playerNameEl.textContent = localStorage.getItem("userName") ?? "Mystery Player";

function beginGame() {
  const checkedBox = document.querySelector('input[name="varRadio"]:checked');
  localStorage.setItem("opponentName", checkedBox.value);
  window.location.href = "play.html";
}

// simulate database list retrieval
const retrievedData = ["Ada", "Tim"];

const radioGroupEl = document.querySelector("#gamelist");
radioGroupEl.innerHTML += retrievedData
  .map(
    (name) => `
<div class="form-check">
<input class="form-check-input" type="radio" id="${name}" name="varRadio" value="${name}" />
<label class="form-check-label" for="${name}">${name}</label>
</div>
`
  )
  .join("");
