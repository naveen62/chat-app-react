import React from 'react';
import {NavLink} from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux'
import '../styles/Navbar.css';
import { logout } from '../actions/auth';
import {removeChat} from '../actions/chat'
import {history} from '../routes/AppRouter'

class Navbar extends React.Component {

    handleLogout = () => {
        const token = this.props.auth.token;
        axios.post('/api/user/logout', null, {headers: {'Authorization': `${token}`}})
        .then((res) => {
            history.push('/signin')
            this.props.dispatch(logout());
            this.props.dispatch(removeChat())
            localStorage.removeItem('token')
        })
    }
    render() {
        return(
        <div className='nav'>
            <div className='nav-heading'>
                <NavLink to='/'><h1 className='is-size-5'>Chat-app</h1></NavLink>
            </div>
            <nav className='main-nav'>
                <ul className='main-nav_items'>
                    {!this.props.auth.user ?
                    [<li key={1} className='main-nav_item'><NavLink to='/signin'>Sign In</NavLink></li>,
                    <li key={2} className='main-nav_item'><NavLink to='/signup'>Sign Up</NavLink></li>]
                    : 
                    <li style={{
                        cursor:'pointer',
                        color:'white'
                    }} onClick={this.handleLogout} className='mainaction.user-nav_item'>
                        Logout
                    </li>
                    }
                </ul>
            </nav>
        </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        auth:state.auth
    }
}

export default connect(mapStateToProps)(Navbar)