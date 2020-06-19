import { EntityRepository, Repository } from 'typeorm';

import Transaction, { TransactionType } from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const allTransactions = await this.find();

    const balance = allTransactions.reduce<Balance>(
      (acc: Balance, curr: Transaction) => {
        if (curr.type === TransactionType.INCOME) {
          acc.income += curr.value;
          acc.total += curr.value;
        } else {
          acc.outcome += curr.value;
          acc.total -= curr.value;
        }
        return acc;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    return balance;
  }
}

export default TransactionsRepository;
