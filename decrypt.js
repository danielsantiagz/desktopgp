const remote = require('electron').remote
const main = remote.require('./main.js')

function decryptMsg(){
	var msg = document.getElementById("message").value;
	var passphrase = document.getElementById("passphrase").value;
	
	main.decrypt(msg, passphrase).then(function(result){
		alert(result)
	})
}