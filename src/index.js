const Controller = require('./controller.js');
const ConsoleService = require('./services/console.service.js');
const WalletService = require('./services/wallet.service.js');

const controller = new Controller(new ConsoleService(), new WalletService());

controller.init();
