import React, { Fragment, useEffect, useState } from "react";
import { Container, Item, Label, Segment } from "semantic-ui-react";
import tubeMap from './static/tubeMap'

const Status = () => {
  const url = "https://api.tfl.gov.uk/line/mode/tube,overground,dlr,tflrail/status";
  const [statusArray, setStatusArray] = useState([]);

  const fetchStatuses = async () => {
    const response = await fetch(url);
    const data = await response.json();
    console.log("data ", data);
    setStatusArray(data);
  };

  useEffect(() => {
    fetchStatuses();
  }, []);

  return statusArray.map(status => (
    <Container key={status.id}>
    <Segment padded={"very"}>
      <Item.Group >
          <Fragment>
          <Item>
          <Item.Content>
          <Item.Header >{status.name}</Item.Header>
        {status.lineStatuses.map(lineStatus => (
          <Item.Description key={lineStatus.id}>{lineStatus.statusSeverityDescription}</Item.Description>
          ))}
          <Label style={{ backgroundColor: `#${tubeMap[status.id].color}`}}></Label>
          </Item.Content>
          </Item>
          </Fragment>
      </Item.Group>
      </Segment>
      </Container>
  ));
};

export default Status;
