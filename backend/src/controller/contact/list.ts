import { ContactService } from "../../service";
import { BaseController } from "../../utils/baseClass/baseController";
import { logger } from "../../utils/logger";

class ListContactController extends BaseController {
    protected async executeImpl(pathParam?: any, queryParam?: any, body?: any): Promise<any> {
        logger.verbose("start /controller/contact/list");
        const { searchStr } = queryParam;

        const contactService = new ContactService(this.queryRunner);
        this.serviceResponse = await contactService.listContact(searchStr);

        logger.verbose("end /controller/contact/list");
    }
}

export const listContactController = new ListContactController();