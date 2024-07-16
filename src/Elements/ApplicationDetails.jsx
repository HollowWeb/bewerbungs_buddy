import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import '../Element_Styles/ApplicationDetails.css';

const ApplicationDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [application, setApplication] = useState(null);
    const [isDirty, setIsDirty] = useState(false);
    const [errors, setErrors] = useState({});
    const [showDeletePopup, setShowDeletePopup] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:8080/applications/${id}`)
            .then((response) => response.json())
            .then((data) => setApplication(data))
            .catch((error) => console.error("Error fetching application:", error));
    }, [id]);

    const checkEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const checkURL = (url) => {
        const re = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
        return re.test(String(url).toLowerCase());
    };

    const checkFormData = () => {
        const { companyName, contactInfo, kanton, postalCode, notes } = application;
        const errors = {};

        if (!companyName) {
            errors.companyName = "Company name is required";
        }

        if (!contactInfo || (!checkURL(contactInfo) && !checkEmail(contactInfo))) {
            errors.contactInfo = "Valid contact info (email or website) is required";
        }

        if (!kanton) {
            errors.kanton = "Kanton is required";
        }

        if (!postalCode || !/^\d{4}$/.test(postalCode)) {
            errors.postalCode = "Postal code must be exactly 4 digits";
        }

        if (notes && notes.length > 500) {
            errors.notes = "Additional notes must be 500 characters or less";
        }

        return errors;
    };

    const handleChange = (e) => {
        setIsDirty(true);
        const { name, value } = e.target;
        setApplication((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        const validationErrors = checkFormData();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        fetch(`http://localhost:8080/applications/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(application)
        })
            .then(response => {
                if (response.ok) {
                    navigate('/applications');
                } else {
                    console.error('Failed to update application');
                }
            })
            .catch(error => console.error('Error:', error));
    };

    const handleClose = () => {
        if (isDirty) {
            if (window.confirm("There are unsaved changes. Are you sure you want to close without saving?")) {
                navigate('/applications');
            }
        } else {
            navigate('/applications');
        }
    };

    const handleDelete = () => {
        fetch(`http://localhost:8080/notifications/del/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    return fetch(`http://localhost:8080/applications/${id}`, {
                        method: 'DELETE',
                    });
                } else {
                    throw new Error('Failed to delete application');
                }
            })
            .then(response => {
                if (response.ok) {
                    navigate('/applications');
                } else {
                    throw new Error('Failed to delete notifications');
                }
            })
            .catch(error => console.error('Error:', error));
    };


    const renderStatus = () => {
        let color;
        const status = application?.status;

        switch (status) {
            case "Open":
                color = "green";
                break;
            case "timeToMessage":
                color = "yellow";
                break;
            case "Closed":
                color = "red";
                break;
            default:
                color = "grey";
        }

        return (
            <div className="input-group">
                <label className="status_class">STATUS</label>
                <button
                    className="status-circle"
                    style={{ backgroundColor: color }}
                    
                />
            </div>
        );
    };

    if (!application) return <div>Loading...</div>;

    return (
        <div>
            <h1>Details</h1>
            <div className="details-container">
                <div className="details-form">
                    <div className="form-section">
                        <div className="form-row">
                            <label>FIRMA NAME</label>
                            <input name="companyName" value={application.companyName} onChange={handleChange} />
                            {errors.companyName && <span className="error-message">{errors.companyName}</span>}
                        </div>
                        <div className="form-row">
                            <label>TEL</label>
                            <input name="phoneNumber" value={application.phoneNumber} onChange={handleChange} />
                        </div>
                        <div className="form-row">
                            <label>EMAIL</label>
                            <input name="contactInfo" value={application.contactInfo} onChange={handleChange} />
                            {errors.contactInfo && <span className="error-message">{errors.contactInfo}</span>}
                        </div>
                        <div className="form-row horizontal">
                            <div className="input-group">
                                <label>Kanton</label>
                                <select name="kanton" value={application.kanton} onChange={handleChange}>
                                    <option value={application.kanton}>{application.kanton}</option>
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
                                {errors.kanton && <span className="error-message">{errors.kanton}</span>}
                            </div>
                            <div className="input-group">
                                <label>Postalcode</label>
                                <input name="postalCode" value={application.postalCode} onChange={handleChange} />
                                {errors.postalCode && <span className="error-message">{errors.postalCode}</span>}
                            </div>
                            <div className="input-group">
                                <label>sendDate</label>
                                <input name="sendDate" value={application.sendDate} readOnly />
                            </div>
                            {renderStatus()}
                        </div>
                    </div>
                    <div className="form-section">
                        <div className="form-row" style={{ flex: 1 }}>
                            <label>NOTIZEN</label>
                            <textarea name="notes" value={application.notes || ''} onChange={handleChange}></textarea>
                            {errors.notes && <span className="error-message">{errors.notes}</span>}
                        </div>
                        <div className="form-row" style={{ flex: 1 }}>
                            <label>TERMINE / MEATINGS / VORSTELLUNGSGESPRÄCH will get added in the next version</label>
                            <textarea placeholder="Placeholder for meetings" readOnly></textarea>
                        </div>
                        <div className="form-buttons">
                            <button className="close-button" onClick={handleClose}>CLOSE</button>
                            <button className="save-button" onClick={handleSave}>SAVE</button>
                            <button className="delete-button" onClick={() => setShowDeletePopup(true)}>DELETE</button>
                        </div>
                    </div>
                </div>
            </div>

            {showDeletePopup && (
                <div className="popup-overlay">
                    <div className="popup">
                        <h2 id="yesno">Are you sure you want to delete this application?</h2>
                        <button className="confirm-button" onClick={handleDelete}>Yes, delete</button>
                        <button className="cancel-button" onClick={() => setShowDeletePopup(false)}>No, cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ApplicationDetails;
