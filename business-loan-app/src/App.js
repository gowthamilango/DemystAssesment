import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import "./Components/All.css";
import "./Components/Navbar.css";
import React, { useEffect } from "react";

function App() {
  useEffect(() => {
    const send_button = document.getElementById("send_data");
        function postData(path, params, method) {
          const hidden_form = document.createElement('form');
          hidden_form.method = method || 'post';
          hidden_form.action = path;
            
          for (const key in params) {
              if (params.hasOwnProperty(key)) {
                  const hidden_input = document.createElement('input');
                  hidden_input.type = 'hidden';
                  hidden_input.name = key;
                  hidden_input.value = params[key];
                  hidden_form.appendChild(hidden_input);
              }
          }

          document.body.appendChild(hidden_form);
          hidden_form.submit();
        }
  
      send_button.addEventListener('click', (e) => {
        e.preventDefault();
	      let amount = document.getElementById("loanAmount");
        postData('http://localhost:8080/business-loan/outcome', { loanAmt: amount });
      });
  });

  return (
    <body>
      <div>
        <Navbar />
      </div>
      <div class="row">
        <div class="column"></div>
        <div class="column">
          <div>
            <h2>Business Details</h2>
            <h4>
              Applicant Name{" "}
              <input
                type="text"
                placeholder="Full name"
                className="input-field"
              ></input>
            </h4>
            <h4>
              Business Name{" "}
              <input
                type="text"
                placeholder="Legal name of business"
                className="input-field"
              ></input>
            </h4>
            <h4>
              Business Phone Number{" "}
              <input
                type="number"
                placeholder="Office number"
                className="input-field"
              ></input>
            </h4>
            <h4>
              Business E-mail{" "}
              <input
                type="email"
                placeholder="E-mail"
                className="input-field"
              ></input>
            </h4>
            <h4>
              Year Of Establishment{" "}
              <input
                type="number"
                placeholder="Year"
                className="input-field"
              ></input>
            </h4>

            <h4>
              Loan Amount{" "}
              <input
                id="loanAmount"
                type="number"
                placeholder="Required loan amount"
                className="input-field"
              ></input>
            </h4>
            <h4>
              Accounting Provider{" "}
              <select name="accountingprovider" id="accountingprovider">
                <option value="saab">Xero</option>
                <option value="mercedes">MYOB</option>
                <option value="mercedes">OTHER</option>
              </select>
            </h4>
            <button id="send_data">Submit Application</button>

            <Footer />
          </div>
        </div>
        <div class="column"></div>
      </div>
    </body>
  );
}

export default App;
