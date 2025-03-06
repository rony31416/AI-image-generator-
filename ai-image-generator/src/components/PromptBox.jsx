import { useState } from "react";
import { Sparkles } from "lucide-react";

const PromptBox = ({ onGenerate, darkMode }) => {
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState("FLUX.1-dev");
  const [numImages, setNumImages] = useState(1);
  const [aspectRatio, setAspectRatio] = useState("1:1");

  const handleGenerate = () => {
    onGenerate(prompt, model, numImages, aspectRatio);
  };

  return (
    <div className="p-6 border rounded-lg shadow-lg bg-opacity-80 backdrop-blur-md 
      transition-all hover:shadow-2xl bg-gray-100 dark:bg-gray-800">
      
      {/* Prompt Input */}
      <textarea
        className={`w-full h-40 p-3 border rounded-xl text-lg font-medium resize-none transition-all outline-none 
          ${darkMode ? "bg-gray-900 text-white border-gray-600" : "bg-white text-black border-gray-300"}
          focus:ring-2 focus:ring-pink-500`}
        placeholder="Enter your creative prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      {/* Selection Options */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        <select className={`dropdown ${darkMode ? "dark-dropdown" : "light-dropdown"}`} value={model} onChange={(e) => setModel(e.target.value)}>
          <option>FLUX.1-dev</option>
          <option>Stable Diffusion</option>
          <option>DALL-E</option>
        </select>

        <select className={`dropdown ${darkMode ? "dark-dropdown" : "light-dropdown"}`} value={numImages} onChange={(e) => setNumImages(Number(e.target.value))}>
          {[1, 2, 3, 4].map((num) => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>

        <select className={`dropdown ${darkMode ? "dark-dropdown" : "light-dropdown"}`} value={aspectRatio} onChange={(e) => setAspectRatio(e.target.value)}>
          {["1:1", "3:4", "9:16"].map((ratio) => (
            <option key={ratio} value={ratio}>{ratio}</option>
          ))}
        </select>
      </div>

      {/* Gorgeous Button */}
      <button 
        className="w-full mt-6 flex justify-center items-center gap-2 py-3 px-6 text-lg font-semibold rounded-xl 
          transition-all shadow-md hover:shadow-xl hover:scale-105 
          bg-gradient-to-r from-purple-500 to-pink-500 text-white"
        onClick={handleGenerate}
      >
        <Sparkles className="animate-spin" /> Generate
      </button>
    </div>
  );
};

export default PromptBox;
