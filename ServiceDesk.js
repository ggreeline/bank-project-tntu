export default class ServiceDesk {
  constructor(department) {
    this.department = department;
  }

  callNextClient(queue) {
    if (this.department.canServe()) {
      queue.serveNextClient();
      this.department.currentlyServing++;
    } else {
      console.log('Department is busy. Please wait.');
    }
  }
}
