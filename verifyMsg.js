const remote = require('electron').remote
const main = remote.require('./main.js')
var key = require('./keys2.js');
var noti;
var para = document.createElement('p');
var options;

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

  var res = main.Verify(msg, key.pub2).then(function(result){
    if (result.signatures[0].valid){
      options = {
        type: "info" ,
        buttons: ["OK"],
        title: "Message Verification",
        message: "The message was signed correctly"
      }
      remote.dialog.showMessageBox(options)
      console.log(typeof result.signatures[0].keyid.bytes);
      console.log(toHex(result.signatures[0].keyid.bytes))
    }
    else {
      // options = {
      //   type: "error",
      //   title: "Message Verification" ,
      //   message: "The message was not properly signed"
      // }
      remote.dialog.showErrorBox("Message Verification Error", "The message was compromised or not signed properly")

    }
    // console.log(result)
    // console.log(result.signatures[0].valid)
    // console.log(result.signatures[0].keyid.bytes)
    // remote.dialog.showErrorBox('hello', "world")
    // remote.dialog.showErrorBox()
    return result
  });


  // console.log(sign)//this is a promise object
  // console.log(sign.signatures)
  // console.log(sign.PromiseValue)

}
