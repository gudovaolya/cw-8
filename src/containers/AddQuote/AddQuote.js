import React, {Component} from 'react';
import axios from 'axios';


class AddQuote extends Component {
    state = {
        quote: {
            category: '',
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
            <div className="form-block container content">
                <h1 className="form-block__title">Add new post</h1>
                <form>
                    <div className="form-row">
                        <p>Select category of quote</p>
                        <select  value={this.state.quote.category}
                                 onChange={(event) => this.changeQouteHandler(event)}
                                 name="category"
                        >
                            <option value="star-wars">Star Wars</option>
                            <option value="famous-people">Famous people</option>
                            <option value="saying"> Saying</option>
                            <option value="humour">Humour</option>
                            <option value="motivational">Motivational</option>
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
                    <button className="btn" onClick={this.addQuoteHandler}>Submit</button>
                </form>
            </div>
        )
    }
}

export default AddQuote;