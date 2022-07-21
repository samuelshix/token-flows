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
    this.defaultStart = (new Date(nowTimestamp - 604800000)).toLocaleDateString()
    this.state = {
      address: '',
      tx: '',
      startDate: '',
      endDate: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.handlePickerEvent = this.handlePickerEvent.bind(this)
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
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
    const { address, tx } = this.state
    this.props.childToParent(this.state)
    event.preventDefault();
  }
  collapseToggle = () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <div>
          <Button
            onClick={() => setOpen(!open)}
            aria-controls="collapse-form-1"
            aria-expanded={open}
            variant="outline-light"
            className="track-btn"
          >Track tokens
          </Button>
          <Collapse in={open}>
            <div id="collapse-form-1">
              <Form onSubmit={this.onFormSubmit} className="" id="collapse-form">

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
              </Form>
            </div>
          </Collapse>
        </div>
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