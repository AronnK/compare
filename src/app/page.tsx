"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";

const productImages = ["/globe.svg", "/globe.svg", "/globe.svg", "/globe.svg"];

const categories = ["Basics", "Camera", "Performance", "Reviews"];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const totalProducts = productImages.length;
  const leftImages: string[] = [];
  const rightImages: string[] = [];

  for (let i = 0; i < totalProducts; i++) {
    if (i % 2 === 0) leftImages.push(productImages[i]);
    else rightImages.push(productImages[i]);
  }

  const handleArrowClick = (direction: "left" | "right") => {
    const currentIndex = categories.indexOf(selectedCategory);
    if (direction === "left") {
      setSelectedCategory(categories[currentIndex - 1]);
    } else {
      setSelectedCategory(categories[currentIndex + 1]);
    }
  };

  return (
    <div className="bg-black min-h-screen">
      <div className="bg-slate-500 h-[80px] w-full flex items-center justify-center text-white font-bold">
        Header
      </div>

      <div className="flex flex-row h-[calc(100vh-80px)] p-5">
        <div className="w-[15%] flex flex-col gap-5 p-2">
          {leftImages.map((src, index) => (
            <div key={index} className="w-full flex-1 bg-slate-600 rounded-md">
              <Image
                src={src}
                alt=""
                layout="responsive"
                width={200}
                height={300}
              />
            </div>
          ))}
        </div>

        <div className="w-[70%] relative bg-slate-600 p-5 flex flex-col">
          <nav className="flex justify-around border-b border-gray-500 pb-2">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-md text-white transition ${
                  selectedCategory === category
                    ? "bg-gray-700"
                    : "hover:bg-gray-500"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </nav>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="text-white text-center mt-5 overflow-y-auto scrollbar-hidden max-h-[calc(100vh-200px)]"
            >
              <p className="text-lg font-semibold">
                {selectedCategory} Specifications
              </p>
              <p className="mt-3 text-gray-300">
                Details about {selectedCategory}...
              </p>
              <p className="mt-3 text-gray-300">
                Details about {selectedCategory}...
              </p>
              <p className="mt-3 text-gray-300">
                Details about {selectedCategory}...
              </p>
              <p className="mt-3 text-gray-300">
                Details about {selectedCategory}...
              </p>
              <p className="mt-3 text-gray-300">
                Details about {selectedCategory}...
              </p>
              <p className="mt-3 text-gray-300">
                Details about {selectedCategory}...
              </p>
              <p className="mt-3 text-gray-300">
                Details about {selectedCategory}...
              </p>
              <p className="mt-3 text-gray-300">
                Details about {selectedCategory}...
              </p>
              <p className="mt-3 text-gray-300">
                Details about {selectedCategory}...
              </p>
              <p className="mt-3 text-gray-300">
                Details about {selectedCategory}...
              </p>
              <p className="mt-3 text-gray-300">
                Details about {selectedCategory}...
              </p>
              <p className="mt-3 text-gray-300">
                Details about {selectedCategory}...
              </p>
              <p className="mt-3 text-gray-300">
                Details about {selectedCategory}...
              </p>
              <p className="mt-3 text-gray-300">
                Details about {selectedCategory}...
              </p>
            </motion.div>
          </AnimatePresence>
          <div className="absolute bottom-0 left-0 right-0 flex justify-between p-2">
            <ArrowLeftIcon
              onClick={() => handleArrowClick("left")}
              className="h-6 w-6 text-gray-500"
            />
            <ArrowRightIcon
              onClick={() => handleArrowClick("right")}
              className="h-6 w-6 text-gray-500"
            />
          </div>
        </div>

        <div className="w-[15%] flex flex-col gap-5 p-2">
          {rightImages.map((src, index) => (
            <div key={index} className="w-full flex-1 bg-slate-600 rounded-md">
              <Image
                src={src}
                alt=""
                layout="responsive"
                width={200}
                height={300}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
