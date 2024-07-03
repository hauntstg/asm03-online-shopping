import React from "react";
import classes from "./LiveChat.module.css";
import LiveChatPopup from "../components/pages/LiveChatPopup";
import { useSelector, useDispatch } from "react-redux";
import { showPopupLiveChatActions } from "../components/store/store";

function LiveChat() {
  const dispatch = useDispatch();
  const showLiveChat = useSelector((state) => state.showPopupLiveChat.show);

  function showPopupLiveChatHandle() {
    dispatch(showPopupLiveChatActions.showPopupLiveChat());
  }
  return (
    <>
      {showLiveChat && <LiveChatPopup />}
      <div className={classes.box} onClick={showPopupLiveChatHandle}>
        <img src="/images/messenger.png" alt="message" />
      </div>
    </>
  );
}
export default LiveChat;
