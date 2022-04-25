import React from "react";
import { Button, Icon, Label, Menu, Table } from "semantic-ui-react";
import * as styles from "../styles/Home.module.css"

const index = ({data}) => {
  console.log(data)
  return (
    <div>
      <h1>This be some work here</h1>
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