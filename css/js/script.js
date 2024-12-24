document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("problem-form");
  const problemInput = document.getElementById("problem-input");
  const problemList = document.getElementById("problem-list");

  let problems = JSON.parse(localStorage.getItem("problems")) || [];

  // Ajouter un problème
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const problemText = problemInput.value.trim();
    if (!problemText) return;

    const problem = {
      id: Date.now(),
      text: problemText,
      timestamp: Date.now(),
    };

    problems.push(problem);
    localStorage.setItem("problems", JSON.stringify(problems));
    problemInput.value = "";
    renderProblems();
  });

  // Supprimer un problème
  problemList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const id = parseInt(e.target.dataset.id, 10);
      problems = problems.filter((problem) => problem.id !== id);
      localStorage.setItem("problems", JSON.stringify(problems));
      renderProblems();
    }
  });

  // Afficher les problèmes
  function renderProblems() {
    problemList.innerHTML = "";
    problems.forEach((problem) => {
      const li = document.createElement("li");
      const timeElapsed = formatTimeElapsed(problem.timestamp);

      li.innerHTML = `
        <span>${problem.text}</span>
        <small>${timeElapsed}</small>
        <button data-id="${problem.id}">Résolu</button>
      `;
      problemList.appendChild(li);
    });
  }

  // Formater le temps écoulé
  function formatTimeElapsed(timestamp) {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return `${seconds} sec.`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} min.`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} h`;
    const days = Math.floor(hours / 24);
    return `${days} j.`;
  }

  renderProblems();
});
