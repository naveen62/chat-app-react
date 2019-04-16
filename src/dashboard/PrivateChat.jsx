import React from 'react';
import io from 'socket.io-client';
import {connect} from 'react-redux'
import {editChat} from '../actions/chat'
import ChatDetails from '../components/ChatDetails';
import '../styles/PrivateChat.css';

const socket = io('http://localhost:3005/');


class PrivateChat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text:'',
            display:'0',
            friend: props.chat.friends.find((friend) => friend !== props.username)
        }
        socket.on('createMsg', (msg) => {
            this.props.dispatch(editChat(this.props.chat._id, msg));
            window.scrollTo(0,document.body.scrollHeight);
        })
        socket.on('type-show', ({show}) => {
            if(show) {
                this.setState({display:'1'})
            } else {
                setTimeout(() => {
                    this.setState({display:'0'})
                }, 1600)
            }
        })  
    }
    componentDidMount() {
        window.scrollTo(0,document.body.scrollHeight);
        socket.emit('join', {
            joinId: this.props.chat.unique
        })
    }
    handleKeyUp = e => {
        socket.emit('type', {
            show:false,
            id:this.props.chat.unique
        });
    }
    handleKeyDown = e => {
        socket.emit('type', {
            show:true,
            id:this.props.chat.unique
        });
    }
    handleChange = e => {
        this.setState({text:e.target.value});
    }
    handleMsg = e => {
        e.preventDefault();
        const text = this.state.text;
        socket.emit('msg', {
            id:this.props.chat._id,
            from:this.props.username,
            text,
            createdAt:'10:00Pm',
            unique:this.props.chat.unique
        })
        this.setState({text:''});
    }
    render() {
        window.scrollTo(0,document.body.scrollHeight);
        return(
            <div>
                <div style={{marginBottom:'5rem'}}>
                {
                    this.props.chat.chat.map((talk) => <ChatDetails key={talk._id} {...talk} />)
                }
                </div>
                <p className='type' style={{
                    opacity:this.state.display,
                    transitionProperty:'all',
                    transitionDuration:'0.6s'
                }}>{`${this.state.friend} is typing`}</p>
                <form onSubmit={this.handleMsg}>
                <div className='sender'>
                    <div className='control' id='in'>
                            <input 
                            type="text"
                            value={this.state.text}
                            onChange={this.handleChange}
                            className='input'
                            autoFocus
                            onKeyDown={this.handleKeyDown}
                            onKeyUp={this.handleKeyUp}
                            />
                    </div>
                    <button type='submit' style={{marginLeft:'5px'}} className='button'>Send</button>
                </div>
                </form>
            </div>
        )
    }
}
const mapStateToProps = (state, props) => {
    return {
        username: state.auth.user && state.auth.user.username,
        chat: state.chats.find((chat) => chat._id === props.match.params.id)
    }
}
export default connect(mapStateToProps)(PrivateChat);