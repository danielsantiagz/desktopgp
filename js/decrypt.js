// const remote = require('electron').remote
// const main = remote.require('./main.js')

function decryptMsg(){
	var msg = document.getElementById("message").value;
	var passphrase = document.getElementById("passphrase").value;
	
	main.decrypt(msg, passphrase).then(function(result){
		decryptedMsg = result.decryptedMsg
		error = result.error
		if(error){
			if(error.message.search("Private key is not decrypted.")){
				alert("Passphrase is incorrect")
			}
			else{
				alert(error.message)
			}
		}
		else{
			alert(decryptedMsg)
		}
	})
}