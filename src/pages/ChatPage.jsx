import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { useEffect, useState } from "react";

const ChatPage = ({ room, setRoom }) => {
  //kolleksişyonun ref alma
  const messagesCol = collection(db, "messages");
  const [messages, setMessages] = useState(null)

  // mesajı veritabanına kaydetme
  const handleSubmit = async (e) => {
    e.preventDefault();

    const text = e.target[0].value;
    // veritabanına yeni döküman ekler
    // 1: ekleme yapacağımız kolleksiyonun ref
    //2:oluşturacağımız dökümanın verileri
    await addDoc(messagesCol, {
      text,
      room,
      author: {
        name: auth.currentUser.displayName,
        uid: auth.currentUser.uid,
        photo: auth.currentUser.photoURL,
      },
      createdAt: serverTimestamp(),
    });
  };

  useEffect(() => {
    // anlık olarak kolleksiyondaki değişimleri izler 
    //kolleksiyon her değiştiğinde verdiğimiz fonksiyonları çalıştırır

   const unsub = onSnapshot(messagesCol, (snapshot) => {
      const tempMsg= [];
         // docs tamamını dönüp tempmsh isimli diziye aktardık
      snapshot.docs.forEach((doc) =>tempMsg.push(doc.data()));
      // geçici dizideki verileri alıp state e aktardım
      setMessages(tempMsg);
      
      return ()=>unsub()
    });
  }, []);

  return (
    <div className="chat-page">
      <header>
        <p>{auth?.currentUser?.displayName}</p>
        <p>{room}</p>
        <button onClick={() => setRoom(null)}>Farklı Oda</button>
      </header>
      <main></main>
      <form onSubmit={handleSubmit}>
        <input type="text" required placeholder="mesajınızı yazın . . . " />
        <button type="submit">Gönder</button>
      </form>
    </div>
  );
};

export default ChatPage;
