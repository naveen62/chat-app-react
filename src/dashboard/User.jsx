import React from 'react';
import '../styles/User.css';
import axios from 'axios';
import {connect} from 'react-redux'
import {login} from '../actions/auth'
import {setChat} from '../actions/chat'
import {toast} from 'react-toastify'
const api = '/api/user'

class User extends React.Component {
    state = {
        username:'',
        password:''
    }
    handleChangeUsername = e => {
        this.setState({username:e.target.value});
    }
    handleChangePassword = e => {
        this.setState({password: e.target.value});
    }
    handleSubmit = e => {
        e.preventDefault();
        if(window.location.pathname == '/signup') {
            const user = {
                username:this.state.username,
                password:this.state.password
            }
            axios.post(`${api}/`,user).then((res) => {
                if(!res.data) {
                    return toast.error('username already taken', {
                        position:'top-right',
                        autoClose:3000,
                        hideProgressBar:true,
                        closeOnClick:true,
                        pauseOnHover:true,
                    })
                }
                this.props.dispatch(login(res.data));
                localStorage.setItem('token', res.data.token);
                this.props.history.push('/')
            }).catch((err) => {
                return toast.error('username already taken', {
                    position:'top-right',
                    autoClose:3000,
                    hideProgressBar:true,
                    closeOnClick:true,
                    pauseOnHover:true,
                })
            })
        } else if(window.location.pathname == '/signin') {
            const user = {
                username:this.state.username,
                password:this.state.password
            }
            axios.post(`${api}/login`,user).then((res) => {
                if(!res.data) {
                    return toast.error('invalid credentails', {
                        position:'top-right',
                        autoClose:3000,
                        hideProgressBar:true,
                        closeOnClick:true,
                        pauseOnHover:true,
                    })
                }
                this.props.dispatch(login(res.data));
                this.props.dispatch(setChat(res.data.user.chats))
                localStorage.setItem('token', res.data.token);
                this.props.history.push('/')
            }).catch((err) => {
                return toast.error('invalid credentails', {
                    position:'top-right',
                    autoClose:3000,
                    hideProgressBar:true,
                    closeOnClick:true,
                    pauseOnHover:true,
                })
            })
        }
    }
    render() {
        return(
            <div className='user-container'>
                <h1 className='user-head is-size-3'>{this.props.title}</h1>
                <form onSubmit={this.handleSubmit} className='user-form'>
                    <div className='field'>
                        <div className='control'>
                            <input onChange={this.handleChangeUsername}
                             value={this.state.username} type="text" className='input' placeholder='Username'/>
                        </div>
                    </div>
                    <div className='field'>
                        <div className='control'>
                            <input onChange={this.handleChangePassword}
                             value={this.state.password} type="password" className='input' placeholder='Password'/>
                        </div>
                    </div>
                    <button type='submit' className='button is-success'>Sign In</button>
                </form>
            </div>
        )
    }
}

export default connect()(User);