import React, { useState, useEffect } from "react";
import { number } from "yup/lib/locale";

export default function PracticePagination() {
  const [limit, setLimit] = useState(2);
  const [pages, setPages] = useState();
  const [allData, setAllData] = useState([]);
  const data = [
    { name: "1 Bharat" },
    { name: "2 Jana" },
    { name: "3 Shivam" },
    { name: "4 Shailesh" },
    { name: "5 Vikas" },
    { name: "6 Rahul" },
    { name: "7 Promod" },
  ];
  const handlePageChange = (e) => {
    const pageNumber = +e.target.textContent;
    const start = pageNumber * limit - limit;
    const end = start + limit;
    setAllData(data.slice(start, end));
    // console.log(start);
    console.log(allData);
  };
  useEffect(() => {
    setAllData(data.slice(0, limit));
    setPages(Math.ceil(data.length / limit));
  }, []);

  return (
    <div>
      <h1>{JSON.stringify(allData)}</h1>
      {allData.map((item) => (
        <h1>{item.name}</h1>
      ))}
      {[...Array(pages).keys()].map((item) => (
        <button
          className="btn btn-dark"
          key={"x" + item}
          onClick={handlePageChange}
        >
          {item + 1}
        </button>
      ))}
    </div>
  );
}
