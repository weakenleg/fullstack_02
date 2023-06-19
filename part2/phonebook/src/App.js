import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PersonForm from './extractComponent/PersonForm';
import Filter from './extractComponent/Filter';
import Persons from './extractComponent/Person';
import phonebookService from './extractComponent/phonebookService';
import Notification from './extractComponent/Notification';
import './index.css';


const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState(null);
  const [notificationKey, setNotificationKey] = useState(0);

  useEffect(() => {
    phonebookService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this person?')) {
      try {
        await phonebookService.remove(id);
        setPersons(persons.filter((person) => person.id !== id));
        showNotification('Person deleted successfully.', 'success');
      } catch (error) {
        console.log(error);
        showNotification('Failed to delete person.', 'error');
      }
    }
  };
  
  const addPerson = async (newPerson) => {
    const existingPerson = persons.find((person) => person.name === newPerson.name);
  
    if (existingPerson) {
      if (window.confirm(`${newPerson.name} is already added to the phonebook, replace the old number with a new one?`)) {
        try {
          const updatedPerson = await phonebookService.update(existingPerson.id, newPerson);
          setPersons(persons.map((person) =>
            person.id === existingPerson.id ? updatedPerson : person
          ));
          showNotification('Number updated successfully.', 'success');
        } catch (error) {
          console.log(error);
          showNotification('Failed to update number.', 'error');
        }
      }
    } else {
      try {
        const createdPerson = await phonebookService.create(newPerson);
        setPersons([...persons, createdPerson]);
        showNotification('Person added successfully.', 'success');
      } catch (error) {
        console.log(error);
        showNotification('Failed to add person.', 'error');
      }
    }
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const showNotification = (message, type) => {
    setNotification({ message, type, key: notificationKey });
    setNotificationKey(notificationKey + 1);
    setTimeout(() => {
      setNotification(null);
    }, 3000); // Adjust the duration as needed
  };
  

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification notification={notification} />

      <Filter
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
        clearSearch={clearSearch}
      />

      <h3>Add a new</h3>

      <PersonForm addPerson={addPerson} />

      <h3>Numbers</h3>

      <Persons persons={filteredPersons} onDelete={handleDelete} />
    </div>
  );
};

export default App;










