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


//   return { 
//     token, 
//     name, 
//     identity 
// };
// };

import { toast } from "sonner";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { createViewerToken } from "@/actions/token";
import { useEffect, useState } from "react";

export const useViewerToken = (hostIdentity: string) => {
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [identity, setIdentity] = useState("");

  useEffect(() => {
    const createToken = async () => {
      try {
        const viewerToken = await createViewerToken(hostIdentity);
        setToken(viewerToken);

        // Decode the token
        const decodedToken = jwtDecode(viewerToken) as JwtPayload & {
          name?: string;
          sub?: string; // Use sub for identity
        };

        // Log the decoded token to inspect its structure
        // console.log(decodedToken);

        const name = decodedToken?.name;
        const identity = decodedToken?.sub; // Use sub as identity

        // console.log(identity); // Log identity to check its value

        if (identity) {
          setIdentity(identity);
        }

        if (name) {
          setName(name);
        }
      } catch (error) {
        toast.error("Something went wrong");
      }
    };

    createToken(); // Correctly called inside the useEffect
  }, [hostIdentity]);

  return { 
    token, 
    name, 
    identity 
  };
};
