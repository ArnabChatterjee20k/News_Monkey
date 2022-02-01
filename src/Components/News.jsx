import React, { Component } from 'react';
import News_Item from './News_Item';

export class News extends Component {
  render() {
    return (
      <div>
        This is a news component
        <News_Item />
      </div>
    );
  }
}

export default News;
