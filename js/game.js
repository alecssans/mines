const gridSize = 5;
let mines = [];
let revealed = [];
let started = false;
let bet = 0;
let multiplier = 1;
let safeClicks = 0;

const grid = document.getElementById("grid");
const status = document.getElementById("status");
const startBtn = document.getElementById("start");
const cashoutBtn = document.getElementById("cashout");

function generateGrid() {
  grid.innerHTML = "";
  revealed = [];
  for (let i = 0; i < gridSize * gridSize; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.dataset.index = i;
    cell.addEventListener("click", () => revealCell(i));
    grid.appendChild(cell);
  }
}

function placeMines() {
  mines = [];
  while (mines.length < 5) {
    const rand = Math.floor(Math.random() * (gridSize * gridSize));
    if (!mines.includes(rand)) mines.push(rand);
  }
}

function revealCell(index) {
  if (!started || revealed.includes(index)) return;
  const cell = grid.children[index];
  revealed.push(index);

  if (mines.includes(index)) {
    cell.classList.add("revealed", "mine");
    status.textContent = "💥 Perdiste tu apuesta de €" + bet.toFixed(2);
    started = false;
    cashoutBtn.disabled = true;
  } else {
    cell.classList.add("revealed", "safe");
    safeClicks++;
    multiplier += 0.2;
    status.textContent = "✅ ¡Gema encontrada! Multiplicador: x" + multiplier.toFixed(2);
    cashoutBtn.disabled = false;
  }
}

startBtn.onclick = () => {
  bet = parseFloat(document.getElementById("bet").value);
  if (isNaN(bet) || bet <= 0) {
    alert("Introduce una apuesta válida.");
    return;
  }
  multiplier = 1;
  safeClicks = 0;
  started = true;
  cashoutBtn.disabled = true;
  status.textContent = "Busca gemas... pero evita las minas 💎💣";
  generateGrid();
  placeMines();
};

cashoutBtn.onclick = () => {
  if (!started) return;
  const winnings = bet * multiplier;
  status.textContent = `🏆 Retiraste €${winnings.toFixed(2)} con x${multiplier.toFixed(2)}!`;
  started = false;
  cashoutBtn.disabled = true;
};
