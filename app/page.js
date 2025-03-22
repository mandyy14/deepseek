"use client"; // use client é uma diretiva que indica que o código deve ser executado no lado do cliente

import { assets } from "@/assets/assets";
import Image from "next/image";
import { useState } from "react";

function Home() {
  const [expand, setExpand] = useState(false);
  const [messages, setMassages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      <div className="flex h-screen">
        <div className="flex flex-1 flex-col bg-[#292a2d] items-center justify-center px-4 pb-8 text-white relative">
          <div className="md:hidden absolute px-4 top-6 flex items-center justify-between w-full">
            <Image
              onClick={() => (expand ? setExpand(false) : setExpand(true))}
              className="rotate-180"
              src={assets.menu_icon}
              alt=""
            ></Image>
            <Image className="opacity-70" src={assets.chat_icon} alt=""></Image>
          </div>
          {messages.length === 0 ? (
            <>
              <div className="flex items-center gap-3">
                <Image className="h-16" src={assets.logo_icon} alt=""></Image>
                <p className="text-2xl font-medium">Hi, I&apos;m DeepSeek</p>
              </div>
              <p className="text-sm mt-4">How can I help you today?</p>
            </>
          ) : (
            <div></div>
          )}
          {
            <p className="absolute bottom-1 text-xs text-gray-500">
              AI-generated, for reference only
            </p>
          }
        </div>
      </div>
    </div>
  );
}
export default Home;
