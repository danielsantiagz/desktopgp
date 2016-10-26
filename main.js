const menubar = require('menubar')
const electron = require('electron')
const {app, BrowserWindow} = electron
const openpgp = require('openpgp')

// openpgp
var key = require('./keys2.js');
var enc = ''
var pubkey = key.pub
var privkey = key.priv
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
	    publicKeys: openpgp.key.readArmored(pubkey).keys
	    // passwords: ['secret stuff']              // multiple passwords possible
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

// 	var encrypted = `-----BEGIN PGP MESSAGE-----
// Version: OpenPGP.js v2.3.3
// Comment: http://openpgpjs.org
//
// wcFMA/gCEr0q9qCKAQ/8DdNc6W3f/IC/u3qeHhXRo2h+XZ7C0Z+Lg6HDrMoz
// EpW2979KUINZNs8ewq3ITDHuS1Z+gOjp/hY5Td9ya9di308CrW4x1CsimGA4
// gClLW9Xj2GqSfYbIFCJY0koQ8ma7YhK6fjuu/K5HGZhoJ3RQfk6l6HSQfKMo
// lYomsqsDnAakMai6LFYnnxUXqUPWDbraqz0EyhUoZ9NE8kjWx4XMJd5FDszS
// oJP4zpcPS15HQ3ovsQDW97rQ4yJgp6ba8LAaUKI734Sf2RBi6tYCkTG9yuDK
// HfBS6c08KHj7HAg54jbdgMO3ISCr3xKwkeOpnyOOoUCzhl5lnt28ARM1clcU
// s8S1aTxcoVx1hd8E3L04uHkB4vs+p2nuC0sLJ3T5R8KHLEHjgOIji0uInzfm
// rTpzwJkHvVS7R3GVHz1ypZ9XVgJcgP06yfJmhncvLIgcL4dCCEngbmD1ARFJ
// JwupyAZW5fGoc3n8UC1BYgjAmgofSubvIPyzpySd2iTIlArMF9G7xduuoaX0
// lqxwJhbWWYgriFSjLGD8Yc/6KsTX4KI3OiMc1gLnuFk61K6b2Brs0f4fFPol
// piYCpbIgd/49bl/tWPOBZVGt2xITPCKbUUITtHm3+icnILFdrp6enNDtzSEK
// GkVO0TATo/wids9h6uNo1J/zWiEYNc6K3yc1LVu8sJzUOQHl6cTRq30m/vml
// O2h4cCJNRiyh/92Ed4vafYJwotErZyirExzh279CEGoI9IeLII5Jx5GZY8Nl
// 1Q==
// =5nWn
// -----END PGP MESSAGE-----`
// var encrypted = "-----BEGIN PGP MESSAGE-----\
// Version: OpenPGP.js v2.3.3\
// Comment: http://openpgpjs.org\
// \
// wcFMA/gCEr0q9qCKAQ/8DdNc6W3f/IC/u3qeHhXRo2h+XZ7C0Z+Lg6HDrMoz\
// EpW2979KUINZNs8ewq3ITDHuS1Z+gOjp/hY5Td9ya9di308CrW4x1CsimGA4\
// gClLW9Xj2GqSfYbIFCJY0koQ8ma7YhK6fjuu/K5HGZhoJ3RQfk6l6HSQfKMo\
// lYomsqsDnAakMai6LFYnnxUXqUPWDbraqz0EyhUoZ9NE8kjWx4XMJd5FDszS\
// oJP4zpcPS15HQ3ovsQDW97rQ4yJgp6ba8LAaUKI734Sf2RBi6tYCkTG9yuDK\
// HfBS6c08KHj7HAg54jbdgMO3ISCr3xKwkeOpnyOOoUCzhl5lnt28ARM1clcU\
// s8S1aTxcoVx1hd8E3L04uHkB4vs+p2nuC0sLJ3T5R8KHLEHjgOIji0uInzfm\
// rTpzwJkHvVS7R3GVHz1ypZ9XVgJcgP06yfJmhncvLIgcL4dCCEngbmD1ARFJ\
// JwupyAZW5fGoc3n8UC1BYgjAmgofSubvIPyzpySd2iTIlArMF9G7xduuoaX0\
// lqxwJhbWWYgriFSjLGD8Yc/6KsTX4KI3OiMc1gLnuFk61K6b2Brs0f4fFPol\
// piYCpbIgd/49bl/tWPOBZVGt2xITPCKbUUITtHm3+icnILFdrp6enNDtzSEK\
// GkVO0TATo/wids9h6uNo1J/zWiEYNc6K3yc1LVu8sJzUOQHl6cTRq30m/vml\
// O2h4cCJNRiyh/92Ed4vafYJwotErZyirExzh279CEGoI9IeLII5Jx5GZY8Nl\
// 1Q==\
// =5nWn\
// -----END PGP MESSAGE-----"

// var encrypted = ['-----BEGIN PGP MESSAGE-----',
// 'Version: OpenPGP.js v2.3.3',
// 'Comment: http://openpgpjs.org',
// '',
// '1DkB2jlHOVevnZ99RYRnkN8M+yNgFgh+QsMqeIUoA/sPpziqgpkCZ7LclWkV',
// 'AVjiN3rZbRTKSqLkdhA=',
// '=o3fo',
// '-----END PGP MESSAGE-----'].join('\n');

