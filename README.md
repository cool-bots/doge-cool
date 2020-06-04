# doge-cool

## Getting started

`.env` file should look like:

```shell
BLOCK_IO_API_KEY=XXXXXXXXX
BLOCK_IO_SECRET_PIN=XXXXXXX
SLACK_TOKEN=xoxb-.....
BOT_USER_ID=-----
GENERAL_CHANNEL_ID=YOUR_GENERAL_CHANNEL
```

`dev.env` should look like this:

```shell
NGROK_ACCOUNT=YOURNAME-bitwaladev
HOST=doge-cool
PORT=3000
```

### In public / private channels

- `tip <username> <amount>` - gives amount to specified user
- `rain <amount>` - Divides amount equally between participants (currently max. 5)
- `random <amount>` - Randomly awards one person the specified amount

### In `@cooldoge` private DM

- `deposit` - return address
- `balance` - shows balance
- `withdraw <adress> <amount?>` - withdraws to address

## Docker

- develop app in container:
  `yarn dev:docker`
- build image:
  `yarn build:docker`
- run app in container:
  `yarn start:docker`
