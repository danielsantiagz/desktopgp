const remote = require('electron').remote
const main = remote.require('./main.js')
var key = require('./keys2.js');
var noti;
var para = document.createElement('p');
var options, message, KeyID, isSigned, e;

function toHex(str) {
	var hex = '';
	for(var i=0;i<str.length;i++) {
		hex += ''+str.charCodeAt(i).toString(16);
	}
	return hex;
}

function VerifyInputMsg(){
  console.log("test ")

  var msg = document.getElementById("UnVerMSG").value
  // msg = key.sigmsg
  // console.log(msg.split('\n'))
  // console.log(key.pub2)

  // var res = main.Verify(msg, key.pub2).then(function(result){
	var res = main.Verify(msg).then(function(result){
		message = result.mess ,
		KeyID = result.KeyID,
		isSigned = result.isSigned,
		error = result.error

		if (error){
			remote.dialog.showErrorBox("Message Verification Error", error)
		}

		else{

			options ={
				type: 'info',
				buttons: ["OK"],
				title: "Message Verification Success",
				message: "Message: " + message + "\nSigned with: <KeyID: " + KeyID.toString() + " >"
			}
			remote.dialog.showMessageBox(options)
		}

    return result
  });


  // console.log(sign)//this is a promise object
  // console.log(sign.signatures)
  // console.log(sign.PromiseValue)

}
