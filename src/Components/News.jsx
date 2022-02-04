import React, { Component } from 'react';
import News_Item from './News_Item';

export class News extends Component {
  constructor() {
    super();

    this.state = {
      articles: [],
      loading: false,
      page: 1 // page number by default 1
    }
  }

  fetch_page_content = async (state_changing_obj) => {
    let { page = this.state.page } = state_changing_obj; // setting default value of page if page not passed
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=5e7a8ec386ee44b292ebeb2437cba363&page=${page}&pageSize=20`;
    let data = await fetch(url);
    let parsed_data = await data.json();
    this.setState({ articles: parsed_data.articles, total_results: parsed_data.totalResults, page: page })
  }

  componentDidMount() {
    this.fetch_page_content(this.setState)
  }

  handle_prev_click = () => {
    let passing_obj = { page: this.state.page - 1 }
    this.fetch_page_content(passing_obj)
  }

  handle_next_click = async () => {
    if (!(this.state.page + 1 > Math.ceil(this.state.total_results / 20))) { // checking ending of the page
      let passing_obj = { page: this.state.page + 1 }
      this.fetch_page_content(passing_obj)
    }
    // console.log(this.state.page) it is giving previous result due to asynchronous nature of js. While state is getting change console is showing the previous value.
  }

  render() {
    return (
      <div className='container p-3'>
        <h2>News Monkey - Top Headlines</h2>
        <div className="row">
          {this.state.articles.map(({ title, description, urlToImage, url }) => {
            return <div className="col-md-4" key={url} >
              <News_Item title={title ? `${title.slice(0, 30)}....` : null} description={description ? `${description.slice(0, 60)}....` : null} image_url={urlToImage ? urlToImage : "https://images.moneycontrol.com/static-mcnews/2020/01/BSE_Sensex_Stocks_market-770x433.png"} news_url={url} /> {/* handled the null condition  using ternary operator*/}
            </div>
          })}
        </div>
        <div className="container m-3 p-3">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-warning float-start" onClick={this.handle_prev_click}>&larr; Previous</button>
          <button type="button" className="btn btn-warning float-end" onClick={this.handle_next_click}>Next &rarr;</button>
        </div>
      </div>
    );
  }
}

export default News;
