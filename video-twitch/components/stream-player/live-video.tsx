
"use client";

import { Participant, Track } from "livekit-client";
import { useRef ,useState, useEffect} from "react";
import { useTracks } from "@livekit/components-react";
import { FullscreenControl } from "./fullscreen-control";
import { useEventListener } from "usehooks-ts";
import { VolumeControl } from "./volume-control";

interface LiveVideoProps {
  participant: Participant;
}

export const LiveVideo = ({ participant }: LiveVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [volume, setVolume] = useState(50); // Default volume as 50% for slider

  // Helper function to clamp values between 0 and 1
  const clamp = (value: number, min: number, max: number) => {
    return Math.min(Math.max(value, min), max);
  };

  // Handles volume changes
  const onVolumeChange = (value: number) => {
    const scaledValue = clamp(value / 100, 0, 1); // Scale 0-100 to 0-1
    setVolume(value);
    if (videoRef.current) {
      videoRef.current.muted = scaledValue === 0; // Mute if volume is 0
      videoRef.current.volume = scaledValue; // Set volume to the scaled value
    }
  };

  // Toggles mute and adjusts the slider volume accordingly
  const toggleMute = () => {
    const isMuted = volume === 0;
    const newVolume = isMuted ? 50 : 0; // Set to 50% when unmuting
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
      videoRef.current.volume = clamp(newVolume / 100, 0, 1); // Ensure within range
    }
  };

  // Initialize volume on mount
  useEffect(() => {
    onVolumeChange(50); // Start with 50% volume
  }, []);
  


  const toggleFullscreen = () => {
    if (isFullscreen){
        document.exitFullscreen();
      } else if (wrapperRef?.current){
        wrapperRef.current.requestFullscreen();
      }
    }

    const handelFullscreenChange=()=>{
        const isCurrentlyFullscreen=document.fullscreenElement!==null;
        setIsFullscreen(isCurrentlyFullscreen);
    }

    useEventListener('fullscreenchange',handelFullscreenChange,wrapperRef);

  useTracks([Track.Source.Camera, Track.Source.Microphone])
    .filter((track) => track.participant.identity === participant.identity)
    .forEach((track) => {
      if (videoRef.current) {
        track.publication.track?.attach(videoRef.current);
      }
    });

  return (
    <div ref={wrapperRef} className="relative h-full flex">
      <video ref={videoRef} width="100%" />
      <div className="absolute top-0 left-0 right-0 bottom-0 opacity-0 hover:opacity-100 hover:transition-all">
        <div className="absolute bottom-0 flex h-14 w-full items-center justify-between bg-gradient-to-r from-neutral-900 px-4">
            <VolumeControl
            onChange={onVolumeChange}
            value={volume}
            onToggle={toggleMute}
            />
          <FullscreenControl
            isFullscreen={isFullscreen}
            onToggle={toggleFullscreen}
          />
        </div>
      </div>
    </div>
  );
};



// "use client";

// import { Participant, Track } from "livekit-client";
// import { useRef, useState, useEffect } from "react";
// import { useTracks } from "@livekit/components-react";
// import { FullscreenControl } from "./fullscreen-control";
// import { useEventListener } from "usehooks-ts";
// import { VolumeControl } from "./volume-control";

// interface LiveVideoProps {
//   participant: Participant;
// }

// export const LiveVideo = ({ participant }: LiveVideoProps) => {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const wrapperRef = useRef<HTMLDivElement>(null);

//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const [volume, setVolume] = useState(0);

//   // Ensure volume is clamped to [0, 1]
//   const onVolumeChange = (value: number) => {
//     const clampedValue = Math.min(Math.max(value * 0.1, 0), 1); // Clamp value between 0 and 1
//     setVolume(clampedValue * 10); // Keep original value for the slider (0 - 100)
//     if (videoRef?.current) {
//       videoRef.current.muted = value === 0;
//       videoRef.current.volume = clampedValue;
//     }
//   };

//   const toggleMute = () => {
//     const isMuted = volume === 0;
//     const newVolume = isMuted ? 50 : 0;
//     setVolume(newVolume);
//     if (videoRef?.current) {
//       videoRef.current.muted = !isMuted;
//       videoRef.current.volume = isMuted ? 0.5 : 0;
//     }
//   };

//   useEffect(() => {
//     onVolumeChange(0); // Set volume to 0 initially
//   }, []);

//   const toggleFullscreen = () => {
//     if (isFullscreen) {
//       document.exitFullscreen();
//     } else if (wrapperRef?.current) {
//       wrapperRef.current.requestFullscreen();
//     }
//   };

//   const handleFullscreenChange = () => {
//     const isCurrentlyFullscreen = document.fullscreenElement !== null;
//     setIsFullscreen(isCurrentlyFullscreen);
//   };

//   useEventListener("fullscreenchange", handleFullscreenChange, wrapperRef);

//   useTracks([Track.Source.Camera, Track.Source.Microphone])
//     .filter((track) => track.participant.identity === participant.identity)
//     .forEach((track) => {
//       if (videoRef.current) {
//         track.publication.track?.attach(videoRef.current);
//       }
//     });

//   return (
//     <div ref={wrapperRef} className="relative h-full flex">
//       <video ref={videoRef} width="100%" />
//       <div className="absolute top-0 left-0 right-0 bottom-0 opacity-0 hover:opacity-100 hover:transition-all">
//         <div className="absolute bottom-0 flex h-14 w-full items-center justify-between bg-gradient-to-r from-neutral-900 px-4">
//           <VolumeControl onChange={onVolumeChange} value={volume} onToggle={toggleMute} />
//           <FullscreenControl isFullscreen={isFullscreen} onToggle={toggleFullscreen} />
//         </div>
//       </div>
//     </div>
//   );
// };







// "use client";

// import { Participant,Track } from "livekit-client";
// import { useRef } from "react";
// import{useTracks} from "@livekit/components-react"
// import { FullscreenControl } from "./fullscreen-control";

// interface LiveVideoProps {
//   participant: Participant;
// }

// export const LiveVideo = ({
//     participant,
//   }: LiveVideoProps) => {
//     const videoRef = useRef<HTMLVideoElement>(null);
//     const wrapperRef = useRef<HTMLDivElement>(null);

//     useTracks([Track.Source.Camera, Track.Source.Microphone])
//   .filter((track) => track.participant.identity === participant.identity)
//   .forEach((track) => {
//     if (videoRef.current) {
//       track.publication.track?.attach(videoRef.current);
//     }
//   });

  
//     return (
//       <div
//         ref={wrapperRef}
//         className="relative h-full flex"
//       >
//         <video ref={videoRef} width="100%" />
//         <div className="absolute top-0 h-full w-full  opacity-0 hover:opacity-100 hover:transition-all">
//             <div className="absolute botton-0 flex h-14 w-full items-center justify-between bg-gradient-to-r from-neutral-900 px-4">
//                 <FullscreenControl
//                 isFullscreen={false}
//                 onToggle={()=> {}}
//                 />

//             </div>

//         </div>
//       </div>
//     );
//   };
  
