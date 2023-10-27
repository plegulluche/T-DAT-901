import { motion } from "framer-motion";
import BeeImage from "../assets/Bee_1.png";

// Définition du type pour les props
type AnimatedBeeProps = {
  position: "waggle" | "vertical" | "horizontal";
  className?: string;
};

const AnimatedBee: React.FC<AnimatedBeeProps> = ({ position, className }) => {
  const flyAnimation = {
    waggle: {
      x: [0, 50, -50, 50, 0],
      y: [0, -50, 0, 50, 0],
    },
    vertical: {
      y: [0, -50, 0, 50, 0],
    },
    horizontal: {
      x: [0, 50, 0, -50, 0],
    },
  };

  // Bee component integrated directly
  const Bee = () => (
    <div className="w-40 h-40 flex items-center justify-center">
      <img
        src={BeeImage}
        alt="Bee"
        className="w-24 h-24 opacity-60 blur-[1.5px]"
      />
    </div>
  );

  return (
    <motion.div
      animate={{ ...flyAnimation[position] }}
      transition={{
        duration: Math.random() * 0.5 + 1.6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={`absolute ${className}`}
    >
      <Bee />
    </motion.div>
  );
};

export default AnimatedBee;
