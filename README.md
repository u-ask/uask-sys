# U-ASK Management System
This repository contains the server and the client of the [U-ASK](https://github.com/u-ask/uask#readme) system.

The server offers a GraphQL and a REST API. The client allows application to interact with the server by easing authentication and queries.

Authentication is implemented in a separate repository : [U-ASK Authentication](https://github.com/u-ask/uask-auth#readme).

# Install the server
```
git clone https://github.com/u-ask/uask-sys.git
```

## Server configuration

| variable          | description                                  | example 
|:------------------|:---------------------------------------------|:-------
| APP_ENV           | the execution environment                    | `production`
| PORT              | the port to listen to                        | `3000`
| CALLBACK_ROOT_URL | the authorized open id callback URL          | `https://uask.example.com/callback`
| AUTH_URL          | the public URL of the authentication service | `https://uask-api.example.com:3000/oidc`
| AUTH_JWKS         | a JSON stringified JWKS                      | `{"keys":[{"crv":"P-256",...`
| DB_CONNSTR        | a knex connection string to a PostgreSQL db  | `{"user":"postgres",`<br>`host":"localhost",`<br>`database":"postgres",`<br>`password":"******"}`
| SENDGRID_API_KEY  | a sendgrid authentication key
| TWILIO_API_KEY_SID<br>TWILIO_API_KEY_SECRET<br>TWILIO_ACCOUNT_SID | a twilio authentication key set

Setting AUTH_JWKS to `{}` will use a quick start development-only signing set. For more information about JWKS generation, see [this example](https://github.com/panva/node-oidc-provider-example/blob/main/01-oidc-configured/generate-keys.js).

The APP_ENV variable must be set to `production`. The other possible values are `development` or `demo` (see [U-ASK](https://github.com/u-ask/uask#readme)).

[Sendgrid](https://sendgrid.com/) and / or [Twilio](https://www.twilio.com/) account and keys are necessary for sending authentication codes.

_*Important:*_ do not use the `.env` file in production environment ; set the environment variable at host level. The present guide assumes that this is the case.

## Database initialization
```
npm run migrate
```

## Starting the server
```
npm run start
```

If no error is logged to the console, the system is properly started. The easiest way to test is to use the U-ASK client.

# Install the client