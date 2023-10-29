import Contact from "../../data/contact";
import { ContactService } from "../../service";
import { BaseController } from "../../utils/baseClass/baseController";
import { logger } from "../../utils/logger";

class CreateContactController extends BaseController {
    protected async executeImpl(pathParam?: any, queryParam?: any, body?: any): Promise<any> {
        logger.verbose("start /controller/contact/create");
        const { name, phoneNumber, address } = body;
        
        const contact = new Contact();
        contact.name = name;
        contact.phoneNumber = phoneNumber;
        contact.address = address;

        const contactService = new ContactService(this.queryRunner);
        this.serviceResponse = await contactService.createContact(contact);

        logger.verbose("end /controller/contact/create");
    }
}

export const createContactController = new CreateContactController();