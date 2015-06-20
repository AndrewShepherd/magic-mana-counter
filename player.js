function Player(playerName) {
  this.playerName = playerName;
  this.hitPoints = 20;
  this.id = sequenceGenerator.next();
  
  
  var manaImages = [
      "Mana_B.png",
      "Mana_G.png",
      "Mana_R.png",
      "Mana_U.png",
      "Mana_W.png"
    ];
    
    
  this.mana = manaImages.map(function(imageName) {
    return {
      amount: 0,
      imageName : imageName
    };
  });

}