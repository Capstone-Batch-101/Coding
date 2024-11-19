// src/CulturalEvents.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CulturalEvents() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/events');
                setEvents(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    if (loading) {
        return <div>Loading events...</div>;
    }

    if (error) {
        return <div>Error fetching events: {error.message}</div>;
    }

    return (
        <div>
            <h2>Cultural Events</h2>
            <div className="events-container">
                {events.map(event => (
                    <div key={event.id} className="event-card">
                        <h3>{event.title}</h3>
                        <p>Date: {event.date}</p>
                        <p>Location: {event.location}</p>
                        <p>Description: {event.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CulturalEvents;