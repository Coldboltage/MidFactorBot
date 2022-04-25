import React from "react";
import { Button, Icon, Label, Menu, Table } from "semantic-ui-react";
import * as styles from "../styles/Home.module.css"

const index = ({data}) => {
  console.log(data)
  return (
    <div>
      <h1>{`I don't like this`}</h1>
      <Button>Click Here</Button>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell className={styles.headerCell}>Home Team Name</Table.HeaderCell>
            <Table.HeaderCell className={styles.headerCell}>Home Team Prediction</Table.HeaderCell>
            <Table.HeaderCell className={styles.headerCell}>Home Team Odds</Table.HeaderCell>
            <Table.HeaderCell className={styles.headerCell}>Away Team Name</Table.HeaderCell>
            <Table.HeaderCell className={styles.headerCell}>Away Team Prediction</Table.HeaderCell>
            <Table.HeaderCell className={styles.headerCell}>Away Team Odds</Table.HeaderCell>
            <Table.HeaderCell className={styles.headerCell}>Match Start</Table.HeaderCell>
            <Table.HeaderCell className={styles.headerCell}>Factor ID</Table.HeaderCell>
            <Table.HeaderCell className={styles.headerCell}>MidniteMatch ID</Table.HeaderCell>
            <Table.HeaderCell className={styles.headerCell}>Upcoming</Table.HeaderCell>
            <Table.HeaderCell className={styles.headerCell}>Bet Setup</Table.HeaderCell>
            <Table.HeaderCell className={styles.headerCell}>Bet Placed</Table.HeaderCell>
            <Table.HeaderCell className={styles.headerCell}>Team To Win</Table.HeaderCell>
            <Table.HeaderCell className={styles.headerCell}>Bankroll</Table.HeaderCell>
            <Table.HeaderCell className={styles.headerCell}>Odds</Table.HeaderCell>
            <Table.HeaderCell className={styles.headerCell}>Prediction</Table.HeaderCell>
            <Table.HeaderCell className={styles.headerCell}>Time To Bet</Table.HeaderCell>
            <Table.HeaderCell className={styles.headerCell}>Won</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
};

export default index;

export async function getStaticProps(context) {
  const response = await fetch("https://midfactor.herokuapp.com/api/matches")
  const data = await response.json()
  return {
    props: {data}, // will be passed to the page component as props
  }
}