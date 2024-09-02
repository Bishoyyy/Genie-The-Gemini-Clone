import React from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Sidebar = () => {
  const [extended, setExtended] = React.useState(false);
  const { onSent, prevPrompts, setRecentPrompt, newChat } =
    React.useContext(Context);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  return (
    <div className="sidebar">
      <div className="top-sidebar">
        <img
          onClick={() => setExtended(!extended)}
          className="menu-icon"
          src={assets.menu_icon}
          alt="menu icon"
        />
        <div onClick={() => newChat()} className="new-chat">
          <img src={assets.plus_icon} alt="plus icon" className="plus-icon" />
          {extended ? <p>New Chat</p> : null}
        </div>
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((item, index) => {
              return (
                <div
                  className="recent-entry"
                  key={index}
                  onClick={() => loadPrompt(item)}
                >
                  <img src={assets.message_icon} alt="message icon" />
                  <p>{item.slice(0, 18)}</p>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
      <div className="bottom-sidebar">
        <div className="bottom-item bottom-options">
          <img src={assets.question_icon} alt="question icon" />
          {extended ? <p>Help</p> : null}
        </div>
        <div className="bottom-item bottom-options">
          <img src={assets.history_icon} alt="history icon" />
          {extended ? <p>Activity</p> : null}
        </div>
        <div className="bottom-item bottom-options">
          <img src={assets.setting_icon} alt="settings icon" />
          {extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
