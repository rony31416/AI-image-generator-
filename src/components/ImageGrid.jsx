// ImageGrid.jsx - Added download functionality
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { useState } from "react";

const ImageGrid = ({ images }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleDownload = (imageUrl, index) => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `ai-generated-image-${index + 1}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 w-full max-w-5xl">
      {images.map((img, idx) => (
        <motion.div
          key={idx}
          className="relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: idx * 0.1 }}
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <img
            src={img}
            alt={`Generated ${idx + 1}`}
            className="w-full h-full object-cover rounded-xl"
          />
          {hoveredIndex === idx && (
            <div 
              className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center cursor-pointer"
              onClick={() => handleDownload(img, idx)}
            >
              <Download className="text-white w-10 h-10" />
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default ImageGrid;