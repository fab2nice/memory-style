
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
    document.getElementById("publicGame");
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
    const reglesSpicy3 =
    document.getElementById("reglesSpicy3");
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

const maxJoueurs =
    getMaxJoueurs(mode);

if (nbJoueurs >= maxJoueurs) {
    continue;
}
            let nomMode;

if (mode === 2) {

    nomMode = "🎯 Duel";

} else if (mode === 3) {

    nomMode = "👥 3 Players";

} else if (mode === 33) {

    nomMode = "🌶️ 3 Players";

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
maxJoueurs +
" players"
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

    if (!couleur) {
        return false;
    }

    // Les seules cartes qui comptent
    // pour déterminer si un joueur est NAKED
    const vetements = [
        "bas",
        "pant",
        "tshirt",
        "chaussettes"
    ];

    let totalVetements = 0;
    let vetementsTrouves = 0;

    for (let i = 0; i < cartes.length; i++) {

        const carte = cartes[i];

        const estDeLaBonneCouleur =
            carte.includes(couleur);

        const estUnVetement =
            vetements.some(
                vetement =>
                    carte.includes(vetement)
            );

        if (
            estDeLaBonneCouleur &&
            estUnVetement
        ) {

            totalVetements++;

            if (
                cartesTrouvees[i] === true
            ) {
                vetementsTrouves++;
            }

        }

    }

    return (
        totalVetements > 0 &&
        vetementsTrouves >= totalVetements
    );
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
            classement.innerHTML +=
    "<br><br>👕 <strong>FINAL ACTION</strong><br>" +
    "Losing player: don't forget to remove your last item of clothing before leaving the game. 😉";

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
    console.log(
    "DEBUG CLICK",
    "monNumero =", monNumero,
    "joueurActuel =", game.joueurActuel,
    "mode =", partie.mode,
    "verrouille =", game.verrouille
);
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
else if (partie.mode === 33) {

    modeLobby.innerHTML =
        "Mode : 🌶️ 3 Players";

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
    // Restaurer l'interface multijoueur
affichageTour.style.display = "";
affichageTimer.style.display = "";
affichageScore.style.display = "";
affichageScoresJoueurs.style.display = "";
affichageCouleurs.style.display = ""
        // Réafficher les éléments multijoueur
    salonVideo.style.display = "";
    infoSalonVideo.style.display = "";
    reglesVideo.style.display = "";
    quitterPartie.style.display = "";

    if (tutorielVu === false) {

        jeu.style.display = "none";
        howToPlay.style.display = "block";

    } else {

        howToPlay.style.display = "none";
        jeu.style.display = "block";

    }
           
            if (partie.mode === 2) {

    reglesDuel.style.display = "block";
    reglesSpicy3.style.display = "none";

} else if (partie.mode === 33) {

    reglesDuel.style.display = "none";
    reglesSpicy3.style.display = "block";

} else {

    reglesDuel.style.display = "none";
    reglesSpicy3.style.display = "none";

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

     
    }

}
    const valeurMode =
    document.querySelector(
        'input[name="modeJoueurs"]:checked'
    ).value;

if (valeurMode === "solo") {
    return;
}

let modeChoisi =
    parseInt(valeurMode);

if (
    modeChoisi === 3 &&
    document.getElementById("spicy3").checked
) {
    modeChoisi = 33;
}

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

    const partieRef =
    ref(
        db,
        "parties/" +
        codePartieActuelle
    );

const snapshot =
    await get(partieRef);


// ---------------------------------------------
// PARTIE MULTIJOUEUR INTROUVABLE
// → ON CHERCHE UN SOLO SPICY
// ---------------------------------------------

if (!snapshot.exists()) {

    const spicySnapshot =
        await get(
            ref(
                db,
                "soloSpicy/" +
                codePartieActuelle
            )
        );

    if (spicySnapshot.exists()) {

        const partieSpicy =
            spicySnapshot.val();

        if (
            partieSpicy.etat === "waiting" ||
            partieSpicy.etat === "playing"
        ) {

            const codeSpicy =
                codePartieActuelle;

            codePartieActuelle = "";

            rejoindreSoloSpicySpectateur(
                codeSpicy
            );

            return;
        }
    }

    alert("Game not found");
    return;
}


// ---------------------------------------------
// PARTIE MULTIJOUEUR CLASSIQUE
// ---------------------------------------------

const partie =
    snapshot.val();
    if (partie.etat === "enCours") {
    alert("The game has already begun");
    return;
}

const nbJoueurs =
    Object.keys(partie.joueurs).length;

const mode =
    partie.mode || 4;
const maxJoueurs =
    getMaxJoueurs(mode);
if (nbJoueurs >= maxJoueurs) {

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

const maxJoueurs =
    getMaxJoueurs(mode);

if (nbJoueurs < maxJoueurs) {

    alert(
        "You need " +
        maxJoueurs +
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
if (partie.mode === 2) {

    cartes = cartesDeBaseDuel;

} else if (partie.mode === 3) {

    cartes = cartesDeBase3Joueurs;

} else if (partie.mode === 33) {

    cartes = cartesDeBaseSpicy3;

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
        reglesSpicy3.style.display =
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
async function recupererWorldBestSolo() {

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

    let meilleurTemps = null;
    let meilleurPseudo = null;

    for (let pseudo in profils) {

        const temps =
            profils[pseudo]
                .soloTimeTrialBest;

        if (
            typeof temps !== "number"
        ) {
            continue;
        }

        if (
            meilleurTemps === null ||
            temps < meilleurTemps
        ) {

            meilleurTemps = temps;
            meilleurPseudo = pseudo;

        }

    }

    if (meilleurTemps === null) {
        return null;
    }

    return {
        pseudo: meilleurPseudo,
        temps: meilleurTemps
    };

}
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
boutonNouvellePartie.style.display = "";

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
async function enregistrerMeilleurScoreSpicy(
    cartes,
    gages
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

    const ancienScore =
        profil.soloSpicyBest || null;

    let nouveauRecord = false;

    // Aucun record précédent
    if (ancienScore === null) {

        nouveauRecord = true;

    }

    // Moins de cartes retournées
    else if (
        cartes <
        ancienScore.cartes
    ) {

        nouveauRecord = true;

    }

    // Même nombre de cartes,
    // mais moins de gages
    else if (
        cartes === ancienScore.cartes &&
        gages < ancienScore.gages
    ) {

        nouveauRecord = true;

    }

    if (nouveauRecord) {

        const nouveauScore = {
            cartes: cartes,
            gages: gages
        };

        await update(
            profilRef,
            {
                soloSpicyBest:
                    nouveauScore
            }
        );

        profilConnecte.soloSpicyBest =
            nouveauScore;
    }

    return nouveauRecord;
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
async function recupererTop10Spicy() {

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

        const score =
            profils[pseudo]
                .soloSpicyBest;

        if (
            !score ||
            typeof score.cartes !== "number" ||
            typeof score.gages !== "number"
        ) {
            continue;
        }

        classement.push({
            pseudo: pseudo,
            cartes: score.cartes,
            gages: score.gages
        });
    }

    classement.sort(
        function (a, b) {

            // Critère 1 :
            // moins de cartes retournées
            if (a.cartes !== b.cartes) {
                return a.cartes - b.cartes;
            }

            // Critère 2 :
            // moins de gages effectués
            return a.gages - b.gages;
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
afficherTop3Spicy();
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
async function afficherTop3Spicy() {

    const classement =
        await recupererTop10Spicy();

    const top3 =
        classement.slice(0, 3);

    const zone =
        document.getElementById(
            "top3Spicy"
        );

    if (top3.length === 0) {

        zone.innerHTML =
            "🥇 ---<br>" +
            "🥈 ---<br>" +
            "🥉 ---";

        return;
    }

    let html = "";

    let position = 1;

    for (let i = 0; i < top3.length; i++) {

        if (i > 0) {

            const precedent =
                top3[i - 1];

            const actuel =
                top3[i];

            if (
                actuel.cartes !== precedent.cartes ||
                actuel.gages !== precedent.gages
            ) {
                position = i + 1;
            }
        }

        const medaille =
            position === 1
                ? "🥇"
                : position === 2
                    ? "🥈"
                    : "🥉";

        html +=
            medaille +
            " " +
            top3[i].pseudo +
            " — " +
            top3[i].cartes +
            " cards / " +
            top3[i].gages +
            " challenges";

        if (i < top3.length - 1) {
            html += "<br>";
        }
    }

    zone.innerHTML = html;
}
async function afficherClassementFinSpicy() {

    const zoneBest =
        document.getElementById(
            "spicyPersonalBest"
        );

    const zoneTop10 =
        document.getElementById(
            "spicyTop10"
        );

    // ---------------------------------------------
    // MEILLEUR SCORE PERSONNEL
    // ---------------------------------------------

    if (
        profilConnecte &&
        profilConnecte.soloSpicyBest
    ) {

        const best =
            profilConnecte.soloSpicyBest;

        zoneBest.textContent =
            best.cartes +
            " cards / " +
            best.gages +
            " challenges";

    } else {

        zoneBest.textContent =
            "No personal record";

    }

    // ---------------------------------------------
    // TOP 10
    // ---------------------------------------------

    const classement =
        await recupererTop10Spicy();

    if (classement.length === 0) {

        zoneTop10.textContent =
            "No score yet";

        return;
    }

    let html = "";

    let position = 1;

    for (
        let i = 0;
        i < classement.length;
        i++
    ) {

        if (i > 0) {

            const precedent =
                classement[i - 1];

            const actuel =
                classement[i];

            if (
                actuel.cartes !== precedent.cartes ||
                actuel.gages !== precedent.gages
            ) {
                position = i + 1;
            }
        }

        let rang = position + ".";

        if (position === 1) {
            rang = "🥇";
        } else if (position === 2) {
            rang = "🥈";
        } else if (position === 3) {
            rang = "🥉";
        }

        html +=
            rang +
            " " +
            classement[i].pseudo +
            " — " +
            classement[i].cartes +
            " cards / " +
            classement[i].gages +
            " challenges";

        if (
            i <
            classement.length - 1
        ) {
            html += "<br>";
        }
    }

    zoneTop10.innerHTML = html;
}
playTimeTrial.addEventListener(
    "click",
    async function () {

        soloModes.style.display =
            "none";

        await incrementerStat(
            "modes/timeTrial"
        );

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
    async function () {

        await incrementerStat(
            "modes/combat"
        );

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
    Object.keys(cartesTrouveesCombat)
        .filter(index => {
            return !cartesPiegesCombat.includes(
                cartesCombat[index]
            );
        })
        .length;
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
const cartesDeBaseSpicy3 = [

    // 🔵 BLEU
    "images/basbleu.png", "images/basbleu.png",
    "images/pantbleu.png", "images/pantbleu.png",
    "images/tshirtbleu.png", "images/tshirtbleu.png",

    // 🟡 JAUNE
    "images/basjaune.png", "images/basjaune.png",
    "images/pantjaune.png", "images/pantjaune.png",
    "images/tshirtjaune.png", "images/tshirtjaune.png",

    // 🔴 ROUGE
    "images/basrouge.png", "images/basrouge.png",
    "images/pantrouge.png", "images/pantrouge.png",
    "images/tshirtrouge.png", "images/tshirtrouge.png",

    // 🍆 AUBERGINE — 3 paires
    "images/auberginebleue.png", "images/auberginebleue.png",
    "images/auberginerouge.png", "images/auberginerouge.png",
    "images/auberginejaune.png", "images/auberginejaune.png",

    // 📹 STREAMING
    "images/streaming.png", "images/streaming.png",

    // 🛡️ BOUCLIER
    "images/bouclier.png", "images/bouclier.png",

    // 🎁 CADEAU
    "images/cadeau.png", "images/cadeau.png"

];
function getMaxJoueurs(mode) {

    if (mode === 2) {
        return 2;
    }

    if (mode === 3 || mode === 33) {
        return 3;
    }

    return 4;
}
// =====================================================
// SOLO SPICY
// =====================================================

const playSpicy =
    document.getElementById(
        "playSpicy"
    );

const spicyWaitingRoom =
    document.getElementById(
        "spicyWaitingRoom"
    );

const spicyPlayer =
    document.getElementById(
        "spicyPlayer"
    );

const spicyColor =
    document.getElementById(
        "spicyColor"
    );

const spicySpectators =
    document.getElementById(
        "spicySpectators"
    );

const spicyWaitingMessage =
    document.getElementById(
        "spicyWaitingMessage"
    );

const spicyVideo =
    document.getElementById(
        "spicyVideo"
    );

const spicyStart =
    document.getElementById(
        "spicyStart"
    );

const spicyCancel =
    document.getElementById(
        "spicyCancel"
    );
    const spicyEndGame =
    document.getElementById("spicyEndGame");

const spicyEndScore =
    document.getElementById("spicyEndScore");

const spicyEndClothes =
    document.getElementById("spicyEndClothes");

const spicyEndChallenges =
    document.getElementById("spicyEndChallenges");


const spicyEndBack =
    document.getElementById("spicyEndBack");
    // -----------------------------------------------------
// FIREBASE SOLO SPICY
// -----------------------------------------------------

let codeSpicyActuel = "";
let spicyRef = null;


playSpicy.addEventListener(
    "click",
    async function () {

        await creerPartieSpicy();

        soloModes.style.display =
            "none";

        spicyWaitingRoom.style.display =
            "block";

        spicyPlayer.textContent =
            "🎮 Player: " +
            (
                profilConnecte
                    ? profilConnecte.nickname
                    : pseudoActuel || "Guest"
            );

        spicyColor.textContent =
            "👕 Your color: ---";

        spicySpectators.textContent =
            "👁 Spectators: 0";

        spicyWaitingMessage.textContent =
            "Waiting for at least one spectator...";

        spicyStart.disabled =
            true;

        spicyStart.textContent =
            "WAITING FOR SPECTATOR";

    }
);


spicyCancel.addEventListener(
    "click",
    async function () {

        if (spicyRef !== null) {

            await remove(
                spicyRef
            );

            spicyRef = null;
            codeSpicyActuel = "";

        }

        spicyWaitingRoom.style.display =
            "none";

        soloModes.style.display =
            "block";

    }
);
async function creerPartieSpicy() {

    codeSpicyActuel =
        genererCode();

    spicyRef =
        ref(
            db,
            "soloSpicy/" +
            codeSpicyActuel
        );

    const pseudoSpicy =
        profilConnecte
            ? profilConnecte.nickname
            : pseudoActuel || "Guest";

    await set(
        spicyRef,
        {
            code:
                codeSpicyActuel,

            joueur:
                pseudoSpicy,

            etat:
                "waiting",

            dateCreation:
                Date.now(),

            spectateurs: {},

            score:
                0
        }
    );

    console.log(
        "Solo Spicy created:",
        codeSpicyActuel
    );
    surveillerSpectateursSpicy();
surveillerGageSpicyJoueur();
}
// =====================================================
// SOLO SPICY - PUBLIC GAMES
// =====================================================

function surveillerSoloSpicyPublic() {

    const soloSpicyRef =
        ref(db, "soloSpicy");

    onValue(
        soloSpicyRef,
        function (snapshot) {

            // Supprime uniquement les anciens boutons Solo Spicy
            document
                .querySelectorAll(".partieSpicyPublique")
                .forEach(function (bouton) {
                    bouton.remove();
                });

            const partiesSpicy =
                snapshot.val();

            if (!partiesSpicy) {
                return;
            }

            for (let code in partiesSpicy) {

                const partie =
                    partiesSpicy[code];

                if (
    partie.etat !== "waiting" &&
    partie.etat !== "playing"
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

                const bouton =
                    document.createElement(
                        "button"
                    );

                bouton.className =
                    "partiePublique partieSpicyPublique";

                let statutSpicy;

if (partie.etat === "playing") {

    statutSpicy =
        "🔥 IN PROGRESS";

} else {

    statutSpicy =
    '<span class="statutSpicyWaiting">⏳ WAITING FOR SPECTATOR</span>';

}

const nombreSpectateurs =
    partie.spectateurs
        ? Object.keys(
            partie.spectateurs
        ).length
        : 0;

bouton.innerHTML =
    "🌶 SOLO SPICY" +
    "<br>" +
    statutSpicy +
    "<br>" +
    "By " +
    partie.joueur +
    "<br>" +
    "👁 " +
nombreSpectateurs +
(
    nombreSpectateurs === 1
        ? " spectator"
        : " spectators"
);

                bouton.dataset.code =
                    code;
bouton.addEventListener(
    "click",
    function () {

        rejoindreSoloSpicySpectateur(
            code
        );

    }
);
                partiesPubliques.appendChild(
                    bouton
                );

                partiesPubliques.appendChild(
                    document.createElement("br")
                );

            }

        }
    );

}


surveillerSoloSpicyPublic();
// =====================================================
// SOLO SPICY - SPECTATOR
// =====================================================
const spicySpectatorRoom =
    document.getElementById(
        "spicySpectatorRoom"
    );

const spicySpectatorPlayer =
    document.getElementById(
        "spicySpectatorPlayer"
    );

const spicySpectatorStatus =
    document.getElementById(
        "spicySpectatorStatus"
    );

const spicySpectatorVideo =
    document.getElementById(
        "spicySpectatorVideo"
    );

const spicySpectatorBack =
    document.getElementById(
        "spicySpectatorBack"
    );
    const spicySpectatorChallenge =
    document.getElementById(
        "spicySpectatorChallenge"
    );

const spicySpectatorChallengeText =
    document.getElementById(
        "spicySpectatorChallengeText"
    );

const spicyValidateChallenge =
    document.getElementById(
        "spicyValidateChallenge"
    );
const spicyGiftChoice =
    document.getElementById(
        "spicyGiftChoice"
    );

const spicyGiftInput =
    document.getElementById(
        "spicyGiftInput"
    );

const spicySendGift =
    document.getElementById(
        "spicySendGift"
    );
    const spicyPlayerChallenge =
    document.getElementById(
        "spicyPlayerChallenge"
    );

const spicyPlayerChallengeText =
    document.getElementById(
        "spicyPlayerChallengeText"
    );
    const spicySpectatorEnd =
    document.getElementById("spicySpectatorEnd");

const spicySpectatorEndPlayer =
    document.getElementById("spicySpectatorEndPlayer");

const spicySpectatorEndScore =
    document.getElementById("spicySpectatorEndScore");

const spicySpectatorEndChallenges =
    document.getElementById("spicySpectatorEndChallenges");

const spicySpectatorEndBack =
    document.getElementById("spicySpectatorEndBack");
let codeSpicySpectateur = "";

let refSpicySpectateur = null;
let partieDeckSpectateur = [];
// =====================================================
// SOLO SPICY - SPECTATOR
// =====================================================

async function rejoindreSoloSpicySpectateur(
    code
) {

    // ---------------------------------------------
    // PROFIL OBLIGATOIRE
    // ---------------------------------------------

    if (!profilConnecte) {
        alert(
            "You must be logged in to spectate a Solo Spicy game."
        );
        return;
    }

    const spectateurRef =
        push(
            ref(
                db,
                "soloSpicy/" +
                code +
                "/spectateurs"
            )
        );

    await set(
        spectateurRef,
        {
            pseudo:
                profilConnecte.nickname,

            arrivee:
                Date.now()
        }
    );

    onDisconnect(
        spectateurRef
    ).remove();

    codeSpicySpectateur =
        code;

    refSpicySpectateur =
        spectateurRef;

    const partieSnapshot =
        await get(
            ref(
                db,
                "soloSpicy/" + code
            )
        );

    const partie =
        partieSnapshot.val();

    if (!partie) {
        return;
    }

    spicySpectatorPlayer.textContent =
        "🎮 Player: " +
        partie.joueur;

    spicySpectatorStatus.textContent =
        "Waiting for the player to start...";

    accueil.style.display =
        "none";

    spicySpectatorRoom.style.display =
        "block";

    surveillerEtatSoloSpicySpectateur(
        code
    );

    surveillerCartesSpicySpectateur(
        code
    );

    surveillerGageSpicySpectateur(
        code
    );
}

// =====================================================
// SOLO SPICY - SPECTATOR VIDEO
// =====================================================

spicySpectatorVideo.addEventListener(
    "click",
    function () {

        if (!codeSpicySpectateur) {
            return;
        }

        window.open(
            "https://kmeet.infomaniak.com/playbattle-" +
            codeSpicySpectateur,
            "_blank"
        );

    }
);


// =====================================================
// SOLO SPICY - SPECTATOR BACK
// =====================================================

spicySpectatorBack.addEventListener(
    "click",
    async function () {

        if (
            refSpicySpectateur !== null
        ) {

            await remove(
                refSpicySpectateur
            );

        }

        refSpicySpectateur =
            null;

        codeSpicySpectateur =
            "";

        spicySpectatorRoom.style.display =
            "none";

        accueil.style.display =
            "block";

    }
);
function surveillerSpectateursSpicy() {

    if (!codeSpicyActuel) {
        return;
    }

    const spectateursRef =
        ref(
            db,
            "soloSpicy/" +
            codeSpicyActuel +
            "/spectateurs"
        );

    onValue(
        spectateursRef,
        function (snapshot) {

            const spectateurs =
                snapshot.val();

            const nombre =
                spectateurs
                    ? Object.keys(
                        spectateurs
                    ).length
                    : 0;
                    spicyNombreSpectateurs =
    nombre;
                    // ---------------------------------------------
// PARTIE EN COURS
// ---------------------------------------------

if (
    spicyGame.style.display === "block"
) {

    if (nombre === 0) {

        spicySansSpectateur = true;

        spicyGameInfo.innerHTML =
            "⏸ GAME PAUSED — Waiting for a spectator...";

    } else {

        spicySansSpectateur = false;

        mettreAJourCompteurSpicy();

    }
}

            spicySpectators.textContent =
                "👁 Spectators: " +
                nombre;

            if (nombre >= 1) {

                spicyWaitingMessage.textContent =
                    "Spectator ready!";

                spicyStart.disabled =
                    false;

                spicyStart.textContent =
                    "START";

            } else {

                spicyWaitingMessage.textContent =
                    "Waiting for at least one spectator...";

                spicyStart.disabled =
                    true;

                spicyStart.textContent =
                    "WAITING FOR SPECTATOR";

            }

        }
    );

}
spicyVideo.addEventListener(
    "click",
    function () {

        if (!codeSpicyActuel) {
            return;
        }

        window.open(
            "https://kmeet.infomaniak.com/playbattle-" +
            codeSpicyActuel,
            "_blank"
        );

    }
);
// =====================================================
// SOLO SPICY - START
// =====================================================

spicyStart.addEventListener(
    "click",
    async function () {
console.log("CLICK START SPICY");

        if (!codeSpicyActuel) {
            return;
        }

        await update(
            ref(
                db,
                "soloSpicy/" +
                codeSpicyActuel
            ),
            {
                etat: "playing"
            }
        );

        spicyWaitingRoom.style.display =
            "none";
spicyGame.style.display =
    "block";
    creerDeckSpicy();
        console.log(
            "Solo Spicy started:",
            codeSpicyActuel
        );

    }
);
// =====================================================
// SOLO SPICY - SPECTATOR GAME STATUS
// =====================================================

function surveillerEtatSoloSpicySpectateur(
    code
) {

    const partieRef =
        ref(
            db,
            "soloSpicy/" + code
        );

    onValue(
        partieRef,
        async function (snapshot) {

            const partie =
                snapshot.val();

           if (!partie) {

    if (refSpicySpectateur) {

        await remove(
            refSpicySpectateur
        );

        refSpicySpectateur = null;
    }

    codeSpicySpectateur = "";

    spicySpectatorRoom.style.display =
        "none";

    accueil.style.display =
        "block";

    alert(
        "The player left the game."
    );

    return;
}

            // PARTIE TERMINÉE
            if (
                partie.etat === "finished"
            ) {

                spicySpectatorStatus.style.display =
                    "none";

                spicySpectatorGameInfo.style.display =
                    "none";

                spicySpectatorPlateau.style.display =
                    "none";

                document.getElementById(
                    "reglesSpicySpectateur"
                ).style.display =
                    "none";

                spicySpectatorChallenge.style.display =
                    "none";

                spicySpectatorEndPlayer.textContent =
                    "🎮 " +
                    partie.joueur +
                    " completed the challenge";

                spicySpectatorEndScore.textContent =
                    "🃏 Cards flipped: " +
                    (partie.score || 0);

                spicySpectatorEndChallenges.textContent =
                    "🔥 Challenges completed: " +
                    (partie.gagesEffectues || 0);

                spicySpectatorEnd.style.display =
                    "block";
spicySpectatorVideo.style.display =
    "none";

spicySpectatorBack.style.display =
    "none";
                return;
            }

            // PARTIE EN COURS
           if (
    partie.etat === "playing"
) {

    document.getElementById(
        "reglesSpicySpectateur"
    ).style.display = "block";

    spicySpectatorStatus.textContent =
        "🌶 The game has started!";

    afficherDeckSpicySpectateur(
        partie
    );

}
else {

    document.getElementById(
        "reglesSpicySpectateur"
    ).style.display = "none";

    spicySpectatorStatus.textContent =
        "Waiting for the player to start...";

}
        }
    );

}
// =====================================================
// SOLO SPICY - GAME SCREEN
// =====================================================

const spicyGame =
    document.getElementById(
        "spicyGame"
    );

const spicyGameInfo =
    document.getElementById(
        "spicyGameInfo"
    );

const spicyGameVideo =
    document.getElementById(
        "spicyGameVideo"
    );
    const spicyGameQuit =
    document.getElementById(
        "spicyGameQuit"
    );

const spicyPlateau =
    document.getElementById(
        "spicyPlateau"
    );


spicyGameVideo.addEventListener(
    "click",
    
    function () {

        if (!codeSpicyActuel) {
            return;
        }

        window.open(
            "https://kmeet.infomaniak.com/playbattle-" +
            codeSpicyActuel,
            "_blank"
        );

    }
);
spicyGameQuit.addEventListener(
    "click",
    async function () {

        if (codeSpicyActuel) {

            await remove(
                ref(
                    db,
                    "soloSpicy/" +
                    codeSpicyActuel
                )
            );
        }

        codeSpicyActuel = "";
        spicyRef = null;

        spicyGame.style.display =
            "none";

        accueil.style.display =
            "block";
    }
);
// =====================================================
// SOLO SPICY - DECK
// =====================================================

let couleurSpicy = "";

let cartesSpicy = [];


function creerDeckSpicy() {

    // ---------------------------------------------
    // COULEUR DU JOUEUR
    // ---------------------------------------------
spicyCardsFlipped = 0;
spicyPremiereCarte = null;
spicyDeuxiemeCarte = null;
spicyBloque = false;
spicyTornadeUtilisations = 0;
spicyPairesTrouvees = 0;
spicyGageEnCours = false;
spicyGagesEffectues = 0;
spicyBouclierActif = false;
spicyVetementsRetires = 0;
    couleurSpicy = "bleu";


    // ---------------------------------------------
    // 24 CARTES VÊTEMENTS
    // ---------------------------------------------

    cartesSpicy = [

    // BLEU = JOUEUR
    // Une seule carte de chaque vêtement
    "images/basbleu.png",
    "images/pantbleu.png",
    "images/tshirtbleu.png",
    "images/chaussettesbleues.png",

    // ROUGE = PAIRES
    "images/basrouge.png",
    "images/basrouge.png",
    "images/pantrouge.png",
    "images/pantrouge.png",
    "images/tshirtrouge.png",
    "images/tshirtrouge.png",

    // JAUNE = PAIRES
    "images/basjaune.png",
    "images/basjaune.png",
    "images/pantjaune.png",
    "images/pantjaune.png",
    "images/tshirtjaune.png",
    "images/tshirtjaune.png",

    // VERT = PAIRES
    "images/basvert.png",
    "images/basvert.png",
    "images/pantvert.png",
    "images/pantvert.png",
    "images/tshirtvert.png",
    "images/tshirtvert.png"

];

    // ---------------------------------------------
    // 6 CARTES SPÉCIALES
    // ---------------------------------------------

    


    cartesSpicy.push(
    "images/auberginedore.png",
    "images/abricotdore.png",
    "images/caresse.png",
    "images/cadeau.png",
    "images/bouclier.png",
    "images/tornade.png"
);

    // ---------------------------------------------
    // MÉLANGE
    // ---------------------------------------------

    cartesSpicy =
        melangerCartes(
            cartesSpicy
        );

// ---------------------------------------------
// ENREGISTRE LE DECK DANS FIREBASE
// ---------------------------------------------

update(
    ref(
        db,
        "soloSpicy/" +
        codeSpicyActuel
    ),
    {
        deck: cartesSpicy,
        couleur: couleurSpicy
    }
);
    // ---------------------------------------------
    // AFFICHAGE
    // ---------------------------------------------

    spicyPlateau.innerHTML =
        "";

    cartesSpicy.forEach(
        function (image, index) {

            const carte =
                document.createElement(
                    "div"
                );

            carte.className =
                "carte spicyCarte";

            carte.dataset.index =
                index;

            carte.dataset.image =
                image;
                carte.addEventListener(
    "click",
    function () {

        retournerCarteSpicy(
            carte
        );

    }
);

            const dos =
                document.createElement(
                    "img"
                );

           dos.src =
    "images/dos.png";

            carte.appendChild(
                dos
            );

            spicyPlateau.appendChild(
                carte
            );

        }
    );


    // ---------------------------------------------
    // INFORMATIONS
    // ---------------------------------------------

   let couleurAffichee = "";

if (couleurSpicy === "bleu") {
    couleurAffichee = "🔵";
} else if (couleurSpicy === "rouge") {
    couleurAffichee = "🔴";
} else {
    couleurAffichee = "🟡";
}

spicyGameInfo.innerHTML =
    "Your color: " +
    couleurAffichee +
    "&nbsp;&nbsp; " +
    "👁 Spectators: " +
spicyNombreSpectateurs +
    "&nbsp;&nbsp; " +
    "🃏 Cards flipped: 0";
}
// =====================================================
// SOLO SPICY - CARD CLICKS
// =====================================================

let spicyPremiereCarte = null;
let spicyDeuxiemeCarte = null;

let spicyBloque = false;

let spicyCardsFlipped = 0;
let spicyPairesTrouvees = 0;
let spicyTornadeUtilisations = 0;
let spicySansSpectateur = false;
let spicyNombreSpectateurs = 0;
let spicyGageEnCours = false;
let spicyGagesEffectues = 0;
let spicyBouclierActif = false;
let spicyVetementsRetires = 0;

function estCarteSpecialeSpicy(image) {

    return (
        image.includes("aubergine") ||
        image.includes("abricot") ||
        image.includes("caresse") ||
        image.includes("cadeau") ||
        image.includes("bouclier") ||
        image.includes("tornade")
    );

}


function mettreAJourCompteurSpicy() {

    const couleurAffichee = "🔵";

    const bouclierAffiche =
        spicyBouclierActif
            ? "&nbsp;&nbsp; 🛡️ Shield active"
            : "";

    spicyGameInfo.innerHTML =
        "Your color: " + couleurAffichee +
        "&nbsp;&nbsp; " +
        "👁 Spectators: " + spicyNombreSpectateurs +
        "&nbsp;&nbsp; " +
        "🃏 Cards flipped: " + spicyCardsFlipped +
        bouclierAffiche;
}


function retournerCarteSpicy(
    carte
) {

   if (
    spicyBloque ||
    spicySansSpectateur ||
    spicyGageEnCours
) {
    return;
}

    if (
        carte.classList.contains(
            "spicyVisible"
        )
    ) {
        return;
    }

    const image =
        carte.dataset.image;

    const speciale =
        estCarteSpecialeSpicy(
            image
        );

    // Affiche la carte
    carte.querySelector("img").src =
        image;

    carte.classList.add(
        "spicyVisible"
    );
    
synchroniserCarteSpicy(
    carte.dataset.index,
    true
);
// Chaque carte retournée compte dans le score
spicyCardsFlipped++;

mettreAJourCompteurSpicy();
// ---------------------------------------------
// VÊTEMENT DU JOUEUR = BLEU
// ---------------------------------------------

if (image.includes("bleu")) {

    carte.classList.add(
        "spicyTrouvee"
    );

    spicyVetementsRetires++;

    return;
}
// ---------------------------------------------
// TORNADE
// ---------------------------------------------

if (image.includes("tornade")) {

    spicyTornadeUtilisations = 1;
    spicyBloque = true;

    spicyPremiereCarte = null;
    spicyDeuxiemeCarte = null;

    // La Tornade est définitivement jouée
    carte.classList.add("spicyTrouvee");

    spicyPlateau.classList.add(
        "effetTornade"
    );

    setTimeout(
        async function () {

            spicyPlateau.classList.remove(
                "effetTornade"
            );

            await melangerPlateauSpicy();

            spicyBloque = false;

        },
        800
    );

    return;
}
    // ---------------------------------------------
// CARTE SPÉCIALE
// ---------------------------------------------

if (speciale) {

    carte.classList.add("spicySpeciale");

    // BOUCLIER
    if (image.includes("bouclier")) {

        spicyBouclierActif = true;

        mettreAJourCompteurSpicy();

        console.log(
            "Solo Spicy: shield activated"
        );

        return;
    }

    // GAGES
    if (image.includes("aubergine")) {

        lancerGageSpicy("aubergine");

    } else if (image.includes("abricot")) {

        lancerGageSpicy("abricot");

    } else if (image.includes("caresse")) {

        lancerGageSpicy("caresse");

    } else if (image.includes("cadeau")) {

        lancerGageSpicy("cadeau");

    }

    return;
}


    // ---------------------------------------------
    // PREMIÈRE CARTE
    // ---------------------------------------------

    if (
        spicyPremiereCarte === null
    ) {

        spicyPremiereCarte =
            carte;

        return;
    }


    // ---------------------------------------------
    // DEUXIÈME CARTE
    // ---------------------------------------------

    spicyDeuxiemeCarte =
        carte;

    spicyBloque =
        true;


    const image1 =
        spicyPremiereCarte.dataset.image;

    const image2 =
        spicyDeuxiemeCarte.dataset.image;


    // ---------------------------------------------
    // PAIRE TROUVÉE
    // ---------------------------------------------

    if (image1 === image2) {

    spicyPremiereCarte.classList.add(
        "spicyTrouvee"
    );

    spicyDeuxiemeCarte.classList.add(
        "spicyTrouvee"
    );

    spicyPairesTrouvees++;

    console.log(
        "Solo Spicy pairs:",
        spicyPairesTrouvees,
        "/ 9"
    );

    // FIN DE PARTIE
    if (spicyPairesTrouvees === 9) {

        spicyPremiereCarte = null;
        spicyDeuxiemeCarte = null;

        terminerSoloSpicy();

        return;
    }

    // La partie continue
    spicyPremiereCarte = null;
    spicyDeuxiemeCarte = null;

    spicyBloque = false;

    return;
}


// ---------------------------------------------
// MAUVAISE PAIRE
// -----------------------------------------------------------------

    setTimeout(
        function () {
synchroniserCarteSpicy(
    spicyPremiereCarte.dataset.index,
    false
);

synchroniserCarteSpicy(
    spicyDeuxiemeCarte.dataset.index,
    false
);
            spicyPremiereCarte
                .querySelector("img")
                .src =
                "images/dos.png";

            spicyDeuxiemeCarte
                .querySelector("img")
                .src =
                "images/dos.png";

            spicyPremiereCarte
                .classList.remove(
                    "spicyVisible"
                );

            spicyDeuxiemeCarte
                .classList.remove(
                    "spicyVisible"
                );
synchroniserCarteSpicy(
    spicyPremiereCarte.dataset.index,
    false
);

synchroniserCarteSpicy(
    spicyDeuxiemeCarte.dataset.index,
    false
);
            spicyPremiereCarte =
                null;

            spicyDeuxiemeCarte =
                null;

            spicyBloque =
                false;

        },
        900
    );

}
// =====================================================
// SOLO SPICY - SPECTATOR DECK
// =====================================================

function afficherDeckSpicySpectateur(
    partie
) {

    if (!partie.deck) {
        return;
    }
partieDeckSpectateur =
    partie.deck;
    spicySpectatorPlateau.innerHTML =
        "";

    partie.deck.forEach(
        function (image, index) {

            const carte =
                document.createElement(
                    "div"
                );

            carte.className =
                "carte spicyCarte";

            carte.dataset.index =
                index;

            const dos =
                document.createElement(
                    "img"
                );

           const etat =
    partie.cartesEtat
        ? partie.cartesEtat[index]
        : null;

dos.src =
    etat &&
    etat.visible === true
        ? image
        : "images/dos.png";

            carte.appendChild(
                dos
            );

            spicySpectatorPlateau.appendChild(
                carte
            );

        }
    );

    spicySpectatorGameInfo.innerHTML =
        "👁 LIVE GAME";

}
// =====================================================
// SOLO SPICY - SYNC CARD STATE
// =====================================================

function synchroniserCarteSpicy(
    index,
    visible
) {

    if (!codeSpicyActuel) {
        return;
    }

    update(
        ref(
            db,
            "soloSpicy/" +
            codeSpicyActuel +
            "/cartesEtat/" +
            index
        ),
        {
            visible: visible
        }
    );

}
// =====================================================
// SOLO SPICY - SPECTATOR LIVE CARDS
// =====================================================

function surveillerCartesSpicySpectateur(
    code
) {

    const cartesEtatRef =
        ref(
            db,
            "soloSpicy/" +
            code +
            "/cartesEtat"
        );

    onValue(
        cartesEtatRef,
        function (snapshot) {

            const etats =
                snapshot.val() || {};

            const cartes =
                spicySpectatorPlateau
                    .querySelectorAll(
                        ".spicyCarte"
                    );

            cartes.forEach(
                function (
                    carte,
                    index
                ) {

                    const etat =
                        etats[index];

                    if (
                        etat &&
                        etat.visible === true
                    ) {

                        carte
                            .querySelector("img")
                            .src =
                            partieDeckSpectateur[
                                index
                            ];

                    } else {

                        carte
                            .querySelector("img")
                            .src =
                            "images/dos.png";

                    }

                }
            );

        }
    );

}
// =====================================================
// SOLO SPICY - TORNADE
// =====================================================

async function melangerPlateauSpicy() {

    const cartesActuelles =
        Array.from(
            spicyPlateau.querySelectorAll(
                ".spicyCarte"
            )
        );

    const plateauMelange =
        cartesSpicy.map(
            function (image, index) {

                const element =
                    cartesActuelles[index];

                const permanente =
                    element &&
                    (
                        element.classList.contains(
                            "spicyTrouvee"
                        ) ||
                        element.classList.contains(
                            "spicySpeciale"
                        )
                    );

                return {
                    image: image,
                    permanente: permanente,
                    tornade:
                        image.includes(
                            "tornade"
                        )
                };
            }
        );

    // Au premier passage,
    // Tornade repart face cachée.
    // Au deuxième, elle reste visible.

    plateauMelange.forEach(
        function (element) {

            if (element.tornade) {

                element.permanente =
                    spicyTornadeUtilisations >= 2;
            }
        }
    );

    // Mélange carte + état ensemble

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

    cartesSpicy =
        plateauMelange.map(
            function (element) {
                return element.image;
            }
        );

    // Reconstruit le plateau joueur

    spicyPlateau.innerHTML = "";

    plateauMelange.forEach(
        function (element, index) {

            const carte =
                document.createElement(
                    "div"
                );

            carte.className =
                "carte spicyCarte";

            carte.dataset.index =
                index;

            carte.dataset.image =
                element.image;

            const img =
                document.createElement(
                    "img"
                );

            if (element.permanente) {

                img.src =
                    element.image;

                carte.classList.add(
                    "spicyVisible"
                );

                if (
                    element.image.includes("bleu")
                ) {

                    carte.classList.add(
                        "spicyTrouvee"
                    );

                } else {

                    carte.classList.add(
                        "spicySpeciale"
                    );
                }

            } else {

                img.src =
                    "images/dos.png";
            }

            carte.appendChild(
                img
            );

            carte.addEventListener(
                "click",
                function () {

                    retournerCarteSpicy(
                        carte
                    );
                }
            );

            spicyPlateau.appendChild(
                carte
            );
        }
    );

    // Nouvel état complet pour Firebase

    const cartesEtat = {};

    plateauMelange.forEach(
        function (element, index) {

            cartesEtat[index] = {
                visible:
                    element.permanente
            };
        }
    );

    await update(
        ref(
            db,
            "soloSpicy/" +
            codeSpicyActuel
        ),
        {
            deck: cartesSpicy,
            cartesEtat: cartesEtat
        }
    );
}
async function lancerGageSpicy(type) {

    // Un bouclier protège contre le prochain gage,
    // quel qu'il soit.
    if (spicyBouclierActif) {

    spicyBouclierActif = false;

    mettreAJourCompteurSpicy();

    console.log(
        "Solo Spicy: challenge cancelled by shield:",
        type
    );

    return;
}

    spicyGageEnCours = true;
    spicyPlayerChallengeText.innerHTML =
    "🔥 <strong>CHALLENGE IN PROGRESS</strong><br>" +
    "Complete the challenge on video.<br>" +
    "⏳ <strong>Waiting for spectator validation...</strong>";

spicyPlayerChallenge.style.display = "block";

    await update(
        ref(
            db,
            "soloSpicy/" +
            codeSpicyActuel
        ),
        {
            gage: {
                actif: true,
                type: type,
                valide: false
            }
        }
    );

    console.log(
        "Solo Spicy challenge:",
        type
    );
}

function surveillerGageSpicySpectateur(
    code
) {

    const gageRef =
        ref(
            db,
            "soloSpicy/" +
            code +
            "/gage"
        );

    onValue(
        gageRef,
        function (snapshot) {

            const gage =
                snapshot.val();
                spicyGiftChoice.style.display =
    "none";

           if (!gage || gage.actif !== true) {
    
    spicySpectatorChallenge.style.display = "none";
    return;
}

            let texte = "";

            if (gage.type === "aubergine") {

                texte =
                    "🍆 WANK 30S — Challenge in progress";

            } else if (
                gage.type === "abricot"
            ) {

                texte =
                    "🍑 10 SPANKING — Challenge in progress";

            } else if (
                gage.type === "caresse"
            ) {

                texte =
                    "🫳 CARESS — At least 30 seconds";

            } else if (
    gage.type === "cadeau"
) {

    
      texte = "🎁 GIFT — Choose a challenge with the player's consent";

    spicyGiftChoice.style.display =
        "block";

}

            spicySpectatorChallengeText.textContent =
                texte;

            spicySpectatorChallenge.style.display =
                "block";
        }
    );
}
spicyValidateChallenge.addEventListener(
    "click",
    async function () {

        if (!codeSpicySpectateur) {
            return;
        }

        await update(
            ref(
                db,
                "soloSpicy/" +
                codeSpicySpectateur +
                "/gage"
            ),
            {
                actif: false,
                valide: true
            }
        );

    }
);
function surveillerGageSpicyJoueur() {

    const gageRef =
        ref(
            db,
            "soloSpicy/" +
            codeSpicyActuel +
            "/gage"
        );

    onValue(
        gageRef,
        function (snapshot) {

            const gage =
                snapshot.val();

            if (!gage) {
                spicyPlayerChallenge.style.display =
                    "none";
                return;
            }

            // Cadeau envoyé par le spectateur
            if (
                gage.actif === true &&
                gage.type === "cadeau"
            ) {

                spicyPlayerChallenge.style.display =
                    "block";

                if (gage.cadeau) {

                    spicyPlayerChallengeText.textContent =
                        "🎁 GIFT: " +
                        gage.cadeau;

                } else {

                    spicyPlayerChallengeText.textContent =
                        "🎁 Waiting for the spectator to choose your challenge...";

                }
            }

            // Validation du gage
            if (
                gage.valide === true &&
                spicyGageEnCours
            ) {

                spicyGageEnCours = false;
                spicyGagesEffectues++;

                spicyPlayerChallenge.style.display =
                    "none";

                console.log(
                    "Challenge validated:",
                    spicyGagesEffectues
                );
            }
        }
    );
}
spicySendGift.addEventListener(
    "click",
    async function () {

        if (!codeSpicySpectateur) {
            return;
        }

        const texte =
            spicyGiftInput.value.trim();

        if (!texte) {
            return;
        }

        await update(
            ref(
                db,
                "soloSpicy/" +
                codeSpicySpectateur +
                "/gage"
            ),
            {
                cadeau: texte
            }
        );

        spicyGiftInput.value = "";

        spicyGiftChoice.style.display =
            "none";
    }
);
async function terminerSoloSpicy() {

    spicyBloque = true;
    await enregistrerMeilleurScoreSpicy(
    spicyCardsFlipped,
    spicyGagesEffectues
);

    await update(
        ref(
            db,
            "soloSpicy/" + codeSpicyActuel
        ),
        {
            etat: "finished",
            score: spicyCardsFlipped,
            gagesEffectues: spicyGagesEffectues,
            vetementsRetires: spicyVetementsRetires
        }
    );

    spicyEndScore.textContent =
        "🃏 Cards flipped: " +
        spicyCardsFlipped;

    spicyEndClothes.textContent =
        "👕 Clothes removed: " +
        spicyVetementsRetires +
        " / 4";

    spicyEndChallenges.textContent =
        "🔥 Challenges completed: " +
        spicyGagesEffectues;
        await afficherClassementFinSpicy();

    spicyGame.style.display =
        "none";

    spicyEndGame.style.display =
        "block";

    console.log(
        "Solo Spicy finished:",
        spicyCardsFlipped,
        "cards flipped"
    );
}
spicyEndBack.addEventListener(
    "click",
    async function () {

        if (codeSpicyActuel) {

            await remove(
                ref(
                    db,
                    "soloSpicy/" +
                    codeSpicyActuel
                )
            );

        }

        codeSpicyActuel = "";
        spicyRef = null;

        spicyEndGame.style.display =
            "none";

        accueil.style.display =
            "block";
    }
);
spicySpectatorEndBack.addEventListener(
    "click",
    async function () {

        if (refSpicySpectateur) {

            await remove(
                refSpicySpectateur
            );

            refSpicySpectateur = null;
        }

        codeSpicySpectateur = "";

        spicySpectatorEnd.style.display =
            "none";

        spicySpectatorRoom.style.display =
            "none";

        accueil.style.display =
            "block";
    }
);
// =====================================================
// SOLO SPICY - SYNC CARD STATE
// =====================================================


// =====================================================
// SOLO SPICY - SPECTATOR LIVE CARDS
// =====================================================

