// src/Grid.js
import React, { useState } from 'react';
import SearchModal from './SearchModal';
import '../styles/grid.css'
import champData from  './champ-data.json';

function Grid() {
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [currentCell, setCurrentCell] = useState(0);
  const [gridStatus, setGridStatus] = useState([
    {answered: false, champ: {}},
    {answered: false, champ: {}},
    {answered: false, champ: {}},
    {answered: false, champ: {}},
    {answered: false, champ: {}},
    {answered: false, champ: {}},
    {answered: false, champ: {}},
    {answered: false, champ: {}},
    {answered: false, champ: {}},
  ]);

  const getGridData = () => {
    return {
        xlabels: [
          {type: 'regions', attribute: 'Shurima'},
          {type: 'species', attribute: 'Yordle'}
          ,{type: 'releaseYear', attribute: '2010'}
        ],
        ylabels: [
          {type: 'position', attribute: 'Top', image: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-top.png'},
          {type: 'position', attribute: 'Middle', image: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-middle.png'},
          {type: 'position', attribute: 'Support', image: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-utility.png'}]
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
    return gridData.ylabels[row]
  }

  const checkSelection = (attr1, attr2, searchQuery) => {
    const champ = champData.champInformation.find(champion => champion.name === searchQuery);
    console.log(champ)
    const xIsTrue = checkAttribute(champ, attr1)
    const yIsTrue = checkAttribute(champ, attr2)
    if (xIsTrue && yIsTrue) {
      let updatedGrid = [...gridStatus]
      updatedGrid[currentCell-1] = {answered: true, champ: champ}
      setGridStatus(updatedGrid)
    }
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
          <div className="text-center">{gridData.xlabels[0].attribute}</div>
        </div>
        <div className="col category-label">
          <div className="text-center">{gridData.xlabels[1].attribute}</div>
        </div>
        <div className="col category-label">
          <div className="text-center">{gridData.xlabels[2].attribute}</div>
        </div>
      </div>

      <div className="row">
        <div className="col category-label">
          { gridData.ylabels[0].type !== 'position' ? (
            <div className="text-center">Top</div>
          ) : (
            <img src={gridData.ylabels[0].image} alt={gridData.ylabels[0].attribute} className='img-fluid'></img>
          )

          }
        </div>
        <div className="col text-center">
          {gridStatus[0].answered ? (
            <img src={gridStatus[0].champ.thumbnail} alt={gridStatus[0].champ.thumbnail} className='img-fluid'></img>
          ) : (
            <button className="btn grid-square-button" onClick={() => handleSearchClick(1)}></button>
          )}
        </div>
        <div className="col text-center">
        {gridStatus[1].answered ? (
            <img src={gridStatus[1].champ.thumbnail} alt={gridStatus[1].champ.thumbnail} className='img-fluid'></img>
          ) : (
            <button className="btn grid-square-button" onClick={() => handleSearchClick(2)}></button>
          )}
        </div>
        <div className="col text-center">
        {gridStatus[2].answered ? (
            <img src={gridStatus[2].champ.thumbnail} alt={gridStatus[2].champ.thumbnail} className='img-fluid'></img>
          ) : (
            <button className="btn grid-square-button" onClick={() => handleSearchClick(3)}></button>
          )}
        </div>
      </div>

      <div className="row">
        <div className="col category-label">
        { gridData.ylabels[1].type !== 'position' ? (
            <div className="text-center">Top</div>
          ) : (
            <img src={gridData.ylabels[1].image} alt={gridData.ylabels[1].attribute} className='img-fluid'></img>
          )

          }
        </div>
        <div className="col text-center">
        {gridStatus[3].answered ? (
            <img src={gridStatus[3].champ.thumbnail} alt={gridStatus[3].champ.thumbnail} className='img-fluid'></img>
          ) : (
            <button className="btn grid-square-button" onClick={() => handleSearchClick(4)}></button>
          )}
        </div>
        <div className="col text-center">
        {gridStatus[4].answered ? (
            <img src={gridStatus[4].champ.thumbnail} alt={gridStatus[4].champ.thumbnail} className='img-fluid'></img>
          ) : (
            <button className="btn grid-square-button" onClick={() => handleSearchClick(5)}></button>
          )}
        </div>
        <div className="col text-center">
        {gridStatus[5].answered ? (
            <img src={gridStatus[5].champ.thumbnail} alt={gridStatus[5].champ.thumbnail} className='img-fluid'></img>
          ) : (
            <button className="btn grid-square-button" onClick={() => handleSearchClick(6)}></button>
          )}
        </div>
      </div>

      <div className="row">
        <div className="col category-label">
        { gridData.ylabels[2].type !== 'position' ? (
            <div className="text-center">Top</div>
          ) : (
            <img src={gridData.ylabels[2].image} alt={gridData.ylabels[2].attribute} className='img-fluid'></img>
          )

          }
        </div>
        <div className="col text-center">
        {gridStatus[6].answered ? (
            <img src={gridStatus[6].champ.thumbnail} alt={gridStatus[6].champ.thumbnail} className='img-fluid'></img>
          ) : (
            <button className="btn grid-square-button" onClick={() => handleSearchClick(7)}></button>
          )}
        </div>
        <div className="col text-center">
        {gridStatus[7].answered ? (
            <img src={gridStatus[7].champ.thumbnail} alt={gridStatus[7].champ.thumbnail} className='img-fluid'></img>
          ) : (
            <button className="btn grid-square-button" onClick={() => handleSearchClick(8)}></button>
          )}
        </div>
        <div className="col text-center">
        {gridStatus[8].answered ? (
            <img src={gridStatus[8].champ.thumbnail} alt={gridStatus[8].champ.thumbnail} className='img-fluid'></img>
          ) : (
            <button className="btn grid-square-button" onClick={() => handleSearchClick(9)}></button>
          )}
        </div>
      </div>
      <SearchModal show={showSearchModal} onClose={handleModalClose} onSearch={handleSearch} />
    </div>
  );
}

export default Grid;
