// import React, { createContext, useState } from 'react';
// import { issueAPI } from '../services/api'

// export const IssuesContext = createContext();

// export const IssuesProvider = ({ children }) => {
//     const [fetchError, setFetchError] = React.useState(null);
//     const [issues, setIssues] = useState(() => {
//         const storedIssues = JSON.parse(localStorage.getItem('issues')) || [];
//         return storedIssues;
//     });
    

//     React.useEffect(() => {
//         const getIssues = async () => {
//             try {
//                 setIssues(await issueAPI.getIssues())
//             } catch (error) {
//                 console.error({error});
//                 setFetchError("Failed to fetch registrars.");
//             }
//         }
//         alert(`IssuesContext useEffect called, ${issues.length}`);
//         getIssues();
//     }, []);


//     const [notificationMessage, setNotificationMessage] = useState(null);
//     const [badgeCount, setBadgeCount] = useState(0); 
//     const [registrarBadgeCount, setRegistrarBadgeCount] = useState(0); 

//     const addIssue = (newIssue) => {
//         setIssues((prevIssues) => {
//             const updatedIssues = [...prevIssues, newIssue];
//             localStorage.setItem('issues', JSON.stringify(updatedIssues));
//             return updatedIssues;
//         });

//         setBadgeCount((prevCount) => prevCount + 1); 
//         setRegistrarBadgeCount((prevCount) => prevCount + 1); 
//     };

//     return (
//         <IssuesContext.Provider
//             value={{
//                 issues,
//                 addIssue,
//                 notificationMessage,
//                 setNotificationMessage,
//                 badgeCount,
//                 setBadgeCount,
//                 registrarBadgeCount,
//                 setRegistrarBadgeCount,
//             }}
//         >
//             {children}
//         </IssuesContext.Provider>
//     );
// };



// import React, { createContext, useState, useEffect } from 'react';
// import { issueAPI } from '../services/api'

// export const IssuesContext = createContext();

// export const IssuesProvider = ({ children }) => {
//     const [fetchError, setFetchError] = useState(null);
//     const [isLoading, setIsLoading] = useState(true);
//     const [issues, setIssues] = useState([]);
//     const [notificationMessage, setNotificationMessage] = useState(null);
//     const [badgeCount, setBadgeCount] = useState(0); 
//     const [registrarBadgeCount, setRegistrarBadgeCount] = useState(0); 

//     // Load issues from API
//     useEffect(() => {
//         const getIssues = async () => {
//             setIsLoading(true);
//             try {
//                 const fetchedIssues = await issueAPI.getIssues();
//                 setIssues(fetchedIssues);
//                 // Update localStorage after successful fetch
//                 localStorage.setItem('issues', JSON.stringify(fetchedIssues));
//                 setFetchError(null);
//             } catch (error) {
//                 console.error({error});
//                 setFetchError("Failed to fetch issues.");
//                 // Fall back to localStorage if API fails
//                 const storedIssues = JSON.parse(localStorage.getItem('issues')) || [];
//                 setIssues(storedIssues);
//             } finally {
//                 setIsLoading(false);
//             }
//         }
        
//         getIssues();
//     }, []);

//     const addIssue = async (newIssue) => {
//         try {
//             // If you have an API call to add the issue
//             // const addedIssue = await issueAPI.addIssue(newIssue);
            
//             setIssues((prevIssues) => {
//                 const updatedIssues = [...prevIssues, newIssue];
//                 localStorage.setItem('issues', JSON.stringify(updatedIssues));
//                 return updatedIssues;
//             });

//             setBadgeCount((prevCount) => prevCount + 1); 
//             setRegistrarBadgeCount((prevCount) => prevCount + 1); 
//         } catch (error) {
//             console.error("Failed to add issue:", error);
//             setFetchError("Failed to add issue");
//         }
//     };

//     return (
//         <IssuesContext.Provider
//             value={{
//                 issues,
//                 addIssue,
//                 isLoading,
//                 fetchError,
//                 notificationMessage,
//                 setNotificationMessage,
//                 badgeCount,
//                 setBadgeCount,
//                 registrarBadgeCount,
//                 setRegistrarBadgeCount,
//             }}
//         >
//             {children}
//         </IssuesContext.Provider>
//     );
// };


import React, { createContext, useState, useEffect } from 'react';
import { issueAPI, API_BASE_URL } from '../services/api'

export const IssuesContext = createContext();

export const IssuesProvider = ({ children }) => {
    const [fetchError, setFetchError] = useState(null);
    const [issues, setIssues] = useState([]);
    const [notificationMessage, setNotificationMessage] = useState(null);
    const [badgeCount, setBadgeCount] = useState(0); 
    const [registrarBadgeCount, setRegistrarBadgeCount] = useState(0); 

    const updateContextIssues = async (newValue) => {
        console.log("IssuesContext useEffect called");
        try {
            if (newValue) {
                setIssues(newValue)
                localStorage.setItem('issues', JSON.stringify(newValue));
            } else {
                const fetchedIssues = await issueAPI.getIssues();
                setIssues(fetchedIssues);
                localStorage.setItem('issues', JSON.stringify(fetchedIssues));
            }
        } catch (error) {
            console.error({error});
        }
        // setContextValue(prevValues => ({...prevValues, ...newValues}));
    };

    // useEffect(() => {
    //     const getIssues = async () => {
    //         console.log("IssuesContext useEffect called");
    //         try {
    //             // const fetchedIssues = await issueAPI.getIssues();
    //             const response = await fetch(`${API_BASE_URL}issues`);
    //             // setIssues(fetchedIssues);
    //             // setIssues([2323])
    //             // localStorage.setItem('issues', JSON.stringify(fetchedIssues));
    //             // setFetchError(null);
    //         } catch (error) {
    //             console.error({error});
    //             // setFetchError("Failed to fetch issues.");
    //             // fallback to localStorage if API fails
    //             // const storedIssues = JSON.parse(localStorage.getItem('issues')) || [];
    //             // setIssues(storedIssues);
    //         }
    //     };
    //     getIssues();
    // }, []);

    const addIssue = (newIssue) => {
        setIssues((prevIssues) => {
            const updatedIssues = [...prevIssues, newIssue];
            localStorage.setItem('issues', JSON.stringify(updatedIssues));
            return updatedIssues;
        });

        setBadgeCount((prevCount) => prevCount + 1); 
        setRegistrarBadgeCount((prevCount) => prevCount + 1); 
    };

    return (
        <IssuesContext.Provider
            value={{
                issues,
                addIssue,
                notificationMessage,
                setNotificationMessage,
                badgeCount,
                setBadgeCount,
                registrarBadgeCount,
                setRegistrarBadgeCount,
                fetchError,
                updateContextIssues,
            }}
        >
            {children}
        </IssuesContext.Provider>
    );
};