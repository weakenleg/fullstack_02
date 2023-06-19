import React, { useState } from 'react';
// this component is to add new person
const PersonForm = ({ addPerson }) => {
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
  
    const handleNameChange = (event) => {
      setNewName(event.target.value);
    };
  
    const handleNumberChange = (event) => {
      setNewNumber(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      const newPerson = {
        name: newName,
        number: newNumber,
        id: Date.now(),
      };
  
      addPerson(newPerson);
      setNewName('');
      setNewNumber('');
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <div>
          Name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          Number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    );
  };
  
  export default PersonForm;