(function() {

  "use strict";
  
  var module = angular.module("SaturdayRouting", ["ngRoute"]);
  
  module.factory("gameBoard", [function() {
    return new GameBoard();
  }]);
  
  
    // This is required so it doesn't put 'unsafe' before image urls
  module.config( [
      '$compileProvider',
      function( $compileProvider )
      {   
        //  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|filesystem):/);
         $compileProvider.aHrefSanitizationWhitelist(/^.*/);
         $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|local|data|chrome-extension|filesystem):/);
          // Angular before v1.2 uses $compileProvider.urlSanitizationWhitelist(...)
      }
  ]);
  
  module.controller("HomeController", ["$scope",  "gameBoard", function($scope, gameBoard) {
    $scope.controllerMessage = "Hello, from the home controller";
    
    var addUserStateInitial = "addUserState_Initial";
    var addUserStateAdding = "addUserState_Adding";
    
    var currentAddUserState = addUserStateInitial;
    
    $scope.gameBoard = gameBoard;
    
    $scope.startAddUser = function() {
      console.log("startAddUser function being invoked");
  
      currentAddUserState = addUserStateAdding;
      window.setTimeout(function() {
        $('#inputNewUserName').focus();      
      }, 100);
    };
    
    $scope.newUserName = "";
  
    function refresh() {
      $scope.newUserName = "";
      allUsersViewModel = null;
    }
  
  
    $scope.applyAddUser = function() {
      gameBoard.addPlayer($scope.newUserName);
      currentAddUserState = addUserStateInitial;
      refresh();
    };
    

    $scope.cancelAddUser = function() {
      currentAddUserState = addUserStateInitial;
    };
    
    $scope.displayAddUserButton = function() {
      var result = (currentAddUserState === addUserStateInitial);
      console.log("displayAddUserButton queried, returning " + result);
      return result;
    };
    
    $scope.displayAddUserEditPanel = function() {
      return (currentAddUserState === addUserStateAdding);
    };
    
    
    function UserViewModel(user) {
      var that = this;
      this.user = user;
      this.isEditingName = false;
      var sequenceNext = sequenceGenerator.next();
      this.nameEditId = "playerName_" + sequenceNext;
      
      
      this.userNameForEditing = user.playerName;
      
      this.startNameEdit = function() {
        allUsersViewModel.forEach(function(m) {
          m.cancelNameEdit();
        });
        this.userNameForEditing = user.playerName;
        this.isEditingName = true;
        window.setTimeout(function() {
          $(document.getElementById(that.nameEditId))
            .focus()
            .select();
        },100);
      };
      
      this.cancelNameEdit = function() {
        this.userNameForEditing = user.playerName;
        this.isEditingName = false;
      };
      
      this.applyNameEdit = function() {
        user.playerName = this.userNameForEditing;
        this.isEditingName = false;
      };
      
      this.delete = function() {
        gameBoard.deletePlayer(user);
        allUsersViewModel = null;
      };
      this.getUserName = function() {
        return user.playerName;
      };
      this.getHitPointsInputId = function() {
        return "hitPoints_" + user.id;
      };
    }
    
    
    var allUsersViewModel;
    
    $scope.getAllUsers = function() {
      return (allUsersViewModel = allUsersViewModel || gameBoard.allUsers.map(function(user) {
        return new UserViewModel(user);
      }));
    };
    
    
    
    
  }]);
  
  
  module.config(function($routeProvider, $locationProvider) {
    $routeProvider.when("/home", {
      templateUrl: "homeTemplate.html",
      controller: "HomeController"
    }).when("/pageOne", {
      templateUrl: "pageOneTemplate.html"
    }).when("/pageTwo", {
      templateUrl: "pageTwoTemplate.html"
    }).otherwise({ templateUrl: "homeTemplate.html", controller: "HomeController" });
    $locationProvider.html5Mode(true);
  });
})();