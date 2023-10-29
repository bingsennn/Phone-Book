import { Request } from "express";
import { ContactService } from "../../service";
import { BaseController } from "../../utils/baseClass/baseController";
import { logger } from "../../utils/logger";

export default class DeleteContactController extends BaseController {
    protected async executeImpl(pathParam?: any, queryParam?: any, body?: any): Promise<any> {
        logger.verbose("start /controller/contact/delete");
        const guid = pathParam.guid;

        const contactService = new ContactService(this.queryRunner);
        this.serviceResponse = await contactService.deleteContact(guid);

        logger.verbose("end /controller/contact/delete");
    }
}