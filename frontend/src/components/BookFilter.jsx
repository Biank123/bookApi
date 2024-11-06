import React, { useState } from 'react';
import './bookStyles.css'; 


const BookFilter = ({ onFilter }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [description, setDescription] = useState('');

  // Función para manejar el envío del filtro
  const handleSubmit = (event) => {
    event.preventDefault();
    onFilter({ title, author, year, description }); // Pasamos los filtros al componente principal
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Filtrar por título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Filtrar por autor"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <input
        type="number"
        placeholder="Filtrar por año"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />
      <input
        type="text"
        placeholder="Filtrar por descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Filtrar</button>
    </form>
  );
};

export default BookFilter;