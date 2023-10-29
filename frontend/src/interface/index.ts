export interface IContactProps {
    id: number;
    guid: string;
    name: string;
    phoneNumber: string;
    address: string;
    deletedStatus: number;
    lastModifiedDate: Date;
}

export interface IContactListProps {
    data: IContactProps[]
}