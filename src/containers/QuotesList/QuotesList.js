import React, {Component} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import Quote from "../../components/Quote/Quote";
import Loader from "../../components/UI/Loader/Loader";

class QuotesList extends Component {

    state = {
        quotes: [],
        categories: [],
        loading: false
    };

    componentDidMount(){
        this.setState({loading: true});
        axios.get('/quotes.json').then(response =>{
            const quotes = [];
            const categories = [];

            for (let key in response.data) {
                quotes.push({...response.data[key], id: key});
                const elem = categories.find(category => response.data[key].category === category);
                if (!elem) {
                    categories.push(response.data[key].category)
                }
                console.log(categories)
            }

            this.setState({quotes, categories, loading: false});
        })
    }

    removeQuoteHandler = (id) => {
        this.setState({loading: true});
        const index = this.state.quotes.findIndex(item => item.id === id);
        const quotes = [...this.state.quotes];
        quotes.splice(index,1);
        axios.delete(`/quotes/${id}.json`).then(response => {
            this.setState({quotes, loading:false});
        }).finally(() => {
            this.props.history.push('/');
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
                <div className="container content clearfix">
                    <div className="sidebar">
                        <div className="categories">
                            {this.state.categories.map(category => (
                                <Link to={`/category/${category}`}
                                      className="category-link"
                                      key={category}
                                >
                                    {category}
                                </Link>
                            ))}
                        </div>

                    </div>
                    <div className="main-column">
                        {this.state.quotes.map(quote => (
                            <Quote
                                key={quote.id}
                                author={quote.author}
                                body={quote.body}
                                category={quote.category}
                                id={quote.id}
                                remove={() => this.removeQuoteHandler(quote.id)}
                                saveValues={() => this.saveValues(quote.id)}
                            />
                        ))}
                    </div>

                </div>
            );
        } else {
            return (
                <Loader />
            )
        }

    }
}

export default QuotesList;