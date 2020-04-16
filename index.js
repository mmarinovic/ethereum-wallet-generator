const lightwallet = require('eth-lightwallet');
const prompt = require('prompt');

function generateNewWallet(password){

    var seedPhrase = lightwallet.keystore.generateRandomSeed();

    lightwallet.keystore.createVault({
        password: password,
        seedPhrase: seedPhrase,
        hdPathString: "m/44'/60'/0'/0"
    }, function (err, ks) {
        if(err) throw err;

        ks.keyFromPassword(password, function (err, pwDerivedKey) {
            if (err) throw err;

            ks.generateNewAddress(pwDerivedKey);
            var addresses = ks.getAddresses();

            var address = addresses[0];
            var privateKey = ks.exportPrivateKey(addresses[0], pwDerivedKey);

            console.log("Address: ", address);
            console.log("Private key: ", privateKey);
            console.log("Memonic: ", seedPhrase);
        });
    });
}

prompt.start();
 
prompt.get({
    description: 'Please enter a new password for your wallet',
    name: 'password',
    required: true,
    hidden: true
}, function(_, result) {
    generateNewWallet(result.password);
});