var encrypted = ['-----BEGIN PGP MESSAGE-----',
'Version: OpenPGP.js v2.3.3',
'Comment: http://openpgpjs.org',
'',
'wcFMA/gCEr0q9qCKAQ/8CH+t1KeRgHC0sK+lVfUgO2Z+EQRNN2fG2nB9cZiG',
'qcoeOGeKiURXwWFW72b/55CF7WSVe44T/5v/FzdDNv6mUYc+F9UfBmp/HY62',
'/N3m0Bahh19e2UpXPWt51Ys3OE0qCGmMBlVX1plCgh/bMsfsOLpgCvsHEnOu',
'QLg59Gr6mhF+ullVwrbwahj8vvbMhndp0xBhSVPfo+h/dCpJbdA359OsiAsO',
'rR/YP4aJdcy2Pu5D0Jp6rRYd1P81iZ60CEQsijrouQFeQcX1PnKUkWh/XWE7',
'cvSxYnu1+3mNPiESXTNsMqNxiDOeqc2vK4ek8KLB8KPPMQ9LhsQycFKKaLJM',
'Jj3oyadF9FxJPofoxDW0EJ2rUzViW0J/ZwPJGQn+nQbirra0fywIFUL+SPc+',
'BB3ZDDd6vmf+QrJGiyFkMeuCckDv0ogEbdZQH5SNBs+52g3Wj1o9/3kmVbF6',
'XMrMRHbmRdCaSewxOzHig2pUhtqNM7S1J8WxmrIc+rIEU1oKGOok3NOte5Py',
'0cVT+zfa0/F1nHYlqUmNfyrYDdbUmm7GVr+QrqLftxc10YtjDIMLkZakCWeM',
'r4RmiMAINByirOjQIS/q7RSuOkqlCl+o4W5L47BuZbLDpLo9LC1H03DqLFcQ',
'71It0ru3IstDu7Lz0liAyuDjvpnLoRig7cE/zvH1wOTDLgQJAwggpN6siFtR',
'7GCTQhMZyP+nIGeU9OzeUftJO4oYLU4OXDBqscNcb/uYrenUNgGEeIw8trq4',
'6op1ngDQ29BVY/NeHEuGOM6msxUFwSTP9TSi37Nh674xTh4a4q+ayt+E33bK',
'Hg==',
'=xGsm',
'-----END PGP MESSAGE-----'].join('\n');

	options = {
	    message: openpgp.message.readArmored(encrypted),     // parse armored message
	    // publicKeys: openpgp.key.readArmored(pubkey).keys,    // for verification (optional)
	    privateKey: openpgp.key.readArmored(privkey).keys[0], // for decryption
	    password: 'secret stuff'
	};

	console.log('de')

	openpgp.decrypt(options).then(function(plaintext) {
	    console.log('antes')
	    console.log(plaintext.data)
	    console.log('dsps')
	    return plaintext.data; // 'Hello, World!'
	});
}

// }
// encrypted = `-----BEGIN PGP MESSAGE-----
// Version: OpenPGP.js v2.3.3
// Comment: http://openpgpjs.org
//
// wcFMA/gCEr0q9qCKAQ/8DdNc6W3f/IC/u3qeHhXRo2h+XZ7C0Z+Lg6HDrMoz
// EpW2979KUINZNs8ewq3ITDHuS1Z+gOjp/hY5Td9ya9di308CrW4x1CsimGA4
// gClLW9Xj2GqSfYbIFCJY0koQ8ma7YhK6fjuu/K5HGZhoJ3RQfk6l6HSQfKMo
// lYomsqsDnAakMai6LFYnnxUXqUPWDbraqz0EyhUoZ9NE8kjWx4XMJd5FDszS
// oJP4zpcPS15HQ3ovsQDW97rQ4yJgp6ba8LAaUKI734Sf2RBi6tYCkTG9yuDK
// HfBS6c08KHj7HAg54jbdgMO3ISCr3xKwkeOpnyOOoUCzhl5lnt28ARM1clcU
// s8S1aTxcoVx1hd8E3L04uHkB4vs+p2nuC0sLJ3T5R8KHLEHjgOIji0uInzfm
// rTpzwJkHvVS7R3GVHz1ypZ9XVgJcgP06yfJmhncvLIgcL4dCCEngbmD1ARFJ
// JwupyAZW5fGoc3n8UC1BYgjAmgofSubvIPyzpySd2iTIlArMF9G7xduuoaX0
// lqxwJhbWWYgriFSjLGD8Yc/6KsTX4KI3OiMc1gLnuFk61K6b2Brs0f4fFPol
// piYCpbIgd/49bl/tWPOBZVGt2xITPCKbUUITtHm3+icnILFdrp6enNDtzSEK
// GkVO0TATo/wids9h6uNo1J/zWiEYNc6K3yc1LVu8sJzUOQHl6cTRq30m/vml
// O2h4cCJNRiyh/92Ed4vafYJwotErZyirExzh279CEGoI9IeLII5Jx5GZY8Nl
// 1Q==
// =5nWn
// -----END PGP MESSAGE-----`
// function Decrypt(msg,privateKey){
//   encrypted = msg
//   options = {
//     message: openpgp.message.readArmored(encrypted),
//     publicKeys: openpgp.key.readArmored(pubkey).keys,
//     privateKey: openpgp.key.readArmored(privkey).keys[0]
//
//   };
//   openpgp.decrypt(options).then(function(plaintext) {
//     console.log('antes')
//     console.log(plaintext.data)
//     console.log('dsps')
//     return plaintext.data;
//   });
//
// }
//
// console.log(Decrypt(encrypted,privkey))
