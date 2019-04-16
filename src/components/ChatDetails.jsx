import React from 'react';

class ChatDetails extends React.Component {

    render() {
        return (
        <div>
            <p style={{fontWeight:'bold'}} className='is-size-5'>
            {this.props.from} 
            <span className='is-size-6'> {this.props.created}</span>
            </p>
            <p>{this.props.text}</p>
        </div>
        )
    }
}
export default ChatDetails;