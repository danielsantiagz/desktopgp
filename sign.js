const remote = require('electron').remote
const main = remote.require('./main.js')

keys = main.getPrivateKeys()
keys.forEach(function(key){
	user = key.getUserIds()[0]
	userName = user.split('<')[0]
	keyid = key.primaryKey.getKeyId().toHex()

	var x = document.getElementById("selectPrivateKey");
	var option = document.createElement("option");
	option.text = userName;
	option.value = keyid;


	x.add(option);
})
// alert("hello")

function signMsg(){
	var msg = document.getElementById("message").value;
	var pubKeyId = document.getElementById("selectPrivateKey").value;
  var password = document.getElementById("passphrase").value;

	main.Sign(msg, pubKeyId, password).then(function(result){
		var res = result.msg
    alert(res)
	})

}
