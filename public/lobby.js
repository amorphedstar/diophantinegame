const playerNameEl = document.querySelector(".player-name");
playerNameEl.textContent = localStorage.getItem("userName") ?? "Mystery Player";

function beginGame() {
  const checkedBox = document.querySelector('input[name="varRadio"]:checked');
  localStorage.setItem("opponentName", checkedBox.value);
  window.location.href = "play.html";
}

// fetch game list from backend
fetch("/api/games")
  .then((response) => response.json())
  .then((games) => {
    console.log(games);
    const radioGroupEl = document.querySelector("#gamelist");
    radioGroupEl.innerHTML += games
      .map(
        (name) => `
<div class="form-check">
<input class="form-check-input" type="radio" id="${name}" name="varRadio" value="${name}" />
<label class="form-check-label" for="${name}">${name}</label>
</div>
`
      )
      .join("");
  });
