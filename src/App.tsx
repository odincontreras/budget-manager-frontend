import "antd/dist/reset.css";
import { ConfigProvider } from "antd";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import antdTheme from "./utils/antdTheme";

function App() {
  return (
    <ConfigProvider theme={antdTheme}>
      <RouterProvider router={router}  />
    </ConfigProvider>
  );
}

export default App;
