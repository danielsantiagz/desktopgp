const openpgp = require('openpgp')
openpgp.initWorker({ path:'openpgp.worker.js' }) // set the relative web worker path
openpgp.config.aead_protect = true // activate fast AES-GCM mode (not yet OpenPGP standard)
// // ##########################################
// // GENERATING KEYS
// // ##########################################
// my_user_id = "John Test <john_test@someserver.com>";
// my_passphrase = "123qwe"; // Key Pairs is always protected with a password to safety.

// // var options = {
// //     userIds: [{ name:'Jon Smith', email:'jon@example.com' }], // multiple user IDs
// //     numBits: 1024,                                            // RSA key size
// //     passphrase: '123qwe'         // protects the private key
// // };

// // openpgp.generateKey(options).then(function(key) {
// //     var privkey = key.privateKeyArmored; // '-----BEGIN PGP PRIVATE KEY BLOCK ... '
// //     var pubkey = key.publicKeyArmored;   // '-----BEGIN PGP PUBLIC KEY BLOCK ... '
// // });

// my_key = openpgp.generateKey({numBits: 1024, userId: my_user_id, passphrase: my_passphrase});

// // My Private Key String
// console.log("My private key:\n\n" + my_key.privateKeyArmored + "\n\n");

// // My Public Key String
// console.log("My public key:\n\n" + my_key.publicKeyArmored + "\n\n");


// // ##########################################
// // ENCRYPTING MESSAGES
// // ##########################################
// // Let's supose that I sent my Public Key to a friend and he wants to encrypt a message to me.
// // First I will store my public key string in a variable to make things clear.
// my_public_key = my_key.publicKeyArmored; // It's the "John Test <john_test@someserver.com>" key pair.

// // My friend has access to that string, so he will use it to encrypt the message.
// // But now he needs to create a OpenPGP.js Object of that string by reading it in this way:
// john_public = openpgp.key.readArmored(my_public_key).keys;
// // So now the whole OpenPGP.js library is available inside this object.
// // We're going to use the library to encrypt a message with this key.
// // Here is the message he wants to send me:
// raw_message = "Hello, how are you? Did you changed your phone number?";
// // And here is how to encrypt it:
// encrypted_message = openpgp.encrypt(john_public, raw_message);
// // Check it on Console:
// console.log("Encrypted message:\n\n" + encrypted_message + "\n\n");


// // ##########################################
// // DECRYPTING MESSAGES
// // ##########################################
// // Now I need to decrypt it once I have my private key stored in my key pair "my_key".
// // But first I will create a OpenPGP.js Object of the encrypted message:
// oepnpgp_encrypted_message = openpgp.message.readArmored(encrypted_message); // It reads encrypted strings.
// // In order to have access to my private key object I need to "unlock" it by using the password defined before:
// my_key.key.decrypt(my_passphrase); // It's really needed by the OpenPGP.js security standards.
// // Finaly use my key pair to decrypt it, note I need to use "my_key.key" to reference my private key.
// decrypted_message = openpgp.decrypt(my_key.key, oepnpgp_encrypted_message);
// // Check it on Console:
// console.log("Decrypted message:\n\n" + decrypted_message + "\n\n");

console.log(openpgp.hasPrivateKey())