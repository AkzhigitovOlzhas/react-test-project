import { MenuItem, Select } from "@mui/material";
import React from "react";
import { useFetch } from "../../hooks/useFetch";
import "./Header.sass";

export const Header = ({
  sortType,
  changeSortHandler,
  filterId,
  changeFilter,
}) => {
  const [data, isLoading] = useFetch(
    "https://jsonplaceholder.typicode.com/albums"
  );

  function changeFilterHandler(e) {
    changeFilter(e.target.value);
  }

  return (
    <div className="header">
      <div className="header__title">Albums</div>
      <div className="sort-block">
        {!isLoading ? (
          <Select
            value={filterId}
            onChange={changeFilterHandler}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            size="small"
          >
            <MenuItem value="all">All</MenuItem>
            {data.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.id}
              </MenuItem>
            ))}
          </Select>
        ) : (
          "loading..."
        )}
        <Select
          value={sortType}
          onChange={changeSortHandler}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          sx={{ marginLeft: "10px" }}
          size="small"
        >
          <MenuItem value="asc">ASC</MenuItem>
          <MenuItem value="desc">DESC</MenuItem>
        </Select>
      </div>
    </div>
  );
};
