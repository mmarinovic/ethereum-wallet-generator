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

       console.log("Address: ", address);
       console.log("Private key: ", privateKey);
       console.log("Memonic: ", seedPhrase);

       process.exit();
    }
}

module.exports = Controller;