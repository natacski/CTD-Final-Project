import React, { useState, useEffect } from 'react';
import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
import { Col, Card, Accordion, Row } from 'react-bootstrap';

const NewsPage = () => {
  // API url
  const url = 'https://cors-anywhere.herokuapp.com/http://feeds.feedburner.com/TechCrunch/';

  // Declare a new state variable
  const [news, setNews] = useState([]);


  // Fetching data from API
  const getNews = async () => {
    const text = await fetch(url).then((r) => r.text());
    const xmlDoc = new DOMParser().parseFromString(text, 'text/xml');
  // Mapping through data items and limiting to display five
    const items = Array.from(xmlDoc.querySelectorAll("item")).slice(0,5).map(
      (item) => ({
        link: item.querySelector('link').textContent,
        title: item.querySelector('title').textContent,
        description: item.querySelector('description').childNodes[0]
          .data,
      }),
    );
    console.log(items);
    return items;
  };

  useEffect(() => {
    getNews().then((items) => {
      setNews(items);
    });
  }, []);

  return (
    <div style={{ margin: 30 }}>
      <div>
        <Row>
          <Col></Col>
          <Col xs={12} md={8}>
            <h1>News</h1>
            {news.length === 0 && <p>Loading...</p>}
            {news.map((item) => (
              <Accordion defaultActiveKey="0">
                <Card>
                  <Accordion.Toggle as={Card.Header} key={item.title}>
                    <a
                      style={{ textDecoration: 'none' }}
                      target="_blank"
                      href={item.link}
                    >
                      <h5>{item.title}</h5>
                    </a>
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: item.description,
                        }}
                      />
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            ))}
          </Col>

          <Col></Col>
        </Row>
      </div>
    </div>
  );
};

const condition = (authUser) => !!authUser;

export default withFirebase(withAuthorization(condition)(NewsPage));
