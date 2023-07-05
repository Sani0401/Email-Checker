import React, { useState } from "react";
import "./Home.css";
import axios from "axios";

function Home() {
  const [email, setEmail] = useState("");
  const [res, setRes] = useState(null);

  const checkValidity = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:4000/api/validate', {
        params: { email },
      });
      const { data } = response;
      setRes(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="main">
        <div className="heading">
          <h1 className="heading1">
            Email <span className="Validator">Validator</span> App
          </h1>
          <h5 className="heading2">
            <span className="Check">CHECK IF AN EMAIL ADDRESS EXISTS OR NOT </span>
          </h5>
        </div>

        <form onSubmit={checkValidity}>
          <input
            name="email"
            placeholder="Enter the email address..."
            className="Input"
            onChange={(e) => setEmail(e.target.value)}
          />
          <span className="btnSpan">
            <button
              type="submit"
              className="submitBtn btn btn-primary btn-sm"
            >
              Validate
            </button>
          </span>
        </form>

        {res && (
          <div className=" final-table flex flex-col text-primary text-raleway mt-12 w-3/6 h-4/5  md:flex-col md:w-4/6 md:h-full md:mb-12">
            <table className="display__table ">
              <thead className="font-raleway uppercase tracking-wide">
                <tr>
                  <th className="border text-left px-4 py-4">
                    <span  className="table__heading ">Information</span>
                  </th>
                  <th className=" border text-left px-4 py-4">
                    <span className="table__heading ">Result</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-4">Valid</td>
                  <td className="border px-4 py-4 capitalize">
                    {res.valid.toString()}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-4">Disposable</td>
                  <td className="border px-4 py-4 capitalize">
                    {res.disposable.toString()}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-4">Domain</td>
                  <td className="border px-4 py-4">{res.domain}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-4">Text</td>
                  <td className="border px-4 py-4">{res.text}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-4">Reason</td>
                  <td className="border px-4 py-4">{res.reason}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        <p className="footer">Made with ♥ by SANI</p>
      </div>
    </>
  );
}

export default Home;
