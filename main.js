var game = new Phaser.Game(600, 600);
var vitesse = 300;

var dodger = {

    /**
     * Chargement image
     */
    preload: function () {
        game.load.image('fond', 'assets/fond.png');
        game.load.image('player', 'assets/player.png');
        game.load.image('mechant', 'assets/mechant.png');
    },

    /**
     * Setup du jeu
     */
    create: function () {

        //physique du jeu
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Affichage image
        game.add.sprite(0, 0, 'fond');
        this.player = game.add.sprite(300, 500, 'player');
        this.player.anchor.set(0.5);

        //Prepare le joueur
        game.physics.arcade.enable(this.player);
        this.cursors = game.input.keyboard.createCursorKeys();

        // Ajout du groupe de méchand
        this.mechants = game.add.group();
        this.timer = game.time.events.loop(500, this.ctrlMechant, this);

        // Défini le score
        this.score = 0;
        this.labelScore = game.add.text(20, 20, "0", {
            font: "30px Arila",
            fill: "#ffffff"
        })

    },

    /**
     * Logique du jeu
     */
    update: function () {

        game.physics.arcade.overlap(this.player, this.mechants, this.restartGame, null, this);

        // Vélocité de base
        this.player.body.velocity.x = 0;
        this.player.body.velocity.y = 0;

        // Déplacement joueur
        if (this.cursors.left.isDown) this.player.body.velocity.x = -1 * vitesse;
        if (this.cursors.right.isDown) this.player.body.velocity.x = vitesse;
        if (this.cursors.up.isDown) this.player.body.velocity.y = -1 * vitesse;
        if (this.cursors.down.isDown) this.player.body.velocity.y = vitesse;

        // Vérifie si le joueur ne sort pas de la carte
        if (this.player.inWorld == false) this.restartGame();

    },

    /**
     * Recommence le jeu
     */
    restartGame: function () {
        alert('Perdu');
        game.state.start('dodger');
    },

    /**
     * Ajoute un méchand sur la carte
     */
    ctrlMechant: function () {

        var position = Math.floor(Math.random() * 550) + 1;
        var mechant = game.add.sprite(position, -50, 'mechant');

        // Ajouter le méchant
        game.physics.arcade.enable(mechant);
        mechant.body.gravity.y = 300;
        this.mechants.add(mechant);

        // Retire le méchand quand il sort de la carte
        mechant.checkWorldBounds = true;
        mechant.outOfBoundsKill = true;

        // compte les points
        this.score += 10;
        this.labelScore.text = this.score;

    }

};

game.state.add('dodger', dodger);
game.state.start('dodger');