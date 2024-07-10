import React from 'react';
import { Link } from 'react-router-dom';
import Logo_Indeed from '../images_logos/indeed_logo.svg'
import Logo_LinkedIn from '../images_logos/linkedIn.svg'

class NavBar extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
            <nav>
                <Link to={""}>HOME</Link>
                <ul>
                    <li><Link to={""}>NEW APPLICATION</Link></li>
                    <li><Link to={""}>MY APPLICATIONS</Link></li>
                    <li><Link to={""}>EXPORT DATA</Link></li>
                    <li><Link to={""}>CALENDAR</Link></li>
                </ul>
                
                <a href="https://ch.indeed.com/">{Logo_Indeed}</a>
                <a href="https://www.linkedin.com/">{Logo_LinkedIn}</a>
            </nav>
            </div>
        )
    }
}

export default NavBar;