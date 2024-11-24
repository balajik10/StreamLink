// "use client";

// import { ConnectionState } from "livekit-client";
// import { useMediaQuery } from "usehooks-ts";
// import { useChat, useConnectionState, useRemoteParticipant } from "@livekit/components-react";
// import { ChatVariant, useChatSidebar } from "@/store/use-chat-sidebar";
// import { useEffect, useMemo, useState } from "react";
// import { ChatHeader } from "./chat-header";
// import { ChatForm } from "./chat-form";
// import { ChatList } from "./chat-list";


// interface ChatProps {
//     hostName: string;
//     hostIdentity: string;
//     viewerName: string;
//     isFollowing: boolean;
//     isChatEnabled: boolean;
//     isChatDelayed: boolean;
//     isChatFollowersOnly: boolean;
//   }
  

  
//   export const Chat = ({
//     hostName,
//     hostIdentity,
//     viewerName,
//     isFollowing,
//     isChatEnabled,
//     isChatDelayed,
//     isChatFollowersOnly,
//   }: ChatProps) => {
//     const matches = useMediaQuery("(max-width: 1024px)");
//     const { variant, onExpand } = useChatSidebar((state) => state);
//     const connectionState = useConnectionState();
//     const participant = useRemoteParticipant(hostIdentity);
//     const isOnline = participant && connectionState === ConnectionState.Connected;
//     const isHidden = !isChatEnabled || !isOnline;
  
//     const [value, setValue] = useState("");
  
//     const { chatMessages: messages, send } = useChat();
  
//     useEffect(() => {
//       if (matches) {
//         onExpand();
//       }
//     }, [matches, onExpand]);
  
//     const reversedMessages = useMemo(() => {
//       return messages.sort((a, b) => b.timestamp - a.timestamp);
//     }, [messages]);
  
//     const onSubmit = () => {
//       if (!send) return;
//       send(value);
//       setValue("");
//     };
  
//     const onChange = (newValue: string) => {
//       setValue(newValue);
//     };
  
//     return (
//       <div className="flex flex-col bg-background border-l border-b pt-0 h-[calc(100vh-80px)]">
//         <ChatHeader/>
//         {variant===ChatVariant.CHAT && (
//             <>
//             <ChatList
//             messages={reversedMessages}
//             isHidden={isHidden}
//             />
//             <ChatForm
//                 onSubmit={onSubmit}
//                 value={value}
//                 onChange={onChange}
//                 isHidden={isHidden}
//                 isFollowersOnly={isChatFollowersOnly}
//                 isDelayed={isChatDelayed}
//                 isFollowing={isFollowing}
//             />

//             </>
//         )}
//         {variant===ChatVariant.COMMUNITY &&(
//             <>
//             <p>Community</p>
//             </>
//         )}
//       </div>
//     );
//   };
  
  

// "use client";

// import { ConnectionState } from "livekit-client";
// import { useMediaQuery } from "usehooks-ts";
// import { useChat, useConnectionState, useRemoteParticipant } from "@livekit/components-react";
// import { ChatVariant, useChatSidebar } from "@/store/use-chat-sidebar";
// import { useEffect, useMemo, useState } from "react";
// import { ChatHeader } from "./chat-header";
// import { ChatForm } from "./chat-form";
// import { ChatList } from "./chat-list";
// import { ChatCommunity } from "./chat-community";

// interface ChatProps {
//   hostName: string;
//   hostIdentity: string;
//   viewerName: string;
//   isFollowing: boolean;
//   isChatEnabled: boolean;
//   isChatDelayed: boolean;
//   isChatFollowersOnly: boolean;
// }

// export const Chat = ({
//   hostName,
//   hostIdentity,
//   viewerName,
//   isFollowing,
//   isChatEnabled,
//   isChatDelayed,
//   isChatFollowersOnly,
// }: ChatProps) => {
//   const matches = useMediaQuery("(max-width: 1024px)");
//   const { variant, onExpand } = useChatSidebar((state) => state);
//   const connectionState = useConnectionState();
//   const participant = useRemoteParticipant(hostIdentity);
//   const isOnline = participant && connectionState === ConnectionState.Connected;
//   const isHidden = !isChatEnabled || !isOnline;

//   const [value, setValue] = useState("");

//   const { chatMessages: messages, send } = useChat();

//   useEffect(() => {
//     if (matches) {
//       onExpand();
//     }
//   }, [matches, onExpand]);

//   const reversedMessages = useMemo(() => {
//     return messages.sort((a, b) => b.timestamp - a.timestamp);
//   }, [messages]);

