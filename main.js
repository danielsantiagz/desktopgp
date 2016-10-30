const menubar = require('menubar')
const electron = require('electron')
const {app, BrowserWindow} = electron
const openpgp = require('openpgp')

// openpgp

var keyring = new openpgp.Keyring()

var key = require('./keys2.js');
var enc = ''
var pubkey = key.pub
var privkey = key.priv
var pubkey2 = key.pub2
var privkey2 = key.priv2
// console.log(pubkey)
var msg = "hola"

openpgp.initWorker({ path:'openpgp.worker.js' }) // set the relative web worker path
openpgp.config.aead_protect = true // activate fast AES-GCM mode (not yet OpenPGP standard)

// /openpgp

var tray = electron.Tray
var mb = menubar()
mb.setOption('index', `file://${__dirname}/index.html`)

mb.on('ready', function ready () {


     if (process.platform === "linux"){
       mb.tray.setToolTip('show app')
     }
  	console.log('app is ready')
  	// your app code here
})

app.on('ready', () => {
  let win = new BrowserWindow({width:800, height:600})
  win.loadURL(`file://${__dirname}/index.html`)
  win.webContents.openDevTools()
})

exports.openWindow = function(name){
	let win = new BrowserWindow({width:400, height:200})
	win.loadURL(`file://${__dirname}/`+name)
	win.webContents.openDevTools()
}
exports.openVerifyWindow = () => {
  let win = new BrowserWindow({width:800, height:600})
  win.loadURL(`file://${__dirname}/verifyMsg.html`)
}
exports.encrypt = function(msg, publicKey){
	console.log('hola')

	// var options, encrypted;
	// // var privkey = '-----BEGIN PGP PRIVATE KEY BLOCK ... END PGP PRIVATE KEY BLOCK-----';

	// options = {
	//     data: 'Hello, World!',                             // input as String (or Uint8Array)
	//     publicKeys: openpgp.key.readArmored(pubkey).keys,  // for encryption
	//     // privateKeys: openpgp.key.readArmored(privkey).keys // for signing (optional)
	// };

	// openpgp.encrypt(options).then(function(ciphertext) {
	//     encrypted = ciphertext.data; // '-----BEGIN PGP MESSAGE ... END PGP MESSAGE-----'
	// 	console.log('encrypted')
	// 	console.log(encrypted);
	// });


	var options, encrypted;

	options = {
	    data: 'Hola Mundo', // input as Uint8Array (or String)
	    publicKeys: openpgp.key.readArmored(pubkey).keys,
	    passwords: ['secret stuff']              // multiple passwords possible
	    // armor: false                              // don't ASCII armor (for Uint8Array output)
	};

	openpgp.encrypt(options).then(function(ciphertext) {
	    encrypted = ciphertext.data; // get raw encrypted packets as Uint8Array
	    console.log(encrypted)
	    options = {
	        message: openpgp.message.readArmored(encrypted), // parse encrypted bytes
	        privateKey: openpgp.key.readArmored(privkey).keys[0],
	        password: 'secret stuff'                 // decrypt with password
	        // format: 'binary'                          // output as Uint8Array
	    };

	    openpgp.decrypt(options).then(function(plaintext) {
	        console.log (plaintext.data);
	        return plaintext.data // Uint8Array([0x01, 0x01, 0x01])
	    });

	});

}

exports.Decrypt = function(msg, privateKey){
	console.log('decrypt')
	// console.log(Object.getOwnPropertyNames(privkey2));
	console.log(openpgp.key.readArmored(privkey2).keys[0].decryptKey('jon'))
	console.log(openpgp.key.readArmored(privkey2).keys[0])
	// var encrypted = key.enc

	// options = {
	//     message: openpgp.message.readArmored(encrypted),     // parse armored message
	//     privateKey: openpgp.key.readArmored(privkey).keys[0], // for decryption
	//     password: 'secret stuff'
	// };

	// console.log('de')

	// openpgp.decrypt(options).then(function(plaintext) {
	//     console.log('antes')
	//     console.log(plaintext.data)
	//     console.log('dsps')
	//     return plaintext.data; // 'Hello, World!'
	// });

	// console.log('antes')
	// generate()
}

exports.generate = function(){
	console.log('entre')
	var options = {
	    userIds: [{ name:'Jon papa', email:'jonpapa@example.com' }], // multiple user IDs
	    numBits: 1024,                                            // RSA key size
	    passphrase: 'jon'         // protects the private key
	};

	openpgp.generateKey(options).then(function(key) {
	    var privkey = key.privateKeyArmored; // '-----BEGIN PGP PRIVATE KEY BLOCK ... '
	    var pubkey = key.publicKeyArmored;   // '-----BEGIN PGP PUBLIC KEY BLOCK ... '
	    console.log('yei')
	    console.log(privkey)
	    console.log(pubkey)
	});

}

