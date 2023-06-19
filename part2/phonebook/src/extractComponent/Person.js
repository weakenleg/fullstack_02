import React from 'react';
import axios from 'axios';

const Person = ({ person, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm(`Delete ${person.name}?`)) {
      axios.delete(`http://localhost:3001/persons/${person.id}`)
        .then(() => {
          onDelete(person.id);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div>
      {person.name} {person.number}
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};


const Persons = ({ persons, onDelete }) => {
  return (
    <div>
      {persons.map((person) => (
        <Person key={person.id} person={person} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default Persons;