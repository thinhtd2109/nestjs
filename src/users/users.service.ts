import { Injectable, NotFoundException, BadRequestException, BadGatewayException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>) {}
    create(email: string, password: string) {
        const user = this.repo.create({ email, password });
        return this.repo.save(user);
    }

    find() {
        return this.repo.find();
    }

    async findByEmail(email: string) {
        return this.repo.findOneBy({ email })
    }

    async findOne(id: number) {
        const user = await this.repo.findOneBy({ id });
        return user;
    }

    async update(id: number, attrs: Partial<User>) {
        const user = await this.findOne(id);
        if(!user) {
            throw new NotFoundException('User not found!');
        }
        Object.assign(user, attrs);
        const saved = await this.repo.save(user);
        if(!saved) {
            throw new BadGatewayException('Updated Failed!')
        }

        return {
            message: "Updated Successfully.",
            item: saved
        }
    }

    async delete(id: number) {
        const user = await this.findOne(id);
        if(!user) {
            throw new Error('User not found!');
        }
        return this.repo.delete(user);
    }
}
