"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

const AppContextProvider = ({ children }) => {
  const { isLoaded: isUserLoaded, user } = useUser();
  const { isLoaded: isAuthLoaded, getToken } = useAuth();

  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);

  const isReady = isUserLoaded && isAuthLoaded;

  const createNewChat = async () => {
    try {
      if (!user) return;

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
      await fetchUsersChats();
    } catch (error) {
      toast.error(error.message || "Erro ao criar novo chat");
    }
  };

  const fetchUsersChats = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get("/api/chat/get", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        const sortedChats = [...data.data].sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );

        setChats(sortedChats);
        setSelectedChat(sortedChats[0] || null);

        if (sortedChats.length === 0) {
          await createNewChat();
        }
      } else {
        toast.error(data.message || "Erro ao buscar chats");
      }
    } catch (error) {
      toast.error(error.message || "Erro ao buscar chats");
    }
  };

  useEffect(() => {
    if (user) {
      fetchUsersChats();
    }
  }, [user]);

  const value = {
    user,
    chats,
    setChats,
    selectedChat,
    setSelectedChat,
    fetchUsersChats,
    createNewChat,
  };

  return (
    <AppContext.Provider value={value}>
      {isReady ? (
        children
      ) : (
        <div className="text-white text-center p-4">Carregando...</div>
      )}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
