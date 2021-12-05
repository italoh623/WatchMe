import { useEffect, useState } from 'react';
import { MovieCard } from './MovieCard';
import { Header } from './Header';

import GenreResponseInterface from '../model/GenreResponseInterface';
import MovieInterface from '../model/MovieInterface';

import '../styles/content.scss';

interface ContentProps {
  selectedGenre: GenreResponseInterface;
  movies: MovieInterface[];
}

export function Content(props: ContentProps) {
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseInterface>(props.selectedGenre);
  const [movies, setMovies] = useState<MovieInterface[]>(props.movies);
  
  useEffect(() => {
    setSelectedGenre(props.selectedGenre);
    setMovies(props.movies);
  }, [props]);

  return (
    <div className="container">
      <Header title={selectedGenre.title} />

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