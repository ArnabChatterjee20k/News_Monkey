import React, { Component } from 'react';
import News_Item from './News_Item';

export class News extends Component {
  render() {
    return (
      <div className='container m-3 p-2'>
        <h2>News Monkey - Top Headlines</h2>
        <div className="row">
          
          <div className="col-md-4">
            <News_Item title="arnab" description="news" />
          </div>

          <div className="col-md-4">
            <News_Item title="arnab" description="news" />
          </div>

          <div className="col-md-4">
            <News_Item title="arnab" description="news" />
          </div>

        </div>
      </div>
    );
  }
}

export default News;
