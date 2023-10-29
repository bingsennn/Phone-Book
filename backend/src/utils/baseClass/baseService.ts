import { QueryRunner } from 'typeorm';

export abstract class BaseService {
    protected queryRunner: QueryRunner;

    constructor(queryRunner: QueryRunner) {
        this.queryRunner = queryRunner;
    }
}

