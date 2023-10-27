// DASHBOARD PAGE //

import { motion } from "framer-motion";

export default function Dashboard() {
  return (
    // <AnimatePresence></AnimatePresence>
    <div className="p-5 text-gray-100 w-full h-full mt-5">
      <div className="w-fit">
        <p className="text-3xl font-semibold">Welcome Boustiflor !</p>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 128 }}
          transition={{ duration: 0.8 }}
          className="h-1 w-fit bg-[#771FED] w-32 mt-2 rounded-full"
        ></motion.div>
      </div>
      <div className="mt-10 flex gap-10">
        <div className="w-full h-40 bg-[#1B1B1B] drop-shadow-lg rounded"></div>
        <div className="w-full h-40 bg-[#1B1B1B] drop-shadow-lg rounded"></div>
      </div>
      <div className="mt-10 flex gap-10">
        <div className="w-full h-40 bg-[#1B1B1B] drop-shadow-lg rounded"></div>
        <div className="w-full h-40 bg-[#1B1B1B] drop-shadow-lg rounded"></div>
      </div>
    </div>
  );
}
