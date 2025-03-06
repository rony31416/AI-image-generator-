import { useState } from "react";
import Header from "../components/Header";
import PromptBox from "../components/PromptBox";
import ImageGrid from "../components/ImageGrid";

const Home = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [images, setImages] = useState([]);

  const toggleTheme = () => setDarkMode(!darkMode);

  const generateImages = (prompt, model, numImages, aspectRatio) => {
    const generatedImages = Array.from({ length: numImages }, (_, i) =>
      `https://via.placeholder.com/300?text=Image+${i + 1}`
    );
    setImages(generatedImages);
  };

  return (
    <div className={`min-h-screen flex flex-col items-center p-8 transition-all duration-300
      ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      
      <Header toggleTheme={toggleTheme} darkMode={darkMode} />
      
      <div className="w-full max-w-3xl mt-8">
        <PromptBox onGenerate={generateImages} darkMode={darkMode} />
      </div>

      <ImageGrid images={images} />
    </div>
  );
};

export default Home;
