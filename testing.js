// var openpgp = require('openpgp')
// var key = require('./keys.js')
//
//
// var options, encrypted;
//
// // var pubkey = '-----BEGIN PGP PUBLIC KEY BLOCK ... END PGP PUBLIC KEY BLOCK-----';
// // var privkey = '-----BEGIN PGP PRIVATE KEY BLOCK ... END PGP PRIVATE KEY BLOCK-----';
// var pubkey = key.pubkey
// var privkey = key.privkey
// options = {
//     data: 'Hello, World!',                             // input as String (or Uint8Array)
//     publicKeys: openpgp.key.readArmored(pubkey).keys,  // for encryption
//     privateKeys: openpgp.key.readArmored(privkey).keys // for signing (optional)
// };
//
// openpgp.encrypt(options).then(function(ciphertext) {
//     encrypted = ciphertext.data; // '-----BEGIN PGP MESSAGE ... END PGP MESSAGE-----'
//     console.log(encrypted)
// });
//
// options = {
//     message: openpgp.message.readArmored(encrypted),     // parse armored message
//     publicKeys: openpgp.key.readArmored(pubkey).keys,    // for verification (optional)
//     privateKey: openpgp.key.readArmored(privkey).keys[0] // for decryption
// };
//
// openpgp.decrypt(options).then(function(plaintext) {
//     return plaintext.data; // 'Hello, World!'
// });
//
// var str = `Hello
// world`;
console.log(`hello
  world`); 
