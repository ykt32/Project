import { Route, Routes } from "react-router-dom";
import { SignIn, SignUP, Home } from "./page";
import { Toast, ToastProvider } from "./components/ui/toast";

const App = () => {
  return (
    <div className="w-screen h-screen ">
      <ToastProvider>
        <Toast />
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/sign_up" element={<SignUP />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </ToastProvider>
    </div>
  );
};

export default App;
