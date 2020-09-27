import React,{Component} from 'react';
import axios from 'axios';
import './Homepage.css';
import Input from './component/input/input'

class UserProfile extends Component{
    constructor(props) {
        super();
        this.state = {


            users: [],

        };

    }


    componentDidMount(){
        axios.get("http://54.234.105.29/getusers")
            .then(res=>{


                this.setState({users:res.data});
                window.result = res.data;
                console.log(window.result);
            })
        this.props.history.push('/user-profile');

        console.log(this.props.history.location);

    }
    render(){

        return(
            <div>

                { this.props.history.location.pathname === "/user-profile" && <div className = 'SearchOutput' >
                    <div className="searchhead search" >
                        <div>Name</div>
                        <div>Email</div>
                        <div> Address</div>

                    </div>
                    {this.state.users.map((item, index) => {
                        console.log(item);
                        return (
                            <div className="search" >
                                <div>{item.name}</div>
                                <div>{item.email}</div>
                                <div>{item.address}</div>
                                <div>{item.about}</div>



                            </div>


                        );

                    })}
                </div>
                }


            </div>


        );
    }
}
export default UserProfile;
