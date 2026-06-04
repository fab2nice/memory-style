const cartes = [
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

cartes.sort(() => Math.random() - 0.5);

let premiereCarte = null;
let deuxiemeCarte = null;
let jeuBloque = false;

let score = 0;
let joueurActuel = 1;
let scoresJoueurs = [0, 0, 0, 0];

const plateau = document.getElementById("plateau");
const affichageScore = document.getElementById("score");
const affichageTour = document.getElementById("tour");
const affichageScoresJoueurs = document.getElementById("scores");

const boutonNouvellePartie = document.getElementById("nouvellePartie");
const boutonRejouer = document.getElementById("rejouer");

const finPartie = document.getElementById("finPartie");
const classement = document.getElementById("classement");

function afficherDos(bouton) {
    bouton.innerHTML = "<img src='images/dos.png'>";
}

function afficherCarte(bouton, carte) {
    bouton.innerHTML = "<img src='" + carte + "'>";
}

function afficherScores() {
    affichageScoresJoueurs.innerHTML =
        "J1 : " + scoresJoueurs[0] +
        " | J2 : " + scoresJoueurs[1] +
        " | J3 : " + scoresJoueurs[2] +
        " | J4 : " + scoresJoueurs[3];
}

function joueurSuivant() {
    joueurActuel++;

    if (joueurActuel > 4) {
        joueurActuel = 1;
    }

    affichageTour.innerHTML = "Tour du joueur " + joueurActuel;
    affichageTour.className = "joueur" + joueurActuel;
}

function afficherFinPartie() {
    let meilleurScore = Math.max(...scoresJoueurs);
    let gagnants = [];

    for (let i = 0; i < scoresJoueurs.length; i++) {
        if (scoresJoueurs[i] === meilleurScore) {
            gagnants.push(i + 1);
        }
    }

    classement.innerHTML =
        "J1 : " + scoresJoueurs[0] + " paire(s)<br>" +
        "J2 : " + scoresJoueurs[1] + " paire(s)<br>" +
        "J3 : " + scoresJoueurs[2] + " paire(s)<br>" +
        "J4 : " + scoresJoueurs[3] + " paire(s)<br><br>" +
        "🥇 Vainqueur(s) : Joueur(s) " + gagnants.join(", ");

    document.getElementById("jeu").style.display = "none";
    finPartie.style.display = "block";
}

function nouvellePartie() {
    location.reload();
}

afficherScores();

for (let i = 0; i < cartes.length; i++) {
    const bouton = document.createElement("button");

    afficherDos(bouton);

    bouton.addEventListener("click", function () {
        if (jeuBloque) {
            return;
        }

        if (premiereCarte !== null && premiereCarte.bouton === bouton) {
            return;
        }

        afficherCarte(bouton, cartes[i]);

        if (premiereCarte === null) {
            premiereCarte = {
                bouton: bouton,
                fruit: cartes[i]
            };

            return;
        }

        if (deuxiemeCarte === null) {
            deuxiemeCarte = {
                bouton: bouton,
                fruit: cartes[i]
            };

            jeuBloque = true;

            if (premiereCarte.fruit === deuxiemeCarte.fruit) {
                scoresJoueurs[joueurActuel - 1]++;
                score++;

                afficherScores();

                affichageScore.innerHTML = "Score : " + score;

                premiereCarte.bouton.disabled = true;
                deuxiemeCarte.bouton.disabled = true;

                premiereCarte = null;
                deuxiemeCarte = null;
                jeuBloque = false;

                if (score === cartes.length / 2) {
                    afficherFinPartie();
                }

            } else {
                setTimeout(function () {
                    afficherDos(premiereCarte.bouton);
                    afficherDos(deuxiemeCarte.bouton);

                    premiereCarte = null;
                    deuxiemeCarte = null;

                    joueurSuivant();

                    jeuBloque = false;
                }, 1000);
            }
        }
    });

    plateau.appendChild(bouton);
}

boutonNouvellePartie.addEventListener("click", nouvellePartie);
boutonRejouer.addEventListener("click", nouvellePartie);