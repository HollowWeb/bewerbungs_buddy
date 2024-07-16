import React from "react";
import { useNavigate } from "react-router-dom";
import '../Element_Styles/SingleApplicationRow.css'; 

const SingleApplicationRow = (props) => {
    const navigate = useNavigate();
    const { application } = props;
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [status, setStatus] = React.useState(application.status);
    

    const handleStatusClick = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };
    
    const handleStatusChange = (newStatus) => {
        const updatedApplication = { ...application, status: newStatus };

        fetch(`http://localhost:8080/applications/${application.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedApplication)
        })
        .then(response => {
            if (response.ok) {
                setStatus(newStatus);
                setIsModalOpen(false);
            } else {
                console.error('Failed to update status');
            }
        })
        .catch(error => console.error('Error:', error));
    };

    const renderStatusCircle = (color, status, label) => (
        <div className="status-container" onClick={() => handleStatusChange(status)}>
            <div className="status-circle" style={{ backgroundColor: color }}></div>
            <span className="status-label">{label}</span>
        </div>
    );

    const renderStatus = () => {
        let color;

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
            <div
                className="status-circle"
                style={{ backgroundColor: color }}
                onClick={handleStatusClick}
            ></div>
        );
    };

    const handleDetailsClick = () => {
        navigate(`/edit_application/${application.id}`);
    };

    return (
        <tr key={application.id}>
            <td>{application.companyName}</td>
            <td>{application.contactInfo}</td>
            <td>{application.kanton}</td>
            <td>{application.phoneNumber}</td>
            <td>{application.sendDate}</td>
            <td>
                {renderStatus()}
                {isModalOpen && (
                    <div className="modal open">
                        <div className="modal-content">
                            <span className="close" onClick={handleModalClose}>&times;</span>
                            <h3 className="modal-heading">Change Status</h3>
                            <div className="status-options">
                                {renderStatusCircle('green', 'Open', 'Open')}
                                {renderStatusCircle('yellow', 'timeToMessage', 'Callback')}
                                {renderStatusCircle('red', 'Closed', 'Closed')}
                            </div>
                        </div>
                    </div>
                )}
            </td>
            <td><button className="details-button" onClick={handleDetailsClick}>Details</button></td>
        </tr>
    );
};

export default SingleApplicationRow;
