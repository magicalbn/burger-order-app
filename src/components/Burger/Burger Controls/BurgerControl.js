import React from 'react';

const BurgerControl = (props) =>{
    const {label} = props;

    //console.log(props.isDisabled)

    return(
        <div className="each">
            <p>{label}</p>
            <button className="Less" onClick={props.removed} disabled={props.isLessDisabled}>Less</button>
            <button className="More" onClick={props.added} disabled={props.isMoreDisabled}>More</button>
        </div>
    )
}

export default BurgerControl;