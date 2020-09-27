import React, { Component } from 'react'
import axios from 'axios';
import Input from './component/input/input'
import "./Homepage.css";
import { Redirect } from 'react-router';


class Login extends Component {
    constructor(props) {
        super( );
        this.state = {
            name: "",
            pass: "",
            cpass:"",
            email:"",
            address:""
        };
    }
    SignupHandler = (e) => {
        var data = {
            name: this.state.name,
            pass: this.state.pass,
            cpass: this.state.cpass,
            email: this.state.email,
            address: this.state.address,
        };
        if(this.state.pass===this.state.cpass) {
            axios.post('http://54.234.105.29:8181/signup', data)
                .then(res => {
                    console.log(res.data);
                    if (res.data === "User registered already" ||" 1 user inserted" ) {

                        alert('Login  to use , you are  registered')
                        window.location.reload();


                    }
                })
        }
        else{
            alert("Password donot matches.")
        }


    }

    LoginHandler = (e) => {
        var data = {
            name: this.state.name,
            pass: this.state.pass,
        };

        axios.post('http://54.234.105.29:8181/login', data)
            .then(res => {
                console.log(res.data);
                if (res.data === "Verified") {
                    alert('WELCOME To READERS CORNER')
                    this.setState({redirect: true});

                }
                else{
                    this.setState({redirect: false});
                    alert('Username or password donot match');
                }
            })



    }


    render() {

        if (this.state.redirect) {
            return (
                <Redirect push to="/home"/>
            )
        }
        return (

            <div className='s'>
                <div className="main"><h1>READERS CORNER</h1></div>
                <div className="stdlogin">
                    <div className="std"> LOGIN</div>
                    <div className="names">
                        Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Input
                            inputSize="inputSall"
                            type="text"
                            value={this.state.name}
                            changed={e => this.setState({name: e.target.value})}
                        />
                    </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <br></br>

                    <div className="names">
                        Password
                        <Input
                            inputSize="inputSall"
                            type="password"
                            value={this.state.pass}
                            changed={e => this.setState({pass: e.target.value})}
                        />
                    </div>
                    <button class="button button5" onClick={this.LoginHandler}>LOGIN</button>
                </div>
                    <div className="description">
                        <div className="std">ABOUT </div>
                        <p className="about"> Welcome to Readers Corner.
                            <br/>
                            Login and review books you have read.
                            Add new books and get others' opinion. Get insights with reviews  on different books.
                            If you are not a user, signup first.
                            Get started now!!!!!!!!!!</p>
                        <div className="std"> SignUp</div>
                        <div className="names">
                            Full Name
                            <Input
                                inputSize="inputSall"
                                type="text"
                                value={this.state.name}
                                changed={e => this.setState({name: e.target.value})}
                            />
                        </div>
                        <br></br>
                        <div className="names">
                            Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Input
                                inputSize="inputSall"
                                type="text"
                                value={this.state.email}
                                changed={e => this.setState({email: e.target.value})}
                            />
                        </div>
                        <br></br>
                        <div className="names">
                            Address&nbsp;&nbsp;&nbsp;&nbsp;
                            <Input
                                inputSize="inputSall"
                                type="text"
                                value={this.state.address}
                                changed={e => this.setState({address: e.target.value})}
                            />
                        </div>
                        <br></br>
                        <div className="names">
                            Password &nbsp;
                            <Input
                                inputSize="inputSall"
                                type="password"
                                value={this.state.pass}
                                changed={e => this.setState({pass: e.target.value})}
                            />
                        </div><br/>
                        <div className="names">
                            Password &nbsp;&nbsp;
                            <Input
                                inputSize="inputSall"
                                type="password"
                                value={this.state.cpass}
                                changed={e => this.setState({cpass: e.target.value})}
                            />
                        </div>
                        <div>
                            <button className="button button5" onClick={this.SignupHandler}>Signup</button>
                        </div>



                    </div>





                </div>




        )
    }
}
export default Login;
