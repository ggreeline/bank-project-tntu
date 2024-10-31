import BankDepartment from './BankDepartment.js';
import Queue from './Queue.js';
import ServiceDesk from './ServiceDesk.js';

export default class Bank {
  constructor() {
    this.queue = new Queue();
    this.departments = [
      new BankDepartment('Deposit', { start: '09:00', end: '17:00' }),
      new BankDepartment('Credit', { start: '09:00', end: '17:00' }),
    ];
  }

  addClient(client) {
    this.queue.addClient(client);
  }

  serveClients() {
    for (const department of this.departments) {
      const serviceDesk = new ServiceDesk(department);
      serviceDesk.callNextClient(this.queue);
    }
  }
}
