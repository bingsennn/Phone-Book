import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('Contact')
export default class Contact {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    guid: string;

    @Column()
    name: string;

    @Column()
    phoneNumber: string;

    @Column()
    address: string;

    @Column()
    deletedStatus: number;

    @Column()
    lastModifiedDate: Date;
}