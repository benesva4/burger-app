import React, { Component } from "react"
import axios from "../../../axios-orders"

import Button from "../../../components/UI/Button/Button"
import classes from "./ContactData.css"
import Spinner from "../../../components/UI/Spinner/Spinner"
import Input from "../../../components/UI/Input/Input"

class ContactData extends Component {
    state = {
        name: "",
        email: "",
        address: {
            street: "",
            postalCode: ""
        },
        loading: false
    }

    orderHandler = (e) => {
        e.preventDefault()
        console.log(this.props.ingredients)
        this.setState({ loading: true })
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: "Venca Penca",
                adress: {
                    street: "Teststreet 12",
                    zipCode: "444578",
                    country: "Czech Republic",
                },
                deliveryMethod: "fast",
            }
        }
        axios.post("/orders.json", order)
            .then(response => {
                this.setState({ loading: false })
                this.props.history.push("/")
            })
            .catch(error => {
                this.setState({ loading: false })
            })
    }

    render() {
        let form = (
            <form>
                <Input inputType="input" type="text" name="name" placeholder="John Doe" />
                <Input inputType="input" type="email" name="email" placeholder="john.doe@email.com" />
                <Input inputType="input" type="text" name="street" placeholder="Doestret" />
                <Input inputType="input" type="text" name="postalcode" placeholder="11101" />
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        )
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter Your contact data:</h4>
                {form}
            </div>
        )
    }
}

export default ContactData