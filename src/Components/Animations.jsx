import React, { Component } from 'react';
import spinner from "../Assets/Spinner.gif"
import loading from "../Assets/Loading.gif"

export class Spinner_heading extends Component {
    render() {
        return <div className='container'>
            <img src={spinner} alt="loading" />
        </div>;
    }
}
export class Spinner_loading extends Component {
    render() {
        return <div className='container'>
            <img src={loading} alt="loading" />
        </div>;
    }
}
