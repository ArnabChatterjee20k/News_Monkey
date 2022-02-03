import React, { Component } from 'react';

export class News_Item extends Component {
    render() {
        let { title, description, image_url,news_url } = this.props; // using object destructuring
        return (
            <div className="card m-3" style={{ width: "18rem" }}>
                <img src={image_url} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <a href="/newsdetail/" className="btn btn-sm btn-primary">Read More...</a>
                </div>
            </div>

        );
    }
}
export default News_Item;
