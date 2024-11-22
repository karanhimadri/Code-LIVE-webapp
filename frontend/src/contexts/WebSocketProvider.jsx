import React, { useCallback, useEffect, useState } from "react";
import { io } from "socket.io-client";
import webSocketContext from "./websocket";

const WebSocketProvider = ({ children }) => {
  const URL = import.meta.env.VITE_BACKEND_URL;
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([{ msg: " " }]);
  const [generatingRoomID, setGeneratingRoomID] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [updatedCode, setUpdatedCode] = useState(
    "console.log('Hello, Welcome to CodeLive')"
  );
  const [totalUser, setTotalUser] = useState(0);

  const generateCode = useCallback(() => {
    const characters = "ABCDEFGHIKMPSTWXY0123456789";
    return Array.from({ length: 6 }, () =>
      characters.charAt(Math.floor(Math.random() * characters.length))
    ).join("");
  }, []);

  useEffect(() => {
    const socketInstance = io("http://localhost:8080");
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

    socketInstance.on("codeUpdate", (server_code) => {
      setUpdatedCode(server_code);
    });

    socketInstance.on("countTotalUser", (count) => {
      setTotalUser(count);
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

  const handleRoomCreation = () => {
    if (!generatingRoomID) {
      const roomCode = generateCode();
      setGeneratingRoomID(roomCode);
      // Emit event to server to create room
      socket?.emit("createRoom", roomCode);
    }
  };

  const handleRoomJoining = (joinRoomCode) => {
    return new Promise((resolve, reject) => {
      socket?.emit("joinRoom", joinRoomCode);
      socket.on("isJoinSucceess", (response) => {
        if (response === 1) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
      setRoomCode(joinRoomCode);
    });
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
        totalUser
      }}
    >
      {children}
    </webSocketContext.Provider>
  );
};

export default WebSocketProvider;
