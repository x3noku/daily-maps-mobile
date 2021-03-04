export const PrivateChatCreated = (res) => ({
    type: 'CHAT_CREATED_PRIVATE',

    payload: res
});

export const UpdateChatList = (res) => ({
    type: 'CHAT_LIST_UPDATE',
    payload: res
});

export const UpdateChatMessagesList = res => ({
    type: 'UPDATE_CHAT_MESSAGE_LIST',
    payload: res,
});

export const MessageSent = res => ({
    type: 'MESSAGE_SENT',
    payload: res
});

