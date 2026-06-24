
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
const partiesPubliques =
    document.getElementById(
        "partiesPubliques"
    );
const jeu = document.getElementById("jeu");
const finPartie = document.getElementById("finPartie");

const champPseudo = document.getElementById("pseudo");
const partiePublique =
    document.getElementById(
        "partiePublique"
    );
const champCode = document.getElementById("codePartie");

const boutonCreer = document.getElementById("creerPartie");
const boutonRejoindre = document.getElementById("boutonRejoindre");
const boutonCommencer = document.getElementById("commencer");
const boutonNouvellePartie = document.getElementById("nouvellePartie");
const boutonRejouer = document.getElementById("rejouer");
const changerMode =
    document.getElementById("changerMode");
    console.log(changerMode);

const codeLobby = document.getElementById("codeLobby");
const listeJoueurs = document.getElementById("listeJoueurs");

const plateau = document.getElementById("plateau");
const affichageTour = document.getElementById("tour");
const affichageTimer =
    document.getElementById("timer");
    const modeLobby =
    document.getElementById("modeLobby");
const affichageScore = document.getElementById("score");
const affichageCouleurs =
    document.getElementById("etatCouleurs");
    const boutonReady =
    document.getElementById(
        "boutonReady"
    );
const affichageScoresJoueurs = document.getElementById("scores");
const classement = document.getElementById("classement");
const reglesDuel =
    document.getElementById("reglesDuel");
    const salonVideo =
    document.getElementById(
        "salonVideo"
    );

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
const cartesDeBase3Joueurs = [
    "images/basbleu.png", "images/basbleu.png",
"images/basjaune.png", "images/basjaune.png",
"images/basrouge.png", "images/basrouge.png",

"images/pantbleu.png", "images/pantbleu.png",
"images/pantjaune.png", "images/pantjaune.png",
"images/pantrouge.png", "images/pantrouge.png",

"images/tshirtbleu.png", "images/tshirtbleu.png",
"images/tshirtjaune.png", "images/tshirtjaune.png",
"images/tshirtrouge.png", "images/tshirtrouge.png",

"images/chaussettesbleues.png", "images/chaussettesbleues.png",
"images/chaussettesjaunes.png", "images/chaussettesjaunes.png",
"images/chaussettesrouges.png", "images/chaussettesrouges.png"
];
const cartesDeBaseDuel = [

    "images/basbleu.png", "images/basbleu.png",
    "images/pantbleu.png", "images/pantbleu.png",
    "images/tshirtbleu.png", "images/tshirtbleu.png",
    "images/chaussettesbleues.png", "images/chaussettesbleues.png",

    "images/basrouge.png", "images/basrouge.png",
    "images/pantrouge.png", "images/pantrouge.png",
    "images/tshirtrouge.png", "images/tshirtrouge.png",
    "images/chaussettesrouges.png", "images/chaussettesrouges.png",

    "images/auberginebleue.png", "images/auberginebleue.png",
    "images/abricotbleu.png", "images/abricotbleu.png",

    "images/auberginerouge.png", "images/auberginerouge.png",
    "images/abricotrouge.png", "images/abricotrouge.png",

    "images/bouclier.png", "images/bouclier.png",
    "images/cadeau.png", "images/cadeau.png"

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
function surveillerPartiesPubliques() {

    const partiesRef =
        ref(db, "parties");

    onValue(partiesRef, function (snapshot) {

        const parties =
            snapshot.val();

        partiesPubliques.innerHTML = "";

        if (!parties) {
            return;
        }

        for (let code in parties) {

            const partie =
                parties[code];
                if (
    partie.publique !== true
) {
    continue;
}
                const age =
    Date.now() -
    (partie.dateCreation || 0);

if (
    age >
    15 * 60 * 1000
) {
    continue;
}

            if (
                partie.etat !== "lobby"
            ) {
                continue;
            }

            const nbJoueurs =
                Object.keys(
                    partie.joueurs
                ).length;

            const mode =
                partie.mode || 4;
                if (nbJoueurs >= mode) {
    continue;
}

            let nomMode;

if (mode === 2) {

    nomMode = "🎯 Duel";

} else if (mode === 3) {

    nomMode = "👥 3 Players";

} else {

    nomMode = "👥 4 Players";

}

partiesPubliques.innerHTML +=
    '<button class="partiePublique" onclick="rejoindrePartiePublique(\'' +
    code +
    '\')">' +
    nomMode +
    "<br>" +
    "By " +
    partie.createur +
    "<br>" +
    nbJoueurs +
    " / " +
    mode +
    " players" +
    "</button><br>";

        }

    });

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
            let icone = "";

if (numero === 1) {
    icone = "🔵";
}

if (numero === 2) {
    icone = "🔴";
}

if (numero === 3) {
    icone = "🟡";
}

if (numero === 4) {
    icone = "🟢";
}

        texte +=
    icone +
    " " +
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

affichageCouleurs.innerHTML = "";
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
    "▶ " +
    pseudoTour.toUpperCase() +
    "'S TURN ◀";
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

    let seuilNaked = 6;

if (
    partieActuelle &&
    partieActuelle.mode === 2
) {

    seuilNaked = 12;

} else if (
    partieActuelle &&
    partieActuelle.mode === 3
) {

    seuilNaked = 8;

}

return cartesTrouveesCouleur >= seuilNaked;

}

function trouverProchainJoueur(
    joueurActuel,
    cartesTrouvees,
    cartes,
    joueurs
) {

    let prochainJoueur =
        joueurActuel;

    for (let i = 0; i < 4; i++) {

        prochainJoueur++;

        if (prochainJoueur > 4) {
            prochainJoueur = 1;
        }

        let joueurExiste =
            false;

        for (let pseudo in joueurs) {

            if (
                joueurs[pseudo].numero ===
                prochainJoueur
            ) {
                joueurExiste = true;
            }

        }

        if (
            joueurExiste === true &&
            joueurEstNaked(
                prochainJoueur,
                cartesTrouvees,
                cartes
            ) === false
        ) {

            return prochainJoueur;

        }

    }

    return joueurActuel;

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
        cartes,
        nouvellePartie.joueurs
    );
        await update(partieRef, {
    "game/cartesVisibles": nouvellesCartesVisibles,
    "game/selection": [],
    "game/verrouille": false,
    "game/joueurActuel": prochainJoueur,
    "game/timerFin": Date.now() + 20000
});

    }, 1200);
}
window.exclureJoueur =
async function (nom) {

    if (
        confirm(
            "Remove " +
            nom +
            " from the game?"
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

    await remove(
        ref(
            db,
            "parties/" +
            codePartieActuelle +
            "/joueurs/" +
            nom
        )
    );

    delete joueurs[nom];

    if (!partie.game) {
        return;
    }

    const joueurActuel =
        partie.game.joueurActuel;

    let joueurActuelExiste =
        false;

    for (let pseudo in joueurs) {

        if (
            joueurs[pseudo].numero ===
            joueurActuel
        ) {
            joueurActuelExiste = true;
        }

    }

    if (joueurActuelExiste) {
        return;
    }

    let prochainJoueur =
        joueurActuel;

    for (let i = 0; i < 4; i++) {

        prochainJoueur++;

        if (prochainJoueur > 4) {
            prochainJoueur = 1;
        }

        for (let pseudo in joueurs) {

            if (
                joueurs[pseudo].numero ===
                prochainJoueur
            ) {

                await update(partieRef, {
                    "game/joueurActuel": prochainJoueur,
                    "game/verrouille": false,
                    "game/selection": []
                });

                return;

            }

        }

    }

};
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
        const totalJoueurs =
    Object.keys(joueurs).length;

const joueursReady =
    Object.values(joueurs)
        .filter(j => j.ready)
        .length;

compteurReady.innerHTML =
    "Ready Players : " +
    joueursReady +
    " / " +
    totalJoueurs;

        if (
            joueurs[pseudoActuel]
        ) {

            if (
                joueurs[pseudoActuel].ready
            ) {

                boutonReady.innerHTML =
                    "🟢 Ready";

            } else {

                boutonReady.innerHTML =
                    "⚪ Not Ready";

            }

        }

        for (let nom in joueurs) {

            let statut =
                joueurs[nom].ready
                    ? "🟢 "
                    : "⚪ ";

            let ligne =
                "<li class='ligne-joueur'>" +
                statut +
                nom;

            if (
                partieActuelle &&
                partieActuelle.createur === pseudoActuel &&
                nom !== pseudoActuel
            ) {

                ligne +=
                    ' <button class="bouton-exclure" onclick="exclureJoueur(\'' +
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
partieActuelle = partie;

if (
    partie.etat === "lobby" &&
    partie.createur === pseudoActuel
) {

    choixModeLobby.style.display =
        "block";

    commencer.style.display =
        "inline-block";

} else {

    choixModeLobby.style.display =
        "none";

    commencer.style.display =
        "none";

}
    if (partie.mode === 2) {

    modeLobby.innerHTML =
        "Mode : Duel";

} else if (partie.mode === 3) {

    modeLobby.innerHTML =
        "Mode : 3 Players";

} else {

    modeLobby.innerHTML =
        "Mode : 4 Players";

}
    if (
        pseudoActuel &&
        partie.joueurs &&
        !partie.joueurs[pseudoActuel] &&
        joueurExcluDetecte === false
    ) {
        joueurExcluDetecte = true;
        alert("You have been excluded.");
        location.reload();
        return;
    }

    if (partie.etat === "jeu" && partie.plateau && partie.game) {
            accueil.style.display = "none";
            lobby.style.display = "none";
            finPartie.style.display = "none";
            jeu.style.display = "block";
            if (partie.mode === 2) {

    reglesDuel.style.display = "block";

} else {

    reglesDuel.style.display = "none";

}
            boutonNouvellePartie.style.display = "none";

            dessinerPlateau(partie);
        }
    });
}


boutonCreer.addEventListener("click", async function () {
    pseudoActuel = champPseudo.value.trim();
    const modeChoisi =
    parseInt(
        document.querySelector(
            'input[name="modeJoueurs"]:checked'
        ).value
    );

    if (pseudoActuel === "") {
        alert("Choose nickname");
        return;
    }

    codePartieActuelle = genererCode();

    await set(ref(db, "parties/" + codePartieActuelle), {
    createur: pseudoActuel,
    mode: modeChoisi,
    etat: "lobby",
    publique:
    partiePublique.checked,
    dateCreation: Date.now(),

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
        alert("Choose nickname");
        return;
    }

    if (codePartieActuelle === "") {
        alert("Enter game code");
        return;
    }

    const partieRef = ref(db, "parties/" + codePartieActuelle);
    const snapshot = await get(partieRef);

    if (!snapshot.exists()) {
        alert("part not found");
        return;
    }

    const partie = snapshot.val();
    if (partie.etat === "enCours") {
    alert("The game has already begun");
    return;
}

const nbJoueurs =
    Object.keys(partie.joueurs).length;

const mode =
    partie.mode || 4;

if (nbJoueurs >= mode) {

    alert(
        "the game is complete"
    );

    return;

}

let numerosUtilises = [];

for (let nom in partie.joueurs) {

    numerosUtilises.push(
        partie.joueurs[nom].numero
    );

}

for (let i = 1; i <= mode; i++) {

    if (
        numerosUtilises.includes(i) === false
    ) {

        monNumero = i;
        break;

    }

}

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
    if (
    partieActuelle.createur !==
    pseudoActuel
) {
    return;
}

    if (codePartieActuelle === "") {
        alert("no game in progress");
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

const mode =
    partie.mode || 4;

if (nbJoueurs < mode) {

    alert(
        "You need " +
        mode +
        " players to start"
    );

    return;

}
let cartes;

if (partie.mode === 2) {

    cartes = cartesDeBaseDuel;

} else if (partie.mode === 3) {

    cartes = cartesDeBase3Joueurs;

} else {

    cartes = cartesDeBase;

}

const plateauMelange =
    melangerCartes(cartes);
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
mode2.addEventListener(
    "click",
    async function () {
        if (
    partieActuelle.createur !==
    pseudoActuel
) {
    return;
}

        const snapshot =
            await get(
                ref(
                    db,
                    "parties/" +
                    codePartieActuelle
                )
            );

        const partie =
            snapshot.val();

        const nbJoueurs =
            Object.keys(
                partie.joueurs
            ).length;

        if (nbJoueurs > 2) {

            alert(
                "Too many players"
            );

            return;

        }

        await update(
            ref(
                db,
                "parties/" +
                codePartieActuelle
            ),
            {
                mode: 2
            }
        );

    }
);
mode3.addEventListener(
    "click",
    async function () {
        

        const snapshot =
            await get(
                ref(
                    db,
                    "parties/" +
                    codePartieActuelle
                )
            );

        const partie =
            snapshot.val();

        const nbJoueurs =
            Object.keys(
                partie.joueurs
            ).length;

        if (nbJoueurs > 3) {

            alert(
                "Too many players"
            );

            return;

        }

        await update(
            ref(
                db,
                "parties/" +
                codePartieActuelle
            ),
            {
                mode: 3
            }
        );

    }
);
mode4.addEventListener(
    "click",
    async function () {

        await update(
            ref(
                db,
                "parties/" +
                codePartieActuelle
            ),
            {
                mode: 4
            }
        );

    }
);
window.rejoindrePartiePublique =
    function (code) {

        champCode.value = code;

        boutonRejoindre.click();

    };
surveillerPartiesPubliques();
salonVideo.addEventListener(
    "click",
    function () {

        window.open(
            "https://kmeet.infomaniak.com/playbattle-" +
            codePartieActuelle,
            "_blank"
        );

    }
);
boutonReady.addEventListener(
    "click",
    async function () {

        const joueurRef =
            ref(
                db,
                "parties/" +
                codePartieActuelle +
                "/joueurs/" +
                pseudoActuel
            );

        const snapshot =
            await get(joueurRef);

        if (!snapshot.exists()) {
            return;
        }

        const joueur =
            snapshot.val();

        await update(
            joueurRef,
            {
                ready: !joueur.ready
            }
        );

    }
);
