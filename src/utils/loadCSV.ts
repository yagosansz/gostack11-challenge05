import csvToJson from 'csvtojson';
import fs from 'fs';

import { TransactionType } from '../models/Transaction';

interface TransactionDTO {
  title: string;
  type: TransactionType;
  value: number;
  category: string;
}
// https://attacomsian.com/blog/nodejs-convert-csv-to-json
// https://github.com/Keyang/node-csvtojson
async function loadCSV(filePath: string): Promise<TransactionDTO[]> {
  const inputCSVStream = fs.createReadStream(filePath);
  const parseStream = csvToJson({
    trim: true,
    downstreamFormat: 'array',
  });

  const csvTransactions = await parseStream.fromStream(inputCSVStream);

  return csvTransactions;
}

export default loadCSV;
