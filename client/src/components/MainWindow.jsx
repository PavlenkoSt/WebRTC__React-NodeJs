import { useEffect, useState } from "react";
import { BsCameraVideo, BsPhone } from "react-icons/bs";

import socket from "../utils/socket";

export const MainWindow = ({ startCall }) => {
  const [localId, setLocalId] = useState("");
  const [remoteId, setRemoteId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    socket
      .on("init", ({ id }) => {
        setLocalId(id);
      })
      .emit("init");
  }, []);

  const callWithVideo = (video) => {
    if (!remoteId.trim()) {
      return setError("Your friend ID must be specified!");
    }
    const config = { audio: true, video };
    startCall(true, remoteId, config);
  };

  return (
    <div>
      <div>
        <h2>Your ID is</h2>
        <p>{localId}</p>
      </div>
      <div>
        <label htmlFor="remoteId">Your friend ID</label>
        <p>{error}</p>
        <input
          type="text"
          spellCheck={false}
          placeholder="Enter friend ID"
          onChange={({ target: { value } }) => {
            setError("");
            setRemoteId(value);
          }}
        />
        <div>
          <button onClick={() => callWithVideo(true)}>
            <BsCameraVideo />
          </button>
          <button onClick={() => callWithVideo(false)}>
            <BsPhone />
          </button>
        </div>
      </div>
    </div>
  );
};
