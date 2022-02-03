import React, { Component } from 'react';

export class News_Item extends Component {
    constructor() {
        super(); // if we make a constructor then we have to call surely the super in react otherwise we will get error.
        console.log("constructor") // all the items will call constructor. Now three items are their so 3 times this function will run
        // constructor will run everytime when object are made of this class.
    }
    render() {
        let { title, description, image_url } = this.props; // using object destructuring
        return (
            <div className="card m-3" style={{ width: "18rem" }}>
                <img src={image_url} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <a href="/" className="btn btn-sm btn-primary">Read More...</a>
                </div>
            </div>

        );
    }
}
export default News_Item;
