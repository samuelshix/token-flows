import logo from './logo.svg';
import './App.css';
import {OrgChartTree} from './components/chart'
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

  useEffect(()=> {
    // var ADDRESS = (!props.address) ? '0xDc1487E092CaBA080C6BADafAa75a58Ce7a2EC34' : String(props.tx).trim()
    // var TX = (!props.tx) ? '0xabba82a41c866f181eba449fb47247077b1ff0bc9f47215944264dd02688aa09' : String(props.tx).trim()
    // var afterBlock;
    // var processed = {
    //   name: ADDRESS.slice(0,6),
    //   children: []
    // };

    const djangoCall = async (address, tx, startDate, endDate) => {
      setIsLoading(true);
      setHasError(false);
      if(!tx) {
        tx='none'
      }
      axios.get(`http://localhost:8000/api/?address=${address}&tx=${tx}&startDate=${startDate}&endDate=${endDate}`)
      // , {
      //   headers: {
      //     'Access-Control-Allow-Origin': 'http://localhost:3000',
      //     'Access-Control-Allow-Credentials': 'true'
      //   }
      .then(res => {
        console.log(res.data)
        setChartData(res.data)
        setIsLoading(false);
      }).catch(err=>{
        setHasError(true)
        setIsLoading(false);
      })
    }
    if(props.address) {
      djangoCall(props.address, props.tx, props.startDate, props.endDate)
    }
  }, [props]);
  const [chartData, setChartData] = useState({}) 
  return (
    <div>
    <Container fluid>
    {hasError && <Alert key='danger' variant='danger'>Error: incorrect address format</Alert>}
    {isLoading && <LoadingSpinner/>}
    <Row>
      <Col md={5}>
        <Card>
          <Card.Body>
          <Card.Title>
            Kash-flows allows you to track the flow of cryptocurrency on Ethereum from one wallet to another. <b>Click 'Track tokens' to get started!</b></Card.Title>
            </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
  <OrgChartTree chartData={chartData}/>
  </div>
  )
}

export async function getContractName(contractAddress) {
  // "https://api.etherscan.io/api?module=contract&action=getabi&address=0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413&apikey=YourApiKeyToken"
}

function App() {
  const [data, setData] = useState('')
  const childToParent = (data) => {
    console.log(data)
    setData(data)
  }
  // console.log(data)
  // const displayData = (data) => {

  // }
  // console.log(data)
  
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid className="">
        <SearchForm childToParent={childToParent}/>
          <Navbar.Brand className="title" href="#">Kash-flows</Navbar.Brand>
          <Navbar.Text href="#">About</Navbar.Text>
        </Container>   
      </Navbar>
      {/* <Navbar bg="primary" variant="dark"> */}
      {/* <Container fluid>
        <Row>
          <Col></Col>
          <Col md={8}>
          </Col>
          <Col></Col>
        </Row>
        </Container> */}
      {/* </Navbar> */}

      {/* <h2>Track Tokens:</h2> */}
      {/* <SearchForm childToParent={childToParent}/> */}
      <Data address={data.address} tx={data.tx} startDate={data.startDate} endDate={data.endDate}/>
    </div>
  );
}

export default App;
