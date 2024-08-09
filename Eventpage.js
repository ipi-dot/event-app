import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input, VStack, HStack, Box, Image, Text, Select, useToast } from '@chakra-ui/react';
import { EventContext } from '../context/EventContext';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { categories: allCategories } = useContext(EventContext);
  const toast = useToast();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/events');
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError(err.message);
        toast({
          title: 'Error',
          description: err.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [toast]);

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
        <Select
          placeholder="Filter by category"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          {allCategories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>
      </HStack>
      {loading && <Text>Loading events...</Text>}
      {error && <Text color="red.500">{error}</Text>}
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

