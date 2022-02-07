import React from 'react';
import spinner from "../Assets/Spinner.gif"
import loading from "../Assets/Loading.gif"

export function Spinner_heading () {
        return <div className='container'>
            <img src={spinner} alt="loading" />
        </div>;
}
export function Spinner_loading () {
        return <div className='container'>
            <img src={loading} alt="loading" />
        </div>;
}
