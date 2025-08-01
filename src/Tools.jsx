import React from 'react';
import { BiEraser } from 'react-icons/bi';
import { FaPen, FaSlash } from 'react-icons/fa';
import { GiClick, GiLaserBurst } from 'react-icons/gi';
import { IoEllipseOutline } from 'react-icons/io5';
import { MdOutlineTextFields } from 'react-icons/md';
import { PiSelectionLight } from 'react-icons/pi';
import { RiRectangleLine } from 'react-icons/ri';

function Tools({ currentTool, onClick }) {
  const tools = [
    { name: "Pen", tool: <FaPen />, type: 1 },
    { name: "Text", tool: <MdOutlineTextFields />, type: 2 },
    { name: "Line", tool: <FaSlash />, type: 4 },
    { name: "Rect", tool: <RiRectangleLine />, type: 8 },
    { name: "Ellipse", tool: <IoEllipseOutline />, type: 16 },
    { name: "Select", tool: <PiSelectionLight />, type: 32 },
    { name: "Eraser", tool: <BiEraser />, type: 64 },
    { name: "Laser", tool: <GiLaserBurst />, type: 128 },
    { name: "Click", tool: <GiClick />, type: 256 },
  ];

  return (
    <div className="w-[100px] h-[90vh] bg-white rounded-3xl shadow-xl absolute top-5 left-5 flex flex-col items-center py-6 gap-3 z-[100] border overflow-hidden">
      {tools.map((item, index) => {
        const isActive = currentTool === item.type;
        return (
          <div
            key={index}
            title={item.name}
            onClick={() => onClick(item.type)}
            className={`flex flex-col items-center justify-center cursor-pointer w-[80px] text-center p-2 rounded-xl transition-all duration-150
              ${isActive ? 'bg-blue-200 text-blue-700 font-semibold' : 'text-gray-700 hover:bg-blue-100 hover:text-blue-600 active:scale-95'}
            `}
          >
            <div className="text-xl">{item.tool}</div>
            <div className="text-[11px] mt-1 leading-tight break-words">
              {item.name}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Tools;
