export default class Queue {
  constructor() {
    this.clientQueue = [];
  }

  addClient(client) {
    this.clientQueue.push(client);
    console.log(`Client ${client.name} added to the queue.`);
  }

  serveNextClient() {
    if (this.clientQueue.length > 0) {
      const client = this.clientQueue.shift();
      console.log('Serving next client:');
      client.displayInfo();
    } else {
      console.log('No clients in the queue.');
    }
  }

  displayQueueSize() {
    console.log(`Clients in queue: ${this.clientQueue.length}`);
  }
}
