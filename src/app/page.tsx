"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { Radar, Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const products = [
  {
    name: "Nothing Phone (2a)",
    images: [
      "/nothing1.jpg",
      "/nothing2.jpg",
      "/nothing3.jpg",
      "/nothing4.jpg",
    ],
    basics: {
      price: "$349.99",
      brand: "Nothing",
      model: "Phone (2a)",
      os: "Android 14, Nothing OS 2.5",
      battery: "5000mAh, 45W Fast Charging",
      display: "6.7” AMOLED, 120Hz, FHD+",
    },
    camera: {
      rear: "50MP (OIS) + 50MP Ultra-wide",
      front: "32MP",
      video: "4K recording, Night Mode",
    },
    performance: {
      chipset: "MediaTek Dimensity 7200 Pro",
      ram: "8GB LPDDR5",
      storage: "128GB UFS 3.1",
    },
    reviews: [
      "Great phone for the price!",
      "Love the unique design and Glyph interface.",
      "Battery life could be better.",
    ],
  },
  {
    name: "Samsung Galaxy S23 FE",
    images: ["/s23fe1.jpg", "/s23fe2.jpg", "/s23fe3.jpg", "/s23fe4.jpg"],
    basics: {
      price: "$599.99",
      brand: "Samsung",
      model: "Galaxy S23 FE",
      os: "Android 14, One UI 6",
      battery: "4500mAh, 25W Fast Charging",
      display: "6.4” Dynamic AMOLED 2X, 120Hz",
    },
    camera: {
      rear: "50MP (OIS) + 12MP Ultra-wide + 8MP Telephoto",
      front: "10MP",
      video: "8K @ 24fps, 4K @ 60fps",
    },
    performance: {
      chipset: "Snapdragon 8 Gen 1",
      ram: "8GB",
      storage: "256GB",
    },
    reviews: [
      "Amazing display and performance!",
      "Camera quality is top-notch.",
      "Gets warm under heavy gaming load.",
    ],
  },
  {
    name: "iPhone 15 Pro",
    images: ["/iphone1.jpg", "/iphone2.jpg", "/iphone3.jpg", "/iphone4.jpg"],
    basics: {
      price: "$999.99",
      brand: "Apple",
      model: "iPhone 15 Pro",
      os: "iOS 17",
      battery: "3274mAh, 20W Fast Charging",
      display: "6.1” Super Retina XDR, 120Hz",
    },
    camera: {
      rear: "48MP (OIS) + 12MP Ultra-wide + 12MP Telephoto",
      front: "12MP",
      video: "4K @ 60fps, ProRes",
    },
    performance: {
      chipset: "A17 Pro",
      ram: "8GB",
      storage: "256GB",
    },
    reviews: [
      "Incredible performance and camera!",
      "The best iPhone yet.",
      "Expensive but worth it.",
    ],
  },
  {
    name: "Google Pixel 8 Pro",
    images: ["/pixel1.jpg", "/pixel2.jpg", "/pixel3.jpg", "/pixel4.jpg"],
    basics: {
      price: "$899.99",
      brand: "Google",
      model: "Pixel 8 Pro",
      os: "Android 14",
      battery: "5050mAh, 30W Fast Charging",
      display: "6.7” OLED, 120Hz",
    },
    camera: {
      rear: "50MP (OIS) + 48MP Ultra-wide + 48MP Telephoto",
      front: "10.8MP",
      video: "4K @ 60fps, Super Res Zoom",
    },
    performance: {
      chipset: "Google Tensor G3",
      ram: "12GB",
      storage: "128GB",
    },
    reviews: [
      "Best camera on any smartphone!",
      "Smooth performance and clean Android experience.",
      "Battery life is decent.",
    ],
  },
];

