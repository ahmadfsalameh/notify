import React from "react";
import Slider from "../../components/slider/slider";
import {
  FaBug,
  FaEye,
  FaBell,
  FaUsers,
  FaPlus,
  FaTasks,
  FaComments,
  FaGlobeAsia,
  FaLink,
} from "react-icons/fa";
import text from "../../constants/text.json";

import "./visualBoard.css";

const VisualBoard = () => {
  const { visualBoard } = text;
  visualBoard[0].icons = [<FaBug />, <FaEye />, <FaBell />];
  visualBoard[1].icons = [<FaPlus />, <FaUsers />, <FaTasks />];
  visualBoard[2].icons = [<FaComments />, <FaLink />, <FaGlobeAsia />];
  return (
    <section className="visual">
      <div className="light">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="slider">
        <Slider autoplayDelay={5000}>
          {visualBoard.map((board) => (
            <div key={board.id} className="slide">
              <div className="boards-container">
                <div className="boards">
                  <div className="board">{board.icons[0]}</div>
                  <div className="board">{board.icons[1]}</div>
                  <div className="board">{board.icons[2]}</div>
                </div>
              </div>
              <h3>{board.heading}</h3>
              <p>{board.description}</p>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default VisualBoard;
