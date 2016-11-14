// const remote = require('electron').remote
// const main = remote.require('./main.js')

keys = main.getPublicKeys()
keys.forEach(function(key){
	user = key.getUserIds()[0]
	userName = user.split('<')[0]
	keyid = key.primaryKey.getKeyId().toHex()

	var x = document.getElementById("selectPublicKey");
	var option = document.createElement("option");
	option.text = userName;
	option.value = keyid;
	
	x.add(option);
})

function encryptMsg(){
	var msg = document.getElementById("message").value;
	var pubKeyId = document.getElementById("selectPublicKey").value;

	main.encrypt(msg, pubKeyId).then(function(result){
		alert(result)
	})
}