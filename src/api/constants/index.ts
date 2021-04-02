const authUri = 'auth/';

export const AuthRests = {
    signIn: authUri + 'login/',
    signUp: authUri + 'register/',
    logOut: authUri + 'logout/',
};

export const SocketEvents = {
    connection: {
        connect: 'connect',
        disconnect: 'disconnect',
    },
    chat: {
        createPrivateChat: 'chat:create:private',
        getChats: 'chat:get:chats',
        connect: 'chat:connect',
        getChatMessages: 'chat:get:messages',
        sendMessage: 'chat:send:message',
        newMessage: 'chat:message',
    },
    tasks: {
        createList: 'list:create',
        getListById: 'list:get',
        getLists: 'list:get:lists',
        pushTaskToList: 'list:add:task',
        removeTaskFromList: 'list:remove:task',
        removeList: 'list:delete',
        createTask: 'task:create',
        getTaskById: 'task:get',
        changeTask: 'task:change',
        completeTask: 'task:complete',
        removeTask: 'task:delete',
    },
    events: {
        createEvent: 'event:create',
        getEvent: 'event:get',
        getEventsList: 'event:get:events',
        removeUserFromEvent: 'event:remove:user',
        addUser: 'event:add:user',
    },
};
