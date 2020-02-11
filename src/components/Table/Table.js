import React, { useReducer, useEffect } from "react";
import {
  ascend,
  descend,
  filter as Rfilter,
  prop,
  sort,
  fromPairs
} from "ramda";
import Input from "../Input/Input";

function sortedTableReducer(oldState, newState) {
  // Implements the logic of sorting and filtering the table or list data
  const { listArray, sortBy, isDesc, filter, filteredKey } = {
    ...oldState,
    ...newState
  };

  const direction = isDesc ? descend : ascend;
  const sortFunc = sort(direction(prop(sortBy)));
  const filterFunc = item => {
    return filteredKey
      ? item[filteredKey].toLowerCase().includes(filter.toLowerCase())
      : item;
  };

  const sortedAndFilteredTable = Rfilter(filterFunc, sortFunc(listArray));

  return {
    listArray: sortedAndFilteredTable,
    sortBy,
    isDesc,
    filter,
    filteredKey
  };
}

const defaultLabels = array => {
  /// If no labels is presented as props it will automatically create the labels from object keys
  const obj = array[0];
  return fromPairs(
    Object.keys(obj).map(itemKey => {
      return [itemKey, itemKey];
    })
  );
};

const reorderPropinObj = (fromObj, toObj) => {
  // Returns the object with the prop order like in the other object
  const toKeysOrder = Object.keys(toObj);
  const newObjOrder = Object.keys(fromObj).map((item, i) => {
    const key = toKeysOrder[i];
    return [[key], fromObj[key]];
  });
  return fromPairs(newObjOrder);
};

const Table = ({
  listArray,
  id = "id",
  labels = defaultLabels(listArray),
  sortBy = Object.keys(listArray[0])[0],
  isDesc = true,
  filter = "",
  filteredKey = null,
  callback,
  ...rest
}) => {
  const mixLabels = {...defaultLabels(listArray), ...labels}
  const [sortedListArray, sortProductsDispatch] = useReducer(
    sortedTableReducer,
    {
      /// Reorders the columns of the table to fit the labels props if it is provided
      listArray: listArray.map(row => reorderPropinObj(row, mixLabels)),
      sortBy,
      isDesc,
      filter,
      filteredKey
    }
  );

  useEffect(() => {
    sortProductsDispatch(listArray);
  }, [listArray]);

  useEffect(() => {
    callback && callback(sortedListArray);
  }, [sortedListArray]);

  const sort = column => () => {
    const direction =
      column === sortedListArray.sortBy ? !sortedListArray.isDesc : false;
    sortProductsDispatch({
      sortBy: column,
      isDesc: direction
    });
  };

  return (
    <div className="table-wrap" {...rest}>
      <div className="table-header">
        {filteredKey && (
            <Input
                value={sortedListArray.filter}
                text={`You can filter by ${filteredKey}`}
                onChange={val =>
                    sortProductsDispatch({
                      listArray: listArray.map(item => reorderPropinObj(item, mixLabels)),
                      filter: val
                    })
                }
            />
        )}
        <div className="table-count">{sortedListArray.listArray.length}/{listArray.length}</div>
      </div>
      {sortedListArray.listArray.length && (
        <table>
          <thead>
            <tr>
              {Object.entries(mixLabels).map(([columnKey, columnLabel]) => (
                <th key={columnKey}>
                  <div onClick={sort(columnKey)}>{columnLabel}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedListArray.listArray.map(row => (
              <tr key={row[id]}>{Object.entries(row).map(([k, v]) => (<td key={k}>{v}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Table;
