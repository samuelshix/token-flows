import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Collapse from 'react-bootstrap/Collapse';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
class SearchForm extends React.Component {
  constructor(props) {
    const nowTimestamp = Date.now()
    super(props);
    this.defaultEnd = (new Date(nowTimestamp)).toLocaleDateString()
    this.defaultStart = (new Date(nowTimestamp - 604800000)).toLocaleDateString
      ()
    this.state = {
      address: '',
      tx: '',
      startDate: '',
      blockchain: 'ethereum',
      endDate: '',
      checked: true,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBlockchainSelect = this.handleBlockchainSelect.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.handlePickerEvent = this.handlePickerEvent.bind(this)
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  handleBlockchainSelect(event) {
    this.setState({
      [event.target.name]: !this.state.checked
    })
  }
  componentDidMount() {
    this.setState({
      startDate: this.defaultStart,
      endDate: this.defaultEnd
    })
  }
  handlePickerEvent(event, picker) {
    if (event.type === 'apply') {
      this.setState({
        startDate: picker.startDate.format("X"),
        endDate: picker.endDate.format("X")
      })
    }
    if (event.type === 'cancel') {
      this.setState({
        startDate: '',
        endDate: ''
      })
    }
    console.log(event)
  }
  onFormSubmit(event) {
    this.state.blockchain = this.state.checked ? 'ethereum' : 'solana'
    this.props.childToParent(this.state)
    event.preventDefault();
  }
  collapseToggle = () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        {/* <p style={{ color: 'white', margin: 'auto auto', marginRight: '-1em', fontSize: '1.1em', fontWeight: '700', color: 'rgb(214, 214, 214)' }}>Select Blockchain</p> */}
        <Form onSubmit={this.onFormSubmit} className="form" >
          <div className="switch-parent">
            <p>Ethereum</p>
            <label className="switch">
              <input type="checkbox" onChange={this.handleBlockchainSelect} name="checked" checked={this.checked} />
              <span className="slider round"></span>
            </label>
            <p>Solana</p>
          </div>
          <div>
            <Button
              onClick={() => setOpen(!open)}
              aria-controls="collapse-form-1"
              aria-expanded={open}
              variant="outline-dark"
              className="track-btn"
            >Track tokens
            </Button>
            <Collapse in={open}>
              <div id="collapse-form-1">
                <div id="collapse-form">

                  <DateRangePicker
                    initialSettings={{ startDate: this.defaultStart, endDate: this.defaultEnd, maxSpan: { days: 7 } }}
                    name="date"
                    onEvent={this.handlePickerEvent}
                  >

                    <Button variant="outline-light" className="datepicker-btn">Choose date
                      {this.state.startDate &&
                        <p>{`${this.defaultStart} | 
                ${this.defaultEnd}`}</p>
                      }
                    </Button>
                  </DateRangePicker>
                  <Form.Control
                    name="address"
                    type="search"
                    placeholder="Sender Address"
                    aria-label="Sender Address"
                    value={this.state.address}
                    onChange={this.handleInputChange}
                  />
                  <Button className="search-btn" type="submit" bg="light" variant="outline-light">Search</Button>
                </div>
              </div>
            </Collapse>
          </div>
        </Form>

      </>
    )
  }
  render() {
    return (
      <div className='searchContainer'>
        <this.collapseToggle />
      </div>
    )
  }
}
export default SearchForm