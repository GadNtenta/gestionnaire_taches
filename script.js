let taches = [];
const form = document.getElementById("task-form");
const taskList = document.getElementById("task-list");
const statsDiv = document.getElementById("statsDiv");
const filterForm = document.getElementById("filter-form");
const searchForm = document.getElementById("search-form");
const sortForm = document.getElementById("sort-form");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const nom = document.getElementById("task-name").value;
  const priorite = parseInt(document.getElementById("task-priority").value);
  const dateEcheance = document.getElementById("task-deadline").value;

  if (nom && dateEcheance) {
    ajouterTache(nom, priorite, dateEcheance);
    afficherTaches();
    form.reset();
  }
});

filterForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const status = document.getElementById("filter-status").value;
  const priorite = document.getElementById("filter-priority").value;
  afficherTachesFiltrees(status, priorite);
});

sortForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const critere = document.getElementById("sort-criteria").value;
  trierTaches(critere);
});

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const nomRecherche = document
    .getElementById("search-name")
    .value.toLowerCase();
  afficherTachesRecherche(nomRecherche);
});

function ajouterTache(nom, priorite, dateEcheance) {
  const tache = {
    nom: nom,
    priorite: priorite,
    dateEcheance: new Date(dateEcheance),
    complete: false,
  };
  taches.push(tache);
}

function afficherTaches() {
  taskList.innerHTML = "";
  taches.forEach((tache, index) => {
    const taskDiv = document.createElement("div");
    taskDiv.className = `task ${tache.complete ? "complete" : ""}`;

    taskDiv.innerHTML = `
      <span>${tache.nom} (Priorité: ${
      tache.priorite
    }, Échéance: ${tache.dateEcheance.toDateString()}, ${
      tache.complete ? "Terminée" : "En cours"
    })</span>
      <div>
        <button onclick="marquerCommeComplete(${index})">Compléter</button>
        <button onclick="supprimerTache(${index})">Supprimer</button>
        <button onclick="modifierTache(${index})">Modifier</button>
      </div>
    `;

    taskList.appendChild(taskDiv);
  });
  afficherStats();
}

function marquerCommeComplete(index) {
  if (confirm("Voulez-vous vraiment marquer cette tâche comme complète ?")) {
    taches[index].complete = true;
    afficherTaches();
  } else {
    console.log("Tache non marquée comme complète.");
  }
}

function supprimerTache(index) {
  if (confirm("Voulez-vous vraiment supprimer cette tâche ?")) {
    taches.splice(index, 1);
    afficherTaches();
  } else {
    console.log("Tache non supprimée.");
  }
}

function modifierTache(index) {
  const nom = prompt("Entrez le nouveau nom de la tâche :");
  const priorite = parseInt(
    prompt("Entrez la nouvelle priorité de la tâche (1-3) :")
  );
  date = prompt(
    "Entrez la nouvelle date décheance de la tâche (day/month/num/year) :"
  );
  if (nom && priorite && date) {
    taches[index].nom = nom;
    taches[index].priorite = priorite;
    taches[index].dateEcheance = new Date(date);
    afficherTaches();
  } else {
    console.log("Tache non modifiée.");
  }
}

function afficherStats() {
  const stats = {
    total: taches.length,
    enCours: taches.filter((tache) => !tache.complete).length,
    terminees: taches.filter((tache) => tache.complete).length,
  };
  statsDiv.innerHTML = `
    <p>Total de tâches : ${stats.total}</p>
    <p>Tâches en cours : ${stats.enCours}</p>
    <p>Tâches terminées : ${stats.terminees}</p>
  `;
}



function afficherTachesRecherche(nomRecherche) {
  const filtres = taches.filter((tache) =>
    tache.nom.toLowerCase().includes(nomRecherche)
  );
  afficherTaches(filtres);
}

afficherTaches();
