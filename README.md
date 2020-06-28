# doge-cool

## Getting started

`.env` file should look like:

```
BLOCK_IO_API_KEY=XXXXXXXXX
BLOCK_IO_SECRET_PIN=XXXXXXX

BOT_USER_ID=XXXXXXX
BOT_DM_CHANNEL_ID=XXXXXXX
BOT_CHANNEL_MEMBER_ID=XXXXXXX

GENERAL_CHANNEL_ID=YOUR_GENERAL_CHANNEL

SLACK_ACCESS_TOKEN=xoxb-...
SLACK_SIGNING_SECRET=XXXXXXX
```

### In public / private channels

- `tip <username> <amount>` - gives amount to specified user
- `tip <username1> <username2> <usernameN> <amount>` - gives amount to specified users
- `rain <amount>` - Divides amount equally between participants (currently max. 5)
- `random <amount>` - Randomly awards one person the specified amount

### Slash commands

- `/deposit` - return address
- `/balance` - shows balance
- `/withdraw` - withdraws to address (not implemented yet)
