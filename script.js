const form = document.getElementById("habit-form");
const input = document.getElementById("habit-input");
const list = document.getElementById("habit-list");

// Load from localStorage on start
document.addEventListener("DOMContentLoaded", loadHabits);

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const habitText = input.value.trim();
  if (habitText !== "") {
    addHabit(habitText);
    saveHabit(habitText);
    input.value = "";
  }
});

function addHabit(text, completed = false) {
  const li = document.createElement("li");
  li.textContent = text;
  if (completed) li.classList.add("done");

  li.addEventListener("click", () => {
    li.classList.toggle("done");
    updateLocalStorage();
  });

  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.classList.add("delete-btn");
  delBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    li.remove();
    updateLocalStorage();
  });

  li.appendChild(delBtn);
  list.appendChild(li);
}

function saveHabit(text) {
  const habits = JSON.parse(localStorage.getItem("habits")) || [];
  habits.push({ text, completed: false });
  localStorage.setItem("habits", JSON.stringify(habits));
}

function loadHabits() {
  const habits = JSON.parse(localStorage.getItem("habits")) || [];
  habits.forEach((habit) => addHabit(habit.text, habit.completed));
}

function updateLocalStorage() {
  const allHabits = [];
  document.querySelectorAll("#habit-list li").forEach((li) => {
    const text = li.firstChild.textContent.trim();
    const completed = li.classList.contains("done");
    allHabits.push({ text, completed });
  });
  localStorage.setItem("habits", JSON.stringify(allHabits));
}
