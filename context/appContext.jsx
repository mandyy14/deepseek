"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppContextProvider = ({ children }) => {
  const { user } = useUser();
  const { getToken } = useAuth();

  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);

  const createNewChat = async (name) => {
    try {
      if (!user) return null;
      const token = await getToken();
      await axios.post(
        "/api/chat/create",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchUserChats = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get("/api/chat/get", {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUserChats();

      if (data.success) {
        console.log(data.data);
        setChats(data.data);

        // if the user has no chats, create a new one
        if (data.data.length === 0) {
          await createNewChat();
          return fetchUserChats();
        } else {
          // sort chats by updated date
          const sorted = data.data.sort((a, b) => {
            return new Date(b.updatedAt) - new Date(a.updatedAt);
          });
          setSelectedChat(sorted[0]);
          console.log(sorted[0]);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch chats");
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserChats();
    }
  }, [user]);
  const value = {
    user,
    chats,
    selectedChat,
    setChats,
    setSelectedChat,
    fetchUserChats,
    createNewChat,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
