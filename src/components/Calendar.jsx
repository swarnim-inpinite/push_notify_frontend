import React, { useState } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';

// const apiUrl = import.meta.env.REACT_APP_API_URL;

const apiUrl = 'https://push-notify-backend.onrender.com'



function CalendarComponent() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [eventDetails, setEventDetails] = useState({
        date: selectedDate.toISOString().split('T')[0], 
        description: ''
    });

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setEventDetails({
            ...eventDetails,
            date: date.toISOString().split('T')[0] 
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEventDetails({
            ...eventDetails,
            [name]: value
        });
    };

    const handleEventSubmit = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log("user in calendar are", user);
            // Submit the event details
            const response = await axios.post(`${apiUrl}/events`, eventDetails);
            // Reset event details after submission
            setEventDetails({
                date: selectedDate.toISOString().split('T')[0], 
                description: ''
            });
            console.log("Event added successfully", response.data);
            alert('Event added successfully!');
    
            // Fetch other users after successful event submission
           
            const otherUsersResponse = await axios.get(`${apiUrl}/otherUsers`, {
                params: { currentUserUID: user.uid }
            });
            console.log('Other users:', otherUsersResponse.data);
        } catch (error) {
            console.error('Error adding event:', error);
            alert('Failed to add event. Please try again.');
        }
    };
    

    // const handleEventSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         //  const reponse = await axios.post('http://localhost:3001/events', eventDetails);
    //         const reponse = await axios.post(`${apiUrl}/events`, eventDetails);
    //         // Reset event details after submission
    //         setEventDetails({
    //             date: selectedDate.toISOString().split('T')[0], 
    //             description: ''
    //         });
    //         console.log("Event added successfully", reponse.data)
    //         alert('Event added successfully!');
    //     } catch (error) {
    //         console.error('Error adding event:', error);
    //         alert('Failed to add event. Please try again.');
    //     }
    // };

    return (
        <div>
            <h2>Select a Date:</h2>
            <Calendar
                onChange={handleDateChange}
                value={selectedDate}
            />
            <form onSubmit={handleEventSubmit}>
                <h2>Add Event:</h2>
                <br></br>
                <div>
                    <label>Date:</label>
                    <br></br>
                    <input
                        type="text"
                        name="date"
                        value={selectedDate.toISOString().split('T')[0]} 
                        readOnly
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <br></br>
                    <input
                        type="text"
                        name="description"
                        value={eventDetails.description}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <br></br>
                <button type="submit">Add Event</button>
            </form>
        </div>
    );
}

export default CalendarComponent;
