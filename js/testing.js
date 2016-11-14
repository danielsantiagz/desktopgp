var openpgp = require('openpgp')
openpgp.initWorker({ path:'openpgp.worker.js' })
// var llaves = require('./keys2.js')



// var options, encrypted;

// // var pubkey = '-----BEGIN PGP PUBLIC KEY BLOCK ... END PGP PUBLIC KEY BLOCK-----';
// // var privkey = '-----BEGIN PGP PRIVATE KEY BLOCK ... END PGP PRIVATE KEY BLOCK-----';
// var pubkey = llaves.pub
// var privkey = llaves.priv

// // console.log(pubkey)

// options = {
//     data: 'Hello, World!',                             // input as String (or Uint8Array)
//     publicKeys: openpgp.key.readArmored(pubkey).keys,  // for encryption
//     privateKeys: openpgp.key.readArmored(privkey).keys // for signing (optional)
// };

// //prueba pendeja
// // encrypted = openpgp.encrypt(options);
// // console.log(encrypted)
// // console.log(openpgp.message.readArmored(encrypted))


// // openpgp.encrypt(options).then(function(ciphertext) {
// //     console.log("hello")
// //     encrypted = ciphertext.data; // '-----BEGIN PGP MESSAGE ... END PGP MESSAGE-----'
// //     console.log(encrypted)
// // });


// // options = {
// //     message: openpgp.message.readArmored(encrypted),     // parse armored message
// //     publicKeys: openpgp.key.readArmored(pubkey).keys,    // for verification (optional)
// //     privateKey: openpgp.key.readArmored(privkey).keys[0] // for decryption
// // };
// //
// // openpgp.decrypt(options).then(function(plaintext) {
// //     console.log(plaintext.data) // 'Hello, World!'
// // });
// //
// // var str = `Hello
// // world`;
// // console.log(`hello
// //   world`);

// var encrypted = ['-----BEGIN PGP MESSAGE-----',
// 'Version: OpenPGP.js v2.3.3',
// 'Comment: http://openpgpjs.org',
// '',
// '1DkB2jlHOVevnZ99RYRnkN8M+yNgFgh+QsMqeIUoA/sPpziqgpkCZ7LclWkV',
// 'AVjiN3rZbRTKSqLkdhA=',
// '=o3fo',
// '-----END PGP MESSAGE-----'].join('\n');

// options = {
//     message: openpgp.message.readArmored(encrypted),     // parse armored message
//     publicKeys: openpgp.key.readArmored(pubkey).keys,    // for verification (optional)
//     privateKey: openpgp.key.readArmored(privkey).keys[0] // for decryption
// };

// openpgp.decrypt(options).then(function(plaintext) {
//     console.log(plaintext.data) // 'Hello, World!'
// });
// console.log(encrypted)

	// var options = {
	//     userIds: [{ name:'Jon papa', email:'jonpapa@example.com' }], // multiple user IDs
	//     numBits: 1024,                                            // RSA key size
	//     passphrase: 'jon'         // protects the private key
	// };
	//
	// openpgp.generateKey(options).then(function(key) {
	//     var privkey = key.privateKeyArmored; // '-----BEGIN PGP PRIVATE KEY BLOCK ... '
	//     var pubkey = key.publicKeyArmored;   // '-----BEGIN PGP PUBLIC KEY BLOCK ... '
	//     console.log('yei')
	//     console.log(privkey)
	//     console.log(pubkey)
	// });
