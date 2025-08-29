document.addEventListener("DOMContentLoaded", () => {
  let initialCoins = 100;
  let totalHearts = 0;
  let totalCopies = 0;
  const coinDisplay = document.querySelector("[data-coin]");
  const callButtons = document.querySelectorAll(".call-button");
  const historyContainer = document.getElementById("call-history");
  const clearHistoryBtn = document.getElementById("clear-history");
  const heartIcons = document.querySelectorAll(".heart");
  const heartCountDisplay = document.getElementById("heart-count");
  const copyButtons = document.querySelectorAll(".border button");
  const copyCountDisplay = document.getElementById("copy-count");

  function updateCoinDisplay() {
    if (coinDisplay) {
      coinDisplay.textContent = initialCoins;
    }
  }

  function getCurrentTimestamp() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  function addToHistory(serviceName, number) {
    const entry = document.createElement("div");
    entry.className =
      "p-3 border-b border-gray-200 text-sm flex justify-between items-center";
    entry.innerHTML = `
      <div>
        <p class="font-medium">${serviceName}</p>
        <p class="text-gray-500">${number}</p>
      </div>
      <p class="text-xs text-gray-400 ml-4">${getCurrentTimestamp()}</p>
    `;
    historyContainer.appendChild(entry);
  }

  function handleCallClick(event) {
    const card = event.target.closest(".service-card");
    if (!card) return;

    const serviceName = card.querySelector(".service-name")?.textContent.trim();
    const number = card.querySelector(".service-number")?.textContent.trim();

    if (!serviceName || !number) return;

    if (initialCoins < 20) {
      alert("You don't have enough coins to make this call.");
      return;
    }

    initialCoins -= 20;
    alert(`Calling ${serviceName} ${number}`);
    updateCoinDisplay();
    addToHistory(serviceName, number);
  }

  function handleHeartClick(event) {
    const heart = event.currentTarget;
    const countSpan = heart.nextElementSibling;
    let count = parseInt(countSpan.textContent, 10) || 0;
    count++;
    countSpan.textContent = count;
  }

  callButtons.forEach((button) => {
    button.addEventListener("click", handleCallClick);
  });

  if (clearHistoryBtn) {
    clearHistoryBtn.addEventListener("click", () => {
      historyContainer.innerHTML = "";
    });
  }

  function updateHeartDisplay() {
    if (heartCountDisplay) {
      heartCountDisplay.textContent = totalHearts;
    }
  }

  function handleHeartClick(event) {
    totalHearts++;
    updateHeartDisplay();
  }

  heartIcons.forEach((heart) => {
    heart.style.cursor = "pointer";
    heart.addEventListener("click", handleHeartClick);
  });

  function updateCopyDisplay() {
    if (copyCountDisplay) {
      copyCountDisplay.textContent = totalCopies;
    }
  }

  function handleCopyClick(event) {
    const card = event.target.closest(".service-card");
    if (!card) return;

    const number = card.querySelector(".service-number")?.textContent.trim();
    if (!number) return;

    navigator.clipboard
      .writeText(number)
      .then(() => {
        totalCopies++;
        updateCopyDisplay();
      })
      .catch(() => {
        alert("Failed to copy number.");
      });
  }

  copyButtons.forEach((btn) => {
    btn.addEventListener("click", handleCopyClick);
  });

  updateCoinDisplay();
  updateHeartDisplay();
  updateCopyDisplay();
});
