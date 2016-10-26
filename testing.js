var openpgp = require('openpgp')
var llaves = require('./keys2.js')


var options, encrypted;

// var pubkey = '-----BEGIN PGP PUBLIC KEY BLOCK ... END PGP PUBLIC KEY BLOCK-----';
// var privkey = '-----BEGIN PGP PRIVATE KEY BLOCK ... END PGP PRIVATE KEY BLOCK-----';
var pubkey = llaves.pub
var privkey = llaves.priv

// console.log(pubkey)
// options = {
//     data: 'Hello, World!',                             // input as String (or Uint8Array)
//     publicKeys: openpgp.key.readArmored(pubkey).keys,  // for encryption
//     privateKeys: openpgp.key.readArmored(privkey).keys // for signing (optional)
// };

// openpgp.encrypt(options).then(function(ciphertext) {
//     encrypted = ciphertext.data; // '-----BEGIN PGP MESSAGE ... END PGP MESSAGE-----'
//     console.log(encrypted)
// });

var encrypted = "-----BEGIN PGP MESSAGE----- \
Version: OpenPGP.js v2.3.3 \
Comment: http://openpgpjs.org \
\
1DkB2jlHOVevnZ99RYRnkN8M+yNgFgh+QsMqeIUoA/sPpziqgpkCZ7LclWkV \
AVjiN3rZbRTKSqLkdhA= \
=o3fo \
-----END PGP MESSAGE-----"

options = {
    message: openpgp.message.readArmored(encrypted),     // parse armored message
    publicKeys: openpgp.key.readArmored(pubkey).keys,    // for verification (optional)
    privateKey: openpgp.key.readArmored(privkey).keys[0] // for decryption
};

openpgp.decrypt(options).then(function(plaintext) {
    console.log(plaintext.data) // 'Hello, World!'
});
