# NESTJECTION

Nestjs database integration for Objection js

This package is use internally for my project, but can be used also if you want to use it.

## Features
- Extended Query Builder
- Extended Objection Relations ( In Progress )
- Model and Pagination Serializer ( for API )

## Installation
```
npm install @mlazuardy/nestjection
```
or
```
yarn add @mlazuardy/nestjection
```

Because we creating different peer dependencies of knex and objection, this package need to skip lib check in `tsconfig.json`.

Set the code below inside root configuration of `tsconfig.json`

```
"skipLibCheck": true,
```

## Usage
Once the installation process is complete, we can import the `DatabaseModule` your root Module.

### Load Database Module

for example if your root module name is `AppModule` (Default from nestjs), using `mysql2`.

Note that you must install database driver / client manually.

```typescript
import { Module } from '@nestjs/common';
import { DatabaseModule } from '@mlazuardy/nestjection';

@Module({
  imports: [
    DatabaseModule.forRoot({
      db: {
        client: 'mysql2',
        connection: {
          host: 'localhost',
          user: 'root',
          password: 'your_db_password',
          database: 'your_db_name'
        }
      }
    }),
    //your other module
  ]
})
export class AppModule {}
```

### Model
Define your model and extend using this package `Model` class.

```typescript
import { Model } from '@mlazuardy/nestjection';

export class User extends Model {
  id: number;

  // define your other attribute as same as your table columns
}
```

### Table Names

If you've ever used laravel. this package will do the same to detect your table names. using snake case + plural.

so if your model name is `User`, the table names is `users`, you're freely to overwrite this by using objection static `tableNames` getter.

```typescript
import { Model } from '@mlazuardy/nestjection';

export class User extends Model {
  static get tableNames() {
    return 'customers';
  }
}
```

### Serialization
We've provide `ModelSerializerInterceptor` to serialize your model, usually if you want to hide some of the properties of your model when returning the data for API.

For example, if you want to hide `password` property from `User` model. First, define static `hiddenFields` getter inside your model.

```typescript
import { Model } from '@mlazuardy/nestjection';

export class User extends Model {
  static get hiddenFields() {
    // define other properties that need to be hide
    return ['password'];
  }
}
```

And inside your controller you can define `ModelSerializerInterceptor` inside  `UseInterceptors` decorator

```typescript
import { Controller, Get, UseInterceptors, Param } from '@nestjs/common';
import { User } from './user.model'; //change this path
import { ModelSerializerInterceptor } from '@mlazuardy/nestjection';

@Controller('api/users')
export class UserController {
  @Get()
  @UseInterceptors(ModelSerializerInterceptor)
  async index() {
    // work for array of users
    const users = await User.query()

    return users;
  }

  @Get(':id')
  @UseInterceptors(ModelSerializerInterceptor)
  async show(@Param('id') id: number) {
    //also work for single data
    const user = await User.query().findOne({id});

    return user;
  }
}
```
Note that this interceptor will not work if your controller doesnt return instance of `Model`.
Instead you can use `serialize` method from the model instance

```typescript
import { Controller, Get, UseInterceptors, Param } from '@nestjs/common';
import { User } from './user.model'; //change this path
import { ModelSerializerInterceptor } from '@mlazuardy/nestjection';

@Controller('api/users')
export class UserController {
  @Get()
  @UseInterceptors(ModelSerializerInterceptor)
  async index() {
    // this will not work
    const users = await User.query();

    const user = await User.query().first();

    return {
      user: user.serialize(),//this should be work,
      users: users.map(user => user.serialize()), // you can map the array of user model first and then serialize it
    }
  }
}
```