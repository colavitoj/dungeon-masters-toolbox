import React, { useState, useEffect } from 'react';
import ItemDataService from "../services/item";


const ItemList = props => {

    const [items, setItems] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [searchItemslot, setSearchItemslot] = useState('');
    const [itemslots, setItemslots] = useState(['All Itemslots']);


    useEffect(() => {
        retrieveItems();
        retrieveItemslots();
    },
        []);

    const onChangeSearchName = e => {
        const searchName = e.target.value;
        setSearchName(searchName);
    };

    const onChangeSearchItemslot = e => {
        const searchItemslot = e.target.value;
        setSearchItemslot(searchItemslot);
    }

    const retrieveItems = () => {
        ItemDataService.getAll()
            .then(response => {
                console.log(response.data);
                setItems(response.data.items);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const retrieveItemslots = () => {
        ItemDataService.getItemslot()
            .then(response => {
                console.log(response.data);
                setItemslots(["All Itemslots"].concat(response.data));
            })
            .catch(e => {
                console.log(e);
            });
    };

    const refreshList = () => {
        retrieveItems();
    };

    const find = (query, by) => {
        ItemDataService.find(query, by)
            .then(response => {
                console.log(response.data);
                setItems(response.data.items);
            })
            .catch(e => {
                console.log(e);
            });
    };
    const findByName = () => {
        find(searchName, "itemname")
    };
    const findByItemslot = () => {
        if (searchItemslot == "All Itemslots") {
            refreshList();
        } else {
            find(searchItemslot, "itemslot")
        }
    };



    return (
        <div>
            <div className="row pb-1">
                <div className="input-group col-lg-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by name"
                        value={searchName}
                        onChange={onChangeSearchName}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findByName}
                        >
                            Search
                        </button>
                    </div>
                </div>
                {/* <div className="input-group col-lg-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by zip"
                        value={searchZip}
                        onChange={onChangeSearchZip}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findByZip}
                        >
                            Search
                        </button>
                    </div>
                </div> */}
                <div className="input-group col-lg-4">

                    <select onChange={onChangeSearchItemslot}>
                        {itemslots.map(itemslot => {
                            return (
                                <option value={itemslot}> {itemslot.substr(0, 20)} </option>
                            )
                        })}
                    </select>
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findByItemslot}
                        >
                            Search
                        </button>
                    </div>

                </div>
            </div>
            {/* <div className="row">
                {items.map((restaurant) => {
                    const address = `${restaurant.address.building} ${restaurant.address.street}, ${restaurant.address.zipcode}`;
                    return (
                        <div className="col-lg-4 pb-1">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{restaurant.name}</h5>
                                    <p className="card-text">
                                        <strong>Cuisine: </strong>{restaurant.cuisine}<br />
                                        <strong>Address: </strong>{address}
                                    </p>
                                    <div className="row">
                                        <Link to={"/restaurants/" + restaurant._id} className="btn btn-primary col-lg-5 mx-1 mb-1">
                                            View Reviews
                                        </Link>
                                        <a target="_blank" href={"https://www.google.com/maps/place/" + address} className="btn btn-primary col-lg-5 mx-1 mb-1">View Map</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}


            </div> */}
        </div>
    );
}


export default ItemList;
