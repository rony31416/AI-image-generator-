
// Home.jsx - Update the generateImages function to handle empty selections
import { useState } from "react";
import Header from "../components/Header";
import PromptBox from "../components/PromptBox";
import ImageGrid from "../components/ImageGrid";

const Home = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const toggleTheme = () => setDarkMode(!darkMode);

  // Get API key from environment variables
  const API_KEY = import.meta.env.VITE_HUGGINGFACE_API_KEY;

  const getImageDimensions = (aspectRatio, baseSize = 512) => {
    const [width, height] = aspectRatio.split(":").map(Number);
    
    // Calculate dimensions based on aspect ratio
    let calculatedWidth, calculatedHeight;
    
    if (width > height) {
      // Landscape orientation
      calculatedWidth = baseSize;
      calculatedHeight = Math.round((height / width) * baseSize);
    } else if (height > width) {
      // Portrait orientation
      calculatedHeight = baseSize;
      calculatedWidth = Math.round((width / height) * baseSize);
    } else {
      // Square
      calculatedWidth = baseSize;
      calculatedHeight = baseSize;
    }

    // Ensure dimensions are multiples of 8 (AI model requirements)
    calculatedWidth = Math.floor(calculatedWidth / 8) * 8;
    calculatedHeight = Math.floor(calculatedHeight / 8) * 8;

    return { width: calculatedWidth, height: calculatedHeight };
  };

  const generateImages = async (prompt, model, numImages, aspectRatio) => {
    if (!prompt.trim()) {
      setError("Please enter a prompt");
      return;
    }
    
    if (!model || !numImages || !aspectRatio) {
      setError("Please select a model, number of images, and image size");
      return;
    }
    
    if (!API_KEY) {
      setError("API key is missing. Please check your environment variables.");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setImages([]); // Clear previous images
    
    const MODEL_URL = `https://api-inference.huggingface.co/models/${model}`;
    const { width, height } = getImageDimensions(aspectRatio);

    try {
      const imagePromises = Array.from({ length: numImages }, async (_, index) => {
        try {
          const response = await fetch(MODEL_URL, {
            headers: {
              Authorization: `Bearer ${API_KEY}`,
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
              inputs: prompt,
              parameters: { 
                width, 
                height,
                num_inference_steps: 30,
                guidance_scale: 7.5,
                seed: Math.floor(Math.random() * 1000000) + index // Different seed for each image
              },
            }),
          });

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error("API Error:", errorData);
            
            if (response.status === 503 && errorData.estimated_time) {
              // Model is loading, wait and retry
              await new Promise(resolve => setTimeout(resolve, errorData.estimated_time * 1000));
              return generateSingleImage(prompt, model, width, height, index);
            }
            
            throw new Error(`Failed to generate image: ${response.statusText}`);
          }

          const blob = await response.blob();
          return URL.createObjectURL(blob);
        } catch (err) {
          console.error(`Error with image ${index + 1}:`, err);
          return null; // Return null for failed images
        }
      });

      const generatedImages = await Promise.all(imagePromises);
      const validImages = generatedImages.filter(img => img !== null);
      
      if (validImages.length === 0) {
        throw new Error("Failed to generate any valid images");
      }
      
      setImages(validImages);
    } catch (error) {
      console.error("Error generating images:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Helper function for retrying image generation
  const generateSingleImage = async (prompt, model, width, height, index) => {
    const MODEL_URL = `https://api-inference.huggingface.co/models/${model}`;
    
    const response = await fetch(MODEL_URL, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        inputs: prompt,
        parameters: { 
          width, 
          height,
          num_inference_steps: 30,
          guidance_scale: 7.5,
          seed: Math.floor(Math.random() * 1000000) + index
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to generate image: ${response.statusText}`);
    }

    const blob = await response.blob();
    return URL.createObjectURL(blob);
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center p-8 transition-all duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <Header toggleTheme={toggleTheme} darkMode={darkMode} />
      <div className="w-full max-w-3xl mt-8">
        <PromptBox onGenerate={generateImages} darkMode={darkMode} />
      </div>
      
      {isLoading && (
        <div className="mt-8 flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-t-transparent border-purple-500 rounded-full animate-spin"></div>
          <p className="mt-4 text-lg font-medium">Generating your images...</p>
        </div>
      )}
      
      {error && (
        <div className="mt-8 p-4 bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-200 rounded-lg">
          <p>{error}</p>
          <p className="mt-2 text-sm">Please check your selections or try a different model.</p>
        </div>
      )}
      
      {!isLoading && images.length > 0 && <ImageGrid images={images} />}
    </div>
  );
};

export default Home;