//   const onSubmit = () => {
//     if (!value || isHidden || !send) return;

//     send(value)
//       .then((sentMessage) => {
//         console.log("Message sent:", sentMessage);  // Verify message sent
//       })
//       .catch((error) => {
//         console.error("Failed to send message:", error);  // Handle error
//       });

//     setValue("");  // Clear input after sending
//   };

//   const onChange = (newValue: string) => {
//     setValue(newValue);
//   };

//   return (
//     <div className="flex flex-col bg-background border-l border-b pt-0 h-[calc(100vh-80px)]">
//       <ChatHeader />
//       {variant === ChatVariant.CHAT && (
//         <>
//           <ChatList messages={reversedMessages} isHidden={isHidden} />
//           <ChatForm
//             onSubmit={onSubmit}
//             value={value}
//             onChange={onChange}
//             isHidden={isHidden}
//             isFollowersOnly={isChatFollowersOnly}
//             isDelayed={isChatDelayed}
//             isFollowing={isFollowing}
//           />
//         </>
//       )}
//       {variant === ChatVariant.COMMUNITY && (
//         <ChatCommunity
//         viewerName={viewerName}
//         hostName={hostName}
//         isHidden={isHidden}
//         />
//       )}
//     </div>
//   );
// };





"use client";

import { ConnectionState } from "livekit-client";
import { useMediaQuery } from "usehooks-ts";
import { useChat, useConnectionState, useRemoteParticipant } from "@livekit/components-react";
import { ChatVariant, useChatSidebar } from "@/store/use-chat-sidebar";
import { useEffect, useMemo, useState } from "react";
import { ChatHeader, ChatHeaderSkeleton } from "./chat-header";
import { ChatForm, ChatFormSkeleton } from "./chat-form";
import { ChatList, ChatListSkeleton } from "./chat-list";
import { ChatCommunity } from "./chat-community";

interface ChatProps {
  hostName: string;
  hostIdentity: string;
  viewerName: string;
  isFollowing: boolean;
  isChatEnabled: boolean;
  isChatDelayed: boolean;
  isChatFollowersOnly: boolean;
}

export const Chat = ({
  hostName,
  hostIdentity,
  viewerName,
  isFollowing,
  isChatEnabled,
  isChatDelayed,
  isChatFollowersOnly,
}: ChatProps) => {
  const matches = useMediaQuery("(max-width: 1024px)");
  const { variant, onExpand } = useChatSidebar((state) => state);
  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostIdentity);

  const isOnline = participant && connectionState === ConnectionState.Connected;
  const isHidden = !isChatEnabled || !participant || connectionState !== ConnectionState.Connected;

  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { chatMessages: messages, send } = useChat();

  useEffect(() => {
    if (matches) {
      onExpand();
    }
  }, [matches, onExpand]);

  const reversedMessages = useMemo(() => {
    return messages.sort((a, b) => b.timestamp - a.timestamp);
  }, [messages]);

  const onSubmit = () => {
    if (!value || isHidden || !send) return;

    send(value)
      .then(() => {
        setError(null);
      })
      .catch((error) => {
        console.error("Failed to send message:", error);
        setError("Failed to send message. Please try again.");
      });

    setValue("");
  };

  const onChange = (newValue: string) => {
    setValue(newValue);
  };

  console.log("Connection State:", connectionState);
  console.log("Participant:", participant);
  console.log("isHidden:", isHidden);

  return (
    <div className="flex flex-col bg-background border-l border-b pt-0 h-[calc(100vh-80px)]">
      <ChatHeader />
      {variant === ChatVariant.CHAT && (
        <>
          <ChatList messages={reversedMessages} isHidden={isHidden} />
          <ChatForm
            onSubmit={onSubmit}
            value={value}
            onChange={onChange}
            isHidden={isHidden}
            isFollowersOnly={isChatFollowersOnly}
            isDelayed={isChatDelayed}
            isFollowing={isFollowing}
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
        </>
      )}
      {variant === ChatVariant.COMMUNITY && (
        <ChatCommunity
          viewerName={viewerName}
          hostName={hostName}
          isHidden={isHidden}
        />
      )}
    </div>
  );
};
export const ChatSkeleton = () => {
  return (
    <div className="flex flex-col border-1 border-b pt-0 h-[calc(100vh-80px)] border-2">
      <ChatHeaderSkeleton />
      <ChatListSkeleton />
      <ChatFormSkeleton />
    </div>
  );
};
