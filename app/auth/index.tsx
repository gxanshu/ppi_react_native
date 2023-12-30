import { useState } from "react";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";


export default function AuthHandlerPage() {
  const [onLogin, setOnLogin] = useState<boolean>(true);

  const pageHandler = () => {
    setOnLogin(!onLogin);
  }
  
  if(onLogin){
    return <LoginPage pageHandler={pageHandler} />
  } else {
    return <RegisterPage pageHandler={pageHandler} />
  }
}

