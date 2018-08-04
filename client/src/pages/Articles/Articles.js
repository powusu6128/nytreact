import React, { Component } from "react";
import * as DeleteBtn from "../../components/DeleteBtn";
import SaveBtn from "../../components/SavedBtn/SavedBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";
import moment from "moment";

class Article extends Component {

  state = {
    articles: [],
    NYTResults: [],
    topic: "",
    from: "",
    to: ""
  };


  componentDidMount() {
    this.loadArticles();
    this.getOnlineNYTArticles("Trump", "20170101", "20180101");
  }

  getOnlineNYTArticles(topic, from, to){
    var component = this;

    API.getNYTArticles(topic, from, to)
    .then((res) => {

      if(res){
    var data = [];
      for (var i=0; i<(5>res.data.response.docs.length ? (res.data.response.docs.length) : 5); i++){
      var url = res.data.response.docs[i].web_url;
      var title = res.data.response.docs[i].headline.main;
      var pub_date = res.data.response.docs[i].pub_date;
      var id = res.data.response.docs[i]._id;
      var newdata = {
        _id: id,
        title: title,
        url: url,
        pub_date: pub_date
      }
      data.push(newdata);
      }
      this.setState({NYTResults: data});
      // console.log(data); 
    }
  }); 
 ;
  }

  loadArticles(){
    API.getArticles()
    .then(res =>
      this.setState({ articles: res.data, topic: "", from: "", to: ""})
    )
    .catch(err => console.log(err));
  }

  deleteArticle = id => {
    API.deleteArticle(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };


  createNewArticle = (title, url) => {
    // console.log(url);
    API.saveArticle({
      title: title,
      url: url,
      date: Date.now()
    })
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  }


  handleSearchNYT = event => {
    event.preventDefault();
    if (this.state.topic && this.state.from && this.state.to) {
      // console.log(moment(this.state.from).format("YYYYMMDD"));
      this.getOnlineNYTArticles(this.state.topic, moment(this.state.from).format("YYYYMMDD"), moment(this.state.to).format("YYYYMMDD"));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>New York Times Article Scrubber</h1>
              <p>Search for an annotate articles of interest!</p>
            </Jumbotron>
            <form>
              {/* this part is the: Topic Input */}
              <Input
                value={this.state.topic}
                onChange={this.handleInputChange}
                name="topic"
                placeholder="Topic"
              />
              {/* this part is the: From Input */}
              <Input
                value={this.state.from}
                onChange={this.handleInputChange}
                name="from"
                placeholder="From Year"
              />
              {/* this part is the: To Input */}
              <Input
                value={this.state.to}
                onChange={this.handleInputChange}
                name="to"
                placeholder="To Year"
              />
             
              <FormBtn
                disabled={!(this.state.topic && this.state.from && this.state.to)}
                onClick={this.handleSearchNYT}
              >
                Search NYT
              </FormBtn>
            </form>
          </Col>
          </Row>
          {/* {console.log(this.state.NYTResults)} */}
          {this.state.NYTResults.length ? (
          <Row>
            <Col size="md-12 sm-12">
            <p>5 Search Results:</p>
            <List>
            {this.state.NYTResults.map(article => (
                  <ListItem key={article._id}>
                    <Link to={article.url} target="_blank">
                      <strong>
                        {article.title} 
                        <br />{article.url} 
                        <br />Published at: {moment(article.pub_date).format("d/m/Y")}
                      </strong>
                    </Link>
                    <SaveBtn onClick={() => this.createNewArticle(article.title, article.url)} />
                  </ListItem>
                ))}
            </List>
          </Col>
          </Row>
          ) : (
            <p>Write a topic and from Year and To Year and click Search!</p>
            )}
          <Row>
          <Col size="md-12 sm-12">
            <Jumbotron>
              <h1>Saved Articles</h1>
            </Jumbotron>
              {this.state.articles.length ? (
              <List>
                {this.state.articles.map(article => (
                  <ListItem key={article._id}>
                    <Link to={article.url} target="_blank">
                      <strong>
                        Title: {article.title} 
                        <br/>Link: {article.url} 
                        <br/>Saved at: {moment(article.date).format("d/m/Y")}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteArticle(article._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Article;