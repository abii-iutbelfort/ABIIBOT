# ABII Bot

This is a simple bot for our association

## Setup

1. copy the .env-template to .env and fill it

```sh
cp .env-template .env
```

\
2. Install the dependencies

```sh
yarn
```

\
3. Run it

```sh
yarn dev      # with nodemon
yarn start    # as a background task
```

## Other scripts

- Register commands either globally or in the guilds specified in the .env file by their ids

```sh
yarn commands deploy <scope> # allowed scopes are 'global' and 'guilds'
```

- Remove commands either globally or in the guilds specified in the .env file by their ids

```sh
yarn commands remove <scope> # allowed scopes are 'global' and 'guilds'
```
