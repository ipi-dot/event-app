import React, { useState, useContext } from 'react';
import { Button, Input, VStack, useToast } from '@chakra-ui/react';
import { EventContext } from '../context/EventContext';

const EventForm = ({ event, onSubmit, onCancel }) => {
  const [title, setTitle] = useState(event ? event.title : '');
  const [description, setDescription] = useState(event ? event.description : '');
  const [image, setImage] = useState(event ? event.image : '');
  const [startTime, setStartTime] = useState(event ? event.startTime : '');
  const [endTime, setEndTime] = useState(event ? event.endTime : '');
  const [categories, setCategories] = useState(event ? event.categories : []);
  const { categories: allCategories } = useContext(EventContext);
  const toast = useToast();

  const handleSubmit = () => {
    const eventData = { title, description, image, startTime, endTime, categories };
    fetch(event ? `/events/${event.id}` : '/events', {
      method: event ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData),
    })
      .then(() => {
        toast({
          title: `Event ${event ? 'updated' : 'created'}.`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        onSubmit();
      })
      .catch(() => {
        toast({
          title: `Failed to ${event ? 'update' : 'create'} event.`,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <VStack spacing={4} align="stretch">
      <Input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Input
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <Input
        placeholder="Start Time"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
      />
      <Input
        placeholder="End Time"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
      />
      <Input
        placeholder="Categories (comma separated)"
        value={categories.join(', ')}
        onChange={(e) => setCategories(e.target.value.split(',').map(cat => cat.trim()))}
      />
      <Button onClick={handleSubmit}>Submit</Button>
      <Button onClick={onCancel}>Cancel</Button>
    </VStack>
  );
};

export default EventForm;

