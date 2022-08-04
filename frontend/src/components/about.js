import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';
import Footer from './footer';
const About = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid className="">
          <LinkContainer to="/"><Navbar.Brand href=".aboutSummary" className="title">kash-flows</Navbar.Brand></LinkContainer>
          <div style={{ alignItems: "center", display: "flex" }}>
            <a href="https://github.com/samuelshix/token-flows" target="_blank"><i className="fa fa-github" style={{ fontSize: "30px", marginRight: ".5em" }}></i></a>
            <LinkContainer to="/app"><Button className="btn-outline-dark"><a href="#aboutNav">App</a></Button></LinkContainer>
          </div>
        </Container>
      </Navbar>
      <Row id="about">
        <Col md={8}>
          <h1>The quick and easy crypto transaction visualizer!</h1>
          <LinkContainer to="/app"><Button className='btn-outline-dark'>Start Tracking!</Button></LinkContainer>
          <h4>Follow the trail of Ethereum tokens from one wallet to another, including intermediaries!</h4>
          <Card>
            <Card.Body style={{ textAlign: 'left' }}>
              <div className="about-grid">
                <div className="full">
                  <h1>About</h1>
                  <p>Kash-flows allows you to visualize the flow of Ethereum tokens from one wallet to another, as well as from transactions from subsequent wallets.</p>
                </div>
                <div className="full">
                  <h5>How to Use</h5>
                  <p>Users can either choose to view the flow of tokens within a specific time range, or leave the date field blank in order to track the entire history of a wallet.</p>
                </div>
                <div>
                  <b>Stacked Transactions: </b>
                  <p>
                    Stacked transactions indicate multiple transactions between addresses, which may be expanded on click.</p>
                </div>
                <div>
                  <b>Viewport Tools: </b>
                  <p>Users may reposition wallet nodes if the visualization becomes too cluttered or confusing by clicking and dragging.</p>
                </div>
                <i><b>Note:</b> Only transactions involving outgoing transfer of tokens are tracked, and loading may take up to 30 seconds based on the length of timeframe and activity of wallet.</i>
                <div className="full">
                  <b>Limiting: </b>
                  <p>Due to API rate limiting and the large amount of data processing for exponentially larger trees of token flows, loading may take some time, and the number of transactions per address (the width of the tree) as well as how deeply the query will explore (the height of the tree) is limited. </p>
                </div>
              </div>


              <hr /><b>Click 'Track tokens' to get started!</b>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Footer />
    </>
  )
}
export default About