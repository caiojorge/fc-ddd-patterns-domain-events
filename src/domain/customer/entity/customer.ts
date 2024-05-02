import { AgreggateRoot } from "../../@shared/domain/aggregate-root";
import EventDispatcher from "../../@shared/event/event-dispatcher";
import CustomerChangeAddressEvent from "../event/customer-change-address";
import CustomerCreatedEvent from "../event/customer-created";
import EnviaConsoleLogHandler from "../event/handler/envia-console-log.handler";
import EnviaConsoleLog1Handler from "../event/handler/envia-console-log1.handler";
import EnviaConsoleLog2Handler from "../event/handler/envia-console-log2.handler";
import Address from "../value-object/address";
//import { CustomerCreated } from "./customer-created.event";
//import { CustomerNameChanged } from "./customer-name-changed.event";
//extends AgreggateRoot
export default class Customer  {
  private _id: string;
  private _name: string = "";
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints: number = 0;
  //private _events: any[] = [];

  constructor(id: string, name: string) {
    //super()
    this._id = id;
    this._name = name;
    this.validate();
  }

  static create(id: string, name: string) {
    const customer = new Customer(id, name);
    //customer.addEvent(new CustomerCreated(id, name));
    Customer.notifyEventCreated(id, name);

    return customer
  }

  private static notifyEventCreated(id: string, name: string) {
    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new EnviaConsoleLog1Handler();
    const eventHandler2 = new EnviaConsoleLog2Handler();
    eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);
    eventDispatcher.notify(new CustomerCreatedEvent({ id: id, name: name }));
    eventDispatcher.unregisterAll();
  }

  private static notifyEventAddressChanged(data: any) {
    console.log("Customer: vai chamar o notify")
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new EnviaConsoleLogHandler();
    eventDispatcher.register("CustomerChangeAddressEvent", eventHandler);
    eventDispatcher.notify(new CustomerChangeAddressEvent(data));
    console.log("Customer: vai chamar o unregisterAll")
    eventDispatcher.unregisterAll();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }
    if (this._name.length === 0) {
      throw new Error("Name is required");
    }
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
    //this.addEvent(new CustomerNameChanged(this.id, name));
    //this.addEvent(new CustomerCreatedEvent({id: this._id, name: name}) )
    Customer.notifyEventCreated(this._id, name);
  }

  get Address(): Address {
    return this._address;
  }

  changeAddress(address: Address) {
    this._address = address;
    //console.log(`Customer: Endereço do cliente: ${this._id}, ${this._name} alterado para: ${address.street} .....`);
    const data = {
      id: this._id,
      name: this._name,
      address: {
        street: address.street,
        city: address.city,
        zip: address.zip
      }
    }

    //console.log("Customer: vai chamar o notifyEventAddressChanged")

    Customer.notifyEventAddressChanged(data);
  }

  isActive(): boolean {
    return this._active;
  }

  activate() {
    if (this._address === undefined) {
      throw new Error("Address is mandatory to activate a customer");
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }

  set Address(address: Address) {
    this._address = address;
  }
}
