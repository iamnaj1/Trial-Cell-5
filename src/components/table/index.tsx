import _ from "lodash";
import React from "react";
import { Icon, Table } from "semantic-ui-react";

function exampleReducer(state: any, action: any) {
  switch (action.type) {
    case "CHANGE_SORT":
      if (state.column === action.column) {
        return {
          ...state,
          data: state.data.slice().reverse(),
          direction:
            state.direction === "ascending" ? "descending" : "ascending",
        };
      }

      return {
        column: action.column,
        data: _.sortBy(state.data, [action.column]),
        direction: "ascending",
      };
    default:
      throw new Error();
  }
}

function SortableTable(props: any) {
  const { products, getProductData } = props;
  console.log("data: ", products);
  const [state, dispatch] = React.useReducer(exampleReducer, {
    column: null,
    data: products,
    direction: null,
  });
  const { column, data, direction } = state;
  return (
    <Table sortable celled fixed>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell
            sorted={column === "name" ? direction : null}
            onClick={() => dispatch({ type: "CHANGE_SORT", column: "name" })}
          >
            Name
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === "price" ? direction : null}
            onClick={() => dispatch({ type: "CHANGE_SORT", column: "price" })}
          >
            Price
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === "category" ? direction : null}
            onClick={() =>
              dispatch({ type: "CHANGE_SORT", column: "category" })
            }
          >
            Category
          </Table.HeaderCell>
          <Table.HeaderCell>Actions</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map((product: any) => (
          <Table.Row key={product.name}>
            <Table.Cell>{product.name}</Table.Cell>
            <Table.Cell>{product.price}</Table.Cell>
            <Table.Cell>{product.category}</Table.Cell>
            <Table.Cell>
              <Icon name={"close"} onClick={() => getProductData(product.id)} />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}

export default SortableTable;
