import React from "react"
import "../Element_Styles/NewApplication.css"

class NewApplication extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            companyName: "",
            contactInfo: "",
            phoneNumber: "",
            sendDate: new Date().toISOString().slice(0, 10),
            canton: "",
            postalCode: "",
            additionalNotes: "",
            notification: 'NO_NOTIFICATION',
            errors: {},
            showSuccessMessage: false
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    checkEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    checkURL = (url) => {
        const re = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
        return re.test(String(url).toLowerCase());
    };

    checkFormData = () => {
        const { companyName, contactInfo, canton, postalCode, additionalNotes } = this.state;
        const errors = {};

        if (!companyName) {
            errors.companyName = "Company name is required";
        }

        if (!contactInfo || (!this.checkURL(contactInfo) && !this.checkEmail(contactInfo))) {
            errors.contactInfo = "Valid contact info (email or website) is required";
        }

        if (!canton) {
            errors.canton = "Kanton is required";
        }

        if (!postalCode || !/^\d{4}$/.test(postalCode)) {
            errors.postalCode = "Postal code must be exactly 4 digits";
        }

        if (additionalNotes && additionalNotes.length > 500) {
            errors.additionalNotes = "Additional notes must be 500 characters or less";
        }

        return errors;
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        const errors = this.checkFormData();
        if (Object.keys(errors).length > 0) {
            this.setState({ errors });
            return;
        }

        const { companyName, contactInfo, phoneNumber, sendDate, canton, postalCode, additionalNotes, notification } = this.state;

        const notificationInt = parseInt(notification, 10)

        const postData = {
            companyName,
            contactInfo,
            phoneNumber,
            sendDate,
            kanton: canton,
            postalCode,
            additionalNotes,
            notificationTime: notificationInt,
            status: "Open"
        };

        try {
            const response = await fetch('http://localhost:8080/applications', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            });

            if (response.ok) {
                
                console.log('Application submitted successfully');
                
                this.setState({ showSuccessMessage: true }, () => {
                    setTimeout(() => this.setState({ showSuccessMessage: false }), 5000);
                });
                this.setState({ companyName: '', contactInfo: '', phoneNumber: '', sendDate: new Date().toISOString().slice(0, 10), canton: '', postalCode: '', additionalNotes: '', notification: -1, errors: {} })
            } else {
                
                console.error('Error submitting application', response.statusText);
            }
        } catch (error) {
            
            console.error('Network error', error);
        }
    };


    render() {
        const { companyName, contactInfo, phoneNumber, sendDate, canton, postalCode, additionalNotes, notification, errors, showSuccessMessage } = this.state;
        return (
            <div>
                <h1>ADD A NEW APPLICATION</h1>

                <form id="job-application-form" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="companyName">Firma Name*:</label>
                        <input
                            type="text"
                            name="companyName"
                            id="companyName"
                            value={this.state.companyName}
                            onChange={this.handleChange}
                        />
                        {errors.companyName && <div className="error">{errors.companyName}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="contactInfo">Mail oder Website*:</label>
                        <input
                            type="text"
                            name="contactInfo"
                            id="contactInfo"
                            value={this.state.contactInfo}
                            onChange={this.handleChange}
                        />
                        {errors.contactInfo && <div className="error">{errors.contactInfo}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="phoneNumber">Tel der Firma/Person:</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            id="phoneNumber"
                            value={this.state.phoneNumber}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="flex-container">
                        <div className="form-group">
                            <label htmlFor="sendDate">Datum*:</label>
                            <input
                                type="date"
                                name="sendDate"
                                id="sendDate"
                                value={this.state.sendDate}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="canton">Kanton*:</label>
                            <select
                                name="canton"
                                id="canton"
                                value={this.state.canton}
                                onChange={this.handleChange}
                            >
                                <option value="">Choose...</option>
                                <option value="Aargau AG">Aargau</option>
                                <option value="Appenzell Ausserrhoden AR">Appenzell Ausserrhoden</option>
                                <option value="Appenzell Innerrhoden AI">Appenzell Innerrhoden</option>
                                <option value="Basel-Landschaft BL">Basel-Landschaft</option>
                                <option value="Basel-Stadt BS">Basel-Stadt</option>
                                <option value="Bern BE">Bern</option>
                                <option value="Freiburg FR">Freiburg</option>
                                <option value="Genf GE">Genf</option>
                                <option value="Glarus GL">Glarus</option>
                                <option value="Graubünden GR">Graubünden</option>
                                <option value="Jura JU">Jura</option>
                                <option value="Luzern LU">Luzern</option>
                                <option value="Neuenburg NE">Neuenburg</option>
                                <option value="Nidwalden NW">Nidwalden</option>
                                <option value="Obwalden OW">Obwalden</option>
                                <option value="St. Gallen SG">St. Gallen</option>
                                <option value="Schaffhausen SH">Schaffhausen</option>
                                <option value="Schwyz SZ">Schwyz</option>
                                <option value="Solothurn SO">Solothurn</option>
                                <option value="Tessin TI">Tessin</option>
                                <option value="Thurgau TG">Thurgau</option>
                                <option value="Uri UR">Uri</option>
                                <option value="Waadt VD">Waadt</option>
                                <option value="Wallis VS">Wallis</option>
                                <option value="Zug ZG">Zug</option>
                                <option value="Zürich ZH">Zürich</option>
                            </select>
                            {errors.canton && <div className="error">{errors.canton}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="postalCode">Postleitzahl*:</label>
                            <input
                                type="text"
                                name="postalCode"
                                id="postalCode"
                                value={this.state.postalCode}
                                onChange={this.handleChange}
                            />
                            {errors.postalCode && <div className="error">{errors.postalCode}</div>}
                        </div>
                    </div>
                    <div id="notification-section">
                        <div className="form-group">
                            <label htmlFor="additionalNotes">Notizen weitere Infos:</label>
                            <textarea
                                name="additionalNotes"
                                id="additionalNotes"
                                value={this.state.additionalNotes}
                                onChange={this.handleChange}
                            ></textarea>
                            {errors.additionalNotes && <div className="error">{errors.additionalNotes}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="notification">Notification After:</label>
                            <select
                                name="notification"
                                id="notification"
                                value={this.state.notification}
                                onChange={this.handleChange}
                            >
                                <option value="NO_NOTIFICATION">No Notification</option>
                                <option value="5">5 Tage</option>
                                <option value="10">10 Tage</option>
                                <option value="15">15 Tage</option>
                            </select>
                            <div className="form-buttons">
                                <button type="button" className="clear-button" onClick={() => this.setState({ companyName: '', contactInfo: '', phoneNumber: '', sendDate: new Date().toISOString().slice(0, 10), canton: '', postalCode: '', additionalNotes: '', notification: -1, errors: {}, showSuccessMessage: false })}>Clear</button>
                                <button type="submit" className="add-button">Add</button>
                            </div>
                        </div>
                    </div>
                </form>
                {showSuccessMessage && (<div className="success-message">Application submitted successfully!</div>)}
            </div>
        );
    }
}

export default NewApplication;