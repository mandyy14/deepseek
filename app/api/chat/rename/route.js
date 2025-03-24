import connectDB from "@/config/db";
import Chat from "@/models/chat";
import { getAuth } from "@clerk/nextjs/server";
import mongoose from "mongoose";
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

    const { chatId, name } = await req.json();

    // 🔐 Validação do ID
    if (!mongoose.Types.ObjectId.isValid(chatId)) {
      return NextResponse.json({
        success: false,
        message: "ID de chat inválido.",
      });
    }

    // Conexão com o banco
    await connectDB();

    const updated = await Chat.findOneAndUpdate(
      { _id: chatId, userId },
      { name },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({
        success: false,
        message: "Chat não encontrado ou não pertence ao usuário.",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Chat renomeado com sucesso.",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}
