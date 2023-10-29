import { ContactService } from "../../service";
import { BaseController } from "../../utils/baseClass/baseController";
import { logger } from "../../utils/logger";

export default class ListContactController extends BaseController {
    protected async executeImpl(pathParam?: any, queryParam?: any, body?: any): Promise<any> {
        logger.verbose("start /controller/contact/list");
        const { name, phoneNumber, address } = queryParam;

        const contactService = new ContactService(this.queryRunner);
        this.serviceResponse = await contactService.listContact(name, phoneNumber, address);

        logger.verbose("end /controller/contact/list");
    }
}