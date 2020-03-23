import React from 'react';
import { stack as Menu } from 'react-burger-menu';
import './Sidebar.css';
import { NavLink } from 'react-router-dom';

class Sidebar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            menuOpen: false
        }
    }

    handleStateChange = state => {
        this.setState({menuOpen: state.isOpen});
    }

    closeMenu = () => {
        this.setState({menuOpen: false});
    }

    render() {
        return (
            <Menu
                isOpen={this.state.menuOpen}
                onStateChange={state => this.handleStateChange(state)}
            >
                <ul>
                    <li><NavLink className="link" onClick={this.closeMenu} to='/'>Home</NavLink></li>
                    <li><NavLink className="link" onClick={this.closeMenu} to='/'>Manage Parking</NavLink></li>
                    <li><NavLink className="link" onClick={this.closeMenu} to='/statistics'>Statistics</NavLink></li>
                    <li><NavLink className="link" onClick={this.closeMenu} to='/events'>Event Calendar</NavLink></li>
                    <li><NavLink className="link" onClick={this.closeMenu} to='/incidents'>Manage Incidents</NavLink></li>
                    <li><NavLink className="link" onClick={this.closeMenu} to='/management'>Management Settings</NavLink></li>
                </ul>
            </Menu>
        )
    }
}

export default Sidebar;