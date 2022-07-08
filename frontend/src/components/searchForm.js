import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Collapse from 'react-bootstrap/Collapse';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import LoadingSpinner from './loadingSpinner';
class SearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            address:'',
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
        // this.setState({
        //     address: event.target.value,
        //     search: event.target.value
        // })
    }
    handlePickerEvent (event, picker) {
        this.setState({
            startDate: picker.startDate.format("X"),
            endDate: picker.endDate.format("X")
        })
        // this.state.startDate = picker.startDate,
        // this.state.endDate = picker.endDate
        console.log(this.state)
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
            {/* {this.props.isLoading && <LoadingSpinner/>} */}
            </Button>
            <Collapse in={open}>       
            <div id="collapse-form-1">
            <Form onSubmit={this.onFormSubmit} className="d-flex flex-column" id="collapse-form">
            <DateRangePicker 
            initialSettings={{ startDate: '6/23/2022', endDate: '6/30/2022' }}
            maxSpan="days: 7"
            name="date"
            // value={this.state.date}
            onEvent={this.handlePickerEvent}
            >
            
            <Button variant="outline-light"className="datepicker-btn">Choose date</Button>
            </DateRangePicker>
            <Form.Control
            name="address"
            type="search"
            placeholder="Sender Address"
            className="me-2"
            aria-label="Sender Address"
            value={this.state.address}
            onChange={this.handleInputChange}
            />
            <Button className="search-btn" type = "submit" bg="light" variant="outline-light">Search</Button>
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
            <this.collapseToggle/>
            </div>
        )
    }
}
export default SearchForm