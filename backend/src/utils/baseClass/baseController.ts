import { Request, Response } from 'express';
import { Connection, QueryRunner, getConnection } from 'typeorm';
import { ServiceResponse } from '../baseClass/serviceResponse';
import { logger } from '../logger';

export abstract class BaseController {
    protected abstract executeImpl(pathParam?: any, queryParam?: any, body?: any): Promise<any>;
    connection: Connection
    queryRunner: QueryRunner;
    serviceResponse: ServiceResponse;

    constructor() {
        this.serviceResponse = new ServiceResponse();
        this.connection = getConnection();
    }

    async startTransaction(): Promise<void> {
        logger.verbose("startTransaction");
        this.queryRunner = this.connection.createQueryRunner();
        await this.queryRunner.startTransaction();
    }

    async endTransaction(): Promise<void> {
        logger.verbose("endTransaction");
        try {
            if (this.queryRunner.isTransactionActive) {
                if (this.serviceResponse.isSuccess) {
                    await this.queryRunner.commitTransaction();
                }
                else {
                    await this.queryRunner.rollbackTransaction();
                }
            }
        }
        catch (err) {
            console.error(`endTransaction with error: ${err}`)
        }
        finally {
            if (!this.queryRunner.isReleased) {
                await this.queryRunner.release();
            }
        }
    }

    public async executeRest(req: Request, res: Response): Promise<void> {
        this.startTransaction()
            .then(() => this.executeImpl(req.params, req.query, req.body))
            .then(() => this.endTransaction())
            .then(() => res.status(200).send(this.serviceResponse))
            .catch(err => {
                logger.error(err);
                this.serviceResponse.isSuccess = false;
            })
            .then(() => this.endTransaction())
            .then(() => res.status(500).send(this.serviceResponse.message))
    }
};