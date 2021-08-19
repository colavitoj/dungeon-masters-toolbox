import React, { useState, useEffect } from 'react';
import ItemDataService from '../services/item';
import { Link } from 'react-router-dom';



const Item = props => {
    const initialItemState = {
        id: null,
        itemname: '',
        description: '',
        effect: '',
        itemslot: ''
    };
    const [isLoading, setLoading] = useState(true);
    const [item, setItem] = useState(initialItemState);
    const [deleted, setDeleted] = useState(false);


    const getItem = id => {
        ItemDataService.get(id)
            .then(response => {
                setItem(response.data);
                console.log(response.data);
                console.log('done')
                setLoading(false)
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getItem(props.match.params.id);

    }, [props.match.params.id]);



    const deleteItem = (itemId, index) => {
        ItemDataService.deleteItem(itemId)
            .then(response => {
                // setItem((prevState) => {
                //     prevState.item.items.splice(index, 1)
                //     return ({
                //         ...prevState
                //     })
                // })
                setDeleted(true)
            })
            .catch(e => {
                console.log(e);
            });

    }

    console.log("test", item.items)

    if (isLoading) return <div>Loading...</div>

    if (deleted) return (
        <div>
            <h4>You deleted the item successfully!</h4>
            <Link to={"/items/"} className="btn btn-success">
                Back to Item Repository
            </Link>
        </div>
    )



    return (
        <div>
            {item ? (
                <div>
                    <p>
                        <strong>Item: {item.items[0]['itemname']}</strong><br />
                    </p>
                    <Link to={"/items/" + props.match.params.id} className="btn btn-primary">
                        Add Comment
                    </Link>
                    <h4> Comments </h4>
                    <div className="row">
                        {item.items.length > 0 ? (
                            item.items.map((item, index) => {
                                return (
                                    <div className="col-lg-4 pb-1" key={index}>
                                        <div className="card">
                                            <div className="card-body">
                                                <p className="card-text">
                                                    {item.itemname}<br />

                                                    <strong>Date: </strong>{item.date}
                                                </p>

                                                <div className="row">
                                                    <a onClick={() => deleteItem(item._id, index)} className="btn btn-primary col-lg-5 mx-1 mb-1">Delete</a>
                                                    <Link to={{
                                                        pathname: "/items/" + props.match.params.id + "/edit",
                                                        state: {
                                                            currentItem: item
                                                        }
                                                    }} className="btn btn-primary col-lg-5 mx-1 mb-1">Edit</Link>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="col-sm-4">
                                <p>No items yet.</p>
                            </div>
                        )}

                    </div>

                </div>
            ) : (
                <div>
                    <br />
                    <p>No item selected.</p>
                </div>
            )}
        </div>
    );

};


export default Item;
