import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import News_Item from './News_Item';
import { Spinner_heading, Spinner_loading } from './Animations';
import InfiniteScroll from "react-infinite-scroll-component";
export function News(props) {

  const [Articles, setArticles] = useState([]);
  const [Total_Results, setTotal_Results] = useState(0);
  const [Loading, setLoading] = useState(true);
  const [Page, setPage] = useState(1);


  const fetch_page_content = async (state_changing_obj) => {
    props.setProgress(20)
    let { page = Page } = state_changing_obj;
    let url = `https://newsapi.org/v2/${props.requirement}?country=${props.country}&category=${props.category}&apiKey=${props.api_key}&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsed_data = await data.json();
    let parsed_articles = parsed_data.articles
    props.setProgress(100)
    return { state: { articles: Articles, total_results: parsed_data.totalResults, page: page, loading: false }, parsed_articles: parsed_articles }
    // a promise will be returned as it is an async function. You have to manually set the state using state and parsed_articles identifier
  }

  function setting_hooks({ articles = Articles, loading = Loading, page = Page, total_results = Total_Results } = {}) {
    setArticles(articles)
    setLoading(loading)
    setPage(page)
    setTotal_Results(total_results)

  }
  useEffect(() => {
    const page_content = fetch_page_content({ page: Page })
    page_content.then((result) => {
      let { state, parsed_articles } = result;
      state.articles = parsed_articles;
      setting_hooks({ articles: state.articles, loading: state.loading, page: state.page, total_results: state.total_results })
    })
  }, []); // Not providing Article or any dependency here as the state variables are continuously are changing so the effect will be invoked everytime after every render. 
  // Provided an empty array so effect invoked once.
  // If you omit the argument or if you dont use argument of dependency then it will be same as the first one.

  const fetchMoreData = () => {
    let func = fetch_page_content({ page: Page + 1 })
    func.then((result_promise) => {
      let { state, parsed_articles } = result_promise;
      setting_hooks({ articles: state.articles.concat(parsed_articles), loading: state.loading, page: state.page, total_results: state.total_results  })
    })
  }

  return (
    <InfiniteScroll
      dataLength={Articles.length}
      next={fetchMoreData}
      hasMore={Articles.length !== Total_Results}
      loader={<div className='text-center my-3'><Spinner_loading /></div>}
    >
      {/* we have to use a container inside infinite scroll otherwise a horizontal scroll bar is appearing */}
      <div className='container p-3'>
        <Spinner_heading />
        <h2>News Monkey - Top Headlines</h2>
        {Loading && <div className='text-center my-3'><Spinner_loading /></div>}
        <div className="row">
          {Articles.map(({ title, description, urlToImage, url, publishedAt, source: { name } }) => {
            return <div className="col-md-4" key={url} >
              <News_Item title={title ? `${title.slice(0, 30)}....` : null} description={description ? `${description.slice(0, 60)}....` : null} image_url={urlToImage ? urlToImage : "https://images.moneycontrol.com/static-mcnews/props.pageSizeprops.pageSize/01/BSE_Sensex_Stocks_market-770x433.png"} news_url={url} publishedAt={publishedAt} name={name} />
            </div>
          })}
        </div>
      </div >
    </InfiniteScroll>
  );
}

News.propTypes = {
  pageSize: PropTypes.number.isRequired,
  country: PropTypes.string.isRequired,
  requirement: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired
}
News.defaultProps = {
  pageSize: 20,
  country: "in",
  requirement: "top-headlines",
  category: "general"
}

export default News;
