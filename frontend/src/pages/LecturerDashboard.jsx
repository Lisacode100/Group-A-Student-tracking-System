import React from "react";
import { Outlet } from "react-router-dom";
import './studentdashboard.css';
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { IssuesContext } from '../context/IssueContext'; // Update this path to where your IssueContext.jsx file is located

const LecturerDashboard = () => {
    const userRole = localStorage.getItem('userRole');
    const { updateContextIssues } = React.useContext(IssuesContext);
    console.log({li: localStorage.getItem('issues')});
        
    React.useEffect(() => {
        updateContextIssues();
    }, []);

    return (
            <div className="dashboard-container">
                <Navbar />
                <Sidebar />
                <div className="dashboard-content">
                    <Outlet/>
                </div>
            </div>
       
    );
};

export default LecturerDashboard;