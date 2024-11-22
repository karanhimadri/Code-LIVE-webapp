import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import webSocketContext from "./websocket";

const WebSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([{ msg: " " }]);
  const [generatingRoomID, setGeneratingRoomID] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [updatedCode, setUpdatedCode] = useState(
    "console.log('Hello, Welcome to CodeLive')"
  );

  function generateCode() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    return Array.from({ length: 6 }, () =>
      characters.charAt(Math.floor(Math.random() * characters.length))
    ).join("");
  }

  useEffect(() => {
    const socketInstance = io(
      "https://code-share-backend-at-railway-production.up.railway.app/"
    );
    setSocket(socketInstance);

    socketInstance.emit("messageFromClient", "Himadri");

    socketInstance.on("validateConnection", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socketInstance.on("successMessage", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    socketInstance.on("userJoined", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    socketInstance.on("errorMessage", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socketInstance.disconnect(); // Cleanup on unmount
    };
  }, []);

  const handleCodeFromAceEditor = (newCode) => {
    setUpdatedCode(newCode);
    if (roomCode) {
      // Emit the new code to the server with the room code
      socket?.emit("updateCode", { roomCode, code: newCode });
    }
  };

  useEffect(() => {
    const handleCodeUpdate = (server_code) => {
      // Update the local state with the received code
      setUpdatedCode(server_code);
    };
    socket?.on("codeUpdate", handleCodeUpdate);

    return () => {
      socket?.off("codeUpdate", handleCodeUpdate);
    };
  }, [socket]);

  const handleRoomCreation = () => {
    if (!generatingRoomID) {
      const roomCode = generateCode();
      setGeneratingRoomID(roomCode);

      // Emit event to server to create room
      socket?.emit("createRoom", roomCode);
    }
  };

  const handleRoomJoining = (joinRoomCode) => {
    socket?.emit("joinRoom", joinRoomCode);
    setRoomCode(joinRoomCode);
  };

  const handleRoomLeaving = (roomCode) => {
    socket?.emit("leaveRoom", roomCode);
    setRoomCode("");
  };

  return (
    <webSocketContext.Provider
      value={{
        messages,
        generatingRoomID,
        handleRoomCreation,
        handleRoomJoining,
        handleRoomLeaving,
        setGeneratingRoomID,
        updatedCode,
        handleCodeFromAceEditor,
      }}
    >
      {children}
    </webSocketContext.Provider>
  );
};

export default WebSocketProvider;
