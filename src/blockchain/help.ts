import { Context } from '../types/bottender';

export const help = async (context: Context) => {
  await context.sendText(
    `Much useful. Very help. 
    
    - If you want to *tip* somebody:
    *@cooldoge tip @user 10*
    
    - If you want to *rain* some dogecoin:
    *@cooldoge rain 20*
    
    - If you want to set a prize for one random winner
    *@cooldoge random 100*
    
    - If you want to know your balance, send a DM to @cooldoge with "balance" as message
    - If you want to know your deposit more dogecoin, send a DM to @cooldoge with "deposit" as message
    - If you want to know your withdraw your dogecoin to your private wallet, send a DM to @cooldoge with "withdraw address amount" as message
    
    For more nerdiness here:
    https://github.com/cool-bots/doge-cool`
  );
};
