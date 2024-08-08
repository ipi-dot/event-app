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
          title: `Event ${event ?
