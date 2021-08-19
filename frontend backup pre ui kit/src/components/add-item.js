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
    const [description, setDescription] = useState(initialItemState);
    const [itemslot, setItemslot] = useState(initialItemState);
    const [effect, setEffect] = useState(initialItemState);
    const [submitted, setSubmitted] = useState(false);

    const handleItemnameChange = event => {
        setItemname(event.target.value);
    }

    const handleDescriptionChange = event => {
        setDescription(event.target.value);
    }

    const handleItemslotChange = event => {
        setItemslot(event.target.value);
    }

    const handleEffectChange = event => {
        setEffect(event.target.value);
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
    }


    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>You submitted successfully!</h4>
                    <Link to={"/items/"} className="btn btn-success">
                        Back to Item Repository
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
                            placeholder="Item Name"
                            required
                            value={itemname}
                            onChange={handleItemnameChange}
                            name="itemname"
                        />
                        <input
                            type="text"
                            className="form-control"
                            id="description"
                            placeholder="Item Description (visuals, intricacies, details, flavor text)"
                            required
                            value={description}
                            onChange={handleDescriptionChange}
                            name="description"
                        />
                        <textarea
                            type="text"
                            className="form-control"
                            id="effect"
                            placeholder="Item Attributes (mechanical effects)"
                            required
                            value={effect}
                            onChange={handleEffectChange}
                            name="effect"
                        />
                        <select
                            type="text"
                            className="form-select"
                            id="itemslot"
                            required
                            value={itemslot}
                            onChange={handleItemslotChange}
                            name="itemslot"
                        >
                            <option selected>Select Item Slot</option>
                            <option value="Weapon">Weapon</option>
                            <option value="Chest">Chest (worn armor)</option>
                            <option value="Back">Back (cloaks, backpacks)</option>
                            <option value="Arms">Arms (shields, bracers, gauntlets)</option>
                            <option value="Feet">Feet</option>
                            <option value="Neck">Neck (amulets)</option>
                            <option value="Rings">Rings</option>
                            <option value="Waist">Waist (belt, pouches)</option>
                            <option value="Other">Misc / Other / No slot</option>
                        </select>
                    </div>

                    <button onClick={saveItem} className="btn btn-success">
                        Submit
                    </button>
                </div>


            )
            }

        </div >
    );
};

export default AddItem;
