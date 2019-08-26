import * as jwt from 'jsonwebtoken';
import * as conf from 'nconf';
import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Desk } from './Desk';
import { Profile } from './Profile';

@Entity()
@ObjectType()
export class User {

    @PrimaryGeneratedColumn()
    public readonly id: number;

    @Field()
    @Column()
    public fullName: string;

    @Column()
    public email: string;

    @Column()
    public password: string;

    @Column({
        type: 'simple-array',
    })
    public role: string[];

    @Field(type => Desk)
    @OneToOne(type => Desk, desk => desk.user)
    public desk: Desk;

    @Field(type => Profile)
    @OneToOne(type => Profile, profile => profile.user)
    public profile: Profile;

    public generateAuthToken(): string {
        const config = conf.get('jwt');
        const token = jwt.sign({
            _id: this.id,
            email: this.email,
        }, config.signature, { expiresIn: config.expiresIn });

        return token;
    }
}
