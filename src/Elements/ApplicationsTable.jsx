import React from "react";
import SingleApplicationRow from "./SingleApplicationRow.jsx";
import '../Element_Styles/ApplicationsTable.css';

class ApplicationsTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery: "",
            statusFilter: "",
            kantonFilter: "",
            sortOrder: "asc",
            applications: []
        };
    }

    componentDidMount() {
        fetch("http://localhost:8080/applications")
            .then((response) => response.json())
            .then((data) => this.setState({ applications: data }))
            .catch((error) => console.log("Error fetching applications:", error));
    }

    handleSearchChange = (event) => {
        this.setState({ searchQuery: event.target.value });
    };

    handleStatusChange = (event) => {
        this.setState({ statusFilter: event.target.value });
    };

    handleKantonChange = (event) => {
        this.setState({ kantonFilter: event.target.value });
    };

    handleSortOrderChange = () => {
        this.setState((prevState) => ({
            sortOrder: prevState.sortOrder === "asc" ? "desc" : "asc"
        }));
    };

    getFilteredApplications() {
        const { applications, searchQuery, statusFilter, kantonFilter } = this.state;
        return applications.filter((application) => {
            return (
                (application.companyName.toLowerCase().includes(searchQuery.toLowerCase())) &&
                (statusFilter === "" || application.status === statusFilter) &&
                (kantonFilter === "" || application.kanton === kantonFilter)
            );
        });
    }

    getSortedApplications() {
        const { sortOrder } = this.state;
        return this.getFilteredApplications().sort((a, b) => {
            const dateA = new Date(a.sendDate);
            const dateB = new Date(b.sendDate);
            return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
        });
    }

    render() {
        const { searchQuery, statusFilter, kantonFilter, sortOrder } = this.state;
        const sortedApplications = this.getSortedApplications();

        return (
            <div className="ApplicationsTable">
                <h1>My Applications</h1>
                <div className="filters">
                    <input 
                        type="text" 
                        placeholder="Search by company name" 
                        value={searchQuery}
                        onChange={this.handleSearchChange}
                    />
                    <select value={statusFilter} onChange={this.handleStatusChange}>
                        <option value="">All Statuses</option>
                        <option value="Open">Open</option>
                        <option value="Closed">Closed</option>
                        <option value="timeToMessage">timeToMessage</option>
                    </select>
                    <select value={kantonFilter} onChange={this.handleKantonChange}>
                        <option value="">All Kantons</option>
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
                    <button onClick={this.handleSortOrderChange}>
                        Sort by Date {sortOrder === 'asc' ? '↓' : '↑'}
                    </button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Company Name</th>
                            <th>Email or Website</th>
                            <th>Kanton</th>
                            <th>Phone Number</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>More Info</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedApplications.map((application) => (
                            <SingleApplicationRow key={application.id} application={application} />
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ApplicationsTable;
