import { useState, useEffect } from "react";
import {
  useParams,
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";

function encryptMessage(message) {
  return btoa(encodeURIComponent(message));
}

function decryptMessage(encrypted) {
  try {
    return decodeURIComponent(atob(encrypted));
  } catch (e) {
    return "Invalid message";
  }
}

function Home() {
  const [message, setMessage] = useState("");
  const [link, setLink] = useState("");

  const generateLink = () => {
    const encrypted = encryptMessage(message);
    setLink(`${window.location.origin}/message/${encrypted}`);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(link);
    alert("Link copied to clipboard!");
  };

  return (
    <div className="p-4 text-center h-lvh flex flex-col justify-center items-center">
      <h1 className="text-xl font-bold">Share a message with the world</h1>
      <input
        type="text"
        className="border p-2 mt-4"
        placeholder="Enter your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <div className="mt-4 flex gap-5">
        <button
          className="bg-blue-500 text-white p-2 rounded cursor-pointer"
          onClick={generateLink}
        >
          Generate Link
        </button>
        {link && (
          <button
            className="bg-green-500 text-white p-2 rounded cursor-pointer"
            onClick={copyToClipboard}
          >
            Copy Link
          </button>
        )}
      </div>
    </div>
  );
}

function MessageDisplay() {
  const { msg } = useParams();
  const [decrypted, setDecrypted] = useState("");

  useEffect(() => {
    setDecrypted(decryptMessage(msg));
  }, [msg]);

  return (
    <div className="p-4 text-center h-lvh flex flex-col justify-center items-center">
      <h1 className="text-xl font-bold">{decrypted}</h1>
      <Link to="/" className="mt-4 text-blue-500">
        Go Back
      </Link>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/message/:msg" element={<MessageDisplay />} />
      </Routes>
    </Router>
  );
}
