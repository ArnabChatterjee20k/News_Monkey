import React, { Component } from 'react';
import PropTypes from 'prop-types'
import News_Item from './News_Item';
import { Spinner_heading, Spinner_loading } from './Animations';
import InfiniteScroll from "react-infinite-scroll-component";
export class News extends Component {
  static propTypes = {
    pageSize: PropTypes.number.isRequired,
    country: PropTypes.string.isRequired,
    requirement: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired
  }
  static defaultProps = {
    pageSize: 20,
    country: "in",
    requirement: "top-headlines",
    category: "general"
  }

  constructor() {
    super();
    this.state = {
      articles: [],
      total_results: 0,
      loading: true,
      page: 1
    }
  }

  fetch_page_content = async (state_changing_obj) => {
    let { page = this.state.page } = state_changing_obj;
    let url = `https://newsapi.org/v2/${this.props.requirement}?country=${this.props.country}&category=${this.props.category}&apiKey=234bbe53471d48ebb25a9f0428ce55dc&page=${page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true })
    let data = await fetch(url);
    let parsed_data = await data.json();
    let parsed_articles = parsed_data.articles
    return { state: { articles: this.state.articles, total_results: parsed_data.totalResults, page: page, loading: false }, parsed_articles: parsed_articles }
    // a promise will be returned as it is an async function. You have to manually set the state using state and parsed_articles identifier
  }

  componentDidMount() {
    let a=this.fetch_page_content(this.state)
    a.then((result_promise)=>{
      let {state,parsed_articles} = result_promise;
      state.articles = parsed_articles;
      this.setState(state)
    })
  }

  fetchMoreData = () => {
    let func =  this.fetch_page_content({ page: this.state.page + 1 })
    func.then((result_promise)=>{
      let {state,parsed_articles} = result_promise;
      state.articles = state.articles.concat(parsed_articles)
      this.setState(state)
    })
  }

  render() {
    return (
      <InfiniteScroll
        dataLength={this.state.articles.length}
        next={this.fetchMoreData}
        hasMore={this.state.articles.length !== this.state.total_results}
        loader={<div className='text-center my-3'><Spinner_loading /></div>}
      >
        {/* we have to use a container inside infinite scroll otherwise a horizontal scroll bar is appearing */}
        <div className='container p-3'>
          <Spinner_heading />
          <h2>News Monkey - Top Headlines</h2>
          <div className="row">

            {this.state.articles.map(({ title, description, urlToImage, url, publishedAt, source: { name } }) => {
              return <div className="col-md-4" key={url} >
                <News_Item title={title ? `${title.slice(0, 30)}....` : null} description={description ? `${description.slice(0, 60)}....` : null} image_url={urlToImage ? urlToImage : "https://images.moneycontrol.com/static-mcnews/this.props.pageSizethis.props.pageSize/01/BSE_Sensex_Stocks_market-770x433.png"} news_url={url} publishedAt={publishedAt} name={name} />
              </div>
            })}

          </div>
        </div >
      </InfiniteScroll>
    );
  }
}

export default News;
