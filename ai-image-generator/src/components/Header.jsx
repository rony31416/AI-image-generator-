import { Sun, Moon, Sparkles } from "lucide-react";

const Header = ({ toggleTheme, darkMode }) => {
  return (
    <header className="flex flex-col items-center justify-center p-6 border-b">
      <h1 className="text-5xl font-extrabold flex items-center gap-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
        <Sparkles className="text-yellow-400 animate-pulse" size={40} /> AI Image Generator
      </h1>
      <button 
        onClick={toggleTheme} 
        className="absolute top-6 right-6 p-2 rounded-full transition hover:scale-110"
      >
        {darkMode ? <Sun className="text-yellow-500" size={30} /> : <Moon className="text-gray-500" size={30} />}
      </button>
    </header>
  );
};

export default Header;
