const prompt = require('prompt');

class ConsoleService{
    constructor(){
        this.promptItems = [{
            description: 'Please enter a new password for your wallet',
            name: 'password',
            hidden: true
        }]
    }

    initPrompt(callback) {
        prompt.start();
        prompt.get(this.promptItems, (_, result) => {
          callback(result);
        });
      }
}

module.exports = ConsoleService