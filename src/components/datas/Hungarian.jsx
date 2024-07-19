import { useState } from "react";
import Button from "../ui/buttons/Button";
import hungarian from "hungarian-on3";

export default function Hungarian({ matrix, array, columns, ids, options }) {

    const [result, setResult] = useState([]);

    function handleClick() {
        const res = hungarian(matrix);
        setResult(res)
    }

    return (
        <>
          <Button onClick={handleClick} type="button" className="btn-primary">Assigner</Button>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>ID</th>
                <th>Choice</th>
                <th>Preference</th>
              </tr>
            </thead>
            <tbody>
              {result.map(([row, col], index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{ids[row]}</td>
                  <td>{options[col]}</td>
                  <td>{matrix[row][col]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      );
}