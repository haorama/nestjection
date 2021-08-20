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
### Relationship
Instead creating relation mappings that may have same pattern within your application over and over.
We've provide a static getter that return predefined relation mapping.

Most of the first argument of this relationship method use `typeof Model`

All relationships method highly inspired from [Laravel Eloquent Relationship](https://laravel.com/docs/8.x/eloquent-relationships)

#### Belongs To
```typescript
import { User } from './your-user-model-path.ts';
import { Model } from '@mlazuardy/nestjection';

export class Blog extends Model {
  //the rest of user property

  user_id: number;

  user: User;

  static get relationMappings() {
    return {
      user: this.relation.belongsTo(User),
      // Other relation mapping here
    }
  }
}
```

When defining the blog relation mappings, the `belongsTo` method will attempt to find a `User` model that has an `id` which matches the `user_id` column on the Blog model.

The `Foreign Key` will convert your `class` name, for example `Blog` to snake case type + `_id` suffix.

By default, `User` `id` will use as `Owner Key`

Also this method will find your `tableName` automatically to determine the `join` property of `objection` relationMapping.

To change this default determinations. you may pass a second argument of `belongsTo` method specifying your keys:

```typescript
export class Blog extends Model {
  auth_id: number;

  user: User;

  static get relationMappings() {
    return {
      user: this.relation.belongsTo(User, {
        foreignKey: 'auth_id', //from Blog column
        ownerKey: 'uuid' // from User column,
      })
    }
  }
}
```
both options are optional, so you may pass only `foreignKey` or `ownerKey`.

#### Has One
Not much difference from `belongsTo`,

```typescript
import { Profile } from 'your-profile-model-path.ts';
import { Model } from '@mlazuardy/nestjection';

export class User extends Model {
  profile: Profile;

  static get relationMappings() {
    return {
      profile: this.relation.hasOne(Profile)
    }
  }
}
```

### Polymorphic Relations

#### Morph One


### Contributing
Contributing are always open since im not an expert to create a package, creating test case or writing english documentation. I'm Happy that you guys can help me improving this package.

## Changelog
- V0.2.2
 - Fixed default has many foreign key