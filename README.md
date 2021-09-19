
## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)

## License

Nest is [MIT licensed](LICENSE).

## CLI commands
```bash
# help
$ nest generate --help

# generate module
$ nest g mo module_name

# generate controller
$ nest g co controller_name

# generate service
$ nest g s service_name
```

# swagger
npm i --save @nestjs/swagger swagger-ui-express
import {ApiTags, ApiExcludeEndpoint, ApiOperation, ApiParam} from '@nestjs/swagger';
