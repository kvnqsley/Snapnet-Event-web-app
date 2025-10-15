import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';
import { fetchEventById } from '../api';

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const eventId = id ? parseInt(id, 10) : null;

  const { data: event, isLoading, error } = useQuery({
    queryKey: ['event', eventId],
    queryFn: () => fetchEventById(eventId!),
    enabled: !!eventId,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error || !event) return <div>Event not found</div>;

  return (
    <div className="event-detail">
      <h1>{event.title}</h1>
      <p><strong>Description:</strong> {event.description}</p>
      <p><strong>Date:</strong> {event.date}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <p><strong>Pets Allowed:</strong> {event.petsAllowed ? 'Yes' : 'No'}</p>
      <Link to="/" className="back-link">Back to Events</Link>
    </div>
  );
};

export default EventDetail;