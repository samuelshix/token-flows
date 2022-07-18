import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
const About = () => {
    return(
        <Row id="about">
        <Col md={9}>
          <Card>
            <Card.Body style={{textAlign:'left'}}>
            <Card.Title>About</Card.Title>
              <p>Kash-flows allows you to visualize the flow of ERC-20 (Ethereum-based) tokens from one wallet to another on the Ethereum blockchain, as well as transactions following from subsequent recipients. The width of the lines denoting transactions is proportional to the relative value of each transaction.</p>
              <h5>How to Use</h5>
                <p>Users can either choose to view the flow of tokens within a specific time range, or leave the date field blank in order to track the entire history of a wallet.</p>
                <p><b>Stacked Transactions: </b>
                Stacked transactions indicate multiple transactions between addresses, which may be expanded on click.</p>
                <p><b>Viewport Tools: </b>Users may reposition wallet nodes if the visualization becomes too cluttered or confusing by clicking and dragging.</p>
                <i><p><b>Note:</b> Only transactions involving outgoing transfer of tokens are tracked.</p></i>
                <br></br>
                <b>Limiting: </b>
                <p>Due to API rate limiting and the large amount of data processing for exponentially larger trees of token flows, loading may take some time, and the number of transactions per address (the width of the tree) as well as how deeply the query will explore (the height of the tree) is limited. </p>
                <hr/><b>Click 'Track tokens' to get started!</b>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    )
}
export default About