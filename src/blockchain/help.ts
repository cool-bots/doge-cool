import { Context } from '../types/bottender';

export const help = async (context: Context) => {
  await context.sendText(
    `Much useful. Very help. 
    
    - to tip:
    @cooldoge tip @alessio 10
    
    - to rain:
    @cooldoge rain
    
    
    For more nerdiness here:
    https://github.com/cool-bots/doge-cool`
  );
};
