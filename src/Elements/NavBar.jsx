import React from 'react';
import { Link } from 'react-router-dom';
import Logo_Indeed from '../images_logos/indeed_logo.svg'
import Logo_LinkedIn from '../images_logos/linkedIn.svg'
import '../Element_Styles/Navbar.css'
class NavBar extends React.Component {
    
    render() {
        return (
            <div>
                <nav>
                    <Link to={"/"} class="home-link">HOME</Link>
                    <ul class="center-menu">
                        <li><Link to={"/new_application"}>NEW APPLICATION</Link></li>
                        <li><Link to={"/applications"}>MY APPLICATIONS</Link></li>
                        <li><Link to={"/export"}>EXPORT DATA</Link></li>
                        <li><Link to={"/calendar"}>CALENDAR</Link></li>
                    </ul>
                    <div class="logos">
                        <a href="https://ch.indeed.com/" target='_blank' rel='noreferrer'>
                            <img src={Logo_Indeed} alt='' />
                        </a>
                        <a href="https://www.linkedin.com/" target='_blank' rel='noreferrer'>
                            <img src={Logo_LinkedIn} alt='' />
                        </a>
                    </div>
                </nav>
            </div>

        )
    }
}

export default NavBar;