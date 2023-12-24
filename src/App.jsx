import { useState } from "react";
import AuthPage from "./pages/AuthPage";
import RoomPage from "./pages/RoomPage";
import ChatPage from "./pages/ChatPage";

const App = () => {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("TOKEN"));

  const [room, setRoom] = useState(null);

  // yetkisi yoksa giriş sayfasına yönlendirilecek
  if (!isAuth) {
    return <AuthPage setIsAuth={setIsAuth} />;
  }

  return (
    <div className="container">
      {room ? ( // oda secili ise sohbet sayfası 
        <ChatPage room={room} setRoom={setRoom}/>
      ) : (  // oda secili değilse oda secme sayfası
        <RoomPage setIsAuth={setIsAuth} setRoom={setRoom} />
      )}
    </div>
  );
};

export default App;
