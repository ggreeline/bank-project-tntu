import Bank from './Bank.js';
import Client from './Client.js';
const bank = new Bank();

bank.addClient(new Client(1, 'John Doe', 'Deposit'));
bank.addClient(new Client(2, 'Jane Smith', 'Credit'));

bank.queue.displayQueueSize();
bank.serveClients();
bank.queue.displayQueueSize();
