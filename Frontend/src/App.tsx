// import { RouterProvider } from "react-router-dom";
// import { routers } from "./app/routers.tsx";
// import "./common.css";
// import "@mantine/core/styles.css";
// import { createTheme, MantineProvider } from "@mantine/core";

// import "@mantine/charts/styles.css";

// const theme = createTheme({
//   /** Put your mantine theme override here */
// });

// function App() {
//   return (
//     <MantineProvider defaultColorScheme="dark">
//       <RouterProvider router={routers} />
//     </MantineProvider>
//   );
// }

// export default App;

import "./common.css";
import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";
import { RouterProvider } from "react-router-dom";
import { routers } from "./app/routers.tsx";
import { createTheme, MantineProvider } from "@mantine/core";
import React, { useEffect, useState, createContext } from "react";
import axios from "axios";

export const AuthContext = createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>]
>([false, () => {}]);
export const UserContext = createContext<
  [any, React.Dispatch<React.SetStateAction<any>>]
>([{}, () => {}]);

const theme = createTheme({});

const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .get("http://localhost:8080/api/v1/users/me")
        .then((res) => {
          setUser(res.data); // Сохранение пользователя в контексте
        })
        .catch(() => {
          console.error("Ошибка загрузки пользователя");
        });
    }
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      checkAuth(token);
    }
  }, []);
  async function checkAuth(access: string) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;
    try {
      const response = await axios.get("http://localhost:8080/api/v1/users/me");
      setIsAuth(true);
      setUser(response.data);
    } catch (error) {
      console.error("Ошибка при получении профиля пользователя:", error);
    }
  }

  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <AuthContext.Provider value={[isAuth, setIsAuth]}>
        <UserContext.Provider value={[user, setUser]}>
          <RouterProvider router={routers} />
        </UserContext.Provider>
      </AuthContext.Provider>
    </MantineProvider>
  );
};

export default App;
