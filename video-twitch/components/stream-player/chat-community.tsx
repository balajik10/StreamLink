"use client";

import { useParticipants } from "@livekit/components-react";
import { useMemo, useState } from "react";
import { useDebounceCallback, useDebounceValue } from "usehooks-ts";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input";
import { CommunityItem } from "./community-item";
import { LocalParticipant, RemoteParticipant } from "livekit-client";


interface ChatCommunityProps {
  hostName: string;
  viewerName: string;
  isHidden: boolean;
}

export const ChatCommunity = ({ hostName, viewerName, isHidden }: ChatCommunityProps) => {
  const [value, setValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useDebounceValue(value, 500); // Correct usage of useDebounceValue
  const participants = useParticipants(); // Correctly calling the hook

  const onChange = (newValue: string) => {
    setValue(newValue);
  };

  const filteredParticipants = useMemo(() => {
    const deduped = participants.reduce((acc, participant) => {
      const hostAsViewer = `host-${participant.identity}`;
      if (!acc.some((p) => p.identity === hostAsViewer)) {
        acc.push(participant);
      }
      return acc;
    }, [] as (RemoteParticipant | LocalParticipant)[]);
  
    // Filter participants based on the debounced value
    return deduped.filter((participant) => 
      participant.name?.toLowerCase().includes(debouncedValue.toLowerCase())
    );
  }, [participants, debouncedValue]);  // Ensure these dependencies are updated properly
  
  
  

  if (isHidden) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-muted-foreground">Community is disabled</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <Input
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search community"
        className="border-white/10"
      />
      <ScrollArea className="gap-y-2 mt-4">
        <p className="text-center text-sm text-muted-foreground hidden last:block p-2">
          No results
        </p>
        {filteredParticipants.map((participant) => (
          <CommunityItem 
          key={participant.identity}
          hostName={hostName}
          viewerName={viewerName}
          participantName={participant.name}
          participantIdentity={participant.identity}
          />
        ))}
      </ScrollArea>
    </div>
  );
  
};




// "use client";

// import { useParticipants } from "@livekit/components-react";
// import { useMemo, useState } from "react";
// import { useDebounceValue } from "usehooks-ts";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Input } from "@/components/ui/input";
// import { CommunityItem } from "./community-item";
// import { LocalParticipant, RemoteParticipant } from "livekit-client";

// interface ChatCommunityProps {
//   hostName: string;
//   viewerName: string;
//   isHidden: boolean;
// }

// export const ChatCommunity = ({ hostName, viewerName, isHidden }: ChatCommunityProps) => {
//   const [value, setValue] = useState("");
//   const [debouncedValue, setDebouncedValue] = useDebounceValue(value, 500); // Correct usage of useDebounceValue
//   const participants = useParticipants(); // Correctly calling the hook

//   const onChange = (newValue: string) => {
//     setValue(newValue);
//   };

//   const filteredParticipants = useMemo(() => {
//     if (!participants || participants.length === 0) return []; // Ensure no errors when participants is empty

//     const deduped = participants.reduce((acc, participant) => {
//       const hostAsViewer = `host-${participant.identity}`;
//       if (!acc.some((p) => p.identity === hostAsViewer)) {
//         acc.push(participant);
//       }
//       return acc;
//     }, [] as (RemoteParticipant | LocalParticipant)[]);

//     // Filter participants based on the debounced value
//     return deduped.filter((participant) =>
//       participant.name?.toLowerCase().includes(debouncedValue.toLowerCase())
//     );
//   }, [participants, debouncedValue]);  // Ensure these dependencies are updated properly

//   if (isHidden) {
//     return (
//       <div className="flex flex-1 items-center justify-center">
//         <p className="text-sm text-muted-foreground">Community is disabled</p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4">
//       <Input
//         onChange={(e) => onChange(e.target.value)} // OnChange will set the value
//         placeholder="Search community"
//         className="border-white/10"
//       />
//       <ScrollArea className="gap-y-2 mt-4">
//         {/* Only show "No results" when no filtered participants exist */}
//         {filteredParticipants.length === 0 ? (
//           <p className="text-center text-sm text-muted-foreground p-2">
//             No results
//           </p>
//         ) : (
//           filteredParticipants.map((participant) => (
//             <CommunityItem
//               key={participant.identity}
//               hostName={hostName}
//               viewerName={viewerName}
//               participantName={participant.name}
//               participantIdentity={participant.identity}
//             />
//           ))
//         )}
//       </ScrollArea>
//     </div>
//   );
// };
