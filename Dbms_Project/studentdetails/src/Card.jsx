import React, { useState,useRef } from 'react';
import './style.css'

function Card(data) {
  const { UID, Name, Batch, ProgramCode, Section, Group,_id } = data.data;
  const [buttonText, setButtonText] = useState('Present');
  const btnRef = useRef(null);

  console.log(data.data.Name);
  // console.log(Name);

  const changeInfo = () => {
    const curRef = btnRef.current;
    console.log(curRef.classList);

    if (curRef.classList.contains('absent')) {
      curRef.classList.remove('absent');
      curRef.style.backgroundColor='black';
      setButtonText('Present');
    } else {
      curRef.classList.add('absent');
      curRef.style.backgroundColor='red';
      setButtonText('Absent');
    }
  }

  // console.log(props.UID);
  // console.log(props.Name);
  // console.log(props.Batch);
  // console.log(props.ProgramCode);
  // console.log(props.Section);
  // console.log(props.Group);

  return (
    <div key={_id} className="card">
        <div className="image-container">
          <img src="./profile.png" alt="Profile" />
        </div>
      <h2>{Name}</h2>
      <p>UID: {UID}</p>
      <p>Batch: {Batch}</p>
      <p>Program Code: {ProgramCode}</p>
      <p>Section: {Section}</p>
      <p>Group: {Group}</p>
      <button ref={btnRef} onClick={changeInfo}>{buttonText}</button>
    </div>
  );
}

export default Card;
