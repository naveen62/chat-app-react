const initailState = {}

const authReducer = (state=initailState, action) => {
    switch(action.type) {
        case 'SIGN_IN':
            return {
                ...action.user,
                isAuth:true
            }
        case 'LOGOUT':
            return {};
        default:
            return state;
    }
}
export default authReducer;