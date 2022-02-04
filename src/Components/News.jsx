import React, { Component } from 'react';
import News_Item from './News_Item';

export class News extends Component {
  articles = [{
    "source": {
      "id": "espn-cric-info",
      "name": "ESPN Cric Info"
    },
    "author": null,
    "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
    "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
    "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
    "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
    "publishedAt": "2020-04-27T11:41:47Z",
    "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
  },
  {
    "source": {
      "id": "espn-cric-info",
      "name": "ESPN Cric Info"
    },
    "author": null,
    "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
    "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
    "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
    "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
    "publishedAt": "2020-03-30T15:26:05Z",
    "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
  }
  ]
  constructor() {
    super();
    console.log("I am a constructor from News Component")
    this.state = {
      articles: this.articles,
      loading: false
    }
  }

  async componentDidMount(){
    // It will run always after the component is rendered on the screen
    console.log("componentDidMount ran")
    let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=5e7a8ec386ee44b292ebeb2437cba363";
    let data = await fetch(url); // waiting for the promise to get resolved
    let parsed_data = await data.json() ; // waiting for the data to get parsed
    console.log(parsed_data)
    this.setState({articles : parsed_data.articles})
  }
  render() {
    console.log("Render ran")
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