const categories = ["Basics", "Camera", "Performance", "Reviews"];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [selectedProducts, setSelectedProducts] = useState(products);
  const totalProducts = selectedProducts.length;

  const handleArrowClick = (direction: "left" | "right") => {
    const currentIndex = categories.indexOf(selectedCategory);
    if (direction === "left" && currentIndex > 0) {
      setSelectedCategory(categories[currentIndex - 1]);
    } else if (direction === "right" && currentIndex < categories.length - 1) {
      setSelectedCategory(categories[currentIndex + 1]);
    }
  };

  const radarData = {
    labels: ["Price", "OS", "Battery", "Charging", "Display", "Refresh Rate"],
    datasets: selectedProducts.map((product, index) => ({
      label: product.name,
      data: [
        parseFloat(product.basics.price.replace("$", "")),
        product.basics.os.includes("Android") ? 1 : 0,
        Math.round(parseInt(product.basics.battery) / 500) * 500,
        parseInt(product.basics.battery.split(" ")[1].replace("W", "")),
        parseFloat(product.basics.display.split("”")[0]),
        parseInt(product.basics.display.split(",")[1].replace("Hz", "").trim()),
      ],
      backgroundColor: `hsla(${
        (index * 360) / selectedProducts.length
      }, 70%, 70%, 0.2)`,
      borderColor: `hsl(${(index * 360) / selectedProducts.length}, 70%, 50%)`,
      borderWidth: 2,
    })),
  };

  const barData = {
    labels: selectedProducts.map((product) => product.name),
    datasets: [
      {
        label: "Rear Camera (MP)",
        data: selectedProducts.map((product) =>
          parseInt(product.camera.rear.split("MP")[0])
        ),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Front Camera (MP)",
        data: selectedProducts.map((product) =>
          parseInt(product.camera.front.split("MP")[0])
        ),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
      {
        label: "Ultra-wide (MP)",
        data: selectedProducts.map((product) =>
          product.camera.rear.includes("Ultra-wide")
            ? parseInt(product.camera.rear.split("+")[1].split("MP")[0])
            : 0
        ),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
      {
        label: "Telephoto (MP)",
        data: selectedProducts.map((product) =>
          product.camera.rear.includes("Telephoto")
            ? parseInt(product.camera.rear.split("+")[2].split("MP")[0])
            : 0
        ),
        backgroundColor: "rgba(255, 206, 86, 0.6)",
      },
    ],
  };

  const lineData = {
    labels: selectedProducts.map((product) => product.name),
    datasets: [
      {
        label: "RAM (GB)",
        data: selectedProducts.map((product) =>
          parseInt(product.performance.ram.split("GB")[0])
        ),
        borderColor: "rgba(255, 159, 64, 1)",
        fill: false,
        tension: 0.1,
      },
      {
        label: "Storage (GB)",
        data: selectedProducts.map((product) =>
          parseInt(product.performance.storage.split("GB")[0])
        ),
        borderColor: "rgba(54, 162, 235, 1)",
        fill: false,
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="bg-black min-h-screen">
      <div className="bg-slate-500 h-[80px] w-full flex items-center justify-center text-white font-bold">
        Product Comparison
      </div>

      <div className="flex flex-row h-[calc(100vh-80px)] p-5">
        <div className="w-[15%] flex flex-col gap-5 p-2">
          {selectedProducts.map((product, index) =>
            index % 2 === 0 ? (
              <div
                key={index}
                className="w-full flex-1 bg-slate-600 rounded-md"
              >
                <Image
                  src={product.images[0]}
                  alt=""
                  layout="responsive"
                  width={200}
                  height={300}
                />
              </div>
            ) : null
          )}
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
              className="text-white text-center mt-5 overflow-y-auto scrollbar-hidden max-h-[calc(100vh-200px)] flex"
            >
              <div className="w-[25%] text-gray-300 flex flex-col">
                {selectedProducts.map(
                  (product, index) =>
                    index % 2 === 0 && (
                      <div key={index} className="mb-3">
                        <p className="text-lg font-semibold">{product.name}</p>
                        {selectedCategory === "Basics" && (
                          <ul>
                            <li>Price: {product.basics.price}</li>
                            <li>OS: {product.basics.os}</li>
                            <li>Battery: {product.basics.battery}</li>
                          </ul>
                        )}
                        {selectedCategory === "Camera" && (
                          <ul>
                            <li>Rear: {product.camera.rear}</li>
                            <li>Front: {product.camera.front}</li>
                          </ul>
                        )}
                        {selectedCategory === "Performance" && (
                          <ul>
                            <li>Chipset: {product.performance.chipset}</li>
                            <li>Ram: {product.performance.ram}</li>
                            <li>Storage: {product.performance.storage}</li>
                          </ul>
                        )}
                      </div>
                    )
                )}
              </div>

              <div className="w-[50%] flex items-center justify-center bg-gray-800 p-5 rounded-md">
                {selectedCategory === "Basics" && <Radar data={radarData} />}
                {selectedCategory === "Camera" && <Bar data={barData} />}
                {selectedCategory === "Performance" && <Line data={lineData} />}
              </div>

              <div className="w-[25%] text-gray-300 flex flex-col">
                {selectedProducts.map(
                  (product, index) =>
                    index % 2 !== 0 && (
                      <div key={index} className="mb-3">
                        <p className="text-lg font-semibold">{product.name}</p>
                        {selectedCategory === "Basics" && (
                          <ul>
                            <li>Price: {product.basics.price}</li>
                            <li>OS: {product.basics.os}</li>
                            <li>Battery: {product.basics.battery}</li>
                          </ul>
                        )}
                        {selectedCategory === "Camera" && (
                          <ul>
                            <li>Rear: {product.camera.rear}</li>
                            <li>Front: {product.camera.front}</li>
                          </ul>
                        )}
                        {selectedCategory === "Performance" && (
                          <ul>
                            <li>Chipset: {product.performance.chipset}</li>
                            <li>Ram: {product.performance.ram}</li>
                            <li>Storage: {product.performance.storage}</li>
                          </ul>
                        )}
                      </div>
                    )
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-0 left-0 right-0 flex justify-between p-2">
            <ArrowLeftIcon
              onClick={() => handleArrowClick("left")}
              className="h-6 w-6 text-gray-500 cursor-pointer"
            />
            <ArrowRightIcon
              onClick={() => handleArrowClick("right")}
              className="h-6 w-6 text-gray-500 cursor-pointer"
            />
          </div>
        </div>

        <div className="w-[15%] flex flex-col gap-5 p-2">
          {selectedProducts.map((product, index) =>
            index % 2 !== 0 ? (
              <div
                key={index}
                className="w-full flex-1 bg-slate-600 rounded-md"
              >
                <Image
                  src={product.images[0]}
                  alt=""
                  layout="responsive"
                  width={200}
                  height={300}
                />
              </div>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
}
