// import { useEffect } from "react";

// import { getMeRequest } from "../api/auth.api";

// import { tokenStorage } from "../token-storage";

// import { useAuthStore } from "../store/auth.store";

// export const useInitAuth = () => {
//   const setUser = useAuthStore(
//     (state) => state.setUser,
//   );

//   useEffect(() => {
//     const init = async () => {
//       try {
//         const token =
//           tokenStorage.getAccessToken();

//         if (!token) return;

//         const user = await getMeRequest();

//         setUser(user);
//       } catch {
//         tokenStorage.clear();
//       }
//     };

//     init();
//   }, [setUser]);
// };