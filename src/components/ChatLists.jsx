import React from 'react';
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'

class ChatList extends React.Component {

    render() {
        return(
            <ul className='chat-items'>
                {
                    this.props.chats.map((chat) => <li key={chat._id} className='chat-item'>
                    <NavLink  to={`/chat/${chat._id}`}>
                    <p>{chat.friends.find((friend) => friend !== this.props.user)}</p>
                    </NavLink>
                </li> )
                }
            </ul>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        chats: state.chats,
        user: state.auth.user && state.auth.user.username
    }
}
export default connect(mapStateToProps)(ChatList)



                 
            