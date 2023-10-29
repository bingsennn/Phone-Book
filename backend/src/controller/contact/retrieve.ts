import { ContactService } from "../../service";
import { BaseController } from "../../utils/baseClass/baseController";
import { logger } from "../../utils/logger";

export default class RetrieveContactController extends BaseController {
    protected async executeImpl(pathParam?: any, queryParam?: any, body?: any): Promise<any> {
        logger.verbose("start /controller/contact/retrieve");
        const guid = pathParam.guid;

        const contactService = new ContactService(this.queryRunner);
        this.serviceResponse = await contactService.retrieveContactByGuid(guid);

        logger.verbose("end /controller/contact/retrieve");
    }
}