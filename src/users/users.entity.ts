import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    
    
    @Column()
    email: string;

    @Column()
    @Exclude()
    password: string;
}