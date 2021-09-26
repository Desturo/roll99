import React, { useState, useEffect } from 'react';

const ItemDetail = ({ match }) => {
    
    
    useEffect(() => {
        fetchItem();
    }, []);
    
    const [item, setItem] = useState({});
    const test = {
        name: 'test',
        age: 5
    }

    const fetchItem = async () => {
        const fetchItem = await fetch(`https://randomuser.me/api/?seed=${match.params.id}`);
        const itemJson = await fetchItem.json();
        setItem(itemJson);
        console.log(item);  
    }
    const log = () => {
        console.log(item.results[0]);
    }
    

    return (
        <div>
            <h1>
                { Object.entries(item).length !== 0 &&
                    item.results[0].name.first + ' ' + item.results[0].name.last
                }
            </h1>
            {Object.entries(item).length !== 0 &&
                <img src={ item.results[0].picture.large} />
            }
        </div>
    )
}

export default ItemDetail
