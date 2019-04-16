import React from 'react';
import {Router, Switch, Route} from 'react-router-dom';
import {createBrowserHistory} from 'history'
import axios from 'axios';
import {connect} from 'react-redux'
import io from 'socket.io-client'
import {ToastContainer} from 'react-toastify'

import Navbar from '../components/Navbar';
import User from '../dashboard/User';
import Chat from '../dashboard/Chat';
import { login } from '../actions/auth';
import {setChat} from '../actions/chat';
import PrivateChat from '../dashboard/PrivateChat';
import 'react-toastify/dist/ReactToastify.css';
const socket = io('http://localhost:3005/');


export const history = createBrowserHistory();

class AppRouter extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            loading:true
        }
        socket.on('connect', () => {

        })
    }
    componentDidMount() {
        const token = localStorage.getItem('token');
        axios.get('/api/user/me',{headers: {'Authorization': `${token}`}})
            .then((res) => {
                const user = {user:res.data.user, token:res.data.token}
                this.props.dispatch(login(user));
                this.props.dispatch(setChat(res.data.chats))
                this.setState({loading:false});
            }).catch((err) => {
                this.setState({loading:false});
            })
    }
    render() {
        return(
            <div>
                {this.state.loading ? (
                    <h1 style={{textAlign:'center',marginTop:'2rem'}}>loading</h1>
                ) : (
                <Router history={history}>
                    <div>
                        <ToastContainer />
                        <Navbar />
                        <Switch>
                            <Route path='/' exact={true} 
                            component={(props) => <Chat {...props}/>} />
                            <Route path='/signin' exact={true} 
                            component={(props) => <User title='Sign In' {...props}/>} />
                            <Route path='/signup' exact={true} 
                            component={(props) => <User title='Sign Up' {...props} />} />
                            <Route path='/chat/:id' exact={true} component={PrivateChat}/>
                        </Switch>
                    </div>
                </Router>
                )}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        Token: state.auth.token
    }
}
export default connect(mapStateToProps)(AppRouter);