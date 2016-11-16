// const remote = require('electron').remote
// const main = remote.require('./main.js')


keys = main.getPublicKeys()
keys.forEach(function(key){
	user = key.getUserIds()[0]
	userEmail = user.match(/<(.*)>/)[1]
	userName = user.split('<')[0]
	keyid = key.primaryKey.getKeyId().toHex()
	created = key.primaryKey.created.toDateString()


	// Find a <table> element with id="myTable":
	var table = document.getElementById("publicKeysTable");

	var tbody = table.tBodies[0]
	// Create an empty <tr> element and add it to the 1st position of the table:
	var row = tbody.insertRow();

	// Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	var cell3 = row.insertCell(2);
	var cell4 = row.insertCell(3);

	// Add some text to the new cells:
	cell1.innerHTML = userName;
	cell2.innerHTML = userEmail;
	cell3.innerHTML = keyid;
	cell4.innerHTML = created;
})

$('#publicKeysTable > tbody > tr').click(function() {
    // row was clicked

    keyid = this.cells[2].innerText

    key = main.getPublicKey(keyid)
    keypriv = main.getPrivateKey(keyid)

	user = key.getUserIds()[0]
	userEmail = user.match(/<(.*)>/)[1]
	userName = user.split('<')[0]
	keyid = key.primaryKey.getKeyId().toHex()
	created = key.primaryKey.created.toDateString()
	fingerPrint = key.primaryKey.getFingerprint()
	publicKey = key.armor()
	privateKey = keypriv.armor()

    // console.log(main.getKey(keyid))
    console.log(keypriv.armor())
    console.log(keypriv.isPrivate())

    $('#keyname').val(userName);
    $('#keyemail').val(userEmail);
    $('#keyid').val(keyid);
    $('#keycreated').val(created);
    $('#keyfingerprint').val(fingerPrint);
    $('#keyPublicArmor').val(publicKey)
    
    if(privateKey){
    	$('#keyPrivateArmor').val(privateKey)
    }

    $('#keyInfoModal').modal('show');


});


