const remote = require('electron').remote
const main = remote.require('./main.js')

function generate(){
	var name = document.getElementById("name").value;
	var email = document.getElementById("email").value;
	var passphrase = document.getElementById("passphrase").value;
	
	main.generate(name, email, passphrase)
}