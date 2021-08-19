import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import '../popup.css'
import 'reactjs-popup/dist/index.css';
import "bootstrap/dist/css/bootstrap.min.css";




const DiceRoller = () => {



    const [roll, setRoll] = useState(0);
    const [mod, setMod] = useState(0);
    const [result, setResult] = useState(0);

    const DiceRoll = (num, mod) => {

        var tempRoll = Math.floor(Math.random() * (num) + 1);
        var tempResult = 0

        if (mod != 0) {
            tempResult = tempRoll + parseInt(mod);
        }
        else {
            tempResult = tempRoll
        }
        setRoll(tempRoll)
        setResult(tempResult)
        return
    }


    return (
        <Popup
            trigger={<button className="btn btn-dark"> Dice Roller </button>}
            modal
            nested
            position="right center"
        >
            {close => (
                <div className="modalpop">
                    <button className="close" onClick={close}>
                        &times;
                    </button>
                    <div className="header"> Dice Roller </div>
                    <div className="content">
                        The die shows a {roll} + a modifier of {mod} = {result}

                    </div>

                    <div className="actions">

                        <button className="button" onClick={() => DiceRoll(4, mod)}>
                            D4
                        </button>

                        <button className="button" onClick={() => DiceRoll(6, mod)}>
                            D6
                        </button>

                        <button className="button" onClick={() => DiceRoll(8, mod)}>
                            D8
                        </button>

                        <button className="button" onClick={() => DiceRoll(10, mod)}>
                            D10
                        </button>

                        <button className="button" onClick={() => DiceRoll(12, mod)}>
                            D12
                        </button>

                        <button className="button" onClick={() => DiceRoll(20, mod)}>
                            D20
                        </button>



                        <button
                            className="reset"
                            onClick={() => {
                                setRoll(0);
                                setMod(0);
                                setResult(0);
                            }}
                        >
                            Reset
                        </button>
                    </div>
                    <div className="mod">
                        <p>Modifier:</p>
                        <input type="number" value={mod} onChange={event => setMod(event.target.value)}></input>
                    </div>
                </div>
            )
            }
        </Popup >
    )
};


export default DiceRoller
