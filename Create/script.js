
var submit = document.getElementById("submit");
var compass_given = document.getElementById("compass_given");
var showPlayers = document.getElementById("showPlayers");
var full_health = document.getElementById("full_health");
var op_after_end = document.getElementById("op_after_end");
var addPlayer = document.getElementById("addPlayer");
var speedrunner_username = document.getElementById("speedrunner_username");
var player_element = document.getElementById("player_element");
var players = [];
var currentPlayer = "";

var Signed_in = sessionStorage.getItem("Signed_in");

if(Signed_in != "true"){
      window.location = "../login.html";
}

var unique_id_h3 = document.getElementById("unique_id_h3");

addPlayer.addEventListener("click", function () {
      if (player_element.value === "" || player_element.value === undefined || player_element.value === null) {
            Swal.fire({ title: "Please enter a name", icon: "warning" });
      }
      else if (player_element.value != "" && player_element.value != undefined && player_element.value != null) {
            players.push(player_element.value);
            Swal.fire({
                  title: "Player(" + player_element.value + ") was added",
                  icon: "success"
            });
      }
})

showPlayers.addEventListener("click", function () {
      if(players != []){
            for (let index = 0; index < players.length; index++) {
                  const element = players[index];
                  document.getElementById('players').innerHTML = document.getElementById('players').innerHTML + "Player " + (index + 1) + ": " + element + "<br>";
            }
      }
      else{
            document.getElementById('players').innerHTML = "No players added";
      }
})

$(document).ready(function () {
      $('.next-button').click(function () {
            var current = $(this).parent();
            var next = $(this).parent().next();
            $(".progress li").eq($("fieldset").index(next)).addClass("active");
            current.hide();
            next.show();
      })

      $('.prev-button').click(function () {
            var current = $(this).parent();
            var prev = $(this).parent().prev()
            $(".progress li").eq($("fieldset").index(current)).removeClass("active");
            current.hide();
            prev.show();
      })
})

submit.addEventListener("click", function () {
      if (speedrunner_username.value === "" || speedrunner_username.value === undefined || speedrunner_username.value === null) {
            Swal.fire({
                  title: "Add Speedrunner Username",
                  icon: "error"
            });
      }
      else if (players === []) {
            Swal.fire({
                  title: "Add Players",
                  icon: "error"
            });
      }
      else {


            database.ref("manhunt/").once("value").then(function (snapshot) {
                  if (snapshot.exists()) {
                        var data = snapshot.val();
                        var manhunt_counter = data.manhunt_counter;
                        var uniqueID = new Date().getMilliseconds() + Math.random().toString(16).slice(2);
                        console.log(uniqueID);

                        database.ref("manhunt/" + uniqueID + "/").set({
                              'Speedrunner_Username': speedrunner_username.value,
                              'Compass_Given': compass_given.value,
                              'Full_Health': full_health.value,
                              'Op_After_End': op_after_end.value,
                              'Players': players,
                              'ID': uniqueID,
                              'status': "stop",
                        });

                        database.ref("manhunt/").update({
                              'manhunt_counter': manhunt_counter + 1,
                        });

                        unique_id_h3.innerText = "Unique ID: " + uniqueID;
                  }
            })

            var current = $('.submit-button').parent();
            var next = $('.submit-button').parent().next();
            current.hide();
            next.show();

            Swal.fire("Success", "Your Manhunt Server has been created successfully.", "success");
      }
});

function generateUniqueId() {
      var id = new Date().getMilliseconds + Math.random().toString(16).slice(2);
      return id;
}