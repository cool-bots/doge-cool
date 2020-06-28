import { SlackContext } from 'bottender';

const help = async (context: SlackContext) => {
  await context.chat.postEphemeral({
    text: `Much useful. Very help. 
    
    - If you want to *tip* somebody:
    *@cooldoge tip @user 10*

    - If you want to *tip* multiple user:
    *@cooldoge tip @userA @userB @userC 10*
    
    - If you want to *rain* some dogecoin:
    *@cooldoge rain 20*
    
    - If you want to set a prize for one random winner
    *@cooldoge random 100*
    
    - If you want to know your balance, send a DM to @cooldoge with "balance" as message
    - If you want to know your deposit more dogecoin, send a DM to @cooldoge with "deposit" as message
    - If you want to know your withdraw address to withdraw your dogecoin to your private wallet, send a DM to @cooldoge with "withdraw" as message
    
    For more nerdiness here:
    https://github.com/cool-bots/doge-cool`,
  });
};

export default help;
