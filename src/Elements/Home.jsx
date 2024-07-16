import React from 'react';
import '../Element_Styles/Home.css';
import quotesJson from './quotes.json';
import Modal from 'react-modal';

Modal.setAppElement('#root');

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quotes: quotesJson,
            quoteNum: Math.floor(Math.random() * quotesJson.length),
            notifications: [],
            isModalOpen: false,
            applicationDetails: null,
        };
    }

    componentDidMount() {
        this.fetchPendingNotifications();
    }

    fetchPendingNotifications = async () => {
        try {
            const response = await fetch('http://localhost:8080/notifications/status?status=Pending');
            const data = await response.json();

            if (!Array.isArray(data)) {
                console.error('API response is not an array:', data);
                return;
            }

            const notifications = data;
            const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

            notifications.forEach(notification => {
                

                if (notification.sendDate === today) {
                    if (!notification.application) {
                        console.error('Notification is missing application:', notification);
                        return;
                    }

                    // Open modal only once
                    if (!this.state.isModalOpen) {
                        this.setState({
                            isModalOpen: true,
                            applicationDetails: notification.application,
                        });
                    }

                    this.updateStatuses(notification.id, notification.application.id);
                }
            });
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    updateStatuses = async (notificationId, applicationId) => {
        try {
            // Update the notification status to Done
            await fetch(`http://localhost:8080/notifications/${notificationId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: 'Done' }),
            });

            // Update the application status to timeToMessage
            await fetch(`http://localhost:8080/applications/${applicationId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: 'timeToMessage' }),
            });
        } catch (error) {
            console.error('Error updating statuses:', error);
        }
    };

    closeModal = () => {
        this.setState({ isModalOpen: false, applicationDetails: null });
    };

    render() {
        const { quotes, quoteNum, isModalOpen, applicationDetails } = this.state;
        return (
            <div>
                <div className="home-div">
                    <h4>Homepage</h4>
                    <p>This is a one-page app which demonstrates the power of the React.js framework.</p>
                    <h1>{quotes[quoteNum].quote}</h1>
                    <h2>{quotes[quoteNum].author}</h2>
                </div>

                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={this.closeModal}
                    contentLabel="Application Details"
                    className="ReactModal__Content"
                    overlayClassName="ReactModal__Overlay"
                >
                    <h2 className='message_h2'>Application Details</h2>
                    {applicationDetails && (
                        <div>
                            <p><strong>You should send them a message</strong></p>
                            <p><strong>Company Name:</strong> {applicationDetails.companyName}</p>
                            <p><strong>Contact Info:</strong> {applicationDetails.contactInfo}</p>
                            <p><strong>Phone Number:</strong> {applicationDetails.phoneNumber}</p>
                            <p><strong>Send Date:</strong> {applicationDetails.sendDate}</p>
                            <p><strong>Kanton:</strong> {applicationDetails.kanton}</p>
                            <p><strong>Postal Code:</strong> {applicationDetails.postalCode}</p>
                            <p><strong>Additional Notes:</strong> {applicationDetails.additionalNotes}</p>
                            
                        </div>
                    )}
                    <button onClick={this.closeModal}>Close</button>
                </Modal>
            </div>
        );
    }
}

export default Home;
