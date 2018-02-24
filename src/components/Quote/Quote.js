import React from 'react';
import './Quote.css';


const Quote = props => {
    return (
        <div className="quote-item">
            <div className="quote-btns">
                <button className="quote-btn quote-btn-delete" onClick={props.remove}>Delete</button>
                <button className="quote-btn quote-btn-edit" onClick={props.saveValues}>Edit</button>
            </div>
            <p className="quote-text" dangerouslySetInnerHTML={{ __html: props.body }} />
            <div className="quote-author"><b>Author:</b> {props.author}</div>
        </div>
    );
};

export default Quote;