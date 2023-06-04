class Game {
    constructor() {


        //TODO: ette zone pourrais être rendu avec un moteur logique pour creer dynamiquement des map a chaque partie
        this.tableau_load = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0],
            [0, 2, 0, 0, 2, 0, 0, 0, 2, 0, 2, 0, 0, 0, 2, 0, 0, 2, 0],
            [0, 2, 0, 0, 2, 0, 0, 0, 2, 0, 2, 0, 0, 0, 2, 0, 0, 2, 0],
            [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
            [0, 2, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 2, 0],
            [0, 2, 2, 2, 2, 0, 2, 2, 2, 0, 2, 2, 2, 0, 2, 2, 2, 2, 0],
            [0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0],
            [0, 1, 1, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 1, 1, 0],
            [0, 0, 0, 0, 2, 0, 2, 0, 0, 1, 0, 0, 2, 0, 2, 0, 0, 0, 0],
            [2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2],
            [0, 0, 0, 0, 2, 0, 2, 0, 0, 1, 0, 0, 2, 0, 2, 0, 0, 0, 0],
            [0, 1, 1, 0, 2, 0, 2, 2, 2, 2, 2, 2, 2, 0, 2, 0, 1, 1, 0],
            [0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0],
            [0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0],
            [0, 2, 0, 0, 2, 0, 0, 0, 2, 0, 2, 0, 0, 0, 2, 0, 0, 2, 0],
            [0, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 0],
            [0, 0, 2, 0, 2, 0, 2, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 0, 0],
            [0, 2, 2, 2, 2, 0, 2, 2, 2, 0, 2, 2, 2, 0, 2, 2, 2, 2, 0],
            [0, 2, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 2, 0],
            [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ]; //map
        this.pacman = { //position pacman de base et direction
            x: 10,
            y: 11,
            direction: 0
        };
        this.TableauFantome = [ //position de base des phantome
            { x: 2, y: 2, direction: 1 },
            { x: 18, y: 21, direction: 1 },
            { x: 2, y: 21, direction: 1 },
            { x: 18, y: 2, direction: 1 }
        ];


        //core du jeu
        this.tableau = this.tableau_load; //copier le tableu pour rechargement partie futur (le tableau est altéré pendant la partie)
        this.boxMap = document.getElementById('boxMap'); //map
        this.score = 0; //score
        this.Win = document.getElementById('Win'); //message WIN  (deux entité pour css)
        this.Loose = document.getElementById('Loose'); //message LOSE (deux entité pour css)
        this.scoreLabel = document.getElementById('TextLabel'); //text score
        this.dots = -1; //point

        document.body.addEventListener("keydown", (e) => this.Touche(e)); //gestion touche
        this.points(); //calculer les point de partie.
        this.interval = setInterval(() => this.tour(), 200); //5 FPS
    }

    //gerer l'affichage du score
    updateScore() {
        this.scoreLabel.innerHTML = "Score: " + this.score;
    }

    //faire un rendu de la map
    show() {
        this.boxMap.innerHTML = '';
        let mur;
        let sol;
        let bonbon;

        for (let y = 0; y < 22; y++) {
            for (let x = 0; x < 19; x++) {
                if (this.tableau[y][x] === 0) {
                    mur = document.createElement('img');
                    mur.src = './IMG/bleu.jpg';
                    mur.style.gridArea = (y + 1) + '/' + (x + 1);
                    this.boxMap.appendChild(mur);
                } else if (this.tableau[y][x] === 1) {
                    sol = document.createElement('img');
                    sol.src = './IMG/sol.gif';
                    sol.style.gridArea = (y + 1) + '/' + (x + 1);
                    this.boxMap.appendChild(sol);
                } else {
                    bonbon = document.createElement('img');
                    bonbon.src = './IMG/bonbon.gif';
                    bonbon.style.gridArea = (y + 1) + '/' + (x + 1);
                    this.boxMap.appendChild(bonbon);
                }
            }
        }
        this.updateScore(); //refresh le score
    }

    //afficher macman
    showPacman() {
        let pacmanEle = document.createElement('img');
        pacmanEle.src = './IMG/pacman.gif';
        pacmanEle.style.gridArea = (this.pacman.y) + '/' + (this.pacman.x);
        this.boxMap.appendChild(pacmanEle);
    }

    //afficher 1 des phantome du tableau
    showFantome(num) {
        let fantomeEle = document.createElement('img');
        fantomeEle.src = './IMG/ghost' + num + '.gif';
        fantomeEle.style.gridArea = (this.TableauFantome[num].y) + '/' + (this.TableauFantome[num].x );
        this.boxMap.appendChild(fantomeEle);
    }

    //boucle principale
    tour() {
        this.bougePacman();
        this.collision();
        this.manger();
        this.show();
        this.showPacman();

        for (let i = 0; i < this.TableauFantome.length; i++) {
            this.showFantome(i);
            this.bougeFantome(i);
            this.collisionFantome(i);
        }

        this.gain();
    }

    //deplacer pacman a partir des ordres de directions
    bougePacman() {
        if (this.pacman.direction === 1) {
            this.pacman.y++;
        } else if (this.pacman.direction === 2) {
            this.pacman.y--;
        } else if (this.pacman.direction === 3) {
            this.pacman.x++;
        } else if (this.pacman.direction === 4) {
            this.pacman.x--;
        }

        if (this.pacman.x > 19) {
            this.pacman.x = 1;
        } else if (this.pacman.y > 22) {
            this.pacman.y = 1;
        } else if (this.pacman.x < 1) {
            this.pacman.x = 19;
        } else if (this.pacman.y < 1) {
            this.pacman.y = 22;
        }
    }

    //deplacer fantome numero X a partir des ordres de directions
    bougeFantome(num) {
        const fantome = this.TableauFantome[num];

        if (fantome.direction === 1) {
            fantome.y++;
        } else if (fantome.direction === 2) {
            fantome.y--;
        } else if (fantome.direction === 3) {
            fantome.x++;
        } else if (fantome.direction === 4) {
            fantome.x--;
        }

        if (fantome.x > 19) {
            fantome.x = 1;
        } else if (fantome.y > 22) {
            fantome.y = 1;
        } else if (fantome.x < 1) {
            fantome.x = 19;
        } else if (fantome.y < 1) {
            fantome.y = 22;
        }
    }

    //verifier si pacman touche un fantome ou inversement
    collision() {
        if (this.tableau[this.pacman.y - 1][this.pacman.x - 1] === 0) {
            if (this.pacman.direction == 1) {
                this.pacman.y--;
            } else if (this.pacman.direction == 2) {
                this.pacman.y++;
            } else if (this.pacman.direction == 3) {
                this.pacman.x--;
            } else if (this.pacman.direction == 4) {
                this.pacman.x++;
            }
        }

        for (let num = 0; num < this.TableauFantome.length; num++) {
            const fantome = this.TableauFantome[num];

            if (fantome.y === this.pacman.y && fantome.x === this.pacman.x) {
                const perduPacman = document.createTextNode('Vous avez Perdu !');
                this.Loose.appendChild(perduPacman);
                clearInterval(this.interval);
            }
        }
    }

    //on verifie si c'est un fantome en particulier ou non pour tenter de savoir qui a tuer qui
    collisionFantome(num) {
        const fantome = this.TableauFantome[num];

        if (this.tableau[fantome.y - 1][fantome.x - 1] === 0) {
            if (fantome.direction == 1) {
                fantome.y--;
            } else if (fantome.direction == 2) {
                fantome.y++;
            } else if (fantome.direction == 3) {
                fantome.x--;
            } else if (fantome.direction == 4) {
                fantome.x++;
            }
            fantome.direction = Math.round(Math.random() * 3) % 4 + 1; //random direction

            if (fantome.y === this.pacman.y && fantome.x === this.pacman.x) {
                const perduFantome = document.createTextNode('Vous avez Perdu ! Le fantôme ' + num + ' vous a tué !');
                document.body.appendChild(perduFantome);
                clearInterval(this.interval);
            }
        }
    }

    //gerer la partie de disparition des points si pacman est desssus
    manger() {
        if (this.tableau[this.pacman.y - 1][this.pacman.x - 1] == 2) { //si point
            this.tableau[this.pacman.y - 1][this.pacman.x - 1] = 1;  //mettre aire    //amelioration 
            this.score += 10;
            this.dots--;
        }
    }

    //recacul de tout les points dans la map
    points() {
        this.dots = 0;
        for (let y = 0; y < 22; y++) {
            for (let x = 0; x < 19; x++) {
                if (this.tableau[y][x] === 2) {
                    this.dots++;
                }
            }
        }
    }

    //verifier si on a gagné
    gain() {
        if (this.dots === 0) {
            const winText = document.createTextNode('Vous avez Gagné !');
            this.Win.appendChild(winText);
            clearInterval(this.interval);
        }
    }

    //gestion du clavier
    Touche(event) {
        if (event.code === "ArrowUp") {
            this.pacman.direction = 2;
        } else if (event.code === "ArrowDown") {
            this.pacman.direction = 1;
        } else if (event.code === "ArrowLeft") {
            this.pacman.direction = 4;
        } else if (event.code === "ArrowRight") {
            this.pacman.direction = 3;
        }
    }
}

let game = new Game(); //intialiser le jeu
