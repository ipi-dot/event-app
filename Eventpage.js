import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input, VStack, HStack, Box, Image, Text } from '@chakra-ui/react';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  useEffect(() => {
    fetch('/events')
      .then(res => res.json())
      .then(data => setEvents(data));
  }, []);

  const filteredEvents = events
    .filter(event => event.title.toLowerCase().includes(search.toLowerCase()))
    .filter(event => categoryFilter ? event.categories.includes(categoryFilter) : true);

  return (
    <VStack spacing={4} align="stretch">
      <HStack spacing={4}>
        <Input
          placeholder="Search events"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button as={Link} to="/add-event">Add Event</Button>
      </HStack>
      <HStack spacing={4}>
        {filteredEvents.map(event => (
          <Box key={event.id} p={4} shadow="md" borderWidth="1px">
            <Link to={`/event/${event.id}`}>
              <Image src={event.image} alt={event.title} boxSize="150px" objectFit="cover" />
              <Text fontWeight="bold">{event.title}</Text>
              <Text>{event.startTime} - {event.endTime}</Text>
            </Link>
          </Box>
        ))}
      </HStack>
    </VStack>
  );
};

export default EventsPage;
