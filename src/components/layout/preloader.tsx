
import { motion } from 'framer-motion';

const Preloader = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[101] flex items-center justify-center bg-background"
    >
      <div className="relative h-24 w-24">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 border-2 border-primary/30 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-2 border-2 border-primary/50 rounded-full"
        />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'backOut' }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <span className="font-headline text-primary text-sm">LOADING</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Preloader;
