import React from "react"
import Button from "../../UI/Button/Button"

const orderSummary = props => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(i => (
            <li key={i}>
                <span style={{ textTransform: "Capitalize" }}>{i}</span>: {props.ingredients[i]}
            </li>
        ))

    return (
        <React.Fragment>
            <h3>Your order</h3>
            <p>Delicious burger with followings ingredient:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to checkout?</p>
            <p>Your burger will cost you <strong>${props.price.toFixed(2)}.</strong></p>
            <Button 
                clicked={props.purchaseCanceled}
                btnType={"Success"}
                >CANCEL</Button>
            <Button btnType={"Danger"}
            clicked={props.purchaseContinued}>CONTINUE</Button>
        </React.Fragment>
    )
}

export default orderSummary