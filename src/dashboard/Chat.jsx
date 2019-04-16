import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux'
import {addChat} from '../actions/chat'
import '../styles/Chat.css';
import ChatLists from '../components/ChatLists';
import {toast} from 'react-toastify'
import {history} from '../routes/AppRouter'

const host = 'http://localhost:3005'

class Chat extends React.Component {
    state = {
        text:''
    }
    handleChange = e => {
        this.setState({text:e.target.value});
    }
    handleSubmit = e => {
        e.preventDefault();
        const token = this.props.Token
        const name = this.state.text
        axios.post(`${host}/api/chat/new`,{name},{headers: {'Authorization': `${token}`}})
            .then((res) => {
                this.setState({text:''})
                if(res.data.err) {
                   return alert('Username not found')
                }
                this.props.dispatch(addChat(res.data))
            }).catch((err) => {
                this.setState({text:''})
            })
    }
    componentDidMount() {
        if(!this.props.Token) {
            toast.warn('sign in or sign up to proceed', {
                position:'top-right',
                autoClose:3000,
                hideProgressBar:true,
                closeOnClick:true,
                pauseOnHover:true,
            })
           return history.push('/signin');
        }
    }
    render() {
        return(
            <div>
                <form onSubmit={this.handleSubmit} className='form-container'>
                    <div className='field'>
                        <div className='control'>
                            <input value={this.state.text} 
                            onChange={this.handleChange} type="text" className='input' 
                            placeholder='Enter username'
                            />
                        </div>
                    </div>
                    <button style={{marginLeft:'0.5rem'}} 
                    type='submit' className='button'>Add Friend</button>
                </form>
                <ChatLists />
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        Token: state.auth.token
    }
}
export default connect(mapStateToProps)(Chat);