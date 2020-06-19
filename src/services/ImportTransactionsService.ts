import { getRepository, getCustomRepository, In } from 'typeorm';
import path from 'path';
import fs from 'fs';
import uploadConfig from '../config/upload';
import loadCSV from '../utils/loadCSV';

import Category from '../models/Category';
import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface RequestDTO {
  transactionsFilename: string;
}

class ImportTransactionsService {
  public async execute({
    transactionsFilename,
  }: RequestDTO): Promise<Transaction[]> {
    const transactionsFilePath = path.join(
      uploadConfig.directory,
      transactionsFilename,
    );

    const transactionsRepository = getCustomRepository(TransactionsRepository);
    const categoriesRepository = getRepository(Category);

    let importedTransactions = await loadCSV(transactionsFilePath);

    // Transaction needs to have title, value, and type to be saved in the db - category is optional
    importedTransactions = importedTransactions.filter(
      transaction => transaction.value && transaction.type && transaction.title,
    );

    const importedCategoriesTitles = importedTransactions.map(
      transaction => transaction.category,
    );

    const existingCategories = await categoriesRepository.find({
      title: In(importedCategoriesTitles),
    });

    const existentCategoriesTitle = existingCategories.map(
      category => category.title,
    );

    // 1 - Removes categories titles that are already in the db
    // 2 - Removes duplicates categories (https://medium.com/dailyjs/how-to-remove-array-duplicates-in-es6-5daa8789641c)
    const categoriesTitlesToCreate = importedCategoriesTitles
      .filter(title => !existentCategoriesTitle.includes(title))
      .filter((title, index, self) => self.indexOf(title) === index);

    // .create({ title: title })
    const newCategories = categoriesRepository.create(
      categoriesTitlesToCreate.map(title => {
        return { title };
      }),
    );

    await categoriesRepository.save(newCategories);

    // categories that already existed in the db + newly added categories
    const finalCategories = [...existingCategories, ...newCategories];

    const newTransactions = transactionsRepository.create(
      importedTransactions.map(transaction => {
        return {
          title: transaction.title,
          value: transaction.value,
          type: transaction.type,
          category: finalCategories.find(
            category => category.title === transaction.category,
          ),
        };
      }),
    );

    await transactionsRepository.save(newTransactions);

    await fs.promises.unlink(transactionsFilePath);

    return newTransactions;
  }
}

export default ImportTransactionsService;
