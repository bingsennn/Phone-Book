export class ServiceResponse {
    isSuccess: boolean;
    message?: string;
    data?: any;
    totalCount?: number;

    constructor() {
        this.isSuccess = true;
    }
}