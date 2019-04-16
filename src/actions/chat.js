const addChat = (chat) => ({
    type:'ADD_CHAT',
    chat
})
const setChat = (chats) => ({
    type:'SET_CHAT',
    chats
})
const removeChat = () => ({
    type:'REMOVE_CHAT'
})
const editChat = (id, chat) => ({
    type:'EDIT_CHAT',
    id,
    chat
})
export {addChat, setChat, removeChat, editChat}; 