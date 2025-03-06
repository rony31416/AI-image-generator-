import { motion } from "framer-motion";

const ImageGrid = ({ images }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 w-full max-w-5xl">
      {images.map((img, idx) => (
        <motion.div
          key={idx}
          className="overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: idx * 0.1 }}
        >
          <img
            src={img}
            alt={`Generated ${idx + 1}`}
            className="w-full h-full object-cover rounded-xl"
          />
        </motion.div>
      ))}
    </div>
  );
};

export default ImageGrid;
