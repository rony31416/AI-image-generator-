// PromptBox.jsx - Updated with placeholder dropdown options
import { useState } from "react";
import { Sparkles } from "lucide-react";

const PromptBox = ({ onGenerate, darkMode }) => {
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState("");
  const [numImages, setNumImages] = useState("");
  const [aspectRatio, setAspectRatio] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim() || !model || !numImages || !aspectRatio) return;
    
    setIsGenerating(true);
    await onGenerate(prompt, model, numImages, aspectRatio);
    setIsGenerating(false);
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
        <select 
          className={`p-2 rounded-lg border ${
            darkMode 
              ? "bg-gray-900 text-white border-gray-600" 
              : "bg-white text-black border-gray-300"
          } focus:outline-none focus:ring-2 focus:ring-pink-500`} 
          value={model} 
          onChange={(e) => setModel(e.target.value)}
          required
        >
          <option value="" disabled>Select Model</option>
          <option value="black-forest-labs/FLUX.1-dev">FLUX.1-dev</option>
          <option value="black-forest-labs/FLUX.1-schnell">FLUX.1-schnell</option>
          <option value="stabilityai/stable-diffusion-xl-base-1.0">Stable Diffusion XL</option>
          <option value="runwayml/stable-diffusion-v1-5">Stable Diffusion v1.5</option>
          <option value="prompthero/openjourney">Openjourney</option>
        </select>

        <select 
          className={`p-2 rounded-lg border ${
            darkMode 
              ? "bg-gray-900 text-white border-gray-600" 
              : "bg-white text-black border-gray-300"
          } focus:outline-none focus:ring-2 focus:ring-pink-500`} 
          value={numImages} 
          onChange={(e) => setNumImages(Number(e.target.value))}
          required
        >
          <option value="" disabled>Number of Images</option>
          {[1, 2, 3, 4].map((num) => (
            <option key={num} value={num}>{num} Images</option>
          ))}
        </select>

        <select 
          className={`p-2 rounded-lg border ${
            darkMode 
              ? "bg-gray-900 text-white border-gray-600" 
              : "bg-white text-black border-gray-300"
          } focus:outline-none focus:ring-2 focus:ring-pink-500`} 
          value={aspectRatio} 
          onChange={(e) => setAspectRatio(e.target.value)}
          required
        >
          <option value="" disabled>Image Size</option>
          <option value="1:1">1:1 (Square)</option>
          <option value="16:9">16:9 (Landscape)</option>
          <option value="4:3">4:3 (Standard)</option>
          <option value="21:9">21:9 (Ultrawide)</option>
        </select>
      </div>

      {/* Gorgeous Button */}
      <button
        className="w-full mt-6 flex justify-center items-center gap-2 py-3 px-6 text-lg font-semibold rounded-xl 
          transition-all shadow-md hover:shadow-xl hover:scale-105 
          bg-gradient-to-r from-purple-500 to-pink-500 text-white disabled:opacity-70 disabled:cursor-not-allowed"
        onClick={handleGenerate}
        disabled={isGenerating || !prompt.trim() || !model || !numImages || !aspectRatio}
      >
        {isGenerating ? (
          <Sparkles className="animate-spin" />
        ) : (
          <Sparkles />
        )} 
        {isGenerating ? "Generating..." : "Generate"}
      </button>
    </div>
  );
};

export default PromptBox;