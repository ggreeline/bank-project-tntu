export default class BankDepartment {
  constructor(name, workingHours) {
    this.name = name;
    this.workingHours = workingHours;
    this.currentlyServing = 0;
    this.maxClients = 2;
  }

  canServe() {
    return this.currentlyServing < this.maxClients;
  }
}
