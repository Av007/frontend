import "./App.css";
import AuthProvider from "./provider/AuthProvider";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Index />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
