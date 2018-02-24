import React, {Component} from 'react';
import axios from 'axios';
import Quote from "../../components/Quote/Quote";

class QuotesCategoryList extends Component{

    state = {
        quotes: [],
        category: '',
        loading: false
    };

    componentDidMount(){
        this.setState({loading: true});
        const category = this.props.match.params.category;
        axios.get(`quotes.json?orderBy="category"&equalTo="${category}"`).then(response =>{
            const quotes = [];
            for (let key in response.data) {
                quotes.push({...response.data[key], id: key});
            }
            this.setState({quotes,  category, loading: false})
        })
    };

    removeQuoteHandler = (id) => {
        this.setState({loading: true});
        const category = this.props.match.params.category;
        const index = this.state.quotes.findIndex(item => item.id === id);
        const quotes = [...this.state.quotes];
        quotes.splice(index,1);
        axios.delete(`/quotes/${id}.json`).then(response => {
            this.setState({quotes, loading:false});
        }).finally(() => {
            this.props.history.push(`/category/${category}`);
        });
    };


    saveValues = (id) => {
        const index = this.state.quotes.findIndex(item => item.id === id);
        const currentQuote = this.state.quotes[index];
        const quoteValues = [];
        for (let key in currentQuote) {
            quoteValues.push(encodeURIComponent(key) + '=' + encodeURIComponent(currentQuote[key]));
        }
        quoteValues.push('id='+ id);
        const quoteValuesString = quoteValues.join('&');

        this.props.history.push({
            pathname: '/edit_quote',
            search: '?' + quoteValuesString
        });
    };

    render () {
        if (!this.state.loading) {
            return (
                <div className="container content">
                    <h1>{this.state.category}</h1>
                    {this.state.quotes.map(quote => {
                       return(
                           <Quote
                               key={quote.id}
                               author={quote.author}
                               body={quote.body}
                               category={quote.category}
                               id={quote.id}
                               remove={() => this.removeQuoteHandler(quote.id)}
                               saveValues={() => this.saveValues(quote.id)}
                           />
                       )
                    })}
                </div>
            )
        } else {
            return <p>loading ...</p>
        }
    }
}

export default QuotesCategoryList;