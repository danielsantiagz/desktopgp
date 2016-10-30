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

exports.openWindow = () => {
  let win = new BrowserWindow({width:400, height:200})
  win.loadURL(`file://${__dirname}/bear.html`)
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


// Sign function  ..........................................//
options= {
  data: "hola",
  privateKeys: openpgp.key.readArmored(privkey2).keys[0],
  armor: true
};
// console.log(privkey2)
// console.log(options.privateKeys)
// console.log(typeof(options.privateKeys))
// var testKey = openpgp.key.readArmored(privkey2).keys[0]
// console.log(openpgp.decryptKey(testKey,"jon"))
openpgp.sign(options).then(function(signed){
  console.log("signing in main")
  console.log(signed.data)
  return signed.data
});

exports.Sign = function(msg, privateKey){
  console.log("signing")

  options ={
    data: "hola",
    privateKeys: openpgp.key.readArmored(privkey2).keys,
    armor: true
  };

// var unlockOptions={
//   privateKeys: options.privateKeys,
//   passphrase: 'jon'
// }
// openpgp.decryptKey(unlockOptions).then(function(unlockedKey){
//   console.log("unlocking key")
//   console.log(unlockedKey.data)
//   return unlockedKey.data
// })
  openpgp.sign(options).then(function(signedMessage){
    console.log('before signing')
    console.log(signedMessage.data)
    console.log('after signing')
    return signedMessage.data
  });
  console.log

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
}