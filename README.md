<img alt="GoStack" src="https://storage.googleapis.com/golden-wind/bootcamp-gostack/header-desafios.png" />

<h3 align="center">
  Challenge 05: Node.js - Financial Application
</h3>

## :rocket: About the Challenge

Node.js backend that builds on [Challenge 04](https://github.com/yagosansz/gostack11-challenge04) by using TypeORM for database handling and Multer for managing file uploads.

### Application Routes

- **`POST /transactions`**: The route must get `title`, `value`, `type`, and `category` in the request body, where the `type` represents transaction's type that can be either `income` or `outcome (expense)`. Upon adding a new transaction, it should be stored in the database, containing the following fields: `id`, `title`, `value`, `type`, `category_id`, `created_at`, `updated_at`.

```json
{
  "id": "uuid",
  "title": "Salário",
  "value": 3000,
  "type": "income"
}
```

- **`GET /transactions`**: The route should list all created transactions along with the balance, which contains the sum of all income, outcome/expenses, and final balance (income - outcome);

```json
{
  "transactions": [
    {
      "id": "uuid",
      "title": "Income",
      "value": 4000,
      "type": "income",
      "category": {
        "id": "uuid",
        "title": "Salary",
        "created_at": "2020-04-20T00:00:49.620Z",
        "updated_at": "2020-04-20T00:00:49.620Z"
      },
      "created_at": "2020-04-20T00:00:49.620Z",
      "updated_at": "2020-04-20T00:00:49.620Z"
    },
    {
      "id": "uuid",
      "title": "Freelance work",
      "value": 2000,
      "type": "income",
      "category": {
        "id": "uuid",
        "title": "Others",
        "created_at": "2020-04-20T00:00:49.620Z",
        "updated_at": "2020-04-20T00:00:49.620Z"
      },
      "created_at": "2020-04-20T00:00:49.620Z",
      "updated_at": "2020-04-20T00:00:49.620Z"
    },
    {
      "id": "uuid",
      "title": "Credit card payment",
      "value": 4000,
      "type": "outcome",
      "category": {
        "id": "uuid",
        "title": "Others",
        "created_at": "2020-04-20T00:00:49.620Z",
        "updated_at": "2020-04-20T00:00:49.620Z"
      },
      "created_at": "2020-04-20T00:00:49.620Z",
      "updated_at": "2020-04-20T00:00:49.620Z"
    },
    {
      "id": "uuid",
      "title": "Gaming chair",
      "value": 1200,
      "type": "outcome",
      "category": {
        "id": "uuid",
        "title": "Recreation",
        "created_at": "2020-04-20T00:00:49.620Z",
        "updated_at": "2020-04-20T00:00:49.620Z"
      },
      "created_at": "2020-04-20T00:00:49.620Z",
      "updated_at": "2020-04-20T00:00:49.620Z"
    }
  ],
  "balance": {
    "income": 6000,
    "outcome": 5200,
    "total": 800
  }
}
```

- **`DELETE /transactions/:id`**: The route should delete a transaction that matches the id specified in the URL.

- **`POST /transactions/:id`**: The route should allow the import of a `.csv` file containing all the required information to create a transaction `id`, `title`, `value`, `type`, `category_id`, `created_at`, `updated_at`, where each line in the CSV file should represent a new record in the database. Upon completion it should return all the imported transactions.

### Tests Breakdown

- **`should be able to create a new transaction`**: For this test to pass, the application should allow the creation of a transaction and return the created transaction as json.

- **`should create tags when inserting new transactions`**: For this test to pass, the application should allow that upon the creation of a transaction with a new category it must be inserted in the `category_id` field with the newly created `id`.

- **`should not create tags when they already exists`**: For this test to pass, the application should allow that upon creation of a transaction with an existing category it must assign the `category_id` the `id` of the existing category, not allowing the creation of categories with the same title

- **`should be able to list the transactions`**: For this test to pass, the application should return an object with all transactions that have been createad including the balance.

- **`should not be able to create outcome transaction without a valid balance`**: For this test to pass, the application should not allow an expense to be added if its value is greater than the sum of all income, returning a 404 HTTP response and an error message with the following format { error: string}.

- **`should be able to delete a transaction`**: For this test to pass, the application should allow the delete route to remove a transaction and return an empty response with a 204 status code.

- **`should be able to import transactions`**: For this test to pass, the application shoud allow the importing of a `.csv` file. Once the files is imported, all the records and categories in the file should be inserted into the database, as well as return all the imported transactions.

### Testing the Application

1. Run `yarn test` to run test suites

## Getting started

1. Clone this repo using `git clone https://github.com/yagosansz/gostack11-challenge05.git`
2. Move yourself to the appropriate directory: `cd gostack11-challenge05`<br />
3. Run `yarn` to install dependencies<br />

### Getting started with the backend server

1. Run `yarn dev:server` to start the server
2. Test the routes by either using [Insomnia](https://insomnia.rest/) or [Postman](https://www.getpostman.com/)

  ---

Made with :heart: by Yago!
