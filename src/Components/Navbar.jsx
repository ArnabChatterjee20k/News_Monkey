import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
export class Navbar extends Component {
    static propTypes = {
        list_items: PropTypes.array.isRequired
    }
    static defaultProps = {
        list_items: [{ name: "Element", link: "/element-link" }]
    }
    render() {
        let nav_items = this.props.list_items;
        return <div>
            <nav className="navbar fixex-top navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand" to="/">News Monkey</Link>
                    <button className="navbar-toggler d-lg-none shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="collapsibleNavId">
                        <ul className="navbar-nav me-auto mt-2 mt-lg-0">
                            {nav_items.map(({ name, link }, index) => {
                                return <div key={index}>
                                    <li className="nav-item active">
                                        <Link className="nav-link" to={link}>{name}<span className="visually-hidden">(current)</span></Link>
                                    </li>
                                </div>
                            })}
                        </ul>
                    </div>
                </div>
            </nav>

        </div>;
    }
}

export default Navbar;
