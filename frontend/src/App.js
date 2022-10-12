import About from './components/about';
import './App.css';
import React, { useState } from "react"
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import SearchForm from './components/searchForm';
import { LinkContainer } from 'react-router-bootstrap';
import Data from './components/data';
import Footer from './components/footer';
function App({ about }) {
  const [data, setData] = useState('')
  const childToParent = (data) => {
    setData(data)
  }

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid className="">
          <LinkContainer to="/"><Navbar.Brand href=".aboutSummary" className="title">Token Flows</Navbar.Brand></LinkContainer>
          <SearchForm childToParent={childToParent} />
        </Container>
      </Navbar>
      <Data address={data.address} tx={data.tx} startDate={data.startDate} endDate={data.endDate} />
      <Footer />

    </div>
  );
}

export default App;
