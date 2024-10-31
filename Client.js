export default class Client {
  constructor(id, name, serviceType) {
    this.id = id;
    this.name = name;
    this.serviceType = serviceType;
  }

  displayInfo() {
    console.log(
      `Client ID: ${this.id}, Name: ${this.name}, Service: ${this.serviceType}`,
    );
  }
}
