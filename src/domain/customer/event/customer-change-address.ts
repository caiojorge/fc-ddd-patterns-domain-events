import EventInterface from "../../@shared/event/event.interface";

export default class CustomerChangeAddressEvent implements EventInterface {
    dataTimeOccurred: Date;
    eventData: any;
  
    constructor(eventData: any) {
      this.dataTimeOccurred = new Date();
      this.eventData = eventData;
      //console.log(`CustomerChangeAddressEvent: Endereço do cliente: ${eventData.id}, ${eventData.name} alterado para: ${eventData.address.street} .....`);
    }
  }