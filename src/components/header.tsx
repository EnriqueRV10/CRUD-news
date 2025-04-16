import { Button } from "./ui/button";

export default function Header() {
  return (
    <header className="flex justify-between items-center bg-red-400 px-4 py-2">
      <h1 className="capitalize font-bold text-xl">noticias</h1>
      <Button variant="default">Nueva Noticia</Button>
    </header>
  );
} 
