import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { fetchEvents } from '../api';
import type { Event } from '../types';

const EventList = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [petsAllowed, setPetsAllowed] = useState<boolean | undefined>(undefined);
  const limit = 5;

  const { data, isLoading, error } = useQuery({
    queryKey: ['events', page, search, petsAllowed],
    queryFn: () => fetchEvents(page, limit, search, petsAllowed),
  });

  const totalPages = data ? Math.ceil(data.total / limit) : 0;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading events</div>;
  return (
    <div className="event-list">
      <h1>Events</h1>

      <div className="search-filter">
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={petsAllowed === undefined ? '' : petsAllowed.toString()}
          onChange={(e) => setPetsAllowed(e.target.value === '' ? undefined : e.target.value === 'true')}
        >
          <option value="">All events</option>
          <option value="true">Pets allowed</option>
          <option value="false">No pets</option>
        </select>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {data?.events.map((event: Event) => (
          <li key={event.id} className="event-item">
            <h3>
              <Link to={`/event/${event.id}`}>
                {event.title}
              </Link>
            </h3>
            <p>{event.description}</p>
            <p><strong>Date:</strong> {event.date}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Pets Allowed:</strong> {event.petsAllowed ? 'Yes' : 'No'}</p>
          </li>
        ))}
      </ul>

      <div className="pagination">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EventList;