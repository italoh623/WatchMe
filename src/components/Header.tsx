import '../styles/header.scss';

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <header>
      <span className="category">Categoria:<span> {title}</span></span>
    </header>
  )
}