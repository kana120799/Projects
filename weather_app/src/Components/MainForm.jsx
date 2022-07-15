import React from "react";
import { useEffect, useState } from "react";
import "./style.css";
function MainForm() {
  const [cityName, setCity] = useState(null);
  const [search, setSearch] = useState("jaipur");
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  useEffect(() => {
    const fetchApi = async () => {
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=f9cec5456ca78c610160aa12ed036787`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data.main);
      setCity(data.main);
    };
    fetchApi();
  }, [search]);
  return (
    <>
      <div className="box">
        <div className="inputData">
          <input
            type="search"
            onChange={handleChange}
            value={search}
            className="inputField"
          />
        </div>

        {!cityName ? (
          <p className="errorMsg">No Data Found</p>
        ) : (
          <div>
            <div className="info">
              <h2 className="location">
                {/* font Awesome */}
                <i className="fas fa-street-view"></i>
                {search}
              </h2>
              <h1 className="temp">{cityName.temp}</h1>
              <h3 className="tempmin_max">
                Min: {cityName.temp_min} | Max:{cityName.temp_max}
              </h3>
            </div>
            <div className="wave"></div>
          </div>
        )}
      </div>
    </>
  );
}

export default MainForm;
