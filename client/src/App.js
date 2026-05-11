import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import ToolForm from "./components/ToolForm";
import AuditPage from "./pages/AuditPage";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<ToolForm />}
        />

        <Route
          path="/audit/:id"
          element={<AuditPage />}
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;