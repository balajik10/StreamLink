// import { useMemo } from "react";
// import { Info } from "lucide-react";
// import { Hint } from "@/components/hint";

// interface ChatInfoProps {
//   isDelayed: boolean;
//   isFollowersOnly: boolean;
// }

// export const ChatInfo = ({
//   isDelayed,
//   isFollowersOnly,
// }: ChatInfoProps) => {
//   const hint = useMemo(() => {
//     if (isFollowersOnly && !isDelayed) {
//       return "Only followers can chat";
//     }
//     if (isDelayed && !isFollowersOnly) {
//       return "Messages are delayed by 3 seconds";
//     }
//     if (isDelayed && isFollowersOnly) {
//       return "Only followers can chat. Messages are delayed by 3 seconds";
//     }
//     return ""; // Added to handle cases where none of the conditions are met
//   }, [isDelayed, isFollowersOnly]);

//   const label = useMemo(() => {
//     if (isFollowersOnly && !isDelayed) {
//       return " followers only";
//     }
//     if (isDelayed && !isFollowersOnly) {
//       return "Slow mode";
//     }
//     if (isDelayed && isFollowersOnly) {
//       return "followers only and  Slow mode";
//     }
//     return ""; // Added to handle cases where none of the conditions are met
//   }, [isDelayed, isFollowersOnly]);

//   if (!isDelayed && !isFollowersOnly){
//     return null; // Return null if no conditions are met to display the hint or label. This ensures that the component does not render when no conditions apply.
//   }

//   return (
//     <div className="p-2 text-muted-foreground bg-white/5 border border-white/10 w-full rounded-t-md flex items-center gap-x-2">
//       <Hint label={hint}>
//         <Info className="h-4 w-4" />
//       </Hint>
//       <p className="text-xs font-semibold">
//         {label}
//       </p>
//     </div>
//   );
  
// };




import { useMemo } from "react";
import { Info } from "lucide-react";
import { Hint } from "@/components/hint";

interface ChatInfoProps {
  isDelayed: boolean;
  isFollowersOnly: boolean;
}

export const ChatInfo = ({ isDelayed, isFollowersOnly }: ChatInfoProps) => {
  const hint = useMemo(() => {
    if (isFollowersOnly && !isDelayed) {
      return "Only followers can chat";
    }
    if (isDelayed && !isFollowersOnly) {
      return "Messages are delayed by 3 seconds";
    }
    if (isDelayed && isFollowersOnly) {
      return "Only followers can chat. Messages are delayed by 3 seconds";
    }
    return "";
  }, [isDelayed, isFollowersOnly]);

  const label = useMemo(() => {
    if (isFollowersOnly && !isDelayed) {
      return " followers only";
    }
    if (isDelayed && !isFollowersOnly) {
      return "Slow mode";
    }
    if (isDelayed && isFollowersOnly) {
      return "followers only and Slow mode";
    }
    return "";
  }, [isDelayed, isFollowersOnly]);

  if (!isDelayed && !isFollowersOnly) {
    return null;
  }

  return (
    <div className="p-2 text-muted-foreground bg-white/5 border border-white/10 w-full rounded-t-md flex items-center gap-x-2">
      <Hint label={hint}>
        <Info className="h-4 w-4" />
      </Hint>
      <p className="text-xs font-semibold">{label}</p>
    </div>
  );
};
