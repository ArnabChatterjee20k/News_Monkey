import React, { Component } from 'react';
import News_Item from './News_Item';

export class News extends Component {
  constructor() {
    super();
    
    this.state = {
      articles: [],
      loading: false
    }
  }

  async componentDidMount(){
    let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=5e7a8ec386ee44b292ebeb2437cba363";
    let data = await fetch(url); 
    let parsed_data = await data.json() ; 
    
    this.setState({articles : parsed_data.articles})
  }
  render() {
    return (
      <div className='container p-3'>
        <h2>News Monkey - Top Headlines</h2>
        <div className="row">
          {this.state.articles.map(({title , description , urlToImage ,url}) => {
            return <div className="col-md-4" key={url} >
              <News_Item title={title?`${title.slice(0,30)}....`:null} description={description?`${description.slice(0,60)}....`:null} image_url={urlToImage?urlToImage:"https://images.moneycontrol.com/static-mcnews/2020/01/BSE_Sensex_Stocks_market-770x433.png"} news_url={url} /> {/* handled the null condition  using ternary operator*/}
            </div>
          })}

        </div>
      </div>
    );
  }
}

export default News;
