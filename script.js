
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";

import {
    getDatabase,
    ref,
    set,
    get,
    update,
    onValue,
    onChildAdded,
    remove,
    runTransaction,
    onDisconnect,
    push,
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
const howToPlay =
    document.getElementById("howToPlay");
const finPartie = document.getElementById("finPartie");

const champPseudo = document.getElementById("pseudo");
const partiePublique =
    document.getElementById(
        "partiePublique"
    );
const champCode = document.getElementById("codePartie");

const boutonCreer = document.getElementById("creerPartie");
const boutonRejoindre = document.getElementById("boutonRejoindre");
const connectProfile =
    document.getElementById(
        "connectProfile"
    );

const profileModal =
    document.getElementById(
        "profileModal"
    );
console.log(profileModal);
const cancelProfile =
    document.getElementById(
        "cancelProfile"
    );
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
   

const affichageScore = document.getElementById("score");
const affichageCouleurs =
    document.getElementById("etatCouleurs");
   const readySwitch =
    document.getElementById(
        "readySwitch"
    );
const affichageScoresJoueurs = document.getElementById("scores");
const classement = document.getElementById("classement");
const sonJoueur =
    new Audio("sons/joueur.mp3");
const reglesDuel =
    document.getElementById("reglesDuel");
    const salonVideo =
    document.getElementById(
        "salonVideo"
    );
    const infoSalonVideo =
    document.getElementById("infoSalonVideo");
    const chatLobby =
    document.getElementById("chatLobby");

const messageChat =
    document.getElementById("messageChat");

const envoyerMessage =
    document.getElementById("envoyerMessage");
   const badgeJoueurs =
    document.getElementById("badgeJoueurs");

const modeLobby =
    document.getElementById("modeLobby");

    const chatAccueilRef =
    ref(db, "chatAccueil");

    const chatAccueil =
    document.getElementById("chatAccueil");
    

const messageAccueil =
    document.getElementById("messageAccueil");
    
const envoyerAccueil =
    document.getElementById("envoyerAccueil");
    const saveProfile =
    document.getElementById("saveProfile");
    const over18 =
    document.getElementById("over18");
    const profileNickname =
    document.getElementById("profileNickname");

const profilePassword =
    document.getElementById("profilePassword");

const profileConfirmPassword =
    document.getElementById("profileConfirmPassword");
    const playMen = document.getElementById("playMen");
const playWomen = document.getElementById("playWomen");
const playCouples = document.getElementById("playCouples");
const playMartians = document.getElementById("playMartians");

const profileCountry = document.getElementById("profileCountry");
const loginProfile =
    document.getElementById("loginProfile");
    const logoutProfile =
    document.getElementById("logoutProfile");
    const viewProfileModal =
    document.getElementById(
        "viewProfileModal"
    );

const viewProfileContent =
    document.getElementById(
        "viewProfileContent"
    );
    const quitterLobby =
    document.getElementById("quitterLobby");
    const quitterPartie =
    document.getElementById("quitterPartie");

const closeProfile =
    document.getElementById(
        "closeProfile"
    );
    closeProfile.addEventListener(
    "click",
    function () {

        viewProfileModal.style.display =
            "none";

    }
);
    
    

let codePartieActuelle = "";
let pseudoActuel = "";
let monNumero = 0;
let partieActuelle = null;
let intervalTimer = null;
let timerTraite = false;
let joueurExcluDetecte = false;
let sortieVolontaire = false;
let tutorielVu = false;
let ancienNombreJoueurs = 0;
let anciensJoueurs = [];
let derniereNotification = 0;
let premiereLectureNotifications = true;
let joueursEnLigne = 0;
let nombrePartiesPubliques = 0;
let profilConnecte = null;
let chronoSoloDepart = 0;
let chronoSoloInterval = null;

const profilSauvegarde =
    localStorage.getItem(
        "profilConnecte"
    );

if (profilSauvegarde) {

    reconnecterProfil(
        profilSauvegarde
    );

}

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
async function updatePartie(
    partieRef,
    donnees
) {

    return await update(
        partieRef,
        donnees
    );

}

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
function surveillerJoueursEnLigne() {

    const joueursEnLigne =
        document.getElementById(
            "joueursEnLigne"
        );

    onValue(

        ref(db, "presence"),

        function (snapshot) {

            joueursEnLigne.innerHTML = "";

            if (!snapshot.exists()) {

                joueursEnLigne.innerHTML =
                    "<i>No player online.</i>";

                return;
                

            }

            const joueurs =
                snapshot.val();
                let nbGuests = 0;

           for (let id in joueurs) {

    const pseudo =
    joueurs[id].pseudo;

if (pseudo === "") {

    nbGuests++;

    continue;

}

    if (pseudo === "") {

        continue;

    }

    const div =
        document.createElement("div");

    div.innerHTML =
        "<span style='cursor:pointer;color:#ffd700;font-weight:bold'>" +
        pseudo +
        "</span>";

    div.onclick = function () {

        voirProfil(
            pseudo
        );

    };

    joueursEnLigne.appendChild(
        div
    );

}
if (nbGuests > 0) {

    const divGuest =
        document.createElement("div");

    divGuest.innerHTML =
        "👥 Visitors : " +
        nbGuests;

    joueursEnLigne.appendChild(
        divGuest
    );

}

        }

    );

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
            console.error("CLICK", i);
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
function traiterStatistiques(
    partie,
    cartesTrouvees,
    cartes
) {

    console.log("traiterStatistiques appelée");

for (let pseudo in partie.joueurs) {

        const numero =
            partie.joueurs[pseudo].numero;

        if (
            joueurEstNaked(
                numero,
                cartesTrouvees,
                cartes
            )
        ) {

            console.log(
                pseudo +
                " est devenu NAKED"
            );

        }

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


async function verifierVictoireBattle(
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
 incrementerStatProfil(
    joueursEncoreHabilles[0],
    "victories"
);
        return true;

    }

    return false;

}


async function jouerCarte(indexCarte) {
     console.error("jouerCarte", indexCarte);
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
console.error("Avant le if");
    if (cartes[premiereIndex] === cartes[deuxiemeIndex]) {
console.log("Paire trouvée");
    cartesTrouvees[premiereIndex] = true;
    cartesTrouvees[deuxiemeIndex] = true;

    traiterStatistiques(
        partie,
        cartesTrouvees,
        cartes
    );

    scores[game.joueurActuel - 1]++;
    const prochainJoueurApresPaire =
    joueurEstNaked(
        game.joueurActuel,
        cartesTrouvees,
        cartes
    )
        ? trouverProchainJoueur(
            game.joueurActuel,
            cartesTrouvees,
            cartes,
            partie.joueurs
        )
        : game.joueurActuel;

        await update(partieRef, {

    "game/cartesVisibles": cartesVisibles,
    "game/cartesTrouvees": cartesTrouvees,
    "game/selection": [],
    "game/scores": scores,
    "game/pairesTrouvees": game.pairesTrouvees + 1,
    "game/joueurActuel": prochainJoueurApresPaire,
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

    readySwitch.checked =
        joueurs[pseudoActuel].ready === true;

}

        for (let nom in joueurs) {

            let statut =
                joueurs[nom].ready
                    ? "🟢 "
                    : "⚪ ";

            let ligne =
    "<li class='carteJoueur'>" +

        "<div class='nomJoueur' onclick=\"voirProfil('" +
nom +
"')\">" +
            statut +
            nom +
        "</div>" +

        "<div class='etatJoueur'>" +
           (joueurs[nom].ready
    ? "✅ READY"
    : "⏳ WAITING") +
        "</div>";
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

    const partieRef =
        ref(db, "parties/" + code);

    onValue(partieRef, function (snapshot) {

        const partie =
    snapshot.val();

if (!partie) {

    codePartieActuelle = "";
    partieActuelle = null;

    lobby.style.display = "none";
    accueil.style.display = "block";

    return;
}

        let maxJoueurs = 4;

        if (partie.mode === 2) {

            maxJoueurs = 2;

        }
        else if (partie.mode === 3) {

            maxJoueurs = 3;

        }

        const nbJoueurs =
            Object.keys(
                partie.joueurs || {}
            ).length;

        badgeJoueurs.innerHTML =
            nbJoueurs +
            " / " +
            maxJoueurs;

        if (partie.mode === 2) {

            modeLobby.innerHTML =
                "Mode : Duel";

        }
        else if (partie.mode === 3) {

            modeLobby.innerHTML =
                "Mode : 3 Players";

        }
        else {

            modeLobby.innerHTML =
                "Mode : 4 Players";

        }

        partieActuelle = partie;
        if (
    partie.etat === "lobby" &&
    Object.keys(partie.joueurs || {}).length === 3
) {

    conseilMode.style.display = "block";

} else {

    conseilMode.style.display = "none";

}

        // <<< À partir d'ici, tu gardes exactement ton code actuel >>>

if (
    partie.etat === "lobby" &&
    partie.createur === pseudoActuel
) {

    
    commencer.style.display =
        "inline-block";

} else {

   
    commencer.style.display =
        "none";

}
    
    if (
    pseudoActuel &&
    partie.joueurs &&
    !partie.joueurs[pseudoActuel] &&
    joueurExcluDetecte === false &&
    sortieVolontaire === false
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

    if (tutorielVu === false) {

        jeu.style.display = "none";
        howToPlay.style.display = "block";

    } else {

        howToPlay.style.display = "none";
        jeu.style.display = "block";

    }
           
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
    if (!profilConnecte) {
    alert("A player profile is required to play.");
    profileModal.style.display = "block";
    return;
}
    pseudoActuel = champPseudo.value.trim();
    const partiesRef =
    ref(db, "parties");

const snapshot =
    await get(partiesRef);

if (snapshot.exists()) {

    const parties =
        snapshot.val();

    for (let code in parties) {

        const partie =
            parties[code];

       if (

    partie.createur === pseudoActuel &&

    partie.etat === "lobby"

) {
    console.log("Lobby existant trouvé :", code);

    codePartieActuelle = code;

    accueil.style.display = "none";
    lobby.style.display = "block";
    jeu.style.display = "none";
    finPartie.style.display = "none";

    codeLobby.innerHTML =
        code;

    surveillerChat();
    surveillerJoueurs(code);
    surveillerNotifications(code);
    surveillerPartie(code);

    return;

}
    }

}
    const valeurMode =
    document.querySelector(
        'input[name="modeJoueurs"]:checked'
    ).value;

if (valeurMode === "solo") {
    return;
}

const modeChoisi =
    parseInt(valeurMode);

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
    chat: {},

  joueurs: {
        [pseudoActuel]: {
            numero: 1
        }
    }
    
});
monNumero = 1;

await incrementerStat(
    "partiesCreees"
);

    codeLobby.innerHTML = codePartieActuelle;

    accueil.style.display = "none";
    lobby.style.display = "block";
    jeu.style.display = "none";
    surveillerChat();
    finPartie.style.display = "none";

    surveillerJoueurs(codePartieActuelle);
    surveillerNotifications(codePartieActuelle);
    surveillerPartie(codePartieActuelle);
});
envoyerAccueil.addEventListener(
    "click",
    envoyerMessageAccueil
);
messageAccueil.addEventListener(
    "keypress",
    function (event) {

        if (event.key === "Enter") {

            envoyerMessageAccueil();

        }

    }
);
quitterLobby.addEventListener(
    "click",
    async function () {

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

        const partie =
            snapshot.val();

        if (
            partie.createur ===
            pseudoActuel
        ) {

            await remove(
                partieRef
            );

        } else {

            await remove(
                ref(
                    db,
                    "parties/" +
                    codePartieActuelle +
                    "/joueurs/" +
                    pseudoActuel
                )
            );

        }

        codePartieActuelle = "";
        partieActuelle = null;

        lobby.style.display = "none";
        accueil.style.display = "block";

    }
);

boutonRejoindre.addEventListener("click", async function () {
    if (!profilConnecte) {
    alert("A player profile is required to play.");
    profileModal.style.display = "block";
    return;
}
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

await updatePartie(
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

await envoyerNotification(
    codePartieActuelle,
    "join",
    pseudoActuel
);
await incrementerStat(
    "partiesRejointes"
);

    codeLobby.innerHTML = codePartieActuelle;

    accueil.style.display = "none";
    lobby.style.display = "block";
    surveillerChat();
    jeu.style.display = "none";
    finPartie.style.display = "none";

    surveillerJoueurs(codePartieActuelle);
    surveillerNotifications(codePartieActuelle);
    surveillerPartie(codePartieActuelle);
});

envoyerMessage.addEventListener(
    "click",
    envoyerMessageChat
);
quitterPartie.addEventListener(
    "click",
    async function () {
        sortieVolontaire = true;
                if (
    cartesSolo.length > 0 ||
    cartesCombat.length > 0
) {
    retourAccueilSolo();
    return;
}

        if (codePartieActuelle === "") {
            return;
        }

        const partieRef =
            ref(
                db,
                "parties/" +
                codePartieActuelle
            );

        await remove(
            ref(
                db,
                "parties/" +
                codePartieActuelle +
                "/joueurs/" +
                pseudoActuel
            )
        );

        codePartieActuelle = "";
        partieActuelle = null;

        jeu.style.display = "none";
        finPartie.style.display = "none";
        accueil.style.display = "block";

    }
);

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
        const joueurs =
    partie.joueurs || {};

const tousReady =
    Object.values(joueurs)
        .every(joueur => joueur.ready === true);

if (!tousReady) {
    alert("All players must be ready before starting.");
    return;
}

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
            timerFin: Date.now() + 20000, 
            
        }
    });
    for (let pseudo in joueurs) {

    await incrementerStatProfil(
        pseudo,
        "gamesPlayed"
    );

}
    await incrementerStat(
    "partiesDemarrees"
);
    
    

});
connectProfile.addEventListener(
    "click",
    function () {
         console.log("Create Profile");

        profileModal.style.display =
            "block";

    }
);
logoutProfile.addEventListener("click", function () {

    profilConnecte = null;

    localStorage.removeItem(
        "profilConnecte"
    );

    pseudo.disabled = false;

    pseudo.value = "";

    connectProfile.innerHTML =
        "👤<br>Connect";

    logoutProfile.style.display =
        "none";
        connectProfile.style.display =
    "inline-block";

});

cancelProfile.addEventListener(
    "click",
    function () {

        profileModal.style.display =
            "none";

    }
);

boutonNouvellePartie.addEventListener("click", nouvellePartie);
boutonRejouer.addEventListener("click", nouvellePartie);
document
.getElementById("continuerJeu")
.addEventListener(
    "click",
    function(){
        tutorielVu = true;

        howToPlay.style.display="none";

        jeu.style.display="block";

    }
);

prechargerImages();
surveillerPresence();
compterJoueursEnLigne();
compterPartiesOuvertes();
nettoyerAnciennesParties();
surveillerChatAccueil();
surveillerJoueursEnLigne();

if (
    sessionStorage.getItem(
        "playbattleVisite"
    ) === null
) {

    compterVisiteur();

}
async function surveillerPresence() {

    const identifiant =
        pseudoActuel !== ""
            ? pseudoActuel
            : "Visiteur-" + Date.now();

    const connectedRef =
        ref(db, ".info/connected");

    const presenceRef =
        ref(
            db,
            "presence/" + identifiant
        );

    onValue(
        connectedRef,
        async function (snapshot) {

            if (snapshot.val() !== true) {
                return;
            }

            await onDisconnect(
                presenceRef
            ).remove();

            await set(
    presenceRef,
    {
        pseudo:
            profilConnecte
                ? profilConnecte.nickname
                : ""
    }
);

        }
    );

}
async function compterJoueursEnLigne() {

    const presenceRef =
        ref(
            db,
            "presence"
        );

    onValue(
        presenceRef,
        function(snapshot) {

            if (!snapshot.exists()) {

                joueursEnLigne = 0;

afficherDashboard();

return;

            }

            joueursEnLigne =
    Object.keys(
        snapshot.val()
    ).length;

afficherDashboard();
        }
    );

}
function compterPartiesOuvertes() {

    const partiesRef =
        ref(
            db,
            "parties"
        );

    onValue(
        partiesRef,
        function(snapshot) {

            if (!snapshot.exists()) {

                nombrePartiesPubliques = 0;

afficherDashboard();

return;

            }

            const parties =
                snapshot.val();

            let nombre = 0;

            for (let code in parties) {

                if (
    parties[code].etat === "lobby" &&
    parties[code].publique === true
) {

    nombre++;

}

            }

nombrePartiesPubliques = nombre;

afficherDashboard();

        }
    );

}
async function envoyerMessageChat() {

    const texte =
        messageChat.value.trim();

    if (texte === "") {
        return;
    }

    await push(
        ref(
            db,
            "parties/" +
            codePartieActuelle +
            "/chat"
        ),
        {
            pseudo: pseudoActuel,
            message: texte,
            date: Date.now()
        }
    );

    messageChat.value = "";

}
function surveillerChatAccueil() {

    onValue(chatAccueilRef, function (snapshot) {

        const messages = snapshot.val();
        const maintenant =
    Date.now();
    

        chatAccueil.innerHTML = "";

        if (!messages) {
            return;
        }

        for (let id in messages) {
        

   if (

    messages[id].date &&

    maintenant -
    messages[id].date >

    30 * 60 * 1000

) {

    remove(
        ref(
            db,
            "chatAccueil/" + id
        )
    );

    continue;

}

            chatAccueil.innerHTML +=

    "<div class='messageAccueil'>" +

        "<div class='pseudoAccueil'>" +

            messages[id].pseudo +

        "</div>" +

        "<div class='texteAccueil'>" +

            messages[id].texte +

        "</div>" +

    "</div>";

        }

        chatAccueil.scrollTop =
            chatAccueil.scrollHeight;

    });

}
async function envoyerMessageAccueil() {
    console.log("envoyerMessageAccueil");

    const texte =
        messageAccueil.value.trim();

    if (texte === "") {
        return;
    }

    await push(chatAccueilRef, {

        pseudo: pseudo.value.trim(),

        texte: texte,

        date: Date.now()

    });
    const snapshot =
    await get(chatAccueilRef);

const messages =
    snapshot.val();
    const maintenant =
    Date.now();
   

if (messages) {

    const ids =
        Object.keys(messages).sort(
            (a, b) =>
            messages[a].date -
            messages[b].date
        );

    // Suppression des messages
    // de plus de 30 minutes

    for (const id of ids) {

        if (

            maintenant -
            messages[id].date >

            30 * 60 * 1000

        ) {

            await remove(

                ref(
                    db,
                    "chatAccueil/" +
                    id
                )

            );

        }

    }

    // Limite à 30 messages

    const idsRestants =
        Object.keys(messages);

    if (idsRestants.length > 30) {

        await remove(

            ref(
                db,
                "chatAccueil/" +
                idsRestants[0]
            )

        );

    }

}

    messageAccueil.value = "";

}


function surveillerChat() {

    const chatRef =
        ref(
            db,
            "parties/" +
            codePartieActuelle +
            "/chat"
        );

    onValue(

        chatRef,

        function(snapshot) {

            chatLobby.innerHTML = "";

            if (!snapshot.exists()) {
                return;
            }

            const messages =
                snapshot.val();

            for (let id in messages) {

                const ligne =
                    "<p><b>" +
                    messages[id].pseudo +
                    " :</b> " +
                    messages[id].message +
                    "</p>";

                chatLobby.innerHTML +=
                    ligne;
                    

            }

        }

    );

}

function afficherDashboard() {

    console.clear();

    console.log(
        "=============================="
    );

    console.log(
        "📊 PLAYBATTLE LIVE"
    );

    console.log("");

    console.log(
        "👥 Joueurs en ligne :",
        joueursEnLigne
    );

    console.log(
    "🎮 Parties publiques :",
    nombrePartiesPubliques
);

    console.log(
        "=============================="
    );

}
async function nettoyerAnciennesParties() {

    const partiesRef =
        ref(
            db,
            "parties"
        );

    const snapshot =
        await get(partiesRef);

    if (!snapshot.exists()) {
        return;
    }

    const parties =
        snapshot.val();

    const maintenant =
        Date.now();

    for (let code in parties) {

        const partie =
            parties[code];
if (
    partie.dateCreation &&
    maintenant -
        partie.dateCreation >
        24 * 60 * 60 * 1000
) {

            await remove(
                ref(
                    db,
                    "parties/" + code
                )
            );

            console.log(
                "Partie supprimée :",
                code
            );

        }

    }

}
console.log(
    "VERSION PLAYBATTLE V1.01 - compteur + verrouillage"
);
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
readySwitch.addEventListener(
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

       await updatePartie(
    joueurRef,
    {
        ready: !joueur.ready
    }
);

    }
);
async function envoyerNotification(
    codePartie,
    type,
    joueur
) {

    const notificationRef =
        ref(
            db,
            "parties/" +
            codePartie +
            "/notification"
        );

    await set(
        notificationRef,
        {
            id: Date.now(),
            type: type,
            joueur: joueur,
            date: Date.now()
        }
    );

}
async function incrementerStat(nomStat) {

    console.log(
        "Incrémentation :",
        nomStat
    );

    const statRef =
        ref(
            db,
            "stats/" + nomStat
        );

    await runTransaction(
        statRef,
        function(valeur) {

            console.log(
                "Ancienne valeur :",
                valeur
            );

            return (valeur || 0) + 1;

        }
    );

    console.log(
        "Stat terminée"
    );

}
async function incrementerStatProfil(
    pseudo,
    stat
) {

    const profilRef =
        ref(
            db,
            "profils/" + pseudo
        );

    const snapshot =
        await get(profilRef);

    if (!snapshot.exists()) {
        return;
    }

    const profil =
        snapshot.val();

    const valeur =
        profil[stat] || 0;

    await update(
        profilRef,
        {
            [stat]:
                valeur + 1
        }
    );

}
async function incrementerVisiteHeure() {

    const heure =
    new Date()
        .toLocaleString(
            "fr-FR",
            {
                timeZone: "Europe/Paris",
                hour: "2-digit",
                hour12: false
            }
        )
        .padStart(2, "0");

    await incrementerStat(
        "visitesParHeure/" + heure
    );

}
async function compterVisiteur() {

    sessionStorage.setItem(
        "playbattleVisite",
        "oui"
    );

    await incrementerStat(
        "visiteurs"
    );
    await incrementerVisiteHeure();

}
function surveillerNotifications(code) {

    const notificationRef =
        ref(
            db,
            "parties/" +
            code +
            "/notification"
        );

    onValue(
        notificationRef,
        function (snapshot) {

            const notification =
                snapshot.val();

            if (!notification) {
                return;
            }

            if (
                notification.id === derniereNotification
            ) {
                return;
            }

            derniereNotification =
                notification.id;

            if (
                notification.type === "join" &&
                partieActuelle &&
                partieActuelle.createur === pseudoActuel
            ) {

                sonJoueur.currentTime = 0;
                sonJoueur.play();

            }

        }
    );

}
function afficherRegles() {

    alert(
`⚔️ PLAYBATTLE

HOW TO WIN

🎯 Find your opponents' clothes,
NOT YOUR OWN!

👕 Every clothing pair found
must be removed by its owner.

🙈 A naked player is eliminated.

📹 Click the yellow Open Video button.

🤝 Respect every player
and have fun!`
    );

}
saveProfile.addEventListener("click", async function () {

    if (!over18.checked) {

        alert("You must confirm that you are over 18 years old.");

        return;

    }

    if (profileNickname.value.trim() === "") {

        alert("Please choose a nickname.");

        return;

    }

    if (profilePassword.value === "") {

        alert("Please enter a password.");

        return;

    }
    if (profilePassword.value.length < 6) {

    alert("Password must contain at least 6 characters.");

    return;

}

    if (profilePassword.value !== profileConfirmPassword.value) {

        alert("Passwords do not match.");

        return;

    }
    const profilRef =
    ref(db, "profils/" + profileNickname.value);

const snapshot =
    await get(profilRef);

if (snapshot.exists()) {

    alert("Nickname already exists.");

    return;

}

    await set(profilRef, {

    nickname: profileNickname.value,

    password: await hashPassword(
    profilePassword.value
),

    gender: document.querySelector(
        'input[name="gender"]:checked'
    ).value,

    playWith: {

        men: playMen.checked,

        women: playWomen.checked,

        couples: playCouples.checked,

        martians: playMartians.checked

    },

    country: profileCountry.value.trim(),
    gamesPlayed: 0,
    victories: 0,

    createdAt: Date.now(), 
    createdDate: new Date().toLocaleString("fr-FR")

});

alert("Profile created successfully!");

});
async function hashPassword(password) {

    const encoder =
        new TextEncoder();

    const data =
        encoder.encode(password);

    const hashBuffer =
        await crypto.subtle.digest(
            "SHA-256",
            data
        );

    const hashArray =
        Array.from(
            new Uint8Array(hashBuffer)
        );

    return hashArray
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");

}
loginProfile.addEventListener("click", async function () {

    const profilRef =
        ref(db, "profils/" + profileNickname.value);

    const snapshot =
        await get(profilRef);

    if (!snapshot.exists()) {

        alert("Unknown nickname.");

        return;

    }

   const profil =
    snapshot.val();

const passwordHash =
    await hashPassword(
        profilePassword.value
    );

if (profil.password !== passwordHash) {

    alert("Wrong password.");

    return;

}

profileModal.style.display = "none";
profilConnecte = profil;
pseudo.value =
    profil.nickname;
    pseudo.disabled = true;
    localStorage.setItem(
    "profilConnecte",
    profil.nickname
);
logoutProfile.style.display =
    "inline-block";
    connectProfile.style.display =
    "none";
    });
async function reconnecterProfil(
    pseudoSauvegarde
) {

    const profilRef =
        ref(
            db,
            "profils/" +
            pseudoSauvegarde
        );

    const snapshot =
        await get(profilRef);

    if (!snapshot.exists()) {

        localStorage.removeItem(
            "profilConnecte"
        );

        return;

    }

    const profil =
        snapshot.val();

    profilConnecte =
        profil;

    pseudo.value =
        profil.nickname;

    pseudo.disabled =
        true;
logoutProfile.style.display =
    "inline-block";
    connectProfile.style.display =
    "none";

}
async function voirProfil(nom) {

    const profilRef =
        ref(
            db,
            "profils/" + nom
        );

    const snapshot =
        await get(profilRef);

    if (!snapshot.exists()) {

        alert(
            "This player has no profile."
        );

        return;

    }

    const profil =
        snapshot.val();
        let prefere = [];

if (profil.playWith.men)
    prefere.push("👨");

if (profil.playWith.women)
    prefere.push("👩");

if (profil.playWith.couples)
    prefere.push("👩‍❤️‍👨");

if (profil.playWith.martians)
    prefere.push("👽");

    viewProfileContent.innerHTML =

"<h4>📊 STATISTICS</h4>" +

"<b>🎮 Games Played</b><br>" +
(profil.gamesPlayed || 0) +

"<br>" +

"<b>🏆 Victories</b><br>" +
(profil.victories || 0) +

"<br>" +

"<b>🔥 Best Win Streak</b><br>" +
"🚧 In development" +

"<br>" +

"<b>🙈 Times Naked</b><br>" +
"🚧 In development" +

"<br>" +

"<b>🏅 Badges</b><br>" +
"🚧 In development" +

"<br>" +

"<b>⭐ Achievements</b><br>" +
"🚧 In development" +

"<hr>" +

"<h4>👤 PLAYER</h4>" +

"<b>🌍 Country</b><br>" +
(profil.country || "-") +

"<br>" +

"<b>📅 Member Since</b><br>" +
new Date(profil.createdAt).toLocaleDateString() +

"<br>" +

"<b>👤 I am</b><br>" +
profil.gender +

"<br>" +

"<b>🎮 I like to play with</b><br>" +

(profil.playWith.men
    ? "✔ Men<br>"
    : "") +

(profil.playWith.women
    ? "✔ Women<br>"
    : "") +

(profil.playWith.couples
    ? "✔ Couples<br>"
    : "") +

(profil.playWith.martians
    ? "✔ Martians<br>"
    : "");

viewProfileModal.style.display =
    "block";

}
window.voirProfil = voirProfil;
const boutonsModeJoueurs = document.querySelectorAll(
    'input[name="modeJoueurs"]'
);

const boutonStartSolo = document.getElementById("startSolo");

boutonsModeJoueurs.forEach(bouton => {

    bouton.addEventListener("change", () => {

        const solo = bouton.value === "solo";

        document.getElementById("creerPartie").style.display =
            solo ? "none" : "";

        document.getElementById("boutonRejoindre").style.display =
            solo ? "none" : "";

        document.getElementById("codePartie").style.display =
            solo ? "none" : "";

        boutonStartSolo.style.display =
            solo ? "" : "none";

    });

});
// ==============================
// SOLO MODE
// ==============================

let cartesSolo = [];
let selectionSolo = [];
let cartesTrouveesSolo = {};
let soloVerrouille = false;


// ------------------------------
// LANCEMENT DU SOLO
// ------------------------------

boutonStartSolo.addEventListener(
    "click",
    function () {

        if (!profilConnecte) {

            alert(
                "A player profile is required to play Solo mode."
            );

            profileModal.style.display =
                "block";

            return;

        }

        ouvrirSoloModes();

    }
);


function lancerSoloTimeTrial() {

    cartesSolo =
        melangerCartes(cartesDeBase);

    selectionSolo = [];

    cartesTrouveesSolo = {};

    soloVerrouille = false;


    accueil.style.display =
        "none";

    lobby.style.display =
        "none";

    howToPlay.style.display =
        "none";

    finPartie.style.display =
        "none";

    jeu.style.display =
        "block";


    // On cache tout ce qui appartient
    // au multijoueur

    affichageTour.style.display =
        "none";

    affichageTimer.style.display =
        "none";

    affichageScore.style.display =
        "none";

    affichageScoresJoueurs.style.display =
        "none";

    affichageCouleurs.style.display =
        "none";

    salonVideo.style.display =
        "none";
        infoSalonVideo.style.display =
    "none";
    reglesVideo.style.display =
        "none";

    reglesDuel.style.display =
        "none";

    boutonNouvellePartie.style.display =
        "none";
chronoSoloDepart = Date.now();

chronoSoloInterval = setInterval(
    function () {

        const tempsEcoule =
            Date.now() -
            chronoSoloDepart;

        const secondes =
            Math.floor(
                tempsEcoule / 1000
            );

        affichageTimer.style.display =
            "block";

        affichageTimer.innerHTML =
            "⏱️ " + secondes + " s";

    },
    100
);

    dessinerPlateauSolo();

}


// ------------------------------
// AFFICHAGE DU PLATEAU SOLO
// ------------------------------

function dessinerPlateauSolo() {

    plateau.innerHTML = "";

    for (
        let i = 0;
        i < cartesSolo.length;
        i++
    ) {

        const bouton =
            document.createElement(
                "button"
            );


        if (
            cartesTrouveesSolo[i] === true
        ) {

            afficherCarte(
                bouton,
                cartesSolo[i]
            );

            bouton.disabled = true;

        } else {

            afficherDos(bouton);

        }


        bouton.addEventListener(
            "click",
            function () {

                jouerCarteSolo(
                    i,
                    bouton
                );

            }
        );


        plateau.appendChild(
            bouton
        );

    }

}


// ------------------------------
// CLIC SUR UNE CARTE SOLO
// ------------------------------

function jouerCarteSolo(
    indexCarte,
    bouton
) {

    if (soloVerrouille === true) {
        return;
    }


    if (
        cartesTrouveesSolo[indexCarte] ===
        true
    ) {
        return;
    }


    if (
        selectionSolo.some(
            carte =>
                carte.index === indexCarte
        )
    ) {
        return;
    }


    afficherCarte(
        bouton,
        cartesSolo[indexCarte]
    );


    selectionSolo.push({

        index: indexCarte,

        bouton: bouton

    });


    if (
        selectionSolo.length === 1
    ) {
        return;
    }


    verifierPaireSolo();

}


// ------------------------------
// VERIFICATION DE LA PAIRE
// ------------------------------

function verifierPaireSolo() {

    soloVerrouille = true;


    const premiere =
        selectionSolo[0];

    const deuxieme =
        selectionSolo[1];


    const carte1 =
        cartesSolo[
            premiere.index
        ];

    const carte2 =
        cartesSolo[
            deuxieme.index
        ];


    // PAIRE TROUVEE

    if (carte1 === carte2) {

        cartesTrouveesSolo[
            premiere.index
        ] = true;

        cartesTrouveesSolo[
            deuxieme.index
        ] = true;


        premiere.bouton.disabled =
            true;

        deuxieme.bouton.disabled =
            true;


        selectionSolo = [];

        soloVerrouille = false;


        verifierFinSolo();

        return;

    }


    // MAUVAISE PAIRE

    setTimeout(
        function () {

            afficherDos(
                premiere.bouton
            );

            afficherDos(
                deuxieme.bouton
            );

            selectionSolo = [];

            soloVerrouille = false;

        },
        1200
    );

}


// ------------------------------
// FIN DU SOLO
// ------------------------------

async function verifierFinSolo() {

    const nombreTrouvees =
        Object.keys(
            cartesTrouveesSolo
        ).length;

    if (
        nombreTrouvees ===
        cartesSolo.length
    ) {

        clearInterval(
            chronoSoloInterval
        );

        chronoSoloInterval = null;
affichageTimer.style.display =
    "none";
        const tempsFinal =
            Date.now() -
            chronoSoloDepart;

        const secondesFinales =
            (tempsFinal / 1000)
                .toFixed(1);

        const tempsFinalNombre =
            parseFloat(
                secondesFinales
            );

        const resultatRecord =
            await enregistrerMeilleurTempsSolo(
                tempsFinalNombre
            );

        const meilleurTemps =
            resultatRecord
                ? resultatRecord.meilleurTemps
                : tempsFinalNombre;

        const nouveauRecord =
            resultatRecord
                ? resultatRecord.nouveauRecord
                : false;
                const worldBest =
    await recupererWorldBestSolo();
    const top10 =
    await recupererTop10Solo();

        setTimeout(
            function () {

                plateau.innerHTML = "";

                plateau.classList.add(
                    "finSolo"
                );

                const messageFin =
                    document.createElement(
                        "h2"
                    );

          let texteFin =
    "Solo complete!\n\n" +
    "⏱ TIME: " +
    secondesFinales +
    " s\n" +
    "🏆 PERSONAL BEST: " +
    meilleurTemps +
    " s";

if (worldBest) {

    texteFin +=
        "\n👑 WORLD BEST: " +
        worldBest.temps +
        " s - " +
        worldBest.pseudo;

}
if (
    nouveauRecord === true
) {

    texteFin +=
        " 🏆 NEW RECORD!";

}

if (
    worldBest &&
    worldBest.pseudo ===
        profilConnecte.nickname &&
    worldBest.temps ===
        tempsFinalNombre
) {

    texteFin +=
        " 👑 WORLD RECORD!";

}

messageFin.textContent =
    texteFin;


// À PARTIR D'ICI, ton code existant continue :
const classementTitre =
    document.createElement("h3");

classementTitre.textContent =
    "🏆 TOP 10 TIME TRIAL";


const classementListe =
    document.createElement("div");

classementListe.className =
    "classementSolo";


top10.forEach(
    function (joueur, index) {

        const ligne =
            document.createElement("div");

        let position =
            (index + 1) + ".";

        if (index === 0) {
            position = "🥇";
        }

        if (index === 1) {
            position = "🥈";
        }

        if (index === 2) {
            position = "🥉";
        }

        ligne.textContent =
            position +
            " " +
            joueur.pseudo +
            " — " +
            joueur.temps +
            " s";

        if (
            profilConnecte &&
            joueur.pseudo ===
                profilConnecte.nickname
        ) {

            ligne.classList.add(
                "classementMoi"
            );

        }

        classementListe.appendChild(
            ligne
        );

    }
);

const boutonRetour =
    document.createElement(
        "button"
    );

boutonRetour.textContent =
    "Back to Home";

                boutonRetour.className =
                    "boutonMenu";

                boutonRetour.addEventListener(
                    "click",
                    function () {

                        retourAccueilSolo();
                        infoSalonVideo.style.display = "";
                        affichageTimer.style.display = ""; 

                    }
                    
                );

                plateau.appendChild(
    messageFin
);

plateau.appendChild(
    classementTitre
);

plateau.appendChild(
    classementListe
);

plateau.appendChild(
    boutonRetour
);

            },
            300
        );

    }

}
function retourAccueilSolo() {

    jeu.style.display = "none";

    plateau.innerHTML = "";
plateau.classList.remove("finSolo");
    accueil.style.display = "block";

    cartesSolo = [];
    selectionSolo = [];
    cartesTrouveesSolo = {};
    soloVerrouille = false;
    if (
    chronoSoloInterval !== null
) {

    clearInterval(
        chronoSoloInterval
    );

    chronoSoloInterval = null;

}
if (chronoCombatInterval !== null) {
    clearInterval(chronoCombatInterval);
    chronoCombatInterval = null;
}

combatHud.style.display = "none";
reglesCombat.style.display = "none";
nouvellePartie.style.display = "";
document.getElementById("nouvellePartie").style.display = "";

}
async function enregistrerMeilleurTempsSolo(
    temps
) {

    if (!profilConnecte) {
        return null;
    }

    const pseudo =
        profilConnecte.nickname;

    const profilRef =
        ref(
            db,
            "profils/" + pseudo
        );

    const snapshot =
        await get(profilRef);

    if (!snapshot.exists()) {
        return null;
    }

    const profil =
        snapshot.val();

    const ancienRecord =
        profil.soloTimeTrialBest || null;

    let nouveauRecord = false;

    let meilleurTemps =
        ancienRecord;

    if (
        ancienRecord === null ||
        temps < ancienRecord
    ) {

        meilleurTemps =
            temps;

        nouveauRecord =
            true;

        await update(
            profilRef,
            {
                soloTimeTrialBest:
                    temps
            }
        );

        profilConnecte.soloTimeTrialBest =
            temps;

    }

    return {
        meilleurTemps:
            meilleurTemps,

        nouveauRecord:
            nouveauRecord
    };

}
async function enregistrerMeilleurTempsCombat(
    temps
) {

    if (!profilConnecte) {
        return null;
    }

    const pseudo =
        profilConnecte.nickname;

    const profilRef =
        ref(
            db,
            "profils/" + pseudo
        );

    const snapshot =
        await get(profilRef);

    if (!snapshot.exists()) {
        return null;
    }

    const profil =
        snapshot.val();

    const ancienRecord =
        profil.soloCombatBest || null;

    let nouveauRecord = false;

    let meilleurTemps =
        ancienRecord;

    if (
        ancienRecord === null ||
        temps < ancienRecord
    ) {

        meilleurTemps =
            temps;

        nouveauRecord =
            true;

        await update(
            profilRef,
            {
                soloCombatBest:
                    temps
            }
        );

        profilConnecte.soloCombatBest =
            temps;
    }

    return {
        meilleurTemps:
            meilleurTemps,

        nouveauRecord:
            nouveauRecord
    };

}

async function recupererWorldBestCombat() {

    const profilsRef =
        ref(
            db,
            "profils"
        );

    const snapshot =
        await get(
            profilsRef
        );

    if (!snapshot.exists()) {
        return null;
    }

    const profils =
        snapshot.val();

    let meilleurTemps =
        null;

    let meilleurPseudo =
        null;

    for (let pseudo in profils) {

        const temps =
            profils[pseudo]
                .soloCombatBest;

        if (
            typeof temps !==
            "number"
        ) {
            continue;
        }

        if (
            meilleurTemps === null ||
            temps < meilleurTemps
        ) {

            meilleurTemps =
                temps;

            meilleurPseudo =
                pseudo;

        }

    }

    if (
        meilleurTemps === null
    ) {
        return null;
    }

    return {
        pseudo:
            meilleurPseudo,

        temps:
            meilleurTemps
    };

}
async function recupererTop10Solo() {

    const profilsRef =
        ref(
            db,
            "profils"
        );

    const snapshot =
        await get(
            profilsRef
        );

    if (!snapshot.exists()) {
        return [];
    }

    const profils =
        snapshot.val();

    const classement = [];

    for (let pseudo in profils) {

        const temps =
            profils[pseudo]
                .soloTimeTrialBest;

        if (
            typeof temps !==
            "number"
        ) {
            continue;
        }

        classement.push({
            pseudo: pseudo,
            temps: temps
        });

    }

    classement.sort(
        function (a, b) {

            return a.temps - b.temps;

        }
    );

    return classement.slice(
        0,
        10
    );

}
async function recupererTop10Combat() {

    const profilsRef =
        ref(
            db,
            "profils"
        );

    const snapshot =
        await get(
            profilsRef
        );

    if (!snapshot.exists()) {
        return [];
    }

    const profils =
        snapshot.val();

    const classement = [];

    for (let pseudo in profils) {

        const temps =
            profils[pseudo]
                .soloCombatBest;

        if (
            typeof temps !==
            "number"
        ) {
            continue;
        }

        classement.push({
            pseudo: pseudo,
            temps: temps
        });

    }

    classement.sort(
        function (a, b) {

            return a.temps - b.temps;

        }
    );

    return classement.slice(
        0,
        10
    );

}
const togglePassword =
    document.getElementById("togglePassword");

togglePassword.addEventListener(
    "click",
    function () {

        if (profilePassword.type === "password") {

            profilePassword.type = "text";

        } else {

            profilePassword.type = "password";

        }

    }
);
nettoyerAnciennesParties();
const soloModes =
    document.getElementById(
        "soloModes"
    );

const playTimeTrial =
    document.getElementById(
        "playTimeTrial"
    );

const backSoloModes =
    document.getElementById(
        "backSoloModes"
    );
    const playCombat =
    document.getElementById(
        "playCombat"
    );


function ouvrirSoloModes() {

    accueil.style.display =
        "none";

    soloModes.style.display =
        "block";
afficherTop3TimeTrial();
afficherTop3Combat();
}
async function afficherTop3TimeTrial() {

    const classement =
        await recupererTop10Solo();

    const top3 =
        classement.slice(0, 3);

    const zone =
        document.getElementById(
            "top3TimeTrial"
        );

    if (top3.length === 0) {

        zone.innerHTML =
            "🥇 ---<br>" +
            "🥈 ---<br>" +
            "🥉 ---";

        return;
    }

    const medailles =
        ["🥇", "🥈", "🥉"];

    let html = "";

    for (let i = 0; i < 3; i++) {

        if (top3[i]) {

            html +=
                medailles[i] +
                " " +
                top3[i].pseudo +
                " — " +
                top3[i].temps.toFixed(1) +
                " s";

        } else {

            html +=
                medailles[i] +
                " ---";
        }

        if (i < 2) {
            html += "<br>";
        }
    }

    zone.innerHTML = html;
}
async function afficherTop3Combat() {

    const classement =
        await recupererTop10Combat();

    const top3 =
        classement.slice(0, 3);

    const zone =
        document.getElementById(
            "top3Combat"
        );

    if (top3.length === 0) {

        zone.innerHTML =
            "🥇 ---<br>" +
            "🥈 ---<br>" +
            "🥉 ---";

        return;
    }

    const medailles =
        ["🥇", "🥈", "🥉"];

    let html = "";

    for (let i = 0; i < 3; i++) {

        if (top3[i]) {

            html +=
                medailles[i] +
                " " +
                top3[i].pseudo +
                " — " +
                (top3[i].temps / 1000).toFixed(1) +
                " s";

        } else {

            html +=
                medailles[i] +
                " ---";
        }

        if (i < 2) {
            html += "<br>";
        }
    }

    zone.innerHTML = html;
}

playTimeTrial.addEventListener(
    "click",
    function () {

        soloModes.style.display =
            "none";

        lancerSoloTimeTrial();

    }
);


backSoloModes.addEventListener(
    "click",
    function () {

        soloModes.style.display =
            "none";

        accueil.style.display =
            "block";

    }
);
playCombat.addEventListener(
    "click",
    function () {

        lancerSoloCombat();

    }
);
const cartesPiegesCombat = [
    "images/tornade.png",
    "images/givre.png",
    "images/mort.png",
    "images/revelation.png"
    
];
const combatHud =
    document.getElementById(
        "combatHud"
    );

const chronoCombat =
    document.getElementById(
        "chronoCombat"
    );

const affichageViesCombat =
    document.getElementById(
        "viesCombat"

    );
    const reglesCombat =
    document.getElementById(
        "reglesCombat"
    );
    
function creerDeckCombat() {

    return [
        ...cartesDeBase,
        ...cartesPiegesCombat
    ];

}
let cartesCombat = [];
let selectionCombat = [];
let cartesTrouveesCombat = {};
let combatVerrouille = false;

let chronoCombatDepart = null;
let chronoCombatInterval = null;

let viesCombat = 3;
let utilisationsTornade = 0;

function lancerSoloCombat() {
if (chronoCombatInterval !== null) {
    clearInterval(chronoCombatInterval);
    chronoCombatInterval = null;
}
    cartesCombat =
        melangerCartes(
            creerDeckCombat()
        );

    selectionCombat = [];
    cartesTrouveesCombat = {};

    combatVerrouille = false;
    viesCombat = 3;
    utilisationsTornade = 0;

    soloModes.style.display =
        "none";

    accueil.style.display =
        "none";

    jeu.style.display =
        "block";
        combatHud.style.display =
    "block";
    reglesCombat.style.display =
    "block";

chronoCombat.textContent =
    "⏱ 0.0 s";

affichageViesCombat.textContent =
    "☠️ ☠️ ☠️";
        tour.style.display = "none";
timer.style.display = "none";
scores.style.display = "none";
etatCouleurs.style.display = "none";
score.style.display = "none";
reglesVideo.style.display = "none";
document.getElementById("nouvellePartie").style.display = "none";

    salonVideo.style.display =
        "none";

    infoSalonVideo.style.display =
        "none";
        afficherPlateauCombat();
        demarrerChronoCombat();
       

    console.log(
        "Combat deck:",
        cartesCombat
    );
}
function afficherPlateauCombat() {

    plateau.innerHTML = "";

    cartesCombat.forEach(
        function (carte, index) {
            

            const carteDiv =
    document.createElement(
        "button"
    );

            carteDiv.dataset.index =
                index;

            const imageDos =
                document.createElement(
                    "img"
                );

            imageDos.src =
                "images/dos.png";

            imageDos.alt =
                "Carte";

            carteDiv.appendChild(
                imageDos
            );
carteDiv.addEventListener(
    "click",
    function () {

        jouerCarteCombat(index);

    }
);
            plateau.appendChild(
                carteDiv
            );

        }
    );
}
function demarrerChronoCombat() {

    chronoCombatDepart =
        Date.now();

    chronoCombatInterval =
        setInterval(
            function () {

                const tempsEcoule =
                    Date.now() -
                    chronoCombatDepart;

                chronoCombat.textContent =
                    "⏱ " +
                    (tempsEcoule / 1000).toFixed(1) +
                    " s";

            },
            100
        );
}
async function verifierVictoireCombat() {

    const nombreCartesTrouvees =
        Object.keys(
            cartesTrouveesCombat
        ).length;

    // 12 paires = 24 cartes normales trouvées
    if (nombreCartesTrouvees < 24) {
        return;
    }

    combatVerrouille = true;

    if (chronoCombatInterval !== null) {
        clearInterval(chronoCombatInterval);
        chronoCombatInterval = null;
    }

    const tempsFinal =
        Date.now() -
        chronoCombatDepart;
        const resultatRecord =
    await enregistrerMeilleurTempsCombat(
        tempsFinal
    );
    const meilleurTemps =
    resultatRecord
        ? resultatRecord.meilleurTemps
        : tempsFinal;

const nouveauRecord =
    resultatRecord
        ? resultatRecord.nouveauRecord
        : false;
        const worldBest =
    await recupererWorldBestCombat();

const top10 =
    await recupererTop10Combat();

    const secondesFinales =
        (tempsFinal / 1000).toFixed(1);

    combatHud.style.display =
        "none";

    plateau.innerHTML = "";

    plateau.classList.add(
        "finSolo"
    );
document.getElementById("quitterPartie").style.display = "none";
reglesCombat.style.display = "none";
    const titre =
        document.createElement(
            "h2"
        );

    let texteFin =
    "⚔ COMBAT COMPLETE!\n\n" +
    "⏱ TIME: " +
    secondesFinales +
    " s\n" +
    "🏆 PERSONAL BEST: " +
    (meilleurTemps / 1000).toFixed(1) +
    " s";
if (worldBest) {

    texteFin +=
        "\n👑 WORLD BEST: " +
        (worldBest.temps / 1000).toFixed(1) +
        " s - " +
        worldBest.pseudo;

}
if (
    nouveauRecord === true
) {
    texteFin +=
        " 🏆 NEW RECORD!";
}
if (
    worldBest &&
    worldBest.pseudo ===
        profilConnecte.nickname &&
    worldBest.temps ===
        tempsFinal
) {

    texteFin +=
        " 👑 WORLD RECORD!";

}

titre.textContent =
    texteFin;

    const boutonRetour =
        document.createElement(
            "button"
        );

    boutonRetour.textContent =
        "BACK TO HOME";
        boutonRetour.classList.add(
    "boutonMenu"
);

    boutonRetour.addEventListener(
        "click",
        function () {

            retourAccueilSolo();

        }
    );

    plateau.appendChild(titre);
    const classementTitre =
    document.createElement("h3");

classementTitre.textContent =
    "🏆 TOP 10 COMBAT";

plateau.appendChild(
    classementTitre
);

top10.forEach(
    function (joueur, index) {

        const ligne =
            document.createElement("p");

        let medaille = "";

        if (index === 0) {
            medaille = "🥇 ";
        }

        if (index === 1) {
            medaille = "🥈 ";
        }

        if (index === 2) {
            medaille = "🥉 ";
        }

        ligne.textContent =
            medaille +
            (index + 1) +
            ". " +
            joueur.pseudo +
            " - " +
            (joueur.temps / 1000).toFixed(1) +
            " s";
if (
    profilConnecte &&
    joueur.pseudo ===
        profilConnecte.nickname
) {
    ligne.style.fontWeight =
        "bold";
}
        plateau.appendChild(
            ligne
        );

    }
);
    plateau.appendChild(boutonRetour);
}
function jouerCarteCombat(indexCarte) {

    if (combatVerrouille) {
        return;
    }

    if (cartesTrouveesCombat[indexCarte]) {
        return;
    }

    if (selectionCombat.includes(indexCarte)) {
        return;
    }

    const cheminCarte =
        cartesCombat[indexCarte];

    const bouton =
    plateau.querySelector(
        'button[data-index="' +
        indexCarte +
        '"]'
    );

    const image =
        bouton.querySelector("img");



    // -------------------------
    // CARTE PIÈGE
    // Aucun effet pour l'instant
    // -------------------------

    if (
    cartesPiegesCombat.includes(
        cheminCarte
    )
) {

    image.src =
        cheminCarte;


    // -------------------------
    // GIVRE
    // -------------------------

    if (
    cheminCarte ===
    "images/givre.png"
) {

    cartesTrouveesCombat[indexCarte] =
        true;

    combatVerrouille =
        true;


    // Gèle toutes les cartes encore cachées

    const cartesDuPlateau =
        plateau.querySelectorAll(
            "button img"
        );

    cartesDuPlateau.forEach(
        function (img) {

            if (
                img.src.endsWith(
                    "/images/dos.png"
                )
            ) {
                img.src =
                    "images/dosglace.png";
            }

        }
    );


    setTimeout(
        function () {

            // Dégèle les cartes

            cartesDuPlateau.forEach(
                function (img) {

                    if (
                        img.src.endsWith(
                            "/images/dosglace.png"
                        )
                    ) {
                        img.src =
                            "images/dos.png";
                    }

                }
            );

            combatVerrouille =
                false;

        },
        5000
    );

    return;
}
if (
    cheminCarte ===
    "images/revelation.png"
) {

    cartesTrouveesCombat[indexCarte] =
        true;

    combatVerrouille =
        true;

    selectionCombat = [];
    const cartesDuPlateau =
    plateau.querySelectorAll(
        "button"
    );

cartesDuPlateau.forEach(
    
    function (bouton, index) {

        if (
            !cartesTrouveesCombat[index]
        ) {
            bouton.querySelector("img").src =
                cartesCombat[index];
        }

    }
);
setTimeout(
    function () {

        cartesDuPlateau.forEach(
            function (bouton, index) {

                if (
                    !cartesTrouveesCombat[index]
                ) {
                    bouton.querySelector("img").src =
                        "images/dos.png";
                }

            }
        );

        combatVerrouille =
            false;

    },
    2000
);

}
if (
    cheminCarte ===
    "images/mort.png"
) {

    viesCombat--;

    if (viesCombat === 2) {
        affichageViesCombat.textContent =
            "☠️ ☠️";
    }

    if (viesCombat === 1) {
        affichageViesCombat.textContent =
            "☠️";
    }

    if (viesCombat === 0) {

        affichageViesCombat.textContent =
            "";

        terminerCombatMort();

        return;
    }


    // La Mort se recache
    

    combatVerrouille =
        true;

    setTimeout(
        function () {

            image.src =
                "images/dos.png";

            combatVerrouille =
                false;

        },
        800
    );

    return;
}
if (
    cheminCarte ===
    "images/tornade.png"
) {
    utilisationsTornade++;

    combatVerrouille =
        true;

    selectionCombat = [];
    plateau.classList.add(
    "effetTornade"
);


    setTimeout(
        function () {
plateau.classList.remove(
    "effetTornade"
);
            melangerPlateauCombat();
           if (
    utilisationsTornade >= 2
) {

    const indexTornade =
        cartesCombat.indexOf(
            "images/tornade.png"
        );

    cartesTrouveesCombat[indexTornade] =
        true;

    plateau.children[indexTornade]
        .querySelector("img")
        .src =
        "images/tornade.png";
}

            combatVerrouille =
                false;

        },
        800
    );

    return;
}

    
    // -------------------------
    // AUTRES PIÈGES
    // Effet pas encore codé
    // -------------------------

    combatVerrouille =
        true;

    setTimeout(
        function () {

            image.src =
                "images/dos.png";

            combatVerrouille =
                false;

        },
        800
    );

    return;
}

    // -------------------------
    // CARTE NORMALE
    // -------------------------

    image.src =
        cheminCarte;

    selectionCombat.push(
        indexCarte
    );


    if (
        selectionCombat.length < 2
    ) {
        return;
    }


    combatVerrouille =
        true;

    const index1 =
        selectionCombat[0];

    const index2 =
        selectionCombat[1];

    const carte1 =
        cartesCombat[index1];

    const carte2 =
        cartesCombat[index2];


    // PAIRE TROUVÉE

    if (carte1 === carte2) {

        cartesTrouveesCombat[index1] =
            true;

        cartesTrouveesCombat[index2] =
            true;

        selectionCombat = [];

        combatVerrouille =
            false;
verifierVictoireCombat();
        return;
    }
    


    // MAUVAISE PAIRE

    setTimeout(
        function () {

            const bouton1 =
    plateau.querySelector(
        'button[data-index="' +
        index1 +
        '"]'
    );

const bouton2 =
    plateau.querySelector(
        'button[data-index="' +
        index2 +
        '"]'
    );

            bouton1.querySelector(
                "img"
            ).src =
                "images/dos.png";

            bouton2.querySelector(
                "img"
            ).src =
                "images/dos.png";

            selectionCombat = [];

            combatVerrouille =
                false;

        },
        1000
    );
}
function terminerCombatMort() {

    combatVerrouille =
        true;

    if (
        chronoCombatInterval !== null
    ) {

        clearInterval(
            chronoCombatInterval
        );

        chronoCombatInterval =
            null;
    }

    combatHud.style.display =
        "none";

    plateau.innerHTML = "";

    plateau.classList.add(
        "finSolo"
    );

    const titre =
        document.createElement("h2");

    titre.textContent =
        "☠️ GAME OVER\n\n" +
        "DEATH GOT YOU";


    const boutonRetour =
        document.createElement(
            "button"
        );

    boutonRetour.textContent =
        "BACK TO HOME";

    boutonRetour.addEventListener(
        "click",
        function () {

            retourAccueilSolo();

        }
    );

    plateau.appendChild(
        titre
    );

    plateau.appendChild(
        boutonRetour
    );
}
function melangerPlateauCombat() {

    const plateauMelange = cartesCombat.map(
        function (carte, index) {

            return {
                carte: carte,
                trouvee:
                    cartesTrouveesCombat[index]
                    === true
            };

        }
    );


    for (
        let i =
            plateauMelange.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() *
                (i + 1)
            );

        const temp =
            plateauMelange[i];

        plateauMelange[i] =
            plateauMelange[j];

        plateauMelange[j] =
            temp;
    }


    cartesCombat =
        plateauMelange.map(
            function (element) {

                return element.carte;

            }
        );


    cartesTrouveesCombat = {};

    plateauMelange.forEach(
        function (element, index) {

            if (
                element.trouvee
            ) {

                cartesTrouveesCombat[index] =
                    true;

            }

        }
    );


    afficherPlateauCombat();


    // Réaffiche les cartes déjà trouvées

    Object.keys(
        cartesTrouveesCombat
    ).forEach(
        function (index) {

            const bouton =
                plateau.children[index];

            const image =
                bouton.querySelector(
                    "img"
                );

            image.src =
                cartesCombat[index];

        }
    );
}
