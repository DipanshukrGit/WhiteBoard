import React, { useEffect, useState } from 'react';
import { ZegoSuperBoardManager } from 'zego-superboard-web';
import { ZegoExpressEngine } from 'zego-express-engine-webrtc';
import Tools from './Tools';

function App() {
  // ✅ Load values from .env
  const appID = Number(import.meta.env.VITE_ZEGO_APP_ID);
  const userID = import.meta.env.VITE_ZEGO_USER_ID;
  const userName = import.meta.env.VITE_ZEGO_USER_NAME;
  const roomID = import.meta.env.VITE_ZEGO_ROOM_ID;
  const token = import.meta.env.VITE_ZEGO_TOKEN;
  const server = import.meta.env.VITE_ZEGO_SERVER;

  // ✅ Track selected tool
  const [currentTool, setCurrentTool] = useState(null);

  const zg = new ZegoExpressEngine(appID, server);
  const zegoSuperBoard = ZegoSuperBoardManager.getInstance();

  const initBoard = async () => {
    try {
      await zegoSuperBoard.init(zg, {
        parentDomID: 'parentDomID',
        appID,
        userID,
        token
      });

      await zg.loginRoom(roomID, token, { userID, userName }, { userUpdate: true });

      await zegoSuperBoard.createWhiteboardView({
        name: 'whiteboard',
        perPageWidth: 1600,
        perPageHeight: 900,
        pageCount: 1
      });
    } catch (error) {
      console.error("❌ Failed to initialize whiteboard:", error);
    }
  };

  const handleToolClick = (toolType) => {
    setCurrentTool(toolType);
    zegoSuperBoard.setToolType(toolType);
  };

  useEffect(() => {
    if (zegoSuperBoard) {
      initBoard();
    }
  }, []);

  return (
    <div className="h-[100vh] w-full bg-black relative">
      <div id="parentDomID" className="w-full h-full"></div>
      <Tools currentTool={currentTool} onClick={handleToolClick} />
    </div>
  );
}

export default App;
