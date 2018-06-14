import React, { Component } from "react"
import { connect } from "react-redux"
import Burger from "../../components/Burger/Burger"
import BuildControls from "../../components/Burger/BuildControls/BuildControls"
import Modal from "../../components/UI/Modal/Modal"
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary"
import axios from "../../axios-orders"
import Spinner from "../../components/UI/Spinner/Spinner"
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler"
import * as actions from "../../store/actions"



class BurgerBuilder extends Component {
    state = {
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false,
    }

    componentDidMount() {
        axios.get("https://react-my-burger-183c9.firebaseio.com/ingredients.json")
            .then(response => this.setState({ ingredients: response.data }))
            .catch(error => this.setState({ error: true }))
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .reduce((sum, el) => (sum + ingredients[el]), 0)
        this.setState({ purchasable: sum > 0 })
    }

    purchaseHandler = () => this.setState({ purchasing: true })

    purchaseCancelHandler = () => this.setState({ purchasing: false })

    purchaseContinueHandler = () => {
        const queryParams = []
        for (let i in this.state.ingredients) {
            queryParams.push(`${encodeURIComponent(i)}=${encodeURIComponent(this.state.ingredients[i])}`)
        }
        queryParams.push(`price=${this.state.totalPrice}`)
        const queryString = queryParams.join("&")
        this.props.history.push({
            pathname: "/checkout",
            search: `?${queryString}`
        })
    }

    render() {
        const disabledInfo = {
            ...this.props.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null
        let burger = !this.state.error ? <Spinner /> : <p>some error here</p>
        if (this.props.ingredients) {
            burger =
                (<React.Fragment>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded} ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}
                        price={this.props.totalPrice}
                        ordered={this.purchaseHandler} />
                </React.Fragment>
                )
            orderSummary = (
                <OrderSummary
                    ingredients={this.props.ingredients}
                    purchaseCanceled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                    price={this.props.totalPrice} />
            )
        }
        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        return (
            <React.Fragment>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({ 
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
})

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingredient) => dispatch({
            type: actions.ADD_INGREDIENT,
            ingredientName: ingredient
        }),
        onIngredientRemoved: (ingredient) => dispatch({
            type: actions.REMOVE_INGREDIENT,
            ingredientName: ingredient
        }),

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))