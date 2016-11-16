// const remote = require('electron').remote
// const main = remote.require('./main.js')

function generate(){
	// $('#myModal').modal("show")

  	$('#generateBtn').button('loading');

	var name = document.getElementById("name").value;
	var email = document.getElementById("email").value;
	var passphrase = document.getElementById("passphrase").value;
	
	main.generate(name, email, passphrase).then(function(result){
	    // $('#myModal').modal("hide")

	    openD("Success! New key generated and imported into keyring")
	    
	    $('#generateBtn').button('reset');
	    clearF('generateKey')
	})
}

// function openD(msg){
	// dialog.showMessageBox({type: "info", message: msg, buttons: []})
// }

