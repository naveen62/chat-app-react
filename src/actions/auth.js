const login = (user) => ({
    type:'SIGN_IN',
    user,
})
const logout = () => ({
    type:'LOGOUT'
})
export {login, logout};