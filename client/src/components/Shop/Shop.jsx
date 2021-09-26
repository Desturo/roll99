import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Shop = () => {

    useEffect(() => {
        for (let index = 0; index < 6; index++) {
            fetchItems();
        }
        
    }, []);

    const [items, setItems] = useState([]);

    const fetchItems = async () => {
        const data = await fetch('https://randomuser.me/api');
        const results = await data.json();
        setItems(items => [ ...items, results]);
    }

    return (
        <div>
            {
                items.map(item => (
                <h1 key={ item.info.seed }>
                    <Link to={`/shop/${item.info.seed}`}>
                             { item.results[0].name.first + ' ' + item.results[0].name.last }
                    </Link>
                </h1>
                ))
            }
        </div>
    )
}

export default Shop