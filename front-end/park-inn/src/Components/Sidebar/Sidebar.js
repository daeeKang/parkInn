import React from 'react';
import { stack as Menu } from 'react-burger-menu';
import './Sidebar.css';
import AccountButton from './AccountButton';
import { NavLink } from 'react-router-dom';

// icons
import DashboardIcon from '../Icons/dashboard.svg';
import ParkingIcon from '../Icons/parking.svg';
import StatsIcon from '../Icons/statistics.svg';
import EventIcon from '../Icons/event.svg';
import IncidentIcon from '../Icons/incidents.svg';
import SettingsIcon from '../Icons/settings.svg';

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
                <AccountButton />
                <br />
                <ul>
                    <li>
                        <NavLink className="link" onClick={this.closeMenu} to='/'>
                            <img src={DashboardIcon} height="11px" width="11px" alt="press-link" /><span className="tab">Home</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink className="link" onClick={this.closeMenu} to='/parking'>
                            <img src={ParkingIcon} height="11px" width="11px" alt="press-link" /><span className="tab">Manage Parking</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink className="link" onClick={this.closeMenu} to='/statistics'>
                            <img src={StatsIcon} height="11px" width="11px" alt="press-link" /><span className="tab">Statistics</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink className="link" onClick={this.closeMenu} to='/events'>
                            <img src={EventIcon} height="11px" width="11px" alt="press-link" /><span className="tab">Event Calendar</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink className="link" onClick={this.closeMenu} to='/incidents'>
                            <img src={IncidentIcon} height="11px" width="11px" alt="press-link" /><span className="tab">Incident Reporting</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink className="link" onClick={this.closeMenu} to='/management'>
                            <img src={SettingsIcon} height="11px" width="11px" alt="press-link" /><span className="tab">Account Settings</span>
                        </NavLink>
                    </li>
                </ul>
            </Menu>
        )
    }
}

export default Sidebar;