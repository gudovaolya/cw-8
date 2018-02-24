import React, {Component} from 'react';
import axios from 'axios';
import '../Forms.css';


class AddQuote extends Component {
    state = {
        quote: {
            category: 'Star Wars',
            author: '',
            body: ''
        },
        loading: false
    };

    changeQouteHandler = (event) => {
        const quoteNew = {...this.state.quote};
        const key = event.target.name;
        const value = event.target.value;
        quoteNew[key] = value;
        this.setState({quote: quoteNew});
    };

    addQuoteHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        axios.post('/quotes.json', this.state.quote).then(response => {
            this.setState({loading: false});
        }).finally(() => {
            this.props.history.push('/');
        });
    };


    render () {
        return(
            <div className="form-block content">
                <h1 className="form-block-title">Add new quote</h1>
                <form>
                    <div className="form-row">
                        <label htmlFor="category">Select category of quote</label>
                        <select  value={this.state.quote.category}
                                 onChange={(event) => this.changeQouteHandler(event)}
                                 name="category"
                                 id="category">
                            <option value="Star Wars">Star Wars</option>
                            <option value="Famous people">Famous people</option>
                            <option value="Saying"> Saying</option>
                            <option value="Humour">Humour</option>
                            <option value="Motivational">Motivational</option>
                        </select>
                    </div>
                    <div className="form-row">
                        <input
                            className="field"
                            type="text"
                            name="author"
                            placeholder="Enter author name"
                            onChange={(event) => this.changeQouteHandler(event)}
                            value={this.state.quote.author}
                        />
                    </div>
                    <div className="form-row">
                        <textarea
                            className="field field-area"
                            name="body"
                            placeholder="Enter text quote"
                            onChange={(event) => this.changeQouteHandler(event)}
                            value={this.state.quote.body}
                        />
                    </div>
                    <div className="form-row-btn">
                        <button className="form-btn" onClick={this.addQuoteHandler}>Publish</button>
                    </div>

                </form>
            </div>
        )
    }
}

export default AddQuote;