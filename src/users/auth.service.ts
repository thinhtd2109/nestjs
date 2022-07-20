import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(private userService: UsersService) {}

    async signup(email: string, password: string) {
        const existUsers = await this.userService.findByEmail(email);
        if(existUsers) {
            throw new BadRequestException('user in used.');
        }

        const salt = randomBytes(8).toString('hex');
        const hash = (await scrypt(password, salt, 32)) as Buffer;

        const result = salt + '.' + hash.toString('hex');

        const user = await this.userService.create(email, result);

        return user;

    }
    
    async signin(email: string, password: string) {
        const user = await this.userService.findByEmail(email);

        if(!user) {
            throw new NotFoundException('user not found!');
        }

        const [salt, storedHash] = user.password.split('.');

        const hash = (await scrypt(password, salt, 32)) as Buffer;

        if(storedHash !== hash.toString('hex')) {
            throw new BadRequestException('bad password.')
        }
        return user;
    }
}