"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useCinemaSocket, Participant } from "@/lib/useCinemaSocket";

interface ParticipantsPanelProps {
  roomId: string;
}

export default function ParticipantsPanel({ roomId }: ParticipantsPanelProps) {
  const [token, setToken] = useState<string>("");
  const [filtered, setFiltered] = useState<Participant[]>([]);

  // Recuperar JWT
  useEffect(() => {
    setToken(localStorage.getItem("token") || "");
  }, []);

  // Conectar al hook
  const { participants } = useCinemaSocket(roomId, token);

  // (Opcional) filtrados, búsquedas...
  useEffect(() => {
    setFiltered(participants);
  }, [participants]);

  return (
    <div className='flex flex-col h-[500px] p-4'>
      <h3 className='font-medium mb-2'>
        Participantes ({participants.length})
      </h3>
      <div className='overflow-y-auto space-y-3'>
        {filtered.map((p: Participant) => (
          <div
            key={p.id}
            className='flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50'>
            <Avatar className='h-10 w-10'>
              <AvatarFallback>{p.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className='flex items-center gap-2'>
                <span className='font-medium'>{p.name}</span>
                {p.role === "moderator" && <Badge>Moderador</Badge>}
                {p.role === "speaker" && <Badge>Ponente</Badge>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
