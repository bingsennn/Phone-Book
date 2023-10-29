import { ContactService } from "../../service";
import { BaseController } from "../../utils/baseClass/baseController";
import { logger } from "../../utils/logger";

class EditContactController extends BaseController {
    protected async executeImpl(pathParam?: any, queryParam?: any, body?: any): Promise<any> {
        logger.verbose("start /controller/contact/edit");
        const guid = pathParam.guid;
        const { name, phoneNumber, address } = body;
        
        const contactService = new ContactService(this.queryRunner);
        this.serviceResponse = await contactService.retrieveContactByGuid(guid);
        if (!this.serviceResponse.isSuccess) return;
        
        const retrievedContact = this.serviceResponse.data;
        retrievedContact.name = name ??  retrievedContact.name;
        retrievedContact.phoneNumber = phoneNumber ??  retrievedContact.phoneNumber;
        retrievedContact.address = address ??  retrievedContact.address;

        this.serviceResponse = await contactService.updateContact(retrievedContact);
        logger.verbose("end /controller/contact/edit");
    }
}

export const editContactController = new EditContactController();