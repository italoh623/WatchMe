import { useEffect, useState } from 'react';
import { MovieCard } from './MovieCard';

import GenreResponseInterface from '../model/GenreResponseInterface';
import MovieInterface from '../model/MovieInterface';

import '../styles/content.scss';

interface ContentProps {
  selectedGenre: GenreResponseInterface;
  movies: MovieInterface[];
}

export function Content(props: ContentProps) {
  // Complete aqui
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseInterface>(props.selectedGenre);
  const [movies, setMovies] = useState<MovieInterface[]>(props.movies);
  
  useEffect(() => {
    setSelectedGenre(props.selectedGenre);
    setMovies(props.movies);
  }, [props]);

  return (
    <div className="container">
      <header>
        <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
          ))}
        </div>
      </main>
    </div>
  )
}