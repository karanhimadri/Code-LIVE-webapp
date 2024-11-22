import React, { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaPlus } from "react-icons/fa6";
import { IoCopyOutline } from "react-icons/io5";
import { VscThreeBars } from "react-icons/vsc";
import { HiMiniSignal } from "react-icons/hi2";
import { IoLogOut } from "react-icons/io5";
import "./ActionBar.css";
import webSocketContext from "../../contexts/websocket";

const ActionBar = () => {
  const [createRoomState, setCreateRoomState] = useState(false);
  const [joinRoomState, setJoinRoomState] = useState(false);
  const [leaveRoomButtonState, setLeaveRoomButtonState] = useState(false);
  const [joinRoomCode, setJoinRoomCode] = useState("");
  const [showConnectionsState, setShowConnectionsState] = useState(false);

  const {
    messages,
    generatingRoomID,
    handleRoomCreation,
    handleRoomJoining,
    handleRoomLeaving,
    setGeneratingRoomID,
    totalUser,
  } = useContext(webSocketContext);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(generatingRoomID.trim())
      .then(() => {
        toast.info("Room Code copied!", { autoClose: 500 });
      })
      .catch(() => toast.error("Failed to copy text:"));
  };

  const handleCreateRoom = () => {
    // onclick create state button and code generation
    toast.success("Room created successfully !!", { autoClose: 2000 });
    handleRoomCreation();
    setCreateRoomState(true);
    setJoinRoomState(false);
    setShowConnectionsState(false);
  };

  const handleJoinRoomState = () => {
    // onclick join state button
    setJoinRoomState(true);
    setCreateRoomState(false);
    setShowConnectionsState(false);
  };

  const handleShowConnection = () => {
    setShowConnectionsState(true);
    setCreateRoomState(false);
    setJoinRoomState(false);
  };

  const handleJoinRoomServer = () => {
    // handle join button
    if (joinRoomCode.trim() !== "") {
      console.log(joinRoomCode);
      handleRoomJoining(joinRoomCode)
        .then((isJoined) => {
          if (isJoined) {
            toast.success("You Joined the Room", { autoClose: 2000 });
            setLeaveRoomButtonState(true);
            setJoinRoomState(false);
            setShowConnectionsState(true);
          }
        })
        .catch(() => console.log("ERROR in room joining"));
    }
  };

  const handleLeaveRoomBtn = () => {
    toast.warn("Room leaved !!", { autoClose: 2000 });
    handleRoomLeaving(joinRoomCode);
    setJoinRoomCode(" ");
    setJoinRoomState(false);
    setCreateRoomState(false);
    setGeneratingRoomID("");
    setLeaveRoomButtonState(false);
    setShowConnectionsState(false);
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
          <div className="three-bar">
            <button
              style={{ fontSize: "18px" }}
              type="button"
              className="btn btn-secondary"
            >
              <VscThreeBars />
            </button>
            <div className="three-bar-dropdown">
              <ul
                className="dropdown-menu d-block position-static mx-0 shadow w-220px "
                data-bs-theme="light"
              >
                <li onClick={handleShowConnection}>
                  <a
                    className="dropdown-item d-flex gap-2 align-items-center"
                    href="#"
                  >
                    <HiMiniSignal /> Show connection
                  </a>
                </li>
                <li onClick={handleLeaveRoomBtn}>
                  <a
                    className="dropdown-item dropdown-item-danger d-flex gap-2 align-items-center"
                    href="#"
                  >
                    <IoLogOut /> Leave Room
                  </a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className="result">
        {showConnectionsState && (
          <div className="live-results">
            <div className="live-video">
              <video className="live-icon" autoPlay muted loop>
                <source src="/images/signal.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="room-code">
              <p className="p">Room Code </p>
              <span>: {joinRoomCode}</span>
            </div>
            <div className="group-section">
              <img src="/images/groups.png" alt="group" />
              <button>{totalUser} Joined</button>
            </div>
          </div>
        )}
        {!createRoomState && !joinRoomState && !showConnectionsState && (
          <>
            <p style={{ color: "#03045e" }}>
              {<i>Hey, Wealcome to Code Live</i>}
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
              value={joinRoomCode.trim()}
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
        <ToastContainer />
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
