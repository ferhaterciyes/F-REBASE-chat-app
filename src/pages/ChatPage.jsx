import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { useEffect, useState } from "react";
import Message from "../components/Message";

const ChatPage = ({ room, setRoom }) => {
  const [messages, setMessages] = useState(null);
  //kolleksişyonun ref alma
  const messagesCol = collection(db, "messages");
  // filtrekeme ayarları oluşturma
  const queryOptions = query(messagesCol,
     where("room", "==", room),
     orderBy("createdAt", "asc")
     );

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
    e.target.reset()
  };
  // verilere aone ol
  useEffect(() => {
    // anlık olarak kolleksiyondaki değişimleri izler
    //kolleksiyon her değiştiğinde verdiğimiz fonksiyonları çalıştırır

    const unsub = onSnapshot(queryOptions, (snapshot) => {
      const tempMsg = [];
      // docs tamamını dönüp tempmsh isimli diziye aktardık
      snapshot.docs.forEach((doc) => tempMsg.push(doc.data()));
      // geçici dizideki verileri alıp state e aktardım
      setMessages(tempMsg);

      return () => unsub();
    });
  }, []);

  return (
    <div className="chat-page">
      <header>
        <p>{auth?.currentUser?.displayName}</p>
        <p>{room}</p>
        <button onClick={() => setRoom(null)}>Farklı Oda</button>
      </header>
      <main className="">
        {messages?.map((data, i) => (
          <Message data={data} key={i} />
        ))}
      </main>
      <form onSubmit={handleSubmit}>
        <input type="text" required placeholder="mesajınızı yazın . . . " />
        <button type="submit">Gönder</button>
      </form>
    </div>
  );
};

export default ChatPage;
