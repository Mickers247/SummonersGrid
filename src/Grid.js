// src/Grid.js
import React, { useState } from 'react';
import SearchModal from './SearchModal';
import '../styles/grid.css'
import champData from  './champ-data.json';

function Grid() {
  const [showSearchModal, setShowSearchModal] = useState(false);

  const getGridData = () => {
    return [
      {
        xlabels: [{type: 'regions', attribute: 'Shurima'},{type: 'species', attribute: 'Yordle'},{type: 'releaseYear', attribute: '2010'}],
        ylabels: [{type: 'role', attribute: 'Top'},{type: 'role', attribute: 'Mid'},{type: 'role', attribute: 'Support'}]
      }
    ]
  }

  const gridData = getGridData()
  
  const handleSearchClick = () => {
    setShowSearchModal(true);
  };

  const handleModalClose = () => {
    setShowSearchModal(false);
  };

  const handleSearch = (searchQuery, cellNo) => {
    // Handle the search functionality here using the searchQuery
    console.log('Search Query:', searchQuery);
    console.log()
    checkSelection(cellNo, searchQuery)

    // Close the modal
    handleModalClose();
  };

  const checkSelection = (cellNo, searchQuery) => {
    const champ = champData.champInformation.find(champion => champion.name === searchQuery);
    console.log(champ)
    
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
            <button className="btn grid-square-button" onClick={handleSearchClick}>Cell 1</button>
        </div>
        <div className="col text-center">
            <button className="btn grid-square-button">Cell 2</button>
        </div>
        <div className="col text-center">
            <button className="btn grid-square-button">Cell 3</button>
        </div>
      </div>

      <div className="row">
        <div className="col category-label">
          <div className="text-center">Mid</div>
        </div>
        <div className="col text-center">
          <button className="btn grid-square-button">Cell 4</button>
        </div>
        <div className="col text-center">
            <button className="btn grid-square-button">Cell 5</button>
        </div>
        <div className="col text-center">
            <button className="btn grid-square-button">Cell 6</button>
        </div>
      </div>

      <div className="row">
        <div className="col category-label">
          <div className="text-center">Support</div>
        </div>
        <div className="col text-center">
            <button className="btn grid-square-button">Cell 7</button>
        </div>
        <div className="col text-center">
            <button className="btn grid-square-button">Cell 8</button>
        </div>
        <div className="col text-center">
            <button className="btn grid-square-button">Cell 9</button>
        </div>
      </div>
      <SearchModal show={showSearchModal} onClose={handleModalClose} onSearch={handleSearch} />
    </div>
  );
}

export default Grid;
