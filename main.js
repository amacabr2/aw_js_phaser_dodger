var game = new Phaser.Game(600, 600);

var dodger = {

  preload: function () {
      //chargement image
  },

  create: function () {
      //setup du jeu
  },

  update: function () {
      //logique du jeu
  }

};

game.state.add('dodger', dodger);
game.state.start('dodger');