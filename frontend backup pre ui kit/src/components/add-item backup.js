import React, { useState } from 'react';
import ItemDataService from '../services/item'
import { Link } from 'react-router-dom'

const AddItem = props => {
    let initialItemState = "" //fuck around with the state thing since we're extrapolating 1 entry up to 4. should be where the answer is. create setItemname, setDesc, etc.
    let editing = false;

    if (props.location.state && props.location.state.currentItem) {
        editing = true;
        initialItemState = props.location.state.currentItem.text
    }


    const [itemname, setItemname] = useState(initialItemState);

    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = event => {
        setItem(event.target.value);
    }

    const saveItem = () => {
        var data = {
            itemname: itemname,
            description: description,
            itemslot: itemslot,
            effect: effect,
            item_id: props.match.params.id
        };
        if (editing) {
            data.item_id = props.location.state.currentItem._id
            ItemDataService.updateItem(data)
                .then(response => {
                    setSubmitted(true);
                    console.log(response.data)
                })
                .catch(e => {
                    console.log(e)
                });
        } else {
            ItemDataService.createItem(data)
                .then(response => {
                    setSubmitted(true);
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        }



        return (
            <div className="submit-form">
                {submitted ? (
                    <div>
                        <h4>You submitted successfully!</h4>
                        <Link to={"/restaurants/" + props.match.params.id} className="btn btn-success">
                            Back to Restaurant
                        </Link>
                    </div>
                ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="description">{editing ? "Edit" : "Create"} Item</label>
                            <input
                                type="text"
                                className="form-control"
                                id="itemname"
                                required
                                value={itemname}
                                onChange={handleInputChange}
                                name="itemname"
                            />
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                required
                                value={description}
                                onChange={handleInputChange}
                                name="description"
                            />
                            <input
                                type="text"
                                className="form-control"
                                id="effect"
                                required
                                value={effect}
                                onChange={handleInputChange}
                                name="effect"
                            />
                            <input
                                type="text"
                                className="form-control"
                                id="itemslot"
                                required
                                value={itemslot}
                                onChange={handleInputChange}
                                name="itemslot"
                            />
                        </div>
                        <button onClick={saveItem} className="btn btn-success">
                            Submit
                        </button>
                    </div>
                )};

                )
}

            </div >
        );
    };
}
export default AddItem;
