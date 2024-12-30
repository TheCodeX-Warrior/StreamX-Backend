import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Roles } from '../../entities/roles.entity';
import { CreateRolesDto } from '../../dtos/role.dto';

@Injectable()
export class RolesService {
  constructor(private readonly _rolesRepository: Repository<Roles>) {}

  async createRole(role: CreateRolesDto): Promise<Roles> {
    return this._rolesRepository.save(role);
  }

  async getAllRoles(): Promise<Roles[]> {
    return this._rolesRepository.find();
  }

  async getRoleById(id: string): Promise<Roles> {
    return this._rolesRepository.findOne({ where: { id } });
  }

  async updateRole(
    id: string,
    updatedRole: Partial<CreateRolesDto>,
  ): Promise<Roles> {
    if (!id) {
      throw new BadRequestException('ID is required to update a role.');
    }
    const existingRole = await this._rolesRepository.findOne({ where: { id } });

    if (!existingRole) {
      throw new NotFoundException(`Role with ID ${id} not found.`);
    }

    Object.assign(existingRole, updatedRole);
    return await this._rolesRepository.save(existingRole);
  }

  async deleteRole(id: string): Promise<boolean> {
    await this._rolesRepository.delete({ id });
    return true;
  }
}
