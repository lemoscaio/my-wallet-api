<!-- HEADER -->
<div>
<div align="center">
  <img  src="https://i.imgur.com/dqK8EZe.png"
    width=100%" >
</div>
<br>
<h1 align="center">
  My Wallet - API
</h1>
<div align="center">
  <h3>Built With</h3>
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" height="30px"/>  
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express.js&logoColor=white" height="30px"/>
    <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white" height="30px"/>
  <!-- Badges source: https://dev.to/envoy_/150-badges-for-github-pnk -->
</div>
<br/>
</div>

<!-- CONTENT -->
## Description

API for the My Wallet web app. My Wallet is a financial controller application that uses NodeJS, Express and MongoDB to manage transactions. 

It was the 1ˢᵗ full stack and the 13ᵗʰ project of the Driven Full Stack Bootcamp.

## Features

- Authentication routes for registering and logging in
  - Users created with an encrypted password and persisted to the database
  - Password strength validation
  - User session persisted to the database and validated with UUID
  - Session validation via middleware
- Full financial statements CRUD (create, read, update, delete) with authentication headers
- All data stored on a MongoDB database
- All the entries are validated against schemas
- Add withdraws or deposits, as well as the value and the description of a transaction
- Project divided into controllers, routes, schemas, and middlewares

## API Reference

### Users

* Create new user
  
  ```http
  POST /sign-up
  ```

  ##### Request body:

  | Body       | Type     | Description                   |
  | :--------- | :------- | :---------------------------- |
  | `name`     | `string` | **Required** - Valid name     |
  | `email`    | `string` | **Required** - Valid email    |
  | `password` | `string` | **Required** - Valid password |

  `password length: from 6 to 20 characters`

  ##### Example: 
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string"
  } 
  ```

* Login user

  ```http
  POST /sign-in
  ```
  ##### Request:

  | Body       | Type     | Description                   |
  | :--------- | :------- | :---------------------------- |
  | `email`    | `string` | **Required** - Valid email    |
  | `password` | `string` | **Required** - Valid password |

  `password length: from 6 to 20 characters`

  ##### Example: 
  ```json
  {
    "email": "string",
    "password": "string"
  } 
  ```

  #### Response:

  ```json
  { 
    "name": "string", 
    "token": "string"
  }
  ```

### Financial Statements

* Get all entries

  ```http
  GET /statements
  ```
  
  #### Headers:

  | Name            | Description                       |
  | :-------------- | :-------------------------------- |
  | `authorization` | **Required** - "Bearer {{token}}" |

  #### Response:

  ```json
  [
    {
      "_id": "string",
      "userId": "string",
      "description": "string",
      "value": "number",
      "type": "string"
    },
    {
      "_id": "string",
      "userId": "string",
      "description": "string",
      "value": "number",
      "type": "string"
    }
  ]
  ```
  `type: "withdraw" | "deposit"`

* Post a new entry

  ```http
  POST /statements
  ```

  ##### Request:

  | Body          | Type     | Description                        |
  | :------------ | :------- | :--------------------------------- |
  | `description` | `string` | Description for the entry          |
  | `type`        | `enum`   | **Required** - withdraw or deposit |
  | `value`       | `number` | **Required** - Value > 0           |

  `type: "withdraw" | "deposit"`

  #### Request body:

  ```json
  {
    "description": "string",
    "type": "withdraw",
    "value": 1250
  }  
  ```

  #### Headers:

  | Name            | Description                       |
  | :-------------- | :-------------------------------- |
  | `authorization` | **Required** - "Bearer {{token}}" |

* Delete message

  ```http
  DELETE /statements/{entryId}
  ```

  #### Path parameters:

  | Parameter | Description                          |
  | :-------- | :----------------------------------- |
  | `entryId` | **Required** - ID of entry to delete |

  #### Headers:

  | Name            | Description                       |
  | :-------------- | :-------------------------------- |
  | `authorization` | **Required** - "Bearer {{token}}" |

* Edit message

  ```http
  PUT /statements/{entryId}
  ```

  ##### Request:

  | Body          | Type     | Description                        |
  | :------------ | :------- | :--------------------------------- |
  | `description` | `string` | Description for the entry          |
  | `type`        | `enum`   | **Required** - withdraw or deposit |
  | `value`       | `number` | **Required** - Value > 0           |

  `type: "withdraw" | "deposit"`

  #### Request body:

  ```json
  {
    "description": "string",
    "type": "withdraw",
    "value": 1250
  }  
  ```

  #### Path parameters:

  | Parameter | description                        |
  | :-------- | :--------------------------------- |
  | `entryId` | **Required** - ID of entry to edit |

  #### Headers:

  | Name            | Description                       |
  | :-------------- | :-------------------------------- |
  | `authorization` | **Required** - "Bearer {{token}}" |

## Run Locally

Clone the project:

```bash
  git clone https://github.com/lemoscaio/my-wallet-api.git
```

Go to the project directory:

```bash
  cd my-wallet-api
```

Install dependencies:

```bash
  npm install
```

Set up the environment variables in the `.env` file, using the `.env.example`.

Make sure the MongoDB server is running and available.

Start the server:

```bash
  node server.js
```

## Lessons Learned

In this project I learned the following:
* to build a secure app with encrypted data persisted in the database
* to organize the project in some layers such as controllers, middlewares, routers, and schemas
* to use middleware to reuse some logic and to isolate responsibilities of functions that might occur before the controller
* to deploy the back-end on some platforms such as Heroku and MongoDB Atlas (for the database)

## Acknowledgements

-   [Awesome Badges](https://github.com/Envoy-VC/awesome-badges)

