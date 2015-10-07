var playerRoster = {};
var playerId = 0;


var Player = function (name, position, playerNumber) {
  this.name = name;
  this.position = position;
  this.number = playerNumber;
  playerId++;
  this.id = playerId;
};

function addPlayer() {
  var name = $('.playerName').val();
  var position = $('.playerPosition').val();
  var playerNumber = $('.playerNumber').val();

//function removePlayer() {
//maybe like this?
//$('.remove').on('click','Player' ,'.remove()' {
//alert("remove");
//})   
//};
  
  var player = new Player(name, position, playerNumber);
  playerRoster[player.id] = player;
        
  //player card
  var html = '<div class="player-card">' +
    '<div>' +
    '<div class="text-center">' +
    '<button player-id="' + player.id + '" class="btn btn-danger btn-center btn-xs remove">' + 'delete' + '</button>' +
    '</div>' +
    '<img width="100" src="http://s.nflcdn.com/static/content/public/image/fantasy/transparent/200x200/" />' +
    '</div>' +
    '<div class="player-text-style">' +
    '<span>' + name + '</span>' +
    '</div>' +
    '<div class="player-text-style">' +
    '<span>' + position + '</span>' +
    '</div>' +
    '<div class="player-text-style">' +
    '<span>' + playerNumber + '</span>' +
    '</div>' +
    '</div>';
  $(".player-roster").append(html);
  $('.remove').on('click', function () {
    var idtoremove = $(this).attr('player-id');
    delete playerRoster[player.id]
    $(this).parent().parent().parent().remove();
  });
};


$(document).ready(function () {
  $('#add-player-button').on('click', function () {
    addPlayer();
  });  
});

$(document).ready(function () {
  $('#byTeam').on('click', function () {
    _players.getPlayersByTeam(); 
  });  
});

$(document).ready(function () {
  $('#byName').on('click', function () {
    _players.getPlayersByLastName();
  });  
});

$(document).ready(function () {
  $('#byNumber').on('click', function () {
    _players.getPlayersByNumber();
  });  
});

//create a class called update players/loop through player and draw them one at a time
//insert player factory?
    var playerService = function() {
       
        var _players = [];
        return {
          loadPlayers: function(cb) {
            var url = "http://bcw-getter.herokuapp.com/?url=";
            var url2 = "http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
            var apiUrl = url + encodeURIComponent(url2);
            $.getJSON(apiUrl, function(response) {
              _players = response.body.players;
              cb();
            })
          },
          getPlayers: function() {
            return _players.slice();
          },
          getPlayersByTeam: function(team) {
            var requestedTeam = _players.filter(function(player) {
              if (player.pro_team === team) {
                return true;
              }
            })
            return requestedTeam;
          },
           getPlayersByLastName: function(lastname) {
            var requestedName = _players.filter(function(player) {
              if (player.lastname === lastname) {
                return true;
              }
            })
            return requestedName;
          },
          getPlayersByNumber: function(playerNumber) {
            var requestedNumber = _players.filter(function(player) {
              if (player.number === playerNumber) {
                return true;
              }
            })
            return requestedNumber;
          }
          
          
        }
      }


