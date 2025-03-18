import { RouterProvider } from "react-router-dom";
import { routers } from "./app/routers.tsx";
import "./common.css";
import "@mantine/core/styles.css";
import { createTheme, MantineProvider } from "@mantine/core";

import "@mantine/charts/styles.css";

const theme = createTheme({
  /** Put your mantine theme override here */
});

function App() {
  return (
    <MantineProvider defaultColorScheme="dark">
      <RouterProvider router={routers} />
    </MantineProvider>
  );
}

export default App;
