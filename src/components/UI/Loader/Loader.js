import React from 'react';
import loader from './loader.gif'
import './Loader.css';

const Loader = () => (
    <div className="spinner">
        <img src={loader} alt=""/>
    </div>
);

export default Loader;