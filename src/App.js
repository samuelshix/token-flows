import About from './components/about';
import './App.css';
import { OrgChartTree } from './components/chart'
import React, { useEffect, useState } from "react"
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import SearchForm from './components/searchForm';
import axios from 'axios';
import LoadingSpinner from './components/loadingSpinner';

function Data(props) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const djangoCall = async (address, tx, startDate, endDate) => {
      setIsLoading(true);
      setHasError(false);
      if (!tx) {
        tx = 'none'
      }
      axios.get(`https://kashflows.herokuapp.com/api/?address=${address}&tx=${tx}&startDate=${startDate}&endDate=${endDate}`)
        .then(res => {
          setChartData(res.data)
          setIsLoading(false);
        }).catch(err => {
          setHasError(true)
          setIsLoading(false);
        })
    }
    if (props.address) {
      djangoCall(props.address, props.tx, props.startDate, props.endDate)
    }
  }, [props]);

  const [chartData, setChartData] = useState({})
  return (
    <div>
      {isLoading && <LoadingSpinner />}
      <Container fluid className="aboutSummary">
        {hasError && <Alert key='danger' variant='danger'>Error: incorrect address format</Alert>}
        <Row>
          <Col md={7}>
            <Card>
              <Card.Body>
                Kash-flows allows you to track the flow of cryptocurrency from one wallet to another. See below for an example. For more information on how to use this tool, visit 'About'.<br /><hr /><b>Click 'Track tokens' to get started!</b>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <OrgChartTree chartData={chartData} />
    </div>
  )
}

function App({ about }) {
  const [data, setData] = useState('')
  const childToParent = (data) => {
    setData(data)
  }

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid className="">
          <SearchForm childToParent={childToParent} />
          <Navbar.Brand href=".aboutSummary" className="title">Kash-flows</Navbar.Brand>
          <Navbar.Text><a href="#aboutNav">About</a></Navbar.Text>
        </Container>
      </Navbar>
      <Data address={data.address} tx={data.tx} startDate={data.startDate} endDate={data.endDate} />
      <div id="aboutNav">-</div>
      <About />
      <Card className='footer'>
        <Card.Body>
          Developed by<a href='https://www.intellabridge.com' target='_blank'> Kash Inc.</a>
        </Card.Body>
      </Card>
    </div>
  );
}

export default App;
