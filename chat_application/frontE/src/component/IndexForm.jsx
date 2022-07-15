import { useState } from "react";
import { useNavigate } from "react-router-dom";

const IndexForm = () => {
  let navigation = useNavigate();
  //useSatate for Validation check.
  const [check, setErrorCheck] = useState("");
  //useState for store User name and Room from navigation
  const [data, setData] = useState({ name: "", room: "" });

  // =============== Update User data state by setData()    =================
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  //  =====================================  VAlidation in User Entry   ====================
  const validation = () => {
    if (!data.name) {
      setErrorCheck("*Please enter your name.");
      return false;
    }
    if (!data.room) {
      setErrorCheck("*Please select room.");
      return false;
    }
    setErrorCheck("");
    return true;
  };

  //  ======================   Handle Submit ====================
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validation();
    if (isValid) {
      //state is option in navigation. And basically here we try to send state data(name,room) with navigation.
      navigation(`/chat/${data.room}`, { state: data });
    }
  };

  return (
    <>
      <div className="px-3 py-5 bg-success rounded  ">
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <h2 className="text-warning ">Welcome to ChatBox</h2>
          </div>
          <div className="form-group mb-4">
            <input
              type="name"
              className="form-control bg-light"
              name="name"
              placeholder="Enter Your Name"
              onChange={handleChange}
            />
          </div>
          <div className="form-group mb-4">
            <select
              className="form-select bg-light"
              name="room"
              onChange={handleChange}
            >
              <option value="">Select Group</option>
              <option value="gaming">Gaming</option>
              <option value="coding">Coding</option>
              <option value="socialMedia">Social Media</option>
            </select>
          </div>
          <button type="submit" className="btn btn-warning w-100 mt-2 mb-1">
            Submit
          </button>
          {check ? <small className="text-white">{check}</small> : ""}
        </form>
      </div>
    </>
  );
};

export default IndexForm;
