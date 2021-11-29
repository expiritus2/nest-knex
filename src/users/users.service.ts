import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nest-knexjs';
import { Knex } from 'knex';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel() private readonly knex: Knex) {}

    async findAll() {
        const users = await this.knex.table('users');

        return { users };
    }

    async create(createUserDto: CreateUserDto) {
        try {
            const users = await this.knex.table('users').insert({
                firstName: createUserDto.firstName,
                lastName: createUserDto.lastName,
                email: createUserDto.email,
            });

            return { users };
        } catch (err) {
            throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }
    }

    async findOne(id: number) {
        if (!id) {
            throw new NotFoundException(`User ${id} does not exist`);
        }

        const user = await this.knex.table('users').where('id', id);

        return { user };
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        try {
            const user = await this.knex.table('users').where('id', id).update({
                firstName: updateUserDto.firstName,
                lastName: updateUserDto.lastName,
            });

            return { user };
        } catch (err) {
            throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }
    }

    async remove(id: number) {
        if (!id) {
            throw new NotFoundException(`User ${id} does not exist`);
        }
        const user = await this.knex.table('users').where('id', id).del();

        return { user };
    }
}
