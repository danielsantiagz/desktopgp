const remote = require('electron').remote
const main = remote.require('./main.js')

function VerifyInputMsg(){
  msg = document.getElementByID("UnVerMsg")
  main.Verify(msg,)

}
