import React, { Component } from 'react';

export class News_Item extends Component {
    render() {
        let { title, description } = this.props; // using object destructuring
        return (
                <div className="card m-3" style={{width:"18rem"}}>
                    <img src="https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg" className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">{title}</h5>
                            <p className="card-text">{description}</p>
                            <a href="/" className="btn btn-primary">Go somewhere</a>
                        </div>
                </div>

        );
    }
}
export default News_Item;
