import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';

//const apiUrl = 'http://localhost:3001';

const apiUrl = 'https://push-notify-backend.onrender.com'

function CalendarComponent() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [eventDetails, setEventDetails] = useState({
        date: selectedDate.toISOString().split('T')[0], 
        description: ''
    });
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        // Fetch user ID from local storage or state management solution
        const userIdFromStorage = localStorage.getItem('userId');
        setUserId(userIdFromStorage);
    }, []);

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
            
            const response = await axios.post(`${apiUrl}/events`, {
                ...eventDetails,
                userId: userId, // Include the user ID
            });
            // Reset event details after submission
            setEventDetails({
                date: selectedDate.toISOString().split('T')[0], 
                description: ''
            });
            console.log("Event added successfully", response.data)
            alert('Event added successfully!');
        } catch (error) {
            console.error('Error adding event:', error);
            alert('Failed to add event. Please try again.');
        }
    };

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
