"use client"; // use client é uma diretiva que indica que o código deve ser executado no lado do cliente

import { assets } from "@/assets/assets";
import Message from "@/components/message";
import PromptBox from "@/components/promptBox";
import SideBar from "@/components/sideBar";
import Image from "next/image";
import { useState } from "react";

function Home() {
  const [expand, setExpand] = useState(false);
  const [messages, setMassages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      <div className="flex h-screen">
        <SideBar expand={expand} setExpand={setExpand} />
        <div className="flex-1 flex flex-col bg-[#292a2d] items-center justify-center px-4 pb-8 text-white relative">
          <div className="md:hidden absolute px-4 top-6 flex items-center justify-between w-full">
            <Image
              onClick={() => (expand ? setExpand(false) : setExpand(true))}
              src={assets.menu_icon}
              className="rotate-180"
              alt=""
            />
            <Image src={assets.chat_icon} alt="" className="opacity-70" />
          </div>
          {messages.length === 0 ? (
            <>
              <div className="flex items-center gap-3">
                <Image src={assets.logo_icon} alt="" className="h-16" />
                <p className="text-2xl font-medium">Hi, I&apos;m DeepSeek</p>
              </div>
              <p className="text-sm mt-4">How can I help you today?</p>
            </>
          ) : (
            <div>
              <Message role="user" content="What is next js" />
            </div>
          )}
          <PromptBox isLoading={isLoading} setIsLoading={setIsLoading} />
          <p className="absolute bottom-1 text-xs text-gray-500">
            AI-generated, for reference only
          </p>
        </div>
      </div>
    </div>
  );
}
export default Home;
