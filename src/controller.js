const colors = require('colors/safe');

class Controller {
    constructor(consoleService, walletService){
        this.consoleService = consoleService;
        this.walletService = walletService;
    }

    init(){
        this.consoleService.initPrompt(this.handleResult.bind(this));    
    }

    async handleResult({ password }){
       const { address, privateKey, seedPhrase } = await this.walletService.generate(password).catch(console.error);

       console.log("");
       console.log("🏠 Address: ", colors.blue(address));
       console.log("🔑 Private key: ", colors.magenta(privateKey));
       console.log("📝 Mnemonic: ", colors.cyan(seedPhrase));

       process.exit();
    }
}

module.exports = Controller;