import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';

import { useState } from 'react';
const Footer = () => {
    const [open, setOpen] = useState(false);

    return (
        <Card className='footer'>
            <Card.Body>
                Developed by <a href='https://samuelshi.netlify.app/' target='_blank'><b>Sam Shi </b></a>with ❤️
                <div>
                    <button
                        onClick={() => setOpen(!open)}
                        aria-controls="collapse-form-1"
                        aria-expanded={open}
                    >Buy me a coffee!</button>
                    <Collapse in={open}>
                        <p className="ethAddr">0x61cF6c0B69d5B031f6CFd3b30F5f70F3e12D571A</p>
                    </Collapse>
                </div>
            </Card.Body>
        </Card>
    )
}
export default Footer