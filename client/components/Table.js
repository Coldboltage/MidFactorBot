import React, { useState, useEffect } from "react";
import AllMatchesDataHeaders from "../constants/Table/matches";
import * as styles from "../styles/Table.module.css";
import dayjs from "dayjs";

const Table = ({ matches }) => {
  const [tableData, setTableData] = useState(matches);
  const [tableHeaderNames, setTableHeaderNames] = useState(
    AllMatchesDataHeaders
  );

  // useEffect(() => {
  //   setTableData(data)
  // }, [])

  console.log(matches);

  return (
    <table className="u-full-width">
      <thead>
        <tr>
          {tableHeaderNames.map((name, index) => {
            return (
              <th key={index} style={{ textAlign: "center" }}>
                {name}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {tableData.map((game, index) => {
          return (
            <tr key={game._id} className={styles.tableRow}>
              {" "}
              <td className={styles.tableData}>{game.homeTeam.name}</td>
              <td className={styles.tableData}>{`${(
                game.homeTeam.prediction * 100
              ).toFixed(0)}%`}</td>
              <td className={styles.tableData}>{game.homeTeam.odds}</td>
              <td className={styles.tableData}>{game.awayTeam.name}</td>
              <td className={styles.tableData}>{`${(
                game.awayTeam.prediction * 100
              ).toFixed(0)}%`}</td>
              <td className={styles.tableData}>{game.awayTeam.odds}</td>
              <td className={styles.tableData}>
                {dayjs(game.matchStart).format("DD/MM/YYYY")}
              </td>
              <td className={styles.tableData}>{game.factorId}</td>
              <td className={styles.tableData}>{game.midniteMatchId}</td>
              <td className={styles.tableData}>{`${game.upcoming}`}</td>
              <td className={styles.tableData}>{`${game.betSetup}`}</td>
              <td className={styles.tableData}>{`${game.betPlaced}`}</td>
              <td className={styles.tableData}>{`${game.teamToWin}`}</td>
              <td className={styles.tableData}>{game.bankRoll}</td>
              <td className={styles.tableData}>{game.odds}</td>
              <td className={styles.tableData}>{`${(
                game.prediction * 100
              ).toFixed(0)}%`}</td>
              {game.hasOwnProperty("won") ? <td className={styles.tableData}>{`${game.won}`}</td> : <td className={styles.tableData}>{`Awaiting`}</td>}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
