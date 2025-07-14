
import { motion } from 'framer-motion';
import { Database } from 'lucide-react';

const Preloader = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[101] flex items-center justify-center bg-background"
    >
      <motion.div
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 1.5,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      >
        <Database className="h-16 w-16 text-primary" />
      </motion.div>
    </motion.div>
  );
};

export default Preloader;
