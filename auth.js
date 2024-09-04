// Adicione o Firebase SDK ao seu projeto
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, onSnapshot } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Adicionar uma mensagem ao Firestore
async function sendMessage(text, fileUrl) {
  try {
    await addDoc(collection(db, "messages"), {
      text: text,
      fileUrl: fileUrl,
      timestamp: new Date()
    });
  } catch (e) {
    console.error("Erro ao adicionar documento: ", e);
  }
}

// Obter mensagens do Firestore
async function getMessages() {
  const querySnapshot = await getDocs(collection(db, "messages"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
  });
}

// Escutar novas mensagens em tempo real
onSnapshot(collection(db, "messages"), (snapshot) => {
  snapshot.docChanges().forEach((change) => {
    if (change.type === "added") {
      console.log("Nova mensagem: ", change.doc.data());
    }
  });
});
