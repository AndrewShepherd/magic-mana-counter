function GameBoard() {
  this.allUsers = [];

}
 
 
(function() {
  "use strict";
  
  GameBoard.prototype.addPlayer = function(user) {
    if(typeof(user) == "string") {
      user = new Player(user);
    }
    this.allUsers.push(user);
  };
  
  GameBoard.prototype.deletePlayer = function(user) {
    
      var index = this.allUsers.indexOf(user);
      if(index != -1) {
        this.allUsers.splice(index, 1);
      }
  };
})();