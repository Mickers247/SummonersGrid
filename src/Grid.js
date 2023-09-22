// src/Grid.js
import React, { useState } from 'react';
import SearchModal from './SearchModal';
import '../styles/grid.css'
import champData from  './champ-data.json';

function Grid() {
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [currentCell, setCurrentCell] = useState(0)

  const getGridData = () => {
    return {
        xlabels: [{type: 'regions', attribute: 'Shurima'},{type: 'species', attribute: 'Yordle'},{type: 'releaseYear', attribute: '2010'}],
        ylabels: [{type: 'position', attribute: 'Top'},{type: 'position', attribute: 'Middle'},{type: 'position', attribute: 'Support'}]
      }
  };

  const gridData = getGridData()
  
  const handleSearchClick = (cellNo) => {
    setCurrentCell(cellNo)
    setShowSearchModal(true);
  };

  const handleModalClose = () => {
    setShowSearchModal(false);
  };

  const handleSearch = (searchQuery) => {
    // Handle the search functionality here using the searchQuery
    console.log('Search Query:', searchQuery);
    const attr1 = getColumnQuery(currentCell - 1)
    const attr2 = getRowQuery(currentCell)
    checkSelection(attr1, attr2, searchQuery)

    // Close the modal
    handleModalClose();
  };

  const getColumnQuery = (cellNo) => {
    const column = cellNo%3 === 0 ?  0 : cellNo%3
    return gridData.xlabels[column]
  };

  const getRowQuery = (cellNo) => {
    const row = Math.ceil(cellNo/3) - 1
    console.log(row)
    console.log(cellNo)
    console.log(gridData.ylabels[row])
    return gridData.ylabels[row]
  }

  const checkSelection = (attr1, attr2, searchQuery) => {
    const champ = champData.champInformation.find(champion => champion.name === searchQuery);
    console.log(champ)
    const xIsTrue = checkAttribute(champ, attr1)
    const yIsTrue = checkAttribute(champ, attr2)
    console.log(xIsTrue)
    console.log(yIsTrue)
  }
  const checkAttribute = (champ, attr) => {
    if (attr.type === 'position' || attr.type === 'regions' || attr.type === 'species') {
      return champ[attr.type].includes(attr.attribute) 
    } else if (attr.type === 'releaseYear' ) {
      const year = parseInt(attr.attribute)
      return champ[attr.type] === year
    } else {
      return champ[attr.type] === attr.attribute
    }
  }

  return (
    <div className="grid-container container">
      <div className="row">
        <div className="col"> {/* Empty cell in the top-left corner */}
        </div>
        <div className="col category-label">
          <div className="text-center">Shurima</div>
        </div>
        <div className="col category-label">
          <div className="text-center">Yordle</div>
        </div>
        <div className="col category-label">
          <div className="text-center">2010</div>
        </div>
      </div>

      <div className="row">
        <div className="col category-label">
          <div className="text-center">Top</div>
        </div>
        <div className="col text-center">
            <button className="btn grid-square-button" onClick={() => handleSearchClick(1)}>Cell 1</button>
        </div>
        <div className="col text-center">
            <button className="btn grid-square-button" onClick={() => handleSearchClick(2)}>Cell 2</button>
        </div>
        <div className="col text-center">
            <button className="btn grid-square-button" onClick={() => handleSearchClick(3)}>Cell 3</button>
        </div>
      </div>

      <div className="row">
        <div className="col category-label">
          <div className="text-center">Mid</div>
        </div>
        <div className="col text-center">
          <button className="btn grid-square-button" onClick={() =>handleSearchClick(4)}>Cell 4</button>
        </div>
        <div className="col text-center">
            <button className="btn grid-square-button" onClick={() => handleSearchClick(5)}>Cell 5</button>
        </div>
        <div className="col text-center">
            <button className="btn grid-square-button" onClick={() => handleSearchClick(6)}>Cell 6</button>
        </div>
      </div>

      <div className="row">
        <div className="col category-label">
          <div className="text-center">Support</div>
        </div>
        <div className="col text-center">
            <button className="btn grid-square-button" onClick={() => handleSearchClick(7)}>Cell 7</button>
        </div>
        <div className="col text-center">
            <button className="btn grid-square-button" onClick={() => handleSearchClick(8)}>Cell 8</button>
        </div>
        <div className="col text-center">
            <button className="btn grid-square-button" onClick={() => handleSearchClick(9)}>Cell 9</button>
        </div>
      </div>
      <SearchModal show={showSearchModal} onClose={handleModalClose} onSearch={handleSearch} />
    </div>
  );
}

export default Grid;
