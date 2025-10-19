import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import dataTeman from "./teman.json";

export default function ProfileSection() {
  const [teman] = useState(dataTeman);
  const [selected, setSelected] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter data berdasarkan pencarian
  const filteredTeman = teman.filter((t) =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="teman"
      className="min-h-screen bg-transparent text-white flex flex-col items-center py-12 px-4"
    >
      {/* Judul */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-3xl md:text-4xl font-bold mb-6 text-purple-400 drop-shadow-lg tracking-wide text-center"
      >
        Profil Teman Kelas
      </motion.h2>

      {/* Input Pencarian */}
      <div className="mb-8 w-full max-w-sm">
        <input
          type="text"
          placeholder="Cari nama teman..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-[#1a1a1a]/70 text-white border border-purple-500/40 focus:border-purple-400 outline-none placeholder-gray-400 text-sm sm:text-base"
        />
      </div>

      {/* Grid Profil */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 w-full max-w-6xl"
        initial="hidden"
        animate="show"
      >
        {filteredTeman.length > 0 ? (
          filteredTeman.map((t, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="bg-[#1a1a1a]/70 rounded-xl overflow-hidden shadow-md hover:shadow-purple-600/40 transition duration-300 transform hover:-translate-y-1 cursor-pointer"
              onClick={() => setSelected(t)}
            >
              <img
                src={t.photo}
                alt={t.name}
                className="w-full h-32 sm:h-40 md:h-48 object-cover"
              />
              <div className="p-3 text-center">
                <h3 className="text-base sm:text-lg font-semibold text-purple-300 mb-1">
                  {t.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-400">{t.role}</p>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-gray-400 text-sm sm:text-base text-center col-span-full">
            Tidak ada teman dengan nama "{searchTerm}"
          </p>
        )}
      </motion.div>

      {/* Popup tanpa background hitam */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <div className="bg-[#1a1a1a]/90 text-white rounded-2xl p-6 sm:p-8 max-w-sm w-[90%] shadow-2xl relative">
              <button
                onClick={() => setSelected(null)}
                className="absolute top-2 right-4 text-purple-400 text-2xl font-bold hover:text-purple-200"
              >
                ×
              </button>

              <img
                src={selected.photo}
                alt={selected.name}
                className="w-28 h-28 sm:w-36 sm:h-36 rounded-full mx-auto object-cover mb-4 border-4 border-purple-500/50"
              />
              <h3 className="text-xl sm:text-2xl font-semibold text-purple-300 mb-1 text-center">
                {selected.name}
              </h3>
              <p className="text-center text-gray-400 mb-4 text-sm sm:text-base">
                {selected.role}
              </p>
              <p className="text-gray-300 text-sm mb-3 text-center leading-relaxed">
                {selected.bio}
              </p>

              {selected.hobbies && (
                <div className="text-center">
                  <p className="text-xs text-purple-400 mb-1 font-medium">
                    Hobi:
                  </p>
                  <ul className="list-disc list-inside text-xs sm:text-sm text-gray-300 inline-block text-left">
                    {selected.hobbies.map((hobi, i) => (
                      <li key={i}>{hobi}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
