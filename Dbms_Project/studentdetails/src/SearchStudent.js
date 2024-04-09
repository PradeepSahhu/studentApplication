import React, { useState, useRef, useEffect } from "react";
import Card from "./Card";
import "./student.css";

export default function SearchStudent() {
  const [name, setName] = useState("");
  const [studentData, setStudentData] = useState(null);

  //Function

  const fetData = async (studentName) => {
    try {
      const response = await fetch(
        `http://localhost:8100/api/students?Name=${studentName}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setStudentData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setStudentData([]);
    }
  };

  useEffect(() => {
    fetData("Pradeep Sahu");
  }, []);

  let studentDetails = [];

  if (studentData !== null && typeof studentData === "object") {
    studentDetails = Object.values(studentData);
  }
  console.log(studentDetails);

  return (
    <>
      <h2>Enter the name of the student to search</h2>
      <div className="searching-field">
        <input
          name="Name"
          placeholder="Enter the Name of the student"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={() => fetData(name)}>Search</button>
      </div>
      <div className="card-container">
        {studentDetails[0] === null || studentDetails[0] === undefined ? (
          <p className="loading-message">Loading...</p>
        ) : (
          studentDetails[0].map((student) => (
            <Card key={student.id} data={student} />
          ))
        )}
      </div>
    </>
  );
}
