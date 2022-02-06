import React, { Component } from 'react';
import PropTypes from 'prop-types'
import News_Item from './News_Item';
import { Spinner_heading, Spinner_loading } from './Animations';
export class News extends Component {
  static propTypes = {
    pageSize: PropTypes.number.isRequired,
    country: PropTypes.string.isRequired,
    requirement: PropTypes.string.isRequired,
    category : PropTypes.string.isRequired
  }
  static defaultProps = {
    pageSize: 20,
    country: "in",
    requirement: "top-headlines",
    category : "general"
  }

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: true,
      page: 1 
    }
  }

  fetch_page_content = async (state_changing_obj) => {
    let { page = this.state.page } = state_changing_obj;
    let url = `https://newsapi.org/v2/${this.props.requirement}?country=${this.props.country}&category=${this.props.category}&apiKey=234bbe53471d48ebb25a9f0428ce55dc&page=${page}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data = await fetch(url);
    let parsed_data = await data.json();
    this.setState({ articles: parsed_data.articles, total_results: parsed_data.totalResults, page: page ,loading:false})
  }

  componentDidMount() {
    this.fetch_page_content(this.setState)
  }

  handle_prev_click = () => {
    let passing_obj = { page: this.state.page - 1 }
    this.fetch_page_content(passing_obj)
  }

  handle_next_click = async () => {
    if (!(this.state.page + 1 > Math.ceil(this.state.total_results / this.props.pageSize))) {
      let passing_obj = { page: this.state.page + 1 }
      this.fetch_page_content(passing_obj)
    }
  }

  render() {
    return (
      <div className='container p-3'>
        <Spinner_heading />
        <h2>News Monkey - Top Headlines</h2>
        <div className="row">

          {this.state.loading && <div className="text-center m-3 p-3"> <Spinner_loading /> </div>}

          {!this.state.loading && this.state.articles.map(({ title, description, urlToImage, url , publishedAt , source:{name}}) => {
            return <div className="col-md-4" key={url} >
              <News_Item title={title ? `${title.slice(0, 30)}....` : null} description={description ? `${description.slice(0, 60)}....` : null} image_url={urlToImage ? urlToImage : "https://images.moneycontrol.com/static-mcnews/this.props.pageSizethis.props.pageSize/01/BSE_Sensex_Stocks_market-770x433.png"} news_url={url} publishedAt={publishedAt} name={name}/>
            </div>
          })}
        </div>
        <div className="container m-3 p-3">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark float-start" onClick={this.handle_prev_click}>&larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.total_results / this.props.pageSize)} type="button" className="btn btn-dark float-end read_more-btn" onClick={this.handle_next_click}>Next &rarr;</button>
        </div>
      </div>
    );
  }
}

export default News;
