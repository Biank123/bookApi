import React, { useState, useEffect } from 'react';
import BookFilter from './BookFilter'; // Importamos el componente del filtro
import './bookStyles.css';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favorites')) || [] // Cargar los favoritos desde el localStorage si existen
  );
  const [filters, setFilters] = useState({
    title: '',
    author: '',
    year: '',
    description: '',
  });

  // Función para obtener los libros con los filtros aplicados
  const getFilteredBooks = (filterParams) => {
    const queryParams = new URLSearchParams(filterParams).toString();
    fetch(`http://localhost:5000/api/books?${queryParams}`)
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error('Error al obtener los libros filtrados:', error));
  };

  // Función para manejar los cambios en los filtros
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    getFilteredBooks(newFilters);
  };

  // Función para manejar el clic en "Agregar a Favoritos"
  const addToFavorites = (book) => {
    if (!favorites.some((fav) => fav.id === book.id)) {
      const newFavorites = [...favorites, book];
      setFavorites(newFavorites);
      localStorage.setItem('favorites', JSON.stringify(newFavorites)); // Guardamos los favoritos en el localStorage
    }
  };

  // Función para eliminar un libro de los favoritos
  const removeFromFavorites = (bookId) => {
    const newFavorites = favorites.filter((fav) => fav.id !== bookId);
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites)); // Guardamos los favoritos actualizados en el localStorage
  };

  useEffect(() => {
    getFilteredBooks(filters);
  }, []); // Se ejecuta una sola vez al cargar el componente

  return (
    <div>
      <div className="favorites">
        <h2>Favoritos</h2>
        <ul>
          {favorites.length > 0 ? (
            favorites.map((book) => (
              <li key={book.id}>
                <h2>{book.title}</h2>
                <p>Autor: {book.author}</p>
                <button onClick={() => removeFromFavorites(book.id)}>
                  Eliminar de Favoritos
                </button>
              </li>
            ))
          ) : (
            <p>No tienes libros en favoritos.</p>
          )}
        </ul>
      </div>
  
      <div className="book-list">
        <h1>Lista de Libros</h1>
  
        <BookFilter onFilter={handleFilterChange} />
  
        <h2>Libros</h2>
        <ul>
          {books.length > 0 ? (
            books.map((book) => (
              <li key={book.id}>
                <h2>{book.title}</h2>
                <img src={book.image} alt={book.title} />
                <p>Autor: {book.author}</p>
                <p>Año: {book.year}</p>
                <p>{book.description}</p>
                <button onClick={() => addToFavorites(book)}>
                  Agregar a Favoritos
                </button>
              </li>
            ))
          ) : (
            <p>No se encontraron libros con los filtros aplicados.</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default BookList;