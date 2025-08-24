import "./App.css";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/tiptap/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";

import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

import { Provider } from "react-redux";

import Store from "./Store";
import AppRoutes from "./Pages/AppRoutes";

function App() {
  return (
    <Provider store={Store}>
      <MantineProvider defaultColorScheme="dark">
        <Notifications position="top-center" zIndex={1000} />
        <AppRoutes />
      </MantineProvider>
    </Provider>
  );
}

export default App;
