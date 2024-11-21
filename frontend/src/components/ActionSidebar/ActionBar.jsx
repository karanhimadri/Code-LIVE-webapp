import React, { useContext, useEffect, useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import { FaPlus } from "react-icons/fa6";
import { LuLogOut } from "react-icons/lu";
import { IoCopyOutline } from "react-icons/io5";
import "./ActionBar.css";
import webSocketContext from "../../contexts/websocket";

const ActionBar = () => {
  const [createRoomState, setCreateRoomState] = useState(false);
  const [joinRoomState, setJoinRoomState] = useState(false);
  const [leaveRoomButtonState, setLeaveRoomButtonState] = useState(false);
  const [joinRoomCode, setJoinRoomCode] = useState("");

  const {
    messages,
    generatingRoomID,
    handleRoomCreation,
    handleRoomJoining,
    handleRoomLeaving,
    setGeneratingRoomID,
  } = useContext(webSocketContext);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(generatingRoomID)
      .then(() => {})
      .catch((err) => console.error("Failed to copy text:", err));
  };

  const handleCreateRoom = () => {
    // onclick create state button and code generation
    setCreateRoomState(true);
    setJoinRoomState(false);
    handleRoomCreation();
  };

  const handleJoinRoomState = () => {
    // onclick join state button
    setJoinRoomState(true);
    setCreateRoomState(false);
  };

  const handleJoinRoomServer = () => {
    // handle join button
    if (joinRoomCode.trim() !== "") {
      handleRoomJoining(joinRoomCode);
      setLeaveRoomButtonState(true);
    }
  };

  const handleLeaveRoomBtn = () => {
    handleRoomLeaving(joinRoomCode);
    setJoinRoomCode(" ");
    setJoinRoomState(false);
    setCreateRoomState(false);
    setGeneratingRoomID("");
    setLeaveRoomButtonState(false);
  };

  return (
    <div className="action-bar-container">
      <div className="action-btn">
        <button
          type="button"
          className="btn btn-warning"
          onClick={handleCreateRoom}
        >
          <span>
            <FaPlus />
          </span>{" "}
          Create room
        </button>
        <button
          type="button"
          className="btn btn-success"
          onClick={handleJoinRoomState}
        >
          Join room
        </button>
        {leaveRoomButtonState && (
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleLeaveRoomBtn}
          >
            <LuLogOut />
          </button>
        )}
      </div>

      <div className="result">
        {!createRoomState && !joinRoomState && (
          <>
            <p style={{ color: "#03045e" }}>
              <i>Hey, Wealcome to Code Live</i>
            </p>
            <button id="cross"></button>
          </>
        )}
        {createRoomState && (
          <>
            <input
              className="create-input"
              value={generatingRoomID}
              type="text"
              readOnly
            />
            <button className="create-btn" onClick={handleCopy}>
              <IoCopyOutline />
            </button>
          </>
        )}
        {joinRoomState && (
          <>
            <input
              type="text"
              placeholder="Enter joining code"
              onChange={(e) => setJoinRoomCode(e.target.value)}
              value={joinRoomCode}
            />
            <button
              type="button"
              className="btn btn-success"
              onClick={handleJoinRoomServer}
            >
              Join
            </button>
          </>
        )}
      </div>

      <div className="chats">
        {messages.length === 0
          ? " "
          : messages
              .slice()
              .reverse()
              .map((item, index) => (
                <div key={index} className="chat-info">
                  <p>
                    <i>{item.msg}</i>
                  </p>
                </div>
              ))}
      </div>
    </div>
  );
};

export default ActionBar;
