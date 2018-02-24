import React, {Component} from 'react';
import axios from 'axios';
import {Editor} from "react-draft-wysiwyg";
import {EditorState} from "draft-js";
import {convertToHTML, convertFromHTML} from "draft-convert";

import '../Forms.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Loader from "../../../components/UI/Loader/Loader";

class EditQuote extends Component {
    state = {
        quote: {
            category: '',
            author: '',
            body: ''
        },
        editorState: EditorState.createEmpty(),
        loading: false
    };

    changeQouteHandler = (event) => {
        const quoteNew = {...this.state.quote};
        const key = event.target.name;
        const value = event.target.value;
        quoteNew[key] = value;
        this.setState({quote: quoteNew});
    };

    onEditorStateChange = (editorState) => {
        const quote = {...this.state.quote};
        quote.body = convertToHTML(editorState.getCurrentContent());
        this.setState({editorState, quote});
    };

    editQuoteHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const id = this.state.quote.id;
        const updateQuote = {
            author: this.state.quote.author,
            body: this.state.quote.body,
            category: this.state.quote.category
        };
        axios.patch(`/quotes/${id}.json`, updateQuote).then(response => {
            this.setState({loading: false});
        }).finally(() => {
            this.props.history.push('/');
        });
    };


    showValueInFormFields = () => {
        const params = new URLSearchParams(this.props.location.search);
        const quote = {};
        let editorState = null;
        for (let param of params.entries()) {
            if (param[0] === 'body') {
                editorState = EditorState.createWithContent(convertFromHTML(param[1]));
                // quote['body'] = editorState;
            } else {
                quote[param[0]] = param[1];
            }
        }
        this.setState({quote, editorState});
    };

    componentDidMount(){
        if (this.props.location.search !== ""){
            this.showValueInFormFields();
        }
    };

    render () {

        if (!this.state.loading) {
            return(
                <div className="form-block container content">
                    <h1 className="form-block__title">Edit Quote</h1>
                    <form>
                        <div className="form-row">
                            <label htmlFor="category">Select category of quote</label>
                            <select  value={this.state.quote.category}
                                     onChange={(event) => this.changeQouteHandler(event)}
                                     name="category"
                            >
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
                            <Editor
                                editorState={this.state.editorState}
                                toolbarClassName="toolbarEditor"
                                wrapperClassName="wrapperEditor"
                                editorClassName="editor"
                                onEditorStateChange={this.onEditorStateChange}
                            />
                        </div>
                        <div className="form-row-btn">
                            <button className="form-btn" onClick={this.editQuoteHandler}>Edit</button>
                        </div>
                    </form>
                </div>
            )
        } else {
            return (
                <Loader/>
            )
        }
    }
}

export default EditQuote;