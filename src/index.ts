import {Mediator} from './domain/@shared/service/mediator';
import { SendMailListener } from './domain/customer/listeners/send-mail.listener';
import { CustomerCreated } from "./domain/customer/entity/customer-created.event";

const mediator = new Mediator();

const sendMailListener = new SendMailListener();

mediator.register(CustomerCreated.name, (event: CustomerCreated) => {
    sendMailListener.handle(event)
})