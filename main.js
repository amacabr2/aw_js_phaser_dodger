var game = new Phaser.Game(600, 600);

var dodger = {

    /**
     * Chargement image
     */
    preload: function () {
        game.load.image('fond', 'assets/fond.png');
        game.load.image('player', 'assets/player.png');
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

    },

    /**
     * Logique du jeu
     */
    update: function () {

        // Vélocité de base
        this.player.body.velocity.x = 0;
        this.player.body.velocity.y = 0;

        // Déplacement joueur
        if (this.cursors.left.isDown) this.player.body.velocity.x = -300;
        if (this.cursors.right.isDown) this.player.body.velocity.x = 300;
        if (this.cursors.up.isDown) this.player.body.velocity.y = -300;
        if (this.cursors.down.isDown) this.player.body.velocity.y = 300;

        // Vérifie si le joueur ne sort pas de la carte
        if (this.player.inWorld == false) this.restartGame();

    },

    /**
     * Recommence le jeu
     */
    restartGame: function () {
        game.state.start('dodger');
    }

};

game.state.add('dodger', dodger);
game.state.start('dodger');