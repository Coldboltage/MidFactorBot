import React from "react";
import * as styles from "../styles/Home.module.css";
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.min.css"
  integrity="sha512-EZLkOqwILORob+p0BXZc+Vm3RgJBOe1Iq/0fiI7r/wJgzOFZMlsqTa29UEl6v6U6gsV4uIpsNZoV32YZqrCRCQ=="
  crossOrigin="anonymous"
  referrerPolicy="no-referrer"
/>;
import Table from "../components/Table"

const Dashboard = ({data}) => {
  return (
    <div>
      <h1 className="page-title">{`All bets placed`}</h1>
      {/* <p>Games Won: {data.filter}</p> */}
      <p className="page-title">{`I'll need to delete this table soon as games were updating odds as games were being played. As a team slowly loses while in-game, the odds change`}</p>
      <Table matches={data}/>
    </div>
  );
};

export default Dashboard;

export async function getStaticProps(context) {
  const response = await fetch("https://midfactor.herokuapp.com/api/matches")
  const data = await response.json()
   data.sort((a,b )=> new Date(`${b.matchStart}`).getTime() - new Date(`${a.matchStart}`).getTime())

  return {
    props: {data}, // will be passed to the page component as props
  }
}
