/* Variables */
const mainBtn = document.querySelector(".container-button");
const switchBtn = document.querySelectorAll(".timer-buttons");
const countTimer = document.querySelector(".count-timer");
const background = document.querySelector(".hero-section");
const container = document.querySelector(".container");
const body = document.querySelector(".modal-section");
const docTitle = document.querySelector("title");

let timeAmount, interval, state;

setTime(0);

function pomodoroPage() {
  background.style.backgroundColor = "#a31525";
  container.style.backgroundColor = "#fff";
  countTimer.style.color = "black";
  state = "pomodoro";
}

function shortBreakPage() {
  background.style.backgroundColor = "#C76E00";
  container.style.backgroundColor = "#fff";
  countTimer.style.color = "black";
  state = "short break";
}

function longBreakPage() {
  background.style.backgroundColor = "#555555";
  container.style.backgroundColor = "#fff";
  countTimer.style.color = "black";
  state = "long break";
}

function startPage() {
  timeAmount = 0;
  background.style.backgroundColor = "#666666";
  countTimer.style.backgroundColor = "black";
}

switchBtn.forEach((button) => {
  button.addEventListener("click", () => {
    switch (button.textContent.toLowerCase()) {
      case "pomodoro":
        timeAmount = 1500;
        pomodoroPage();
        break;
      case "short break":
        timeAmount = 300;
        shortBreakPage();
        break;
      case "long break":
        timeAmount = 600;
        longBreakPage();
        break;
    }
    stopTimer();
    setTime(timeAmount);
  });
});

function setTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  countTimer.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

const updateTime = () => {
  const minutes = Math.floor(timeAmount / 60);
  const seconds = timeAmount % 60;
  countTimer.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

const startTimer = () => {
  if (mainBtn.textContent === "start") {
    interval = setInterval(() => {
      timeAmount--;
      updateTime();
      docTitle.textContent = `${countTimer.textContent} - Pomodoro`;
      if (timeAmount === 0) {
        clearInterval(interval);
        alert("time's up bitch");
      }
    }, 1000);
  }
  mainBtn.textContent = "pause";
};

const stopTimer = () => {
  if (mainBtn.textContent === "pause") {
    clearInterval(interval);
    mainBtn.textContent = "start";
  }
};

mainBtn.addEventListener("click", () => {
  switch (mainBtn.textContent) {
    case "start":
      startTimer();
      background.style.backgroundColor = "#111111";
      container.style.backgroundColor = "#333333";
      countTimer.style.color = "#fff";
      break;
    case "pause":
      stopTimer();
      switch (state) {
        case "pomodoro":
          pomodoroPage();
          break;
        case "short break":
          shortBreakPage();
          break;
        case "long break":
          longBreakPage();
          break;
        default:
          pomodoroPage();
          break;
      }
  }
});

const settingsIcon = document.getElementById("settings-icon");
const modal = document.createElement("div");
settingsIcon.addEventListener("click", () => {
  body.style.display = "flex";
  modal.className = "modal-tab";
  modal.innerHTML = `
  <div class="">Set pomodoro minutes</div>
  <input type="number" name="input-text" id="pom-time" min="5" max="60" value="5">
  <button class="all-buttons" id="setting-submit">set time</button>
  `;
  body.appendChild(modal);

  const changeSetTime = document.getElementById("pom-time");
  changeSetTime.addEventListener("change", () => {
    if (changeSetTime.value > 60) {
        changeSetTime.value = 60;
    }
  })
  const setTimeBtn = document.getElementById("setting-submit");
  setTimeBtn.addEventListener("click", () => {
    timeAmount = changeSetTime.value * 60;
    updateTime();
    pomodoroPage();
  });
});

window.addEventListener("click", (e) => {
  if (e.target.className === "modal-section") {
    body.style.display = "none";
    modal.remove();
  }
});