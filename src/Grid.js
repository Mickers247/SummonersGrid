// src/Grid.js
import React, { useState } from 'react';
import SearchModal from './SearchModal';
import '../styles/grid.css'

function Grid() {
  const [showSearchModal, setShowSearchModal] = useState(false);
  
  const handleSearchClick = () => {
    setShowSearchModal(true);
  };

  const handleModalClose = () => {
    setShowSearchModal(false);
  };

  const handleSearch = (searchQuery) => {
    // Handle the search functionality here using the searchQuery
    console.log('Search Query:', searchQuery);

    // Close the modal
    handleModalClose();
  };

  return (
    <div className="grid-container container">
      <div className="row">
        <div className="col"> {/* Empty cell in the top-left corner */}
        </div>
        <div className="col">
          <div className="text-center">Label 1</div>
        </div>
        <div className="col">
          <div className="text-center">Label 2</div>
        </div>
        <div className="col">
          <div className="text-center">Label 3</div>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <div className="text-center">Label A</div>
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
        <div className="col">
          <div className="text-center">Label B</div>
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
        <div className="col">
          <div className="text-center">Label C</div>
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
