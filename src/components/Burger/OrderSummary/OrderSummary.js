import React, { Component } from "react"
import Button from "../../UI/Button/Button"

class OrderSummary extends Component {
    //This doesn't has to be a class component

    componentWillUpdate = () => console.log("Order summary updated")

    render() {
        const {
            ingredients,
            purchaseCanceled,
            price,
            purchaseContinued } = this.props

        const ingredientSummary = Object.keys(ingredients)
            .map(i => (
                <li key={i}>
                    <span style={{ textTransform: "Capitalize" }}>{i}</span>: {ingredients[i]}
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
                <p>Your burger will cost you <strong>${price.toFixed(2)}.</strong></p>
                <Button
                    clicked={purchaseCanceled}
                    btnType={"Success"}
                >CANCEL</Button>
                <Button btnType={"Danger"}
                    clicked={purchaseContinued}>CONTINUE</Button>
            </React.Fragment>
        )
    }
}

export default OrderSummary