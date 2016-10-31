const remote = require('electron').remote
const main = remote.require('./main.js')

// var button = document.createElement('button')
// button.addEventListener('click', () => {
//   main.openWindow()
// }, false)
// button.textContent = 'Open Window'
// document.body.appendChild(button)

// function signFunc(){
// 	main.openWindow()
// }


function encryptFunc(){
	main.encrypt('msg', 'publicKey')
}

function decryptFunc(){
	main.Decrypt('msg', 'privateKey')
}

function signFunc(){
	main.Sign('msg', 'privateKey')
}

function verifyFunc() {
	// main.Verify('msg', 'publicKey')
	main.openVerifyWindow() 

}

function KeyManageFunc(){
	main.openWindow()
}

function getPublicKeys(){
	main.openWindow('publicKeys.html', false)
}

function newWindow(name){
	main.openWindow(name, true)
}

function importKey(){
	key = document.getElementById("key").value;
	main.importKey(key)
}