import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerChangeAddressEvent from "../customer-change-address";
import CustomerCreatedEvent from "../customer-created";

export default class EnviaConsoleLogHandler
  implements EventHandlerInterface<CustomerChangeAddressEvent>
{
  handle(event: CustomerChangeAddressEvent): void {
    console.log(`EnviaConsoleLogHandler:Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado para: ${event.eventData.address.street} .....`); 
    //console.log(`EnviaConsoleLogHandler: Endereço do cliente:  .....`); 
  }
}