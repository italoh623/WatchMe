import { useEffect, useState } from "react";

import { Button } from './Button';

import GenreResponseInterface from '../model/GenreResponseInterface';

import '../styles/sidebar.scss';

interface SideBarProps {
  selectedGenreId: number;
  genres: GenreResponseInterface[];
  handleClickButton: (id: number) => void
}

export function SideBar(props: SideBarProps) {
  // Complete aqui
  const [selectedGenreId, setSelectedGenreId] = useState(props.selectedGenreId);
  const [genres, setGenres] = useState<GenreResponseInterface[]>(props.genres);
  const { handleClickButton } = props;

  useEffect(() => {
    setSelectedGenreId(props.selectedGenreId);
    setGenres(props.genres);
  }, [props])

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={genre.id}
            id={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>

    </nav>
  )
}