// import React from 'react';
// import * as XLSX from 'xlsx';
// import './Submission.css';

// class Submission extends React.Component {
//   exportToExcel = () => {
//     const { data, filename, sheetName } = this.props;
    


//     const modifiedData = data.map(item => {

//         const newItem = { ...item };

//         delete newItem._id;
//         delete newItem.ProgramCode;
//         delete newItem.Batch;
//         delete newItem.__v;

//         return newItem;
//       });


//     const ws = XLSX.utils.json_to_sheet(modifiedData);


//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, sheetName);


//     XLSX.writeFile(wb, `${filename}.xlsx`);
//   };

//   render() {
//     return (
//       <button onClick={this.exportToExcel}>
//         Submit and export to excel
//       </button>
//     );
//   }
// }

// export default Submission;


import React from 'react';
import * as XLSX from 'xlsx';
import './Submission.css';

class Submission extends React.Component {
  exportToExcel = () => {
    const { data, filename, sheetName } = this.props;

    const currentDate = new Date().toLocaleDateString();

    const modifiedData = data.map(item => {
      const newItem = { ...item };

      delete newItem._id;
      delete newItem.ProgramCode;
      delete newItem.Batch;
      delete newItem.__v;
  

      // Add attendanceStatus and currentDate to each item
      console.log(newItem);
      // newItem.date = currentDate;
      newItem[currentDate] = newItem.Attendance ? "Present":"Absent";
      delete newItem.Attendance;

      return newItem;
    });

    const ws = XLSX.utils.json_to_sheet(modifiedData);


    //! to highlight the absent students;

  


    //! it ends here

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);

    XLSX.writeFile(wb, `${filename}.xlsx`);
  };

  render() {
    return (
      <button onClick={this.exportToExcel}>
        Submit and export to excel
      </button>
    );
  }
}

export default Submission;
