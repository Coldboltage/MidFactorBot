import React from "react";
import * as styles from "../styles/Home.module.css";
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.min.css"
  integrity="sha512-EZLkOqwILORob+p0BXZc+Vm3RgJBOe1Iq/0fiI7r/wJgzOFZMlsqTa29UEl6v6U6gsV4uIpsNZoV32YZqrCRCQ=="
  crossOrigin="anonymous"
  referrerpolicy="no-referrer"
/>;
import Table from "../components/Table"

const index = () => {
  return (
    <div>
      <h1>This be some work here</h1>
      <Table/>
    </div>
  );
};

export default index;

// export async function getStaticProps(context) {
//   const response = await fetch("https://midfactor.herokuapp.com/api/matches")
//   const data = await response.json()
//   return {
//     props: {data}, // will be passed to the page component as props
//   }
// }
