

// import { toast } from "sonner";
// import { JwtPayload, jwtDecode } from "jwt-decode";
// import { createViewerToken } from "@/actions/token";
// import { useEffect, useState } from "react";

// export const useViewerToken = (hostIdentity: string) => {
//   const [token, setToken] = useState("");
//   const [name, setName] = useState("");
//   const [identity, setIdentity] = useState("");

//   useEffect(() => {
//     const createToken = async () => {
//       try {
//         const viewerToken = await createViewerToken(hostIdentity);
//         setToken(viewerToken);

//         const decodedToken = jwtDecode(viewerToken) as JwtPayload & {
//           name?: string;
//         };

//         const name = decodedToken?.name;
//         const identity = decodedToken.jti;

//         if (identity) {
//           setIdentity(identity);
//         }

//         if (name) {
//           setName(name);
//         }
//       } catch {
//         toast.error("Something went wrong");
//       }
//     };

//     createToken(); // Correctly called inside the useEffect

//   }, [hostIdentity]);


//   return { token, name, identity };
// };


import { toast } from "sonner";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { createViewerToken } from "@/actions/token";
import { useEffect, useState } from "react";

// export const useViewerToken = (hostIdentity: string) => {
//   const [token, setToken] = useState("");
//   const [name, setName] = useState("");
//   const [identity, setIdentity] = useState("");

//   useEffect(() => {
//     const createToken = async () => {
//       try {
//         const viewerToken = await createViewerToken(hostIdentity);
//         setToken(viewerToken);

//         const decodedToken = jwtDecode(viewerToken) as JwtPayload & {
//           name?: string;
//         };

//         const name = decodedToken?.name;
//         const identity = decodedToken?.jti; // Decode identity

//         if (identity) {
//           setIdentity(identity);
//         }

//         if (name) {
//           setName(name);
//         }
//       } catch {
//         toast.error("Something went wrong");
//       }
//     };

//     createToken(); // Correctly called inside the useEffect

//   }, [hostIdentity]);

//   return { token, name, identity };
// };


export const useViewerToken = (hostIdentity: string) => {
    const [token, setToken] = useState("");
    const [name, setName] = useState("");
    const [identity, setIdentity] = useState("");
  
    useEffect(() => {
      const createToken = async () => {
        try {
          const viewerToken = await createViewerToken(hostIdentity);
          setToken(viewerToken);
  
          const decodedToken = jwtDecode(viewerToken) as JwtPayload & {
            name?: string;
            identity?: string;  // Make sure to account for identity in the decoded token
          };
  
          const name = decodedToken?.name;
          const identity = decodedToken?.jti; // Decode identity
  
          if (identity) {
            setIdentity(identity); // Set identity properly
          }
  
          if (name) {
            setName(name);
          }
        } catch {
          toast.error("Something went wrong");
        }
      };
  
      createToken(); // Correctly called inside the useEffect
  
    }, [hostIdentity]);
  
    return { token, name, identity };
  };
  