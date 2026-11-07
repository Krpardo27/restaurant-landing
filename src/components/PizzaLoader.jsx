import { FaPizzaSlice } from "react-icons/fa";
import { motion as Motion, useReducedMotion } from "framer-motion";

const PizzaLoader = () => {
  const reducedMotion = useReducedMotion();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-zinc-950 z-50">
      <div className="flex flex-col items-center gap-6">
        <Motion.div
          animate={{ rotate: reducedMotion ? 0 : 360 }}
          transition={{
            repeat: reducedMotion ? 0 : Infinity,
            duration: reducedMotion ? 0 : 1,
            ease: "easeInOut",
          }}
          className="text-orange-500"
        >
          <FaPizzaSlice size={70} />
        </Motion.div>

        <p className="text-zinc-300 font-semibold">Preparando tu pizza...</p>
      </div>
    </div>
  );
};

export default PizzaLoader;
