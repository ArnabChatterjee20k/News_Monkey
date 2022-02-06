import React, { Component } from 'react';

export class News_Item extends Component {
    render() {
        let { title, description, image_url, news_url, publishedAt, name } = this.props; // using object destructuring
        return (
            <div className="card m-3 position-relative">
                <img src={image_url} className="card-img-top card-img" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <a href={news_url} target="_blank" className="btn btn-sm btn-primary">Read More...</a>
                    <p className="card-text my-2"><small className="text-muted">Updated on {new Date(publishedAt).toGMTString()}</small></p>
                    <span className="badge position-absolute top-0 translate-middle badge rounded-pill bg-danger">
                        {name}
                    </span>
                </div>
            </div>
        );
    }
}
export default News_Item;
