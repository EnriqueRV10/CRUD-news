import { Button } from "./ui/button";
import StatsNews from "./statsNews";

export default function Header() {
  return (
    <header className="bg-red-400 m-4 p-4 rounded-xl">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="capitalize font-bold text-4xl">noticias</h1>
          <Button variant="default">Nueva Noticia</Button>
        </div>
        <StatsNews />
      </div>
    </header>
  );
} 
