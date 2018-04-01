import React, { Component } from "react"
import classes from "./Layout.css"
import Toolbar from "../Navigation/Toolbar/Toolbar"
import SideDrawer from "../Navigation/SideDrawer/SideDrawer"

class Layout extends Component {
    state = {
        showSideDrawer: true
    }

    sideDraweClosedHandler = () => {
        this.setState({showSideDrawer: false})
    }

    render() {
        return (
            <React.Fragment>
                <Toolbar />
                <SideDrawer 
                closed={this.sideDraweClosedHandler}
                open={this.state.showSideDrawer}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </React.Fragment>
        )
    }
}

export default Layout 