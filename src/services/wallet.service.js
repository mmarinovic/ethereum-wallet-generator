const lightwallet = require('eth-lightwallet');

class WalletService {
    generate(password){
        const seedPhrase = lightwallet.keystore.generateRandomSeed();
        return new Promise((resolve, reject) => {
            lightwallet.keystore.createVault({
                password,
                seedPhrase,
                hdPathString: "m/44'/60'/0'/0"
            }, function (err, ks) {
                if(err) {
                    return reject(err);
                }
        
                ks.keyFromPassword(password, function (err, pwDerivedKey) {
                    if(err) {
                        return reject(err);
                    }
        
                    ks.generateNewAddress(pwDerivedKey);
                    const addresses = ks.getAddresses();
                    const privateKey = ks.exportPrivateKey(addresses[0], pwDerivedKey);

                    resolve({
                        privateKey,
                        seedPhrase,
                        address: addresses[0],
                    });
         
                });
            });
        })
    }
}

module.exports = WalletService;