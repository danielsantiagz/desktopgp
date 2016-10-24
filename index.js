const remote = require('electron').remote
const main = remote.require('./main.js')

// var button = document.createElement('button')
// button.addEventListener('click', () => {
//   main.openWindow()
// }, false)
// button.textContent = 'Open Window'
// document.body.appendChild(button)

function signFunc(){
	main.openWindow()
}
