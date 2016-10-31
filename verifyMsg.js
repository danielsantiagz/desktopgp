const remote = require('electron').remote
const main = remote.require('./main.js')
var key = require('./keys2.js');

function VerifyInputMsg(){
  console.log("test ")
  var msg = document.getElementById("UnVerMSG").value
  msg = key.sigmsg
  // console.log(msg.split('\n'))
  var sign = main.Verify(msg,key.pubkey2)

}
