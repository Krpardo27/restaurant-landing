import { FaPizzaSlice } from "react-icons/fa";
import { motion } from "framer-motion";

const PizzaLoader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-zinc-950 z-50">
      <div className="flex flex-col items-center gap-6">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 1,
            ease: "easeInOut",
          }}
          className="text-orange-500"
        >
          <FaPizzaSlice size={70} />
        </motion.div>

        <p className="text-zinc-300 font-semibold">Preparando tu pizza...</p>
      </div>
    </div>
  );
};

export default PizzaLoader;
