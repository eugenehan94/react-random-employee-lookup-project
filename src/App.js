import React, { useState, useEffect } from "react";
import "./App.css";
// Uninstall react icons
const url = "https://randomuser.me/api/";

function App() {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectBtn, setSelectedBtn] = useState("");
  const fetchEmployee = async () => {
    const response = await fetch(url);
    const data = await response.json();
    const employee = data.results[0];
    console.log(employee);
    const { title, first, last } = employee.name;
    const { large: profilePic } = employee.picture;
    const { cell, email, gender, phone } = employee;
    const { age, date } = employee.dob;
    const { city, country, postcode, state } = employee.location;
    const {
      street: { name, number },
    } = employee.location;

    const newEmployee = {
      name: `${title}. ${first} ${last}`,
      date: date,
      profilePic: profilePic,
      gender: gender,
      phone: phone,
      cell: cell,
      age: age,
      email: email,
      city: city,
      country: country,
      postcode: postcode,
      state: state,
      street: `${number} ${name}`,
    };

    setEmployee(newEmployee);
    setSelectedBtn("");
    setLoading(false);
  };

  useEffect(() => {
    fetchEmployee();
  }, []);

  const handleHover = (e) => {
    if (e.target.classList.contains("personal-info-btn")) {
      setSelectedBtn("PersonalInfo");
    } else if (e.target.classList.contains("home-address-btn")) {
      setSelectedBtn("HomeAddress");
    } else if (e.target.classList.contains("contact-info-btn")) {
      setSelectedBtn("ContactInfo");
    } else {
      setSelectedBtn("");
    }
  };

  if (loading) {
    return (
      <div>
        <h1>Loading</h1>
      </div>
    );
  }

  return (
    <main>
      <h1 className="random-employee-title">Find Employee </h1>
      <div className="random-employee-underline"></div>
      <div className="left-right-container">
        <div className="left-container">
          <div className="left-img-wrapper">
            <img src={employee.profilePic} alt={employee.name} />
          </div>
          <div className="left-fetch-btn-wrapper">
            <button onClick={() => fetchEmployee()}> Another employee</button>
          </div>
          <div className="left-btn-list-wrapper">
            <button className="personal-info-btn" onMouseOver={handleHover}>
              Personal Information
            </button>
            <button className="home-address-btn" onMouseOver={handleHover}>
              Home Address
            </button>
            <button className="contact-info-btn" onMouseOver={handleHover}>
              Contact Information
            </button>
          </div>
        </div>
        <hr className="left-right-divide-line" />
        {/*right side of screen */}
        <div>
          <div>
            {selectBtn === "PersonalInfo" ? (
              <div>
                <h1>Personal Info</h1>

                <p>
                  <span className="employee-info-cat">Name: </span>
                  {employee.name}
                </p>

                <p>
                  <span className="employee-info-cat">DOB: </span>
                  {employee.date}
                </p>

                <p>
                  <span className="employee-info-cat">Age: </span>
                  {employee.age}
                </p>

                <p>
                  <span className="employee-info-cat">Gender: </span>
                  {employee.gender}
                </p>
              </div>
            ) : null}

            {selectBtn === "HomeAddress" ? (
              <div>
                <h1>Home Address</h1>

                <p>
                  <span className="employee-info-cat">Address: </span>
                  {employee.street}
                </p>

                <p>
                  <span className="employee-info-cat"> City: </span>
                  {employee.city}
                </p>

                <p>
                  <span className="employee-info-cat">Country: </span>
                  {employee.country}
                </p>

                <p>
                  <span className="employee-info-cat">Postal code: </span>
                  {employee.postcode}
                </p>

                <p>
                  <span className="employee-info-cat">State/Province: </span>
                  {employee.state}
                </p>
              </div>
            ) : null}
            {selectBtn === "ContactInfo" ? (
              <div>
                <h1>Contact Info</h1>

                <p>
                  <span className="employee-info-cat">Phone number: </span>
                  {employee.phone}
                </p>

                <p>
                  <span className="employee-info-cat">Cell Number: </span>
                  {employee.cell}
                </p>

                <p>
                  <span className="employee-info-cat">Email: </span>
                  {employee.email}
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
