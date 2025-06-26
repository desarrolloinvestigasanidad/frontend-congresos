"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCinemaSocket, ChatMessage } from "@/lib/useCinemaSocket";

interface ChatPanelProps {
  roomId: string;
}

export default function ChatPanel({ roomId }: ChatPanelProps) {
  const [newMessage, setNewMessage] = useState("");
  const [token, setToken] = useState<string>("");

  // 1) Recuperar tu JWT (aquí lee localStorage; adapta si lo guardas en cookie/contexto)
  useEffect(() => {
    const t = localStorage.getItem("token") || "";
    setToken(t);
  }, []);

  // 2) Conectar al hook
  const { messages, sendMessage } = useCinemaSocket(roomId, token);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    sendMessage(newMessage.trim());
    setNewMessage("");
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className='flex flex-col h-[500px]'>
      {/* HEADER */}
      <div className='p-4 border-b'>
        <div className='flex items-center justify-between'>
          <h3 className='font-medium'>Chat en vivo</h3>
          <span className='text-xs text-muted-foreground'>
            {messages.length} mensajes
          </span>
        </div>
      </div>

      {/* MENSAJES */}
      <div className='flex-1 overflow-y-auto p-4 space-y-3'>
        {messages.map((m: ChatMessage) => (
          <div key={m.id} className='flex gap-3'>
            <strong>{m.user}:</strong>
            <span>{m.message}</span>
            <span className='text-xs text-muted-foreground'>
              {new Date(m.timestamp).toLocaleTimeString("es-ES", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        ))}
      </div>

      {/* INPUT */}
      <div className='p-4 border-t flex gap-2'>
        <Input
          placeholder='Escribe un mensaje...'
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKey}
          className='flex-1'
        />
        <Button onClick={handleSend} size='sm'>
          Enviar
        </Button>
      </div>
    </div>
  );
}
