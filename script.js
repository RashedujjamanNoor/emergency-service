document.addEventListener("DOMContentLoaded", () => {
  let initialCoins = 100;
  let totalHearts = 0;
  const coinDisplay = document.querySelector("[data-coin]");
  const callButtons = document.querySelectorAll(".call-button");
  const historyContainer = document.getElementById("call-history");
  const clearHistoryBtn = document.getElementById("clear-history");
  const heartIcons = document.querySelectorAll(".heart");
  const heartCountDisplay = document.getElementById("heart-count");

  // Update coin display
  function updateCoinDisplay() {
    if (coinDisplay) {
      coinDisplay.textContent = initialCoins;
    }
  }

  // Format current time - only hours and minutes
  function getCurrentTimestamp() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  // Add entry to call history
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

  // Handle "Call" button click
  function handleCallClick(event) {
    const card = event.target.closest(".service-card");
    if (!card) return;

    const serviceName = card.querySelector(".service-name")?.textContent.trim();
    const number = card.querySelector(".service-number")?.textContent.trim();

    if (!serviceName || !number) return;

    // Check coin balance before proceeding
    if (initialCoins < 20) {
      alert("You don't have enough coins to make this call.");
      return;
    }

    // Deduct coins and proceed
    initialCoins -= 20;
    alert(`Calling ${serviceName} service ${number}`);
    updateCoinDisplay();
    addToHistory(serviceName, number);
  }

  // Handle heart icon click - increment count next to heart
  function handleHeartClick(event) {
    const heart = event.currentTarget;
    const countSpan = heart.nextElementSibling;
    let count = parseInt(countSpan.textContent, 10) || 0;
    count++;
    countSpan.textContent = count;
  }

  // Attach event listeners to all call buttons
  callButtons.forEach((button) => {
    button.addEventListener("click", handleCallClick);
  });

  // Handle clear history button
  if (clearHistoryBtn) {
    clearHistoryBtn.addEventListener("click", () => {
      historyContainer.innerHTML = "";
    });
  }

  // Update the displayed heart count
  function updateHeartDisplay() {
    if (heartCountDisplay) {
      heartCountDisplay.textContent = totalHearts;
    }
  }

  // Handle heart icon click
  function handleHeartClick(event) {
    totalHearts++;
    updateHeartDisplay();
  }

  // Attach click listeners to all heart icons
  heartIcons.forEach((heart) => {
    heart.style.cursor = "pointer";
    heart.addEventListener("click", handleHeartClick);
  });

  // Initialize coin display
  updateCoinDisplay();
  updateHeartDisplay();
});
