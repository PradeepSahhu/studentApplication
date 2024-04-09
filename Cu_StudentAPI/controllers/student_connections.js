const studentModel = require("../model/student_api_model");

const secondYear = async (req, res) => {
  console.log(req.query);
  const { UID, Name, Section, Group, sort, select } = req.query;
  const queryObject = {};
  if (UID) {
    queryObject.UID = UID;
  }

  if (Name) {
    queryObject.Name = { $regex: Name, $options: "i" };
  }
  if (Section) {
    queryObject.Section = { $regex: Section, $options: "i" };
  }
  if (Group) {
    queryObject.Group = Group;
  }

  let apiData = studentModel.find(queryObject);

  if (sort) {
    let sortFix = sort.split(",").join(" ");
    apiData = apiData.sort(sortFix);
  }

  if (select) {
    let selectFix = select.split(",").join(" ");
    apiData = apiData.select(selectFix);
  }

  let page = Number(req.query.page) || 1;
  let limit = Number(req.query.limit) || 35;

  let skip = (page - 1) * limit;

  apiData = apiData.skip(skip).limit(limit);

  // console.log(queryObject);
  const myData = await apiData;
  res.status(200).json({ myData, ngHits: myData.length });

  // const apiData = await studentModel.find({}); //? returns promise
};

const secondYearTesting = async (req, res) => {
  const apiData = await studentModel.find({}); //? returns promise
  res.status(200).json({ apiData });
};

const firstYear = (req, res) => {
  res.send("This is first Year student API");
};
const firstYearTesting = (req, res) => {
  res.send("This is first Year student Testing API");
};

module.exports = { secondYear, secondYearTesting, firstYear, firstYearTesting };