//||||||||||||||||||||PRELIMINAR TESTING OF THE SIGNING FUNCTION (not working)
// // Sign function  ..........................................//
// options= {
//   data: "hola",
//   privateKeys: openpgp.key.readArmored(privkey2).keys[0],
//   armor: true
// };
// // console.log(privkey2)
// // console.log(options.privateKeys)
// // console.log(typeof(options.privateKeys))
// // var testKey = openpgp.key.readArmored(privkey2).keys[0]
// // console.log(openpgp.decryptKey(testKey,"jon"))
// openpgp.sign(options).then(function(signed){
//   console.log("signing in main")
//   console.log(signed.data)
//   return signed.data
// });

//This is the function that takes care of signing
//messages using the privatekey
exports.Sign = function(msg, privateKey){
  console.log("signing")

  options ={//variable containing the options for the signing function
    data: "hola", // message to be signed
    privateKeys: openpgp.key.readArmored(privkey2).keys, //read the key from armor
    armor: true // true if you want ascii armored, false for message object
    // armor: false
  };
  console.log(options.privateKeys[0].decrypt('jon')) //aparently the way to decrypt private keys

  //random debugging messages
  console.log("/////////////after the test/////////////")
  console.log(options.privateKeys)

//|||||||||||||||ACTUALLY DOING THE SIGNING OF THE MESSAGE
  openpgp.sign(options).then(function(signedMessage){//where the magic happens
    console.log('before signing') // random debug comment
    console.log(signedMessage.data) // random debug comment (to se the actuall result of the function)
    console.log('after signing')//random debug comment
    // msg = signedMessage.data // using this value for the Verify function
    return signedMessage.data
  });
}

// console.log(openpgp.message.readArmored(sigmsg))
// function sign_message()
//   sigmsg = sign_message(pubkey2, privkey2, "jon", "hello")
//   console.log(sigmsg)

exports.getPublicKeys = function(){
	// key = openpgp.key.readArmored(pubkey).keys[0]
	// console.log(key.primaryKey.getFingerprint());
	// console.log(key.primaryKey.created);
	// console.log(key.primaryKey.getKeyId().toHex())


    var publicKeys = keyring.publicKeys.keys

	 // var localstore = null;
	 // var pgpKeyring = new openpgp.Keyring(localstore);
	 // // console.log(key.getUserIds()[0])
	 // // console.log(pgpKeyring.publicKeys)
	 // pgpKeyring.publicKeys.importKey(pubkey)
	 // console.log('dsps')
	 // console.log(pgpKeyring.getAllKeys())
	 // pgpKeyring.store()
	return publicKeys
}

exports.openWindow = function(name){
	let win = new BrowserWindow({width:400, height:200})
	win.loadURL(`file://${__dirname}/`+name)
	win.webContents.openDevTools()
}

exports.importPublicKeys = function(publicKey){
	keyring.publicKeys.importKey(publicKey)
	keyring.store()


	// Esto te imprime todos los id de los public key que están guardados

	// keyring.publicKeys.keys.forEach(function(k){
		// console.log(k.primaryKey.getKeyId().toHex())
	// })

//|||||||||||||Verify function
// var message = openpgp.message.readArmored(key.sigmsg)

exports.Verify= function (msg, publicKey){
  console.log("verifying")
  options = {
    publicKeys: openpgp.key.readArmored(pubkey2).keys,
    message: openpgp.cleartext.readArmored(key.sigmsg)
    // message: openpgp.createMessage(openpgp.message.readArmored(key.sigmsg))
    // message: key.sigmsg
  }
  // console.log(options.publicKeys)
  // console.log(key.sigmsg)
  console.log(options.message)
  openpgp.verify(options).then(function(verified){
    // console.log("before")//debuggin message
    // console.log(verified.data)//debuggin message
    console.log(verified)//basically a dictionary containing the message, keyid and valid (boolean)
    console.log(verified.signatures[0].valid)//acces the boolean that tells you if its a valid signature
    console.log(verified.signatures[0].keyid)//acces the keyid for the key used to sign the message
    // console.log('data:')//debuggin message
    // console.log(verified.data)//debuggin message
    // console.log('signatures: ')//debuggin message
    // console.log(verified.signatures.valid)//debuggin message
    // console.log(verified.signatures.keyid)//debuggin message
    console.log("after")
    return verified.data
  })
}
