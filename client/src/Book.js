import React,{Component} from 'react';
import axios from 'axios';
import './Homepage.css';
import Input from './component/input/input';
import { Redirect } from 'react-router';

class Books extends Component{
    constructor(props) {
        super();
        this.state = {


            bookitems: [],
            reviewitems: [],
            Review:"",
            date:new Date()

        };

    }

    DeleteReview=(title,review,date,author)=>{
        var data= {
            Review: review,
            Title: title,
            Date: date,
            Author:author,
        }
        axios.post('http://54.234.105.29:8181/DeleteReview', data)
            .then(res => {
                if (res.data == 'Review Deleted') {
                    alert('Review deleted on' + ' '  + title);
                    this.props.history.push('/home')

                }
            })
            .catch((error) => {
                console.log("Error");
            });
    }
    EditReview=(title,author, review,pdate,newreview,date)=>{
        var data= {
            Review: review,
            Title: title,
            NewReview: newreview,
            date: date,
            Author:author,
            pdate:pdate,
        }
        axios
            .post("http://54.234.105.29:8181/EditReview", data)

            .then(res => {
                if (res.data === 'Review Edited')
                    this.props.history.push('/home');


            })
            .catch((error) => {
                console.log("Error");
            });
    }
    AddReview=(title, author,comment,date)=>{
        var data={
            Review:comment,
            Title:title,
            Author:author,
            Date:date,
        }
        if (comment ==" "){
            alert("Empty review!! not valid")
            this.props.history.push('/book');

        }
        else {
            axios.post('http://54.234.105.29:8181/addReview', data)
                .then(res => {
                    console.log(comment);
                    console.log(res.data);
                    if (res.data === 'Comment Added') {
                        alert('Review added on' + ' ' + 'book' + ' ' + title);
                        this.props.history.push('/home');
                    }
                })
                .catch((error) => {
                    console.log("Error");
                });
        }
    }
    ViewReview=(title, author)=>{
        axios
            .get("http://54.234.105.29:8181/viewReview", {
                params: {
                    Title:title
                }
            })
            .then(res => {
                console.log(res.data);
                this.setState({ reviewitems: res.data });
            })
            .catch(error => {
                console.log("Error");
            });

    };


    componentDidMount(){
        axios.get("http://54.234.105.29:8181/getbook")
            .then(res=>{


                this.setState({bookitems:res.data});
                window.result = res.data;
                console.log(window.result);
            })
        this.props.history.push('/book');

        console.log(this.props.history.location);

    }
    onChange = date => this.setState({ date })
    render(

    ){


        return(
            <div>

                { this.props.history.location.pathname === "/book" && <div className = 'SearchOutput' >
                    <div className="searchhead search" >
                        <div>Title</div>
                        <div>Author</div>
                        <div> Add Comments</div>
                        <div> Review Comments</div>
                        <div></div>
                    </div>
                    {this.state.bookitems.map((item, index) => {
                        console.log(item);
                        return (
                            <div className="search" >
                                <div>{item.bookname}</div>
                                <div>{item.author}</div>
                                <div>
                                    <Input
                                        inputSize="inputSmall"
                                        type="text"
                                        placeholder='Review'
                                        value={this.state.Review}
                                        changed={e => this.setState({ Review: e.target.value })}
                                    />
                                      <br/>&nbsp;&nbsp;&nbsp;


                                    <button onClick={() => this.AddReview(item.bookname, item.author,this.state.Review,this.state.date)}>
                                    Add Review</button></div>
                                <div>


                                    <button onClick={() => this.ViewReview(item.bookname, item.author)}>
                                        View Review</button></div>


                            </div>


                        );

                    })}
                </div>
                }
                { this.props.history.location.pathname === "/book" && <div className = 'comment '>

                    {this.state.reviewitems.map((item, index) => {
                        console.log(item);
                        return (
                            <div className="shift"  >
                               <div>{item.review}</div>
                                <div>{item.date}</div>


                               <div>
                                   <Input
                                       inputSize="inputSmall"
                                       type="text"
                                       placeholder='Review'
                                       value={this.state.newreview}
                                       changed={e => this.setState({ newreview: e.target.value })}
                                   />
                                   <br/>&nbsp;&nbsp;&nbsp;<br/>&nbsp;&nbsp;&nbsp;<br/>&nbsp;&nbsp;&nbsp;<br/>&nbsp;&nbsp;&nbsp;
                                   <button onClick={() => this.EditReview(item.bookname, item.author,item.review,item.date,this.state.newreview,this.state.date)}>Edit Review</button></div>
                            <div>&nbsp;&nbsp;&nbsp;<br/>&nbsp;&nbsp;&nbsp;<br/>&nbsp;&nbsp;&nbsp;
                                <button onClick={() => this.DeleteReview(item.bookname, item.review,item.date,item.author)}>Delete this Review</button></div>
                            </div>
                        )
                    })}
                </div>
                }

            </div>

        );
    }
}
export default Books;
