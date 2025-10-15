import type { Event } from "./types";



export const fetchEvents = async (page: number = 1, limit: number = 5, search: string = '', petsAllowed?: boolean) => {
 const response = await fetch('https://my-json-server.typicode.com/Code-Pop/Touring-Vue-Router/events');
    let events: Event[] = await response.json();

  let filteredEvents = events;

  if (search) {
    filteredEvents = filteredEvents.filter(event =>
      event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.description.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (petsAllowed !== undefined) {
    filteredEvents = filteredEvents.filter(event => event.petsAllowed === petsAllowed);
  }
console.log('filtered',filteredEvents)
  const total = filteredEvents.length;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  events = filteredEvents.slice(startIndex, endIndex);

  return { events, total };
};

export const fetchEventById = async (id: number): Promise<Event | null> => {
  try {
    const response = await fetch('https://my-json-server.typicode.com/Code-Pop/Touring-Vue-Router/events');
    const events: Event[] = await response.json();
    return events.find(event => event.id === id) || null;
  } catch (error) {
    console.error('Failed to fetch events:', error);
    return null;
  }
};
