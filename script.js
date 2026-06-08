import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";

import {
    getDatabase,
    ref,
    set,
    get,
    update,
    onValue,
    remove,
    runTransaction
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
const compteurParties =
    document.getElementById(
        "compteurParties"
    );
const lobby = document.getElementById("lobby");
const jeu = document.getElementById("jeu");
const finPartie = document.getElementById("finPartie");

const champPseudo = document.getElementById("pseudo");
const champCode = document.getElementById("codePartie");

const boutonCreer = document.getElementById("creerPartie");
const boutonRejoindre = document.getElementById("boutonRejoindre");
const boutonCommencer = document.getElementById("commencer");
const boutonNouvellePartie = document.getElementById("nouvellePartie");
const boutonRejouer = document.getElementById("rejouer");

const codeLobby = document.getElementById("codeLobby");
const listeJoueurs = document.getElementById("listeJoueurs");

const plateau = document.getElementById("plateau");
const affichageTour = document.getElementById("tour");
const affichageTimer =
    document.getElementById("timer");
const affichageScore = document.getElementById("score");
const affichageCouleurs =
    document.getElementById("etatCouleurs");
const affichageScoresJoueurs = document.getElementById("scores");
const classement = document.getElementById("classement");

let codePartieActuelle = "";
let pseudoActuel = "";
let monNumero = 0;
let partieActuelle = null;
let intervalTimer = null;
let timerTraite = false;
let joueurExcluDetecte = false;

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
function prechargerImages() {

    const images =
        [...new Set(cartesDeBase)];

    images.push("images/dos.png");

    for (let chemin of images) {

        const image =
            new Image();

        image.src =
            chemin;

    }

}

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

    let texte = "🏆 Scores<br><br>";

    const joueurs =
        partieActuelle.joueurs;

    for (let pseudo in joueurs) {

        const numero =
            joueurs[pseudo].numero;

        texte +=
    pseudo +
    " : " +
    scores[numero - 1];

if (
    partieActuelle.createur === pseudoActuel &&
    pseudo !== pseudoActuel
) {
    texte +=
    ' <span style="cursor:pointer;color:red;font-weight:bold;" onclick="exclureJoueur(\'' +
    pseudo +
    '\')"> ❌</span>';
}

texte += "<br>";

    }

    affichageScoresJoueurs.innerHTML =
        texte;

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
    boutonNouvellePartie.style.display = "block";
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
function lancerTimer() {
    

if (affichageTimer) {
        affichageTimer.style.display = "none";
    }

    return;

    if (intervalTimer !== null) {
        clearInterval(intervalTimer);
    }

    intervalTimer = setInterval(async function () {

        if (
            !partieActuelle ||
            !partieActuelle.game
        ) {
            return;
        }

        const tempsRestant = Math.max(
            0,
            Math.ceil(
                (
                    partieActuelle.game.timerFin -
                    Date.now()
                ) / 1000
            )
        );

        affichageTimer.innerHTML =
            "⏱️ " +
            tempsRestant;

        if (
            tempsRestant <= 0 &&
            timerTraite === false
        ) {

            timerTraite = true;

            if (
                monNumero !==
                partieActuelle.game.joueurActuel
            ) {
                return;
            }

            await gererExpirationTimer();

        }

    }, 200);

}
async function gererExpirationTimer() {

    const partieRef =
        ref(
            db,
            "parties/" +
            codePartieActuelle
        );

    const snapshot =
        await get(partieRef);

    if (!snapshot.exists()) {
        return;
    }

    const partie =
        snapshot.val();

    const game =
        partie.game;

    const selection =
        game.selection || [];
        console.log(
    "Expiration timer, selection =",
    selection.length
);

    const cartesVisibles =
        game.cartesVisibles || {};

    let prochainJoueur =
        game.joueurActuel + 1;

    if (prochainJoueur > 4) {
        prochainJoueur = 1;
    }

    if (selection.length === 1) {

        const indexCarte =
            selection[0];

        cartesVisibles[indexCarte] =
            false;

    }

    if (selection.length < 2) {

        console.log(
    "Passage au joueur",
    prochainJoueur
);
console.log(
    "EXCLUSION",
    numeroExclu,
    "->",
    prochainJoueur
);
        await update(partieRef, {

            "game/cartesVisibles":
                cartesVisibles,

            "game/selection":
                [],

    "game/verrouille":
        false,

            "game/joueurActuel":
                prochainJoueur,

            "game/timerFin":
                Date.now() + 20000

        });

    }
    await runTransaction(
    ref(db, "stats/partiesJouees"),
    function(valeur) {
        return (valeur || 0) + 1;
    }
);

}
function afficherEtatCouleurs(cartesTrouvees, cartes) {

    let bleu = 0;
let rouge = 0;
let jaune = 0;
let vert = 0;

    for (let index in cartesTrouvees) {

        if (
            cartesTrouvees[index] !== true
        ) {
            continue;
        }

        const carte =
            cartes[index];

        if (
            carte.includes("bleu")
        ) {
            bleu++;
        }

        if (
            carte.includes("rouge")
        ) {
            rouge++;
        }

        if (
            carte.includes("jaune")
        ) {
            jaune++;
        }

        if (
            carte.includes("vert")
        ) {
            vert++;
        }

    }

   const restantBleu =
    3 - bleu / 2;

const restantRouge =
    3 - rouge / 2;

const restantJaune =
    3 - jaune / 2;

const restantVert =
    3 - vert / 2;

affichageCouleurs.innerHTML =

    (restantBleu > 0
        ? "🔵 Bleu : " + restantBleu
        : "🙈 Bleu : NAKED")

    +

    " | " +

    (restantRouge > 0
        ? "🔴 Rouge : " + restantRouge
        : "🙈 Rouge : NAKED")

    +

    " | " +

    (restantJaune > 0
        ? "🟡 Jaune : " + restantJaune
        : "🙈 Jaune : NAKED")

    +

    " | " +

    (restantVert > 0
        ? "🟢 Vert : " + restantVert
        : "🙈 Vert : NAKED");
}
function dessinerPlateau(partie) {
    partieActuelle = partie;
    timerTraite = false;
    lancerTimer();
    const cartes = partie.plateau;
    const game = partie.game;

    const cartesVisibles = game.cartesVisibles || {};
    const cartesTrouvees = game.cartesTrouvees || {};
    const scores = game.scores || [0, 0, 0, 0];
    const joueurActuel = game.joueurActuel || 1;
    const pairesTrouvees = game.pairesTrouvees || 0;
    let pseudoTour = "Joueur " + joueurActuel;

for (let pseudo in partie.joueurs) {

    if (
        partie.joueurs[pseudo].numero ===
        joueurActuel
    ) {

        pseudoTour = pseudo;
        break;

    }

}

    plateau.innerHTML = "";

    affichageTour.innerHTML =
    "🔴 Tour de " +
    pseudoTour;
    const tempsRestant = Math.max(
    0,
    Math.ceil(
        (game.timerFin - Date.now()) / 1000
    )
);

affichageTimer.innerHTML =
    "⏱️ " +
    tempsRestant;
    affichageTour.className = "joueur" + joueurActuel;

    affichageScore.innerHTML = "Score : " + pairesTrouvees;
    afficherScores(scores);
    afficherEtatCouleurs(
    cartesTrouvees,
    cartes
);

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

    const victoireBattle =
    verifierVictoireBattle(
        cartesTrouvees,
        cartes,
        partie.joueurs
    );

if (
    victoireBattle === false &&
    pairesTrouvees === cartes.length / 2
) {
    afficherFinPartie(scores);
}
}
function joueurEstNaked(
    numeroJoueur,
    cartesTrouvees,
    cartes
) {

    const couleursJoueurs = {
        1: "bleu",
        2: "rouge",
        3: "jaune",
        4: "vert"
    };

    const couleur =
        couleursJoueurs[numeroJoueur];

    let cartesTrouveesCouleur = 0;

    for (let index in cartesTrouvees) {

        if (
            cartesTrouvees[index] !== true
        ) {
            continue;
        }

        if (
            cartes[index].includes(couleur)
        ) {
            cartesTrouveesCouleur++;
        }

    }

    return cartesTrouveesCouleur >= 6;

}

function trouverProchainJoueur(
    joueurActuel,
    cartesTrouvees,
    cartes
) {

    let prochainJoueur =
        joueurActuel;

    do {

        prochainJoueur++;

        if (prochainJoueur > 4) {
            prochainJoueur = 1;
        }

    }

    while (
        joueurEstNaked(
            prochainJoueur,
            cartesTrouvees,
            cartes
        )
    );

    return prochainJoueur;

}
function verifierVictoireBattle(
    cartesTrouvees,
    cartes,
    joueurs
) {

    let joueursEncoreHabilles = [];

    for (let pseudo in joueurs) {

        const numero =
            joueurs[pseudo].numero;

        if (
            joueurEstNaked(
                numero,
                cartesTrouvees,
                cartes
            ) === false
        ) {

            joueursEncoreHabilles.push(
                pseudo
            );

        }

    }

    if (joueursEncoreHabilles.length === 1) {

        classement.innerHTML =
            "🏆 VICTOIRE DE " +
            joueursEncoreHabilles[0] +
            " !<br><br>" +
            "Les autres joueurs sont NAKED 🙈";

        jeu.style.display = "none";
        finPartie.style.display = "block";
        boutonNouvellePartie.style.display = "block";

        return true;

    }

    return false;

}


async function jouerCarte(indexCarte) {
    if (codePartieActuelle === "") {
        return;
    }
const partieRef =
    ref(
        db,
        "parties/" +
        codePartieActuelle
    );

const snapshot =
    await get(partieRef);

if (!snapshot.exists()) {
    return;
}


    const partie = snapshot.val();
    const cartes = partie.plateau;
    const game = partie.game;
    const cartesTrouvees =
    game.cartesTrouvees || {};

if (
    joueurEstNaked(
        monNumero,
        cartesTrouvees,
        cartes
    )
) {
    return;
}
    if (monNumero !== game.joueurActuel) {
    return;
}

    if (!game || game.verrouille === true) {
        return;
    }

    const cartesVisibles = game.cartesVisibles || {};
    
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
            "game/pairesTrouvees": game.pairesTrouvees + 1, 
            "game/timerFin": Date.now() + 20000
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

       let prochainJoueur =
    trouverProchainJoueur(
        nouveauGame.joueurActuel,
        nouveauGame.cartesTrouvees || {},
        cartes
    );
        await update(partieRef, {
    "game/cartesVisibles": nouvellesCartesVisibles,
    "game/selection": [],
    "game/verrouille": false,
    "game/joueurActuel": prochainJoueur,
    "game/timerFin": Date.now() + 20000
});

    }, 1000);
}
window.exclureJoueur =
async function (nom) {

    if (
        confirm(
            "Exclure " +
            nom +
            " ?"
        ) === false
    ) {
        return;
    }

    const partieRef =
        ref(
            db,
            "parties/" +
            codePartieActuelle
        );

    const snapshot =
        await get(partieRef);

    if (!snapshot.exists()) {
        return;
    }

    const partie =
        snapshot.val();

    const joueurs =
        partie.joueurs || {};

    const joueurExclu =
        joueurs[nom];

    if (!joueurExclu) {
        return;
    }

    const numeroExclu =
        joueurExclu.numero;
        

    await remove(
        ref(
            db,
            "parties/" +
            codePartieActuelle +
            "/joueurs/" +
            nom
        )
    );

    if (
        partie.game &&
        partie.game.joueurActuel === numeroExclu
    ) {

        let prochainJoueur =
    numeroExclu + 1;
    
if (prochainJoueur > 4) {
    prochainJoueur = 1;
}

await update(partieRef, {
    "game/joueurActuel":
        prochainJoueur,

    "game/verrouille":
        false,

    "game/selection":
        []
});
    }

}
function surveillerJoueurs(code) {

    const joueursRef =
        ref(db, "parties/" + code + "/joueurs");

    onValue(joueursRef, function (snapshot) {

        const joueurs =
            snapshot.val();

        listeJoueurs.innerHTML = "";

        if (!joueurs) {
            return;
        }

        for (let nom in joueurs) {

            let ligne =
                "<li>" + nom;

            if (
                partieActuelle &&
                partieActuelle.createur === pseudoActuel &&
                nom !== pseudoActuel
            ) {

                ligne +=
                    ' <button onclick="exclureJoueur(\'' +
                    nom +
                    '\')">❌</button>';

            }

            ligne += "</li>";

            listeJoueurs.innerHTML += ligne;

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

    if (
        pseudoActuel &&
        partie.joueurs &&
        !partie.joueurs[pseudoActuel] &&
        joueurExcluDetecte === false
    ) {
        joueurExcluDetecte = true;
        alert("Tu as été exclu de la partie.");
        location.reload();
        return;
    }

    if (partie.etat === "jeu" && partie.plateau && partie.game) {
            accueil.style.display = "none";
            lobby.style.display = "none";
            finPartie.style.display = "none";
            jeu.style.display = "block";
            boutonNouvellePartie.style.display = "none";

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
    if (partie.etat === "enCours") {
    alert("La partie a déjà commencé");
    return;
}

const nbJoueurs =
    Object.keys(partie.joueurs).length;
    if (nbJoueurs >= 4) {
    alert("Partie complète");
    return;
}

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

    const partieRef =
        ref(db, "parties/" + codePartieActuelle);

    const snapshot =
        await get(partieRef);

    if (!snapshot.exists()) {
        return;
    }

    const partie =
        snapshot.val();

    const nbJoueurs =
        Object.keys(partie.joueurs).length;

    if (nbJoueurs < 4) {
        alert("Il faut 4 joueurs pour commencer");
        return;
    }

    const plateauMelange =
        melangerCartes(cartesDeBase);

        await update(partieRef, {
        etat: "jeu",
        plateau: plateauMelange,
        game: {
            cartesVisibles: {},
            cartesTrouvees: {},
            selection: [],
            verrouille: false,
            joueurActuel: 1,
            scores: [0, 0, 0, 0],
            pairesTrouvees: 0,
            timerFin: Date.now() + 20000
        }
    });

    await runTransaction(
        ref(db, "stats/partiesJouees"),
        function(valeur) {
            return (valeur || 0) + 1;
        }
    );

});

boutonNouvellePartie.addEventListener("click", nouvellePartie);
boutonRejouer.addEventListener("click", nouvellePartie);
onValue(
    ref(db, "stats/partiesJouees"),
    function(snapshot) {

        if (!compteurParties) {
            return;
        }

        compteurParties.innerHTML =
            "🎮 Parties jouées : " +
            (snapshot.val() || 0);

    }
);
prechargerImages();
console.log("VERSION PLAYBATTLE V1.01 - compteur + verrouillage");