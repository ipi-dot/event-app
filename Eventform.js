import React, { useState, useContext } from 'react';
import { Button, Input, VStack, useToast, FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react';
import { EventContext } from '../context/EventContext';

const EventForm = ({ event, onSubmit, onCancel }) => {
  const [title, setTitle] = useState(event ? event.title : '');
  const [description, setDescription] = useState(event ? event.description : '');
  const [image, setImage] = useState(event ? event.image : '');
  const [startTime, setStartTime] = useState(event ? event.startTime : '');
  const [endTime, setEndTime] = useState(event ? event.endTime : '');
  const [categories, setCategories] = useState(event ? event.categories : []);
  const [errors, setErrors] = useState({});
  const { categories: allCategories } = useContext(EventContext);
  const toast = useToast();

  const validateForm = () => {
    const errors = {};
    if (!title) errors.title = 'Title is required';
    if (!startTime) errors.startTime = 'Start Time is required';
    if (!endTime) errors.endTime = 'End Time is required';
    return errors;
  };

  const handleSubmit = () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    
    const eventData = { title, description, image, startTime, endTime, categories };
    fetch(event ? `/events/${event.id}` : '/events', {
      method: event ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData),
    })
      .then(response => response.json())
      .then(() => {
        toast({
          title: `Event ${event ? 'updated' : 'created'}.`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        onSubmit();
      })
      .catch(err => {
        toast({
          title: `Failed to ${event ? 'update' : 'create'} event.`,
          description: err.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <VStack spacing={4} align="stretch">
      <FormControl isInvalid={errors.title}>
        <FormLabel>Title</FormLabel>
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <FormErrorMessage>{errors.title}</FormErrorMessage>
      </FormControl>
      <FormControl>
        <FormLabel>Description</FormLabel>
        <Input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Image URL</FormLabel>
        <Input
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </FormControl>
      <FormControl isInvalid={errors.startTime}>
        <FormLabel>Start Time</FormLabel>
        <Input
          placeholder="Start Time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
        <FormErrorMessage>{errors.startTime}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.endTime}>
        <FormLabel>End Time</FormLabel>
        <Input
          placeholder="End Time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
        <FormErrorMessage>{errors.endTime}</FormErrorMessage>
      </FormControl>
      <FormControl>
        <FormLabel>Categories (comma separated)</FormLabel>
        <Input
          placeholder="Categories (comma separated)"
          value={categories.join(', ')}
          onChange={(e) => setCategories(e.target.value.split(',').map(cat => cat.trim()))}
        />
      </FormControl>
      <Button onClick={handleSubmit}>Submit</Button>
      <Button onClick={onCancel}>Cancel</Button>
    </VStack>
  );
};

export default EventForm;

