import { FindConditions, Like } from "typeorm";
import Contact from "../data/contact";
import { BaseService } from "../utils/baseClass/baseService";
import { ServiceResponse } from "../utils/baseClass/serviceResponse";
import { DeletedStatus } from "../utils/appConst";
import { logger } from "../utils/logger";
import { v4 as uuid } from 'uuid';

export default class ContactService extends BaseService {

    async createContact(contact: Contact): Promise<ServiceResponse> {
        logger.verbose("start /service/contact createContact");
        const serviceResponse = new ServiceResponse();
        contact.guid = uuid();
        contact.deletedStatus = DeletedStatus.ACTIVE;
        contact.lastModifiedDate = new Date();
        try {
            const savedContact = await this.queryRunner.manager.getRepository(Contact).save(contact);
            serviceResponse.isSuccess = true;
            serviceResponse.data = savedContact;
        }
        catch(err) {
            serviceResponse.isSuccess = false;
            console.error(`/service/contact createContact with error: ${err}`)
        }
    
        console.log("end /service/contact createContact");
        return serviceResponse;
    }

    async retrieveContactByGuid(guid: string): Promise<ServiceResponse> {
        logger.verbose("start /service/contact retrieveContact");
        const serviceResponse = new ServiceResponse();
        
        try {
            const contact = await this.queryRunner.manager.getRepository(Contact).findOne({
                guid: guid,
                deletedStatus: DeletedStatus.ACTIVE
            })
            serviceResponse.isSuccess = true;
            serviceResponse.data = contact;
        }
        catch(err) {
            serviceResponse.isSuccess = false;
            console.error(`/service/contact retrieveContact with error: ${err}`)
        }
    
        console.log("end /service/contact retrieveContact");
        return serviceResponse;
    }

    async updateContact(contact: Contact): Promise<ServiceResponse> {
        logger.verbose("start /service/contact updateContact");
        const serviceResponse = new ServiceResponse();
        contact.lastModifiedDate = new Date();
        try {
            await this.queryRunner.manager.getRepository(Contact).save(contact);
            serviceResponse.isSuccess = true;
            serviceResponse.data = contact;
        }
        catch(err) {
            serviceResponse.isSuccess = false;
            console.error(`/service/contact updateContact with error: ${err}`)
        }
    
        console.log("end /service/contact updateContact");
        return serviceResponse;
    }

    async deleteContact(guid: string): Promise<ServiceResponse> {
        logger.verbose("start /service/contact deleteContact");
        const serviceResponse = new ServiceResponse();
        
        try {
            await this.queryRunner.manager.getRepository(Contact)
                .update({
                    guid: guid
                }, {
                    deletedStatus: DeletedStatus.DELETED,
                    lastModifiedDate: new Date()
                })

            serviceResponse.isSuccess = true;
        }
        catch(err) {
            serviceResponse.isSuccess = false;
            console.error(`/service/contact deleteContact with error: ${err}`)
        }
    
        console.log("end /service/contact deleteContact");
        return serviceResponse;
    }

    async listContact(name: string, phoneNumber: string, address: string): Promise<ServiceResponse> {
        logger.verbose("start /service/contact listContact");
        const serviceResponse = new ServiceResponse();

        const filters: FindConditions<Contact> = {
            deletedStatus: DeletedStatus.ACTIVE
        };
        if (name) {
            filters.name = Like(`%${name}%`);
        }
        if (phoneNumber) {
            filters.phoneNumber = Like(`%${phoneNumber}%`);
        }
        if (address) {
            filters.address = Like(`%${address}%`);
        }
        
        try {
            const [ contacts, totalCount ] = await this.queryRunner.manager.getRepository(Contact).findAndCount({
                where: {
                    ...filters,
                },
                order: {
                    name: "ASC"
                }
            });
            serviceResponse.isSuccess = true;
            serviceResponse.data = contacts;
            serviceResponse.totalCount = totalCount;
        }
        catch(err) {
            serviceResponse.isSuccess = false;
            console.error(`/service/contact listContact with error: ${err}`)
        }
    
        console.log("end /service/contact listContact");
        return serviceResponse;
    }
}