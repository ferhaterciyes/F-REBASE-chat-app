import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./../firebase/config";

const AuthPage = ({setIsAuth}) => {
  // giriş yap butonuna tıklanınca
  const handleClick = () => {
    signInWithPopup(auth, provider)
      .then((res) => { 
        // oturumun açık olduğunu kaydetmek için kullanıcıyı localstorage'a kaydediyorum
        localStorage.setItem("TOKEN", res.user.refreshToken);

        // kullanıcının yetkisisni ture ya cek
        setIsAuth(true)
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <div className="auth">
        <h1>Chat Odası</h1>
        <p>Devam etmek için giriş yapın</p>
        <button onClick={handleClick}>
          <img src="/g-logo.png" alt="Google Logosu" />
          Google İle Giriş Yap
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
