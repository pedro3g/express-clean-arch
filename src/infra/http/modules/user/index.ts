import CreateUserUseCase from '@app/usecases/user/create-user.usecase';
import DomainError from '@domain/errors/domain.error';
import UserMongoRepository from '@infra/database/mongodb/repositories/user-mongo.repository';
// import UserPrismaRepository from '@infra/database/prisma/repositories/user-prisma.repository';
import { Router } from 'express';

const userRouter = Router();

const userRepository = new UserMongoRepository();
const createUserUseCase = new CreateUserUseCase(userRepository);

userRouter.post('/', async (req, res) => {
  const response = await createUserUseCase.execute(req.body);

  if (response.isLeft() && response.value instanceof DomainError) {
    return res.status(422).json({ message: response.value.message });
  } else if (response.isLeft()) {
    return res.status(400).json({ message: response.value });
  }

  return res.status(201).json(response.value);
});

export default userRouter;
