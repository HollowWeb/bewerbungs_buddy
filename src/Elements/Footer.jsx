import React from 'react';
import '../Element_Styles/Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section about">
                    <h2 className="footer-logo">ZenAI</h2>
                    <p>
                        ZenAI
                    </p>
                </div>
                <div className="footer-section links">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="/">Diese</a></li>
                        <li><a href="/">Links</a></li>
                        <li><a href="/">Gehen Alle</a></li>
                        <li><a href="/">Home</a></li>
                    </ul>
                </div>
                <div className="footer-section contact">
                    <h3>Dont Contact Me</h3>
                    <p>
                        <i className="fas fa-map-marker-alt"></i> Nicht Meine Adress
                    </p>
                    <p>
                        <i className="fas fa-phone"></i> +Nicht Meine Telefonnummer 
                    </p>
                    <p>
                        <i className="fas fa-envelope"></i> Nicht@Meine.E-Mail
                    </p>
                </div>
            </div>
            <div className="footer-bottom">
                &copy; 2024 Zen Zalapski | Designed Zen Zalapski and OpenAI
            </div>
        </footer>
    );
};

export default Footer;
