"use client";

import Image from "next/image";
import { useState } from "react";

interface CatImage {
  id: string;
  url: string;
  width: number;
  height: number;
}

export const runtime = "edge";

export default function Home() {
  const [image, setImage] = useState<CatImage>();
  const [loading, setLoading] = useState<boolean>(true);

  const fetchNewCatImage = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://api.thecatapi.com/v1/images/search"
      );
      const data = await response.json();

      setImage(data[0]);
    } catch (error) {
      console.error("Error fetching cat image:", error);
    } finally {
      setLoading(false);
    }
  };

  useState(() => {
    fetchNewCatImage();
  });

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-3xl font-bold text-center">Random Cat Pic</h1>

      <div className="rounded-lg w-60 h-60 my-8 flex items-center justify-center overflow-hidden">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <Image
            src={image?.url!}
            alt="Random Cat"
            width={image?.width}
            height={image?.height}
            className="rounded-lg"
          />
        )}
      </div>
      <button
        onClick={fetchNewCatImage}
        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Show Another Cat
      </button>
    </main>
  );
}
