// frontend-congresos/lib/useCinemaSocket.ts
import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

export interface ChatMessage {
  id: string;
  user: string;
  role?: string;
  message: string;
  timestamp: string;
}

export interface Participant {
  id: string;
  name: string;
  role?: string;
}

/**
 * Conecta a la sala de chat de un evento en vivo.
 * @param roomId ID de la sala
 * @param token JWT de autenticación
 */
export function useCinemaSocket(roomId: string, token: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [participants, setParticipants] = useState<Participant[]>([]);
  // Usamos ReturnType<typeof io> para inferir el tipo correcto
  const socketRef = useRef<ReturnType<typeof io> | null>(null);

  useEffect(() => {
    // 1) Abrir conexión con token en auth payload
    const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL!, {
      auth: { token },
    });
    socketRef.current = socket;

    // 2) Al conectar, unir a la sala
    socket.on("connect", () => {
      socket.emit("joinRoom", roomId);
    });

    // 3) Escuchar lista de participantes
    socket.on("participantsUpdate", (list: Participant[]) => {
      setParticipants(list);
    });

    // 4) Escuchar nuevos mensajes
    socket.on("newMessage", (msg: ChatMessage) => {
      setMessages((prev) => [...prev, msg]);
    });

    // 5) Cleanup
    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [roomId, token]);

  /**
   * Envía un mensaje de chat al servidor
   */
  function sendMessage(text: string) {
    if (!socketRef.current) return;
    socketRef.current.emit("sendMessage", { roomId, message: text });
  }

  return { messages, participants, sendMessage };
}
