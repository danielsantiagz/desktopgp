function User (name, email, pubkey, privkey) {
    this.name = name;
    this.email = email;
    this.pubkey = pubkey;
    this.privkey = privkey;
}

function Friend (name, email, pubkey) {
    this.name = name;
    this.email = email;
    this.pubkey = pubkey;
}

function db(){

	this.insert = function(newF){
		if (localStorage.newF.email === "undefined") {
			localStorage.setItem(newF.email, newF.pubkey)
		}
		else{
			console.log('La llave existe')
		}
	}

}