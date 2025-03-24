import connectDB from "@/config/db";
import Chat from "@/models/chat";
import { getAuth } from "@clerk/nextjs/dist/types/server";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return NextResponse.json({
        success: false,
        message: "User not authenticated",
      });
    }

    // Prepare the chat data to be saved in the database
    const chatData = {
      userId,
      messages: [],
      name: "New Chat",
    };

    // Connect to the database and save the chat data
    await connectDB();
    await Chat.create(chatData);

    return NextResponse.json({
      success: true,
      message: "Chat created successfully",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}
