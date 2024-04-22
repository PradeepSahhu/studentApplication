import React, { useState, useEffect } from 'react';
import Card from './Card';
import SearchStudent from './SearchStudent';
import Submission from './Submission';

function App() {
  let [StudentsInfo, setStudentsInfo] = useState(null); // Initialize as null
  let [Sec,setSec] = useState('');
  let [Group, setGroup] = useState('');
  const [showComponent, setShowComponent] = useState(false);
  // const [attendanceStatus,setattendanceStatus] = useState(true);
 

  const handleButtonClick = () => {
    setShowComponent(true);
  };

  const handleAttendanceChange = (index) => {
    setStudentsInfo(prevStudentsInfo => {
      console.log(prevStudentsInfo.myData);
      const updatedData = {
        ...prevStudentsInfo,
        myData: [...prevStudentsInfo.myData]
      };
      updatedData.myData[index].Attendance = !updatedData.myData[index].Attendance;
      return updatedData;
    });
  };
  


  const fetData = async (Sec,Group) => {
    console.log(Sec);
    try {
      const response = await fetch(`http://localhost:8100/api/students?Section=${Sec}&Group=${Group}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      
    
      setStudentsInfo(data); 
      console.log(data);
      console.log(typeof(data));
      
    } catch (error) {
      console.error('Error fetching data:', error);
      setStudentsInfo([]); 
    }
  }
  const showFull = async(Sec,Group) => {

    setSec(Sec?Sec:"A");
    try {
      const response = await fetch(`http://localhost:8100/api/students?Section=${Sec}&Group=${Group}&limit=70`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      
    
      setStudentsInfo(data); 
      console.log(data);
      console.log(typeof(data));
      
    } catch (error) {
      console.error('Error fetching data:', error);
      setStudentsInfo([]); 
    }

  }

 

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const response = await fetch('http://localhost:8100/api/students');
    //     if (!response.ok) {
    //       throw new Error('Failed to fetch data');
    //     }
    //     const data = await response.json();
        
    //     setStudentsInfo(data); // Set StudentTemp to the fetched data as well
    //     console.log(data);
    //     console.log(typeof(data));
        
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //     setStudentsInfo([]); // Set StudentsInfo to an empty array in case of error
    //   }
    // };

    // fetchData();
    fetData("22BCS_TPP-815","A");
  }, []);


  if (StudentsInfo === null) {
    return <p>Loading...</p>;
  }


  // const showData = (student, index) => (
  //   <Card key={index} data={student} />
  // );

  const studentDetails = Object.values(StudentsInfo);
  console.log(studentDetails[0]);
  console.log(studentDetails[0][0].UID)
  console.log(studentDetails[0][0].Name)
  console.log(typeof(studentDetails[0][0].Name));

  // studentDetails[0].map((student,index) =>{
  //   console.log(student.Section);
  // });
  // let student = studentDetails[0][0].Name;
  let student = studentDetails[0];
  console.log("The data of it is: "+student + " type is : "+typeof(student) + student);


  return (

    
    <div>
    <div className="SearchingArea">
      <input name='section' 
        placeholder='Enter the Section' 
        value={Sec}
        onChange={(e) => setSec(e.target.value)} 
      />
      <input 
        name='group' 
        placeholder='Enter the Group' 
        value={Group}
        onChange={(e) => setGroup(e.target.value)} 
      />
      <button 
        onClick={() => fetData(Sec,Group)}>
        Check
      </button>
      <button onClick={()=> showFull(Sec,Group)}>
        Show All Students
      </button>
      </div>
      <button className="nameSearch" onClick={handleButtonClick}>Search By Name</button>
      {showComponent && <SearchStudent />}
    <h1 style={{textAlign:'center'}}>Student Details of Section : {studentDetails[0][0].Section} / {studentDetails[0][0].Group?studentDetails[0][0].Group:null}</h1>
    {studentDetails[0].map((student,index) => (
      <Card key={index} attendanceStatus={student.Attendance} onAttendanceChange={() => handleAttendanceChange(index)} data={student}/>
    ))}


    <Submission
          data={studentDetails[0]}
          filename="exported_data"
          sheetName="Sheet1"
        />

    
        
    </div>
  );
}

export default App;

