// character database

var charactersInfo = [
{
    "id": "Luke",
    "attack": 5,
    "health": 100,
    "userSelected": false,
    "computerSelected": false,
    "deadOpponent": false,
    "selectableCharacter": true,
    "sprite": null,
    "profilePicture": null,
},
{
    "id": "Jawa",
    "attack": 8,
    "health": 120,
    "userSelected": false,
    "computerSelected": false,
    "deadOpponent": false,
    "selectableCharacter": true,
    "sprite": null,
    "profilePicture": null
},
{
    "id": "Stormtrooper",
    "attack": 20,
    "health": 150,
    "userSelected": false,
    "computerSelected": false,
    "deadOpponent": false,
    "selectableCharacter": true,
    "sprite": null,
    "profilePicture": null
},
{
    "id": "Boba-Fett",
    "attack": 25,
    "health": 180,
    "userSelected": false,
    "computerSelected": false,
    "deadOpponent": false,
    "selectableCharacter": true,
    "sprite": null,
    "profilePicture": null
}
];
// initialized game info
var userSelected = false;
var computerSelected = false;

var clickCharacter = $(".swcharacter").click();

function selectUser() {
    if(!userSelected){
    $(.swcharacter).click().append();
    userSelected = true;
    };
};

selectUser();