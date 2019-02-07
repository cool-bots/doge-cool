# doge-cool

## Getting started

`.env` file should look like:

```
BLOCK_IO_API_KEY=XXXXXXXXX
BLOCK_IO_SECRET_PIN=XXXXXXX
SLACK_TOKEN=xoxb-.....
BOT_USER_ID=UAN8W2V6X
```

## TODO

* create users wallets on startup with labels are slack user id
* deposit command - /deposit => return address
* tip command - /tip <username> <amount> => return tx
* rain command - /rain <amount> => return tx
* balance command - /balance => balance
* withdraw command - /withdraw <adress> <amount?> => return tx

* Handle not enough funds
* Handle not sending funds to myself
* help function
