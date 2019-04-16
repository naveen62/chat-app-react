import uniqid from 'uniqid'
const initialState = [];

const chatReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'ADD_CHAT':
            return [
                ...state,
                action.chat
            ]
        case 'SET_CHAT':
            return [
                ...action.chats
            ]
        case 'REMOVE_CHAT':
            return []
        case 'EDIT_CHAT':
            return state.map((chat) => {
                if(chat._id == action.id) {
                    action.chat._id = uniqid();
                    return {
                        ...chat,
                        chat:[...chat.chat, action.chat]
                    }
                } else {
                    return chat
                }
            })
        default:
            return state;
    }
}
export default chatReducer;