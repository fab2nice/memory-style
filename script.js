import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";

import {
    getDatabase,
    ref,
    set,
    get,
    update,
    onValue
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyAovNRvAz_ScQmRLWqwR_HmGEM-6lcLk8Q",
    authDomain: "memory-sytle.firebaseapp.com",
    databaseURL: "https://memory-sytle-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "memory-sytle",
    storageBucket: "memory-sytle.firebasestorage.app",
    messagingSenderId: "267184362334",
    appId: "1:267184362334:web:0ec6821f7ef2a23ae2f5cf"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const accueil = document.getElementById("accueil");
const lobby = document.getElementById("lobby");
const jeu = document.getElementById("jeu");
const finPartie = document.getElementById("finPartie");

const champPseudo = document.getElementById("pseudo");
const champCode = document.getElementById("codePartie");

const boutonCreer = document.getElementById("creerPartie");
const boutonRejoindre = document.getElementById("rejoindrePartie");
const boutonCommencer = document.getElementById("commencer");
const boutonNouvellePartie = document.getElementById("nouvellePartie");
const boutonRejouer = document.getElementById("rejouer");

const codeLobby = document.getElementById("codeLobby");
const listeJoueurs = document.getElementById("listeJoueurs");

const plateau = document.getElementById("plateau");
const affichageTour = document.getElementById("tour");
const affichageScore = document.getElementById("score");
const affichageScoresJoueurs = document.getElementById("scores");
const classement = document.getElementById("classement");

let codePartieActuelle = "";
let pseudoActuel = "";
let monNumero = 0;

const cartesDeBase = [
    "images/basbleu.png", "images/basbleu.png",
    "images/basjaune.png", "images/basjaune.png",
    "images/basrouge.png", "images/basrouge.png",
    "images/basvert.png", "images/basvert.png",

    "images/pantbleu.png", "images/pantbleu.png",
    "images/pantjaune.png", "images/pantjaune.png",
    "images/pantrouge.png", "images/pantrouge.png",
    "images/pantvert.png", "images/pantvert.png",

    "images/tshirtbleu.png", "images/tshirtbleu.png",
    "images/tshirtjaune.png", "images/tshirtjaune.png",
    "images/tshirtrouge.png", "images/tshirtrouge.png",
    "images/tshirtvert.png", "images/tshirtvert.png"
];

function genererCode() {
    const lettres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let code = "";

    for (let i = 0; i < 4; i++) {
        code += lettres[Math.floor(Math.random() * lettres.length)];
    }

    return code;
}

function melangerCartes(tableau) {
    const copie = [...tableau];

    copie.sort(function () {
        return Math.random() - 0.5;
    });

    return copie;
}

function afficherScores(scores) {
    affichageScoresJoueurs.innerHTML =
        "J1 : " + scores[0] +
        " | J2 : " + scores[1] +
        " | J3 : " + scores[2] +
        " | J4 : " + scores[3];
}

function afficherFinPartie(scores) {
    let meilleurScore = Math.max(...scores);
    let gagnants = [];

    for (let i = 0; i < scores.length; i++) {
        if (scores[i] === meilleurScore) {
            gagnants.push(i + 1);
        }
    }

    classement.innerHTML =
        "J1 : " + scores[0] + " paire(s)<br>" +
        "J2 : " + scores[1] + " paire(s)<br>" +
        "J3 : " + scores[2] + " paire(s)<br>" +
        "J4 : " + scores[3] + " paire(s)<br><br>" +
        "🥇 Vainqueur(s) : Joueur(s) " + gagnants.join(", ");

    jeu.style.display = "none";
    finPartie.style.display = "block";
}

function nouvellePartie() {
    location.reload();
}

function afficherDos(bouton) {
    bouton.innerHTML = "<img src='images/dos.png'>";
}

function afficherCarte(bouton, carte) {
    bouton.innerHTML = "<img src='" + carte + "'>";
}

function dessinerPlateau(partie) {
    const cartes = partie.plateau;
    const game = partie.game;

    const cartesVisibles = game.cartesVisibles || {};
    const cartesTrouvees = game.cartesTrouvees || {};
    const scores = game.scores || [0, 0, 0, 0];
    const joueurActuel = game.joueurActuel || 1;
    const pairesTrouvees = game.pairesTrouvees || 0;

    plateau.innerHTML = "";

    affichageTour.innerHTML = "🔴 Tour du joueur " + joueurActuel;
    affichageTour.className = "joueur" + joueurActuel;

    affichageScore.innerHTML = "Score : " + pairesTrouvees;
    afficherScores(scores);

    for (let i = 0; i < cartes.length; i++) {
        const bouton = document.createElement("button");

        const visible = cartesVisibles[i] === true;
        const trouvee = cartesTrouvees[i] === true;

        if (visible || trouvee) {
            afficherCarte(bouton, cartes[i]);
        } else {
            afficherDos(bouton);
        }

        if (trouvee || game.verrouille === true) {
            bouton.disabled = true;
        }

        bouton.addEventListener("click", function () {
            jouerCarte(i);
        });

        plateau.appendChild(bouton);
    }

    if (pairesTrouvees === cartes.length / 2) {
        afficherFinPartie(scores);
    }
}

async function jouerCarte(indexCarte) {
    if (codePartieActuelle === "") {
        return;
    }

    const partieRef = ref(db, "parties/" + codePartieActuelle);
    const snapshot = await get(partieRef);

    if (!snapshot.exists()) {
        return;
    }

    const partie = snapshot.val();
    const cartes = partie.plateau;
    const game = partie.game;
    if (monNumero !== game.joueurActuel) {
    return;
}

    if (!game || game.verrouille === true) {
        return;
    }

    const cartesVisibles = game.cartesVisibles || {};
    const cartesTrouvees = game.cartesTrouvees || {};
    const selection = game.selection || [];
    const scores = game.scores || [0, 0, 0, 0];

    if (cartesTrouvees[indexCarte] === true) {
        return;
    }

    if (cartesVisibles[indexCarte] === true) {
        return;
    }

    if (selection.length >= 2) {
        return;
    }

    cartesVisibles[indexCarte] = true;
    selection.push(indexCarte);

    if (selection.length === 1) {
        await update(partieRef, {
            "game/cartesVisibles": cartesVisibles,
            "game/selection": selection
        });

        return;
    }

    const premiereIndex = selection[0];
    const deuxiemeIndex = selection[1];

    if (cartes[premiereIndex] === cartes[deuxiemeIndex]) {
        cartesTrouvees[premiereIndex] = true;
        cartesTrouvees[deuxiemeIndex] = true;

        scores[game.joueurActuel - 1]++;

        await update(partieRef, {
            "game/cartesVisibles": cartesVisibles,
            "game/cartesTrouvees": cartesTrouvees,
            "game/selection": [],
            "game/scores": scores,
            "game/pairesTrouvees": game.pairesTrouvees + 1
        });

        return;
    }

    await update(partieRef, {
        "game/cartesVisibles": cartesVisibles,
        "game/selection": selection,
        "game/verrouille": true
    });

    setTimeout(async function () {
        const nouveauSnapshot = await get(partieRef);

        if (!nouveauSnapshot.exists()) {
            return;
        }

        const nouvellePartie = nouveauSnapshot.val();
        const nouveauGame = nouvellePartie.game;

        const nouvellesCartesVisibles =
            nouveauGame.cartesVisibles || {};

        nouvellesCartesVisibles[premiereIndex] = false;
        nouvellesCartesVisibles[deuxiemeIndex] = false;

        let prochainJoueur = nouveauGame.joueurActuel + 1;

        if (prochainJoueur > 4) {
            prochainJoueur = 1;
        }

        await update(partieRef, {
            "game/cartesVisibles": nouvellesCartesVisibles,
            "game/selection": [],
            "game/verrouille": false,
            "game/joueurActuel": prochainJoueur
        });

    }, 1000);
}

function surveillerJoueurs(code) {
    const joueursRef = ref(db, "parties/" + code + "/joueurs");

    onValue(joueursRef, function (snapshot) {
        const joueurs = snapshot.val();

        listeJoueurs.innerHTML = "";

        if (!joueurs) {
            return;
        }

        for (let nom in joueurs) {
            listeJoueurs.innerHTML += "<li>" + nom + "</li>";
        }
    });
}

function surveillerPartie(code) {
    const partieRef = ref(db, "parties/" + code);

    onValue(partieRef, function (snapshot) {
        const partie = snapshot.val();

        if (!partie) {
            return;
        }

        if (partie.etat === "jeu" && partie.plateau && partie.game) {
            accueil.style.display = "none";
            lobby.style.display = "none";
            finPartie.style.display = "none";
            jeu.style.display = "block";

            dessinerPlateau(partie);
        }
    });
}

boutonCreer.addEventListener("click", async function () {
    pseudoActuel = champPseudo.value.trim();

    if (pseudoActuel === "") {
        alert("Choisis un pseudo");
        return;
    }

    codePartieActuelle = genererCode();

    await set(ref(db, "parties/" + codePartieActuelle), {
    createur: pseudoActuel,
    etat: "lobby",
    joueurs: {
        [pseudoActuel]: {
            numero: 1
        }
    }
});
monNumero = 1;

    codeLobby.innerHTML = codePartieActuelle;

    accueil.style.display = "none";
    lobby.style.display = "block";
    jeu.style.display = "none";
    finPartie.style.display = "none";

    surveillerJoueurs(codePartieActuelle);
    surveillerPartie(codePartieActuelle);
});

boutonRejoindre.addEventListener("click", async function () {
    pseudoActuel = champPseudo.value.trim();
    codePartieActuelle = champCode.value.trim().toUpperCase();

    if (pseudoActuel === "") {
        alert("Choisis un pseudo");
        return;
    }

    if (codePartieActuelle === "") {
        alert("Entre un code de partie");
        return;
    }

    const partieRef = ref(db, "parties/" + codePartieActuelle);
    const snapshot = await get(partieRef);

    if (!snapshot.exists()) {
        alert("Partie introuvable");
        return;
    }

    const partie = snapshot.val();

const nbJoueurs =
    Object.keys(partie.joueurs).length;

monNumero = nbJoueurs + 1;

await update(
    ref(
        db,
        "parties/" +
        codePartieActuelle +
        "/joueurs"
    ),
    {
        [pseudoActuel]: {
            numero: monNumero
        }
    }
);

    codeLobby.innerHTML = codePartieActuelle;

    accueil.style.display = "none";
    lobby.style.display = "block";
    jeu.style.display = "none";
    finPartie.style.display = "none";

    surveillerJoueurs(codePartieActuelle);
    surveillerPartie(codePartieActuelle);
});

boutonCommencer.addEventListener("click", async function () {
    if (codePartieActuelle === "") {
        alert("Aucune partie en cours");
        return;
    }

    const plateauMelange = melangerCartes(cartesDeBase);

    await update(ref(db, "parties/" + codePartieActuelle), {
        etat: "jeu",
        plateau: plateauMelange,
        game: {
            cartesVisibles: {},
            cartesTrouvees: {},
            selection: [],
            verrouille: false,
            joueurActuel: 1,
            scores: [0, 0, 0, 0],
            pairesTrouvees: 0
        }
    });
});

boutonNouvellePartie.addEventListener("click", nouvellePartie);
boutonRejouer.addEventListener("click", nouvellePartie);

console.log("script.js multijoueur synchronisé chargé");