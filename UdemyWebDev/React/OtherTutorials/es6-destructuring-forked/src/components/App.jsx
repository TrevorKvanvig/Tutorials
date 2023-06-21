import React from "react";
import cars from "../practice";

function App() {
  const [honda, tesla] = cars;
  const {
    speedStats: { topSpeed: hondaTopSpeed }
  } = honda;
  const {
    speedStats: { topSpeed: teslaTopSpeed }
  } = tesla;
  const {
    coloursByPopularity: [teslaTopColour]
  } = tesla;
  const {
    coloursByPopularity: [hondaTopColour]
  } = honda;

  return (
    <table>
      <tr>
        <th>Brand</th>
        <th>Top Speed</th>
        <th>Top Color</th>
      </tr>
      <tr>
        <td>{tesla.model}</td>
        <td>{teslaTopSpeed}</td>
        <td>{teslaTopColour}</td>
      </tr>
      <tr>
        <td>{honda.model}</td>
        <td>{hondaTopSpeed}</td>
        <td>{hondaTopColour}</td>
      </tr>
    </table>
  );
}

export default App;
