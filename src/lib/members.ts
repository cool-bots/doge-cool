import { SlackContext } from 'bottender';

const getChannelMembers = async (context: SlackContext, channelId?: string) => {
  const sender = context.event._rawEvent.user;
  const channel = channelId || context.event._rawEvent.channel;
  const allMembers = await context.client.getUserList({
    limit: 1000,
  });
  const deactivatedMembers = new Set(
    allMembers.members
      .filter((member: any) => !member.deleted)
      .map((member: any) => member.id)
  );
  let channelMembers = await context.client.getAllConversationMembers(channel);

  channelMembers = channelMembers.filter(
    (member) => member !== sender && member !== process.env.BOT_USER_ID
  );

  return channelMembers.filter((member: string) =>
    deactivatedMembers.has(member)
  );
};

export default getChannelMembers;
