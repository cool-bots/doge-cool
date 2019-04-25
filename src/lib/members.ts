export const getChannelMembers = async (
  slackClient: any,
  channelId: string
) => {
  const allMembers = await slackClient.getUserList({
    limit: 1000,
  });
  const deactivatedMembers = new Set(
    allMembers.members
      .filter((member: any) => !member.deleted)
      .map((member: any) => member.id)
  );
  const channelMembers = await slackClient.getAllConversationMembers(channelId);

  return channelMembers.filter((member: string) =>
    deactivatedMembers.has(member)
  );
};
