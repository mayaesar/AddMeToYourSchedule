import { createContext, useEffect, useState } from "react";

export const UserContext = createContext(null);

// export const UserProvider = ({children}) => {
//     const [userId, setUserId] = useState(window.localStorage.getItem("user-id"));
// }