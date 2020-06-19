import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';

import TransactionsRepository from '../repositories/TransactionsRepository';

interface RequestDTO {
  id: string;
}

class DeleteTransactionService {
  public async execute({ id }: RequestDTO): Promise<void> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const checkTransactionExists = await transactionsRepository.findOne({
      id,
    });

    if (!checkTransactionExists) {
      throw new AppError('Transaction does not exists');
    }

    await transactionsRepository.delete(id);
  }
}

export default DeleteTransactionService;
