import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './Sidebar.css';
import { Link } from 'react-router-dom';

export default props => {
    return (
        <Menu>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/statistics'>Statistics</Link></li>
        </Menu>
    )
}
