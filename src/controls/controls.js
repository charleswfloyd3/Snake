import React from 'react'
import './controls.css'

function Controls(){

    return(
        <div className="controls_parent">
        <div className="controls_container">
            <img  className="controls_image" src="images/controls.png"></img>

        </div>
                    <img  className="r_key" src="images/r_key.png"></img>
            <img  className="q_key" src="images/q_key.png"></img>

        </div>
    );
}

export default Controls;