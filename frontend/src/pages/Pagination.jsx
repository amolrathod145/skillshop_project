import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Paginate() {
  const [posts, setposts] = useState([]);
  const [pages, setpages] = useState(1);
  const [allPosts, setallPosts] = useState([]);
  const [limit, setlimit] = useState(2);
  const loadData = async (e) => {
    const limit = 5;
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );

    setpages((pre) => Math.ceil(data.length / limit));
    setallPosts((pre) => {
      setposts((pre) => data.slice(0, limit));
      return data;
    });
  };
  const handleChange = async (e) => {
    setlimit(+e.target.value);
    setpages(Math.ceil(allPosts.length / +e.target.value));
    setposts(allPosts.slice(0, +e.target.value));
  };
  const handlePageChange = (i) => {
    const x = [...allPosts];
    const start = i * limit - limit;
    setposts(x.splice(start, limit));
  };
  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="container">
      <select className="form-select" onChange={handleChange}>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="40">40</option>
      </select>
      <ul class="pagination">
        {Array.from(Array(pages).keys()).map((item) => (
          <li class="page-item" key={item}>
            <a onClick={(e) => handlePageChange(item + 1)} class="page-link">
              {item + 1}
            </a>
          </li>
        ))}
      </ul>
      {posts.map((item, index) => (
        <h1 key={item.id}>
          {index + 1} {item?.title}
        </h1>
      ))}
      <ul class="pagination">
        {Array.from(Array(pages).keys()).map((item) => (
          <li class="page-item" key={item}>
            <a
              onClick={(e) => handlePageChange(item + 1)}
              class="page-link"
              href="#"
            >
              {item + 1}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
