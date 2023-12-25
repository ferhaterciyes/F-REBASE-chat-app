import { auth } from "../firebase/config";



const Message = ({data}) => {

// eğer oturumu açık olan nkişinin id si mesajı atan kişinin id sine eşitse
//ekrana bu alan basılacak
  if(auth.currentUser.uid === data.author.uid){
    return <p className="msg-user">{data.text}</p>
  }
// değilse bu alan basılacak
  return (
    <div className="msg-other">
        <p className="user-info">
            <img  src={data.author.photo} />
            <span>{data.author.name}</span>
        </p>
        <p className="msg-text">{data.text}</p>
    </div>
  )
}

export default Message