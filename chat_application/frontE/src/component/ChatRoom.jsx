import { useEffect, useRef, useState } from "react";
//useLocation:- try to get data which we send in navigation by state option.
import { useLocation } from "react-router-dom";
//Timing ;-in chat message.
import Moment from "react-moment";
import { io } from "socket.io-client";
const ChatRoom = () => {
  const location = useLocation();
  const messageEndRef = useRef(null);

  const [data, setData] = useState({});
  //Store:- Current message.
  const [msg, setMsg] = useState("");

  //Array state to store all messages.
  const [allMessages, setMessages] = useState([]);
  // We don't emit socket (socket.emit) any where like in onSubmit . We can create emit only on where we define socket (socket.on) so with
  //this state we write that emit in socket.on
  const [socket, setSocket] = useState();

  // we are try to get name and room which i send from navigation(useNavigation)
  useEffect(() => {
    setData(location.state);
  }, [location]);

  useEffect(() => {
    // it depend where we want to initialize
    // initialize:- Create client instance on port 9000
    //8000
    const socket = io("http://localhost:9000");
    // to access socket in on Submit :-(  socket.emit("newMessage", { newMessage, room: data.room });)
    setSocket(socket);
    //client-side connection
    socket.on("connect", () => {
      console.log("socket Connected");
      socket.emit("joinRoom", location.state.room);
    });
  }, []);
  // Scroll Down automaticllay on the last message using useRef()
  useEffect(() => {
    messageEndRef.current.scrollIntoView({ behavior: "smooth" });
  });

  // to avoid clear allMessage array problem
  useEffect(() => {
    if (socket) {
      socket.on("getLatestMessage", (newMessage) => {
        console.log(allMessages);
        console.log(newMessage);
        setMessages([...allMessages, newMessage]);

        //after send meassage clear message from write area
        setMsg("");
        // setLoading(false);
      });
    }
  }, [socket, allMessages]);

  const onSubmit = () => {
    if (msg) {
      // setLoading(true);
      const newMessage = { time: new Date(), msg: msg, name: data.name };
      socket.emit("newMessage", { newMessage, room: data.room });
    }
  };

  const handleChange = (e) => setMsg(e.target.value);
  const handleEnter = (e) => (e.keyCode === 13 ? onSubmit() : "");

  return (
    <div className="container-fluid py-4 m-5 w-50  bg-success text-dark border rounded ">
      <div className="text-center px-2 mb-3 text-capitalize">
        <h1 className="text-warning mb-4">{data.room} Chat Room</h1>
      </div>
      <div
        className="bg-white border rounded p-3 mb-4"
        style={{ height: "410px", overflowY: "scroll" }}
      >
        {allMessages.map((msg) => {
          return data.name === msg.name ? (
            <div className="row justify-content-end pl-5 ">
              <div
                className="d-flex flex-column align-items-end m-2 p-2 shadow  rounded  w-auto"
                style={{ backgroundColor: "#D4EFDF " }}
              >
                <div>
                  <small>
                    <strong
                      className="m-1"
                      style={{ textTransform: "capitalize" }}
                    >
                      {msg.name}
                    </strong>
                  </small>
                  {/* <small className="text-muted m-1">
                    {msg.time}
                  </small> */}
                  <small className="text-muted m-1">
                    <Moment fromNow>{msg.time}</Moment>
                  </small>
                </div>
                <h5 className="m-1">{msg.msg}</h5>
              </div>
            </div>
          ) : (
            <div className="row justify-content-start">
              <div className="d-flex flex-column m-2 p-2 shadow bg-white  rounded w-auto">
                <div>
                  <small>
                    <strong
                      className="m-1"
                      style={{ textTransform: "capitalize" }}
                    >
                      {msg.name}
                    </strong>
                  </small>
                  <small className="text-mmuted m-1">
                    <Moment fromNow>{msg.time}</Moment>
                  </small>
                </div>
                <h5 className="m-1">{msg.msg}</h5>
              </div>
            </div>
          );
        })}
        <div ref={messageEndRef}></div>
      </div>
      {/* ================== Message Type Area  =============== */}
      <div className="form-group d-flex">
        <input
          type="text"
          className="form-control bg-light"
          name="message"
          onKeyDown={handleEnter}
          placeholder="Type your message"
          value={msg}
          onChange={handleChange}
        />
        <button
          type="button"
          className="btn btn-warning mx-2"
          // disabled={loading}
          onClick={onSubmit}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-send"
            viewBox="0 0 16 16"
          >
            <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
