import React from 'react';
import { stack as Menu } from 'react-burger-menu';
import './Sidebar.css';
import { Link } from 'react-router-dom';

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
                <li><Link onClick={this.closeMenu} to='/'>Home</Link></li>
                <li><Link onClick={this.closeMenu} to='/statistics'>Statistics</Link></li>
            </Menu>
        )
    }
}

export default Sidebar;