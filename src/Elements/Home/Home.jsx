import React from 'react';
import './Home.css'

Modal.setAppElement('#root');

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quotes: [
                {
                    "quote": "The only way to do great work is to love what you do.",
                    "author": "Steve Jobs"
                },
                {
                    "quote": "The best way to predict the future is to create it.",
                    "author": "Peter Drucker"
                },
                {
                    "quote": "Your time is limited, so don't waste it living someone else's life.",
                    "author": "Steve Jobs"
                },
                {
                    "quote": "Don't watch the clock; do what it does. Keep going.",
                    "author": "Sam Levenson"
                },
                {
                    "quote": "Whether you think you can or you think you can't, you're right.",
                    "author": "Henry Ford"
                },
                {
                    "quote": "Act as if what you do makes a difference. It does.",
                    "author": "William James"
                },
                {
                    "quote": "Success usually comes to those who are too busy to be looking for it.",
                    "author": "Henry David Thoreau"
                },
                {
                    "quote": "Don't be afraid to give up the good to go for the great.",
                    "author": "John D. Rockefeller"
                },
                {
                    "quote": "I find that the harder I work, the more luck I seem to have.",
                    "author": "Thomas Jefferson"
                },
                {
                    "quote": "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.",
                    "author": "Albert Schweitzer"
                },
                {
                    "quote": "The future belongs to those who believe in the beauty of their dreams.",
                    "author": "Eleanor Roosevelt"
                },
                {
                    "quote": "You are never too old to set another goal or to dream a new dream.",
                    "author": "C.S. Lewis"
                },
                {
                    "quote": "What you get by achieving your goals is not as important as what you become by achieving your goals.",
                    "author": "Zig Ziglar"
                },
                {
                    "quote": "Believe you can and you're halfway there.",
                    "author": "Theodore Roosevelt"
                },
                {
                    "quote": "Success is not final, failure is not fatal: It is the courage to continue that counts.",
                    "author": "Winston Churchill"
                },
                {
                    "quote": "Hardships often prepare ordinary people for an extraordinary destiny.",
                    "author": "C.S. Lewis"
                },
                {
                    "quote": "Don't be pushed around by the fears in your mind. Be led by the dreams in your heart.",
                    "author": "Roy T. Bennett"
                },
                {
                    "quote": "The only limit to our realization of tomorrow is our doubts of today.",
                    "author": "Franklin D. Roosevelt"
                },
                {
                    "quote": "It does not matter how slowly you go as long as you do not stop.",
                    "author": "Confucius"
                },
                {
                    "quote": "Everything you’ve ever wanted is on the other side of fear.",
                    "author": "George Addair"
                },
                {
                    "quote": "Success is not how high you have climbed, but how you make a positive difference to the world.",
                    "author": "Roy T. Bennett"
                },
                {
                    "quote": "Your limitation—it’s only your imagination.",
                    "author": "Unknown"
                },
                {
                    "quote": "Push yourself, because no one else is going to do it for you.",
                    "author": "Unknown"
                },
                {
                    "quote": "Great things never come from comfort zones.",
                    "author": "Unknown"
                },
                {
                    "quote": "Dream it. Wish it. Do it.",
                    "author": "Unknown"
                },
                {
                    "quote": "Success doesn’t just find you. You have to go out and get it.",
                    "author": "Unknown"
                },
                {
                    "quote": "The harder you work for something, the greater you’ll feel when you achieve it.",
                    "author": "Unknown"
                },
                {
                    "quote": "Dream bigger. Do bigger.",
                    "author": "Unknown"
                },
                {
                    "quote": "Don’t stop when you’re tired. Stop when you’re done.",
                    "author": "Unknown"
                },
                {
                    "quote": "Wake up with determination. Go to bed with satisfaction.",
                    "author": "Unknown"
                },
                {
                    "quote": "Do something today that your future self will thank you for.",
                    "author": "Unknown"
                },
                {
                    "quote": "Little things make big days.",
                    "author": "Unknown"
                },
                {
                    "quote": "It’s going to be hard, but hard does not mean impossible.",
                    "author": "Unknown"
                },
                {
                    "quote": "Don’t wait for opportunity. Create it.",
                    "author": "Unknown"
                },
                {
                    "quote": "Sometimes we’re tested not to show our weaknesses, but to discover our strengths.",
                    "author": "Unknown"
                },
                {
                    "quote": "The key to success is to focus on goals, not obstacles.",
                    "author": "Unknown"
                },
                {
                    "quote": "Dream it. Believe it. Build it.",
                    "author": "Unknown"
                },
                {
                    "quote": "If you can dream it, you can do it.",
                    "author": "Walt Disney"
                },
                {
                    "quote": "The only way to achieve the impossible is to believe it is possible.",
                    "author": "Charles Kingsleigh"
                },
                {
                    "quote": "The only place where success comes before work is in the dictionary.",
                    "author": "Vidal Sassoon"
                },
                {
                    "quote": "In order to succeed, we must first believe that we can.",
                    "author": "Nikos Kazantzakis"
                },
                {
                    "quote": "What we achieve inwardly will change outer reality.",
                    "author": "Plutarch"
                },
                {
                    "quote": "It always seems impossible until it’s done.",
                    "author": "Nelson Mandela"
                },
                {
                    "quote": "Start where you are. Use what you have. Do what you can.",
                    "author": "Arthur Ashe"
                },
                {
                    "quote": "Success is not in what you have, but who you are.",
                    "author": "Bo Bennett"
                },
                {
                    "quote": "The only limit to our realization of tomorrow will be our doubts of today.",
                    "author": "Franklin D. Roosevelt"
                },
                {
                    "quote": "The future belongs to those who believe in the beauty of their dreams.",
                    "author": "Eleanor Roosevelt"
                },
                {
                    "quote": "Do not wait to strike till the iron is hot; but make it hot by striking.",
                    "author": "William Butler Yeats"
                },
                {
                    "quote": "The best way to predict the future is to create it.",
                    "author": "Peter Drucker"
                },
                {
                    "quote": "You miss 100% of the shots you don't take.",
                    "author": "Wayne Gretzky"
                }
            ]
            ,
            quoteNum: Math.floor(Math.random() * 49),
            notifications: [],
            isModalOpen: false,
            applicationDetails: null,
        }
    }
    componentDidMount() {
        this.fetchPendingNotifications();
    }

    fetchPendingNotifications = async () => {
        try {
            const response = await fetch('/api/notifications?status=Pending'); // Adjust the API endpoint accordingly
            const notifications = await response.json();

            const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

            notifications.forEach(notification => {
                if (notification.send_date === today) {
                    this.setState({ 
                        isModalOpen: true, 
                        applicationDetails: notification.application 
                    });
                    this.updateStatuses(notification.id, notification.application.id);
                }
            });
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    }

    updateStatuses = async (notificationId, applicationId) => {
        try {
            // Update the notification status to Done
            await fetch(`/api/notifications/${notificationId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: 'Done' }),
            });
    
            // Update the application status to timeToMessage
            await fetch(`/api/applications/${applicationId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: 'timeToMessage' }),
            });
        } catch (error) {
            console.error('Error updating statuses:', error);
        }
    }

    closeModal = () => {
        this.setState({ isModalOpen: false, applicationDetails: null });
    }

    render() {
        const { quotes, quoteNum, isModalOpen, applicationDetails } = this.state;
        return (
            <div>
                <div className='home-div'>
                    <h4>Homepage</h4>
                    <p>This is a one-page app which demonstrates the power of the React.js framework.</p>

                    <h1>{quotes[quoteNum].quote}</h1>
                    <h2>{quotes[quoteNum].author}</h2>
                </div>

                {isModalOpen && (
                    <Modal 
                        isOpen={isModalOpen} 
                        onRequestClose={this.closeModal}
                        contentLabel="Application Details"
                    >
                        <h2>Application Details</h2>
                        {applicationDetails && (
                            <div>
                                <p><strong>ID:</strong> {applicationDetails.id}</p>
                                <p><strong>Name:</strong> {applicationDetails.name}</p>
                                {/* Render other application details as needed */}
                            </div>
                        )}
                        <button onClick={this.closeModal}>Close</button>
                    </Modal>
                )}
            </div>
        );
    }
}

export default Home;