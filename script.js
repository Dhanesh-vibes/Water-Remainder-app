// Variables
let waterGoal = 0;
let totalWaterIntake = 0;
let reminderInterval = null;

// Set Goal Functionality
document.getElementById("set-goal").addEventListener("click", () => {
  const goalInput = parseFloat(document.getElementById("water-goal").value);
  if (!isNaN(goalInput) && goalInput > 0) {
    waterGoal = goalInput;
    totalWaterIntake = 0; // Reset intake
    document.getElementById("goal").textContent = waterGoal.toFixed(2);
    document.getElementById("total-intake").textContent = totalWaterIntake.toFixed(2);
    document.getElementById("goal-feedback").textContent = `Goal set to ${waterGoal} liters!`;
    updateProgressBar();
    startReminder();
  } else {
    alert("Please enter a valid goal greater than 0.");
  }
});

// Log Water Intake Functionality
document.getElementById("log-intake").addEventListener("click", () => {
  const intakeInput = parseFloat(document.getElementById("water-intake").value);
  if (!isNaN(intakeInput) && intakeInput > 0) {
    totalWaterIntake += intakeInput;
    if (totalWaterIntake > waterGoal) totalWaterIntake = waterGoal; // Prevent overflow
    document.getElementById("total-intake").textContent = totalWaterIntake.toFixed(2);
    document.getElementById("intake-feedback").textContent = `${intakeInput} liters logged! Keep going!`;
    updateProgressBar();
    checkGoalCompletion();
  } else {
    alert("Please enter a valid water amount greater than 0.");
  }
});

// Update Progress Bar
function updateProgressBar() {
  if (waterGoal > 0) {
    const progressPercentage = (totalWaterIntake / waterGoal) * 100;
    const progressBar = document.getElementById("progress-bar");
    progressBar.style.width = `${progressPercentage}%`;
    progressBar.setAttribute("aria-valuenow", progressPercentage);
    progressBar.textContent = `${Math.round(progressPercentage)}%`;
  }
}

// Start Water Reminder
function startReminder() {
  if (reminderInterval) clearInterval(reminderInterval); // Clear any previous intervals
  const intervalTime = (8 * 60 * 60 * 1000) / 8; // Fixed interval (1 hour per reminder)
  reminderInterval = setInterval(() => {
    alert("Time to drink water! Stay hydrated!");
  }, intervalTime);
}

// Check Goal Completion
function checkGoalCompletion() {
  if (totalWaterIntake >= waterGoal) {
    clearInterval(reminderInterval); // Stop reminders
    alert("Congratulations! You've reached your daily water intake goal!");
  }
}
