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
mb.setOption('index', `file://${__dirname}/../templates/index.html`)
mb.setOption('width', 200)
mb.setOption('height', 328)

mb.on('ready', function ready () {


     if (process.platform === "linux"){
       mb.tray.setToolTip('show app')
     }
    console.log(mb.tray)
  	console.log('app is ready')
  	// your app code here
})

let win;

app.on('ready', () => {
  win = new BrowserWindow({width:800, height:600, show:false})
  win.loadURL(`file://${__dirname}/../templates/importKey.html`)
  win.webContents.openDevTools()

  win.on('close', (e) => {

    //This will prevent the window to be destroyed
    e.preventDefault()

    // instead we hide the window for further use
    win.hide()
  })

})

exports.openWindow = function(name, devTools){
  win.loadURL(`file://${__dirname}/../templates/`+name)
  win.once('ready-to-show', () => {
    win.show()
  })

  if (devTools) {
    win.webContents.openDevTools()
  };
}

exports.quit = function(){
  win.destroy()
  app.quit()
}

exports.show = function(){
  win.show()
}

exports.hide = function(){
  main.hide()
}

exports.encrypt = function(msg, publicKeyId){
	console.log('encrypt')

	var publicKey = keyring.publicKeys.getForId(publicKeyId)
	var options, encryptedMsg;

	options = {
	    data: msg, // input as Uint8Array (or String)
	    publicKeys: publicKey
	    // passwords: ['secret stuff']              // multiple passwords possible
	    // armor: false                              // don't ASCII armor (for Uint8Array output)
	};

	encryptedMsg = openpgp.encrypt(options).then(function(ciphertext) {
	    return ciphertext.data; // get raw encrypted packets as Uint8Array
	});

	return encryptedMsg

}

exports.decrypt = function(msg, passphrase){
	console.log('decrypt')
	var privateKeys = keyring.privateKeys.keys
	var decryptedMsg;

	privateKeys.forEach(function(key){
		key.decrypt(passphrase)
		// console.log(key.primaryKey.getKeyId().toHex())
		options = {
		    message: openpgp.message.readArmored(msg),     // parse armored message
		    privateKey: key // for decryption
		};

		decryptedMsg = openpgp.decrypt(options).then(function(plaintext) {
		    key.encrypt(passphrase);

		    return {
		    	decryptedMsg: plaintext.data,
		    	error: null
		    } // 'Hello, World!'

		}, function (error) {
    		return {
    			decryptedMsg: msg,
    			error: error
    		}
		});


	})

	return decryptedMsg
}

exports.generate = function(name, email, passphrase){
	console.log('entre')
	var options = {
	    userIds: [{ name:name, email:email }], // multiple user IDs
	    numBits: 1024,                                            // RSA key size
	    passphrase: passphrase         // protects the private key
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
// var pass = 'jon'
// console.log(keyring.privateKeys.keys)
exports.Sign = function(msg, privateKey, password){
  console.log("signing")

  options ={//variable containing the options for the signing function
    // data: "hola", // message to be signed
    // privateKeys: openpgp.key.readArmored(privkey2).keys, //read the key from armor
    data: msg,
    // privateKeys: openpgp.key.readArmored(privateKey).keys,
    privateKeys: keyring.privateKeys.getForId(privateKey),
    armor: true // true if you want ascii armored, false for message object
    // armor: false
  };
  options.privateKeys.decrypt(password)
  console.log(options.privateKeys)

  // console.log(options.privateKeys[0].decrypt('jon')) //aparently the way to decrypt private keys
  // options.privateKeys[0].decrypt(password)
  //random debugging messages
  console.log("/////////////after the test/////////////")
  console.log(options.privateKeys)

//|||||||||||||||ACTUALLY DOING THE SIGNING OF THE MESSAGE
  var signed = openpgp.sign(options).then(function(signedMessage){//where the magic happens
    console.log('before signing') // random debug comment
    console.log(signedMessage.data) // random debug comment (to se the actuall result of the function)
    console.log('after signing')//random debug comment
    // msg = signedMessage.data // using this value for the Verify function
    return {
      msg : signedMessage.data,
      error: null
    }
  });
  return signed
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
exports.getPrivateKeys = function(){
  var privateKeys = keyring.privateKeys.keys
  return privateKeys
}

exports.importKey = function(key){
	console.log('importKey');
	armored = openpgp.key.readArmored(key).keys[0]
	if (armored.isPublic()) {
		keyring.publicKeys.importKey(key)
	}
	else if(armored.isPrivate()){
		keyring.privateKeys.importKey(key)
	}
	// armored = openpgp.key.readArmored(key).keys[0]
	// console.log(armored.isPublic())
	// keyring.publicKeys.importKey(publicKey)
	keyring.store()

	// Esto te imprime todos los id de los public key que están guardados

	// keyring.publicKeys.keys.forEach(function(k){
	// 	console.log(k.primaryKey.getKeyId().toHex())
	// })
}

//|||||||||||||Verify function
// var message = openpgp.message.readArmored(key.sigmsg)
// console.log(openpgp.cleartext.readArmored(key.sigmsg).packets[0].issuerKeyId)
// console.log(key.sigmsg)
exports.Verify= function (msg){
  console.log("verifying")
  // console.log(openpgp.key.readArmored(publicKey).keys)
  // console.log()
  // console.log(openpgp.cleartext.readArmored(msg))
  // console.log(openpgp.cleartext.readArmored(msg).packets[0].issuerKeyId.bytes)
  // var SigningKey = openpgp.cleartext.readArmored(msg).packets[0].issuerKeyId.bytes
  var SigningKey = openpgp.cleartext.readArmored(msg).packets[0].issuerKeyId.toHex()
  console.log(SigningKey)
  options = {
    // publicKeys: openpgp.key.readArmored(publicKey).keys,
    // publicKeys: openpgp.key.readArmored(pubkey2).keys,
    publicKeys: keyring.publicKeys.getForId(SigningKey),
    message: openpgp.cleartext.readArmored(msg)
    // message: openpgp.cleartext.readArmored(key.sigmsg)
  }
  console.log(options.publicKeys)
  // console.log(key.sigmsg)
  // console.log(options.message)
  var ver = openpgp.verify(options).then(function(verified){
    // console.log("before")//debuggin message
    // console.log(verified.data)//debuggin message
    // console.log(verified)//basically a dictionary containing the message, keyid and valid (boolean)
    console.log(verified.signatures[0].valid)//acces the boolean that tells you if its a valid signature
    console.log(verified.signatures[0].keyid)//acces the keyid for the key used to sign the message
    // console.log('data:')//debuggin message
    // console.log(verified.data)//debuggin message
    // console.log('signatures: ')//debuggin message
    // console.log(verified.signatures.valid)//debuggin message
    // console.log(verified.signatures.keyid)//debuggin message
    console.log("after")
    return {
      mess: verified.data,
      KeyID: verified.signatures[0].keyid.toHex() ,
      isSigned: verified.signatures[0].valid,
      error: null
    }
  }, function(error){
    return {
      mess: msg,
      KeyID: verified.signatures[0].keyid.toHex() ,
      isSigned: null,
      error: error

    }
  })
  return ver ;
}
