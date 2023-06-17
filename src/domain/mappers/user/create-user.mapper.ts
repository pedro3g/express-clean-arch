import type Mapper from '@app/base/mapper';
import CreateUserDto from '@app/dtos/user/create-user.dto';
import UserEntity from '@domain/entities/user.entity';

export default class CreateUserMapper
  implements Mapper<CreateUserDto, UserEntity>
{
  mapFrom(param: CreateUserDto): UserEntity {
    return new UserEntity(
      null,
      param.name,
      param.email,
      param.password,
      null,
      null
    );
  }

  mapTo(param: UserEntity): CreateUserDto {
    const dto = new CreateUserDto();

    dto.name = param.name;
    dto.email = param.email;
    dto.password = param.password;

    return dto;
  }
}
