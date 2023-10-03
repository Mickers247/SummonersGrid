// src/Grid.js
import React, { useState, useEffect, useMemo } from 'react';
import SearchModal from './SearchModal';
import ResultModal from './ResultModal';
import champData from  './champ-data.json';
import seedrandom from 'seedrandom';



function Grid() {
  // Function to generate a seed from the current date
  const generateSeedFromDate = () => {
    const currentDate = new Date();
    const offset = currentDate.getTimezoneOffset();
    const correctedDate = new Date(currentDate.getTime() - offset * 60000);
    const seed = correctedDate.toISOString().slice(0, 10);
    return seed;
  };

  const savedGridStatus = JSON.parse(localStorage.getItem('gridStatus'));
  const savedGuessesLeft = localStorage.getItem('guessesLeft');
  const savedLastPuzzleDate = localStorage.getItem('savedLastPuzzleDate');

  if (savedLastPuzzleDate !== generateSeedFromDate()) {
    localStorage.removeItem('gridStatus')
    localStorage.removeItem('guessesLeft')
  }
  localStorage.setItem('savedLastPuzzleDate', generateSeedFromDate())

  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showResultModal, setshowResultModal] = useState(false);
  const [currentCell, setCurrentCell] = useState(0);
  const [guessesLeft, setGuessesLeft] = useState(savedGuessesLeft || 9)
  const [gridStatus, setGridStatus] = useState(savedGridStatus || [
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

  

  useEffect(() => {
    localStorage.setItem('gridStatus', JSON.stringify(gridStatus));
  }, [gridStatus])
  useEffect(() => {
    localStorage.setItem('guessesLeft', guessesLeft);
  }, [guessesLeft])

  useEffect(() => {
    if (guessesLeft < 1) {
      setshowResultModal(true);
    }
  }, [guessesLeft])

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

  const validateXlabel = (attr, ylabels) => {
    const validyLabels = []
    for (let i = 0; i < champData.champInformation.length; i++) {
      const champ = champData.champInformation[i]
      if (checkAttribute(champ, attr)) {
        for (let j = 0; j < ylabels.length; j++) {
          if(checkAttribute(champ, ylabels[j]) && !validyLabels.includes(j)) {
            validyLabels.push(j)
          }
        }
      }
      if (validyLabels.length === ylabels.length) {
        return true
      }
    }
    return false
  }

  const getGridData = useMemo(() => {
    const rng = seedrandom(generateSeedFromDate());
    const ylabelOptions = champData.ylabelOptions
    const randomyIndices = []
    const ylabelLength = ylabelOptions.length

    for (let i = 0; i < 3; ) {
      const randomIndex = Math.floor(rng() * ylabelLength);
    
      if (!randomyIndices.includes(randomIndex)) {
        randomyIndices.push(randomIndex);
        i++;
      }
    }

    const ylabels = [ 
      ylabelOptions[randomyIndices[0]],
      ylabelOptions[randomyIndices[1]],
      ylabelOptions[randomyIndices[2]],
    ]

    const xlabelOptions = champData.xlabelOptions
    const randomxIndices = []
    const xlabelLength = xlabelOptions.length

    for (let i = 0; i < 3; ) {
      const randomxIndex = Math.floor(rng() * xlabelLength);
    
      if (!randomxIndices.includes(randomxIndex) && validateXlabel(xlabelOptions[randomxIndex], ylabels)) {
        randomxIndices.push(randomxIndex);
        i++;
      }
    }

    const data = {
      xlabels: [ 
        xlabelOptions[randomxIndices[0]],
        xlabelOptions[randomxIndices[1]],
        xlabelOptions[randomxIndices[2]],
      ],
      ylabels
    }



      return data
  }, []);

  const gridData = getGridData
  
  const handleSearchClick = (cellNo) => {
    setCurrentCell(cellNo)
    setShowSearchModal(true);
  };

  const handleModalClose = () => {
    setShowSearchModal(false);
  };

  const handleSearch = (searchQuery) => {
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

  const correctAnimation = (cellNo) => {
    const cellId = 'cell-' + cellNo
    const element = document.getElementById(cellId)

    if (element) {
      element.classList.add('green-border');
      setTimeout(() => {
        element.classList.remove('green-border');
      }, 1000);
    }
  }

  const wrongAnimation = (cellNo) => {
    const cellId = 'cell-' + cellNo
    const element = document.getElementById(cellId)

    if (element) {
      element.classList.add('red-border');
      setTimeout(() => {
        element.classList.remove('red-border');
      }, 1000);
    } 
  }

  const checkSelection = (attr1, attr2, searchQuery) => {
    const champ = champData.champInformation.find(champion => champion.name === searchQuery);
    const xIsTrue = checkAttribute(champ, attr1)
    const yIsTrue = checkAttribute(champ, attr2)
    if (xIsTrue && yIsTrue) {
      let updatedGrid = [...gridStatus]
      updatedGrid[currentCell-1] = {answered: true, champ: champ}
      setGridStatus(updatedGrid)
      correctAnimation(currentCell)
    } else {
      wrongAnimation(currentCell)
    }
    setGuessesLeft(guessesLeft - 1)
  }

  const getChosenChamps = (grid) => {
    const theChosenOnes = []
    for (let i = 0; i < grid.length; i++) {
      if (grid[i].answered) {
        theChosenOnes.push(grid[i].champ.name)
      }
    }
    return theChosenOnes
  }

  const amountCorrect = () => {
    let sum = 0
    for (let i=0; i < gridStatus.length; i++) {
      if (gridStatus[i].answered) {
        sum++;
      }
    }
    return sum
  }

  return (
    <div>
      <div className="grid-container container">
        <div className="row">
          <div className="col"> {/* Empty cell in the top-left corner */}
          </div>
          <div className="col category-label">
            <div className="text-center tooltip-container">
              {`${gridData.xlabels[0].attribute}`}
              <div className="tooltip-content">
                {`${gridData.xlabels[0].type.toUpperCase()}`}
              </div>
            </div>
          </div>
          <div className="col category-label">
            <div className="text-center tooltip-container">
              {`${gridData.xlabels[1].attribute}`}
              <div className="tooltip-content">
                {`${gridData.xlabels[1].type.toUpperCase()}`}
              </div>
            </div>
          </div>
          <div className="col category-label">
            <div className="text-center tooltip-container">
              {`${gridData.xlabels[2].attribute}`}
              <div className="tooltip-content">
                {`${gridData.xlabels[2].type.toUpperCase()}`}
              </div>
            </div>
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
          <div className="col text-center" id="cell-1">
            {gridStatus[0].answered ? (
              <>
                <img src={gridStatus[0].champ.thumbnail} alt={gridStatus[0].champ.thumbnail} className='img-fluid shrink-grow-image'></img>
                <span>{gridStatus[0].champ.name}</span>
              </>
            ) : (
              <button className="btn grid-square-button" onClick={() => handleSearchClick(1)} disabled={guessesLeft < 1}></button>
            )}
          </div>
          <div className="col text-center" id="cell-2">
          {gridStatus[1].answered ? (
            <>
              <img src={gridStatus[1].champ.thumbnail} alt={gridStatus[1].champ.thumbnail} className='img-fluid shrink-grow-image'></img>
              <span className='overflow-upwards'>{gridStatus[1].champ.name}</span>
            </>
            ) : (
              <button className="btn grid-square-button" onClick={() => handleSearchClick(2)} disabled={guessesLeft < 1}></button>
            )}
          </div>
          <div className="col text-center" id="cell-3">
          {gridStatus[2].answered ? (
            <>
              <img src={gridStatus[2].champ.thumbnail} alt={gridStatus[2].champ.thumbnail} className='img-fluid shrink-grow-image'></img>
              <span className='overflow-upwards'>{gridStatus[2].champ.name}</span>
            </>
            ) : (
              <button className="btn grid-square-button" onClick={() => handleSearchClick(3)} disabled={guessesLeft < 1}></button>
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
          <div className="col text-center" id="cell-4">
          {gridStatus[3].answered ? (
            <>
              <img src={gridStatus[3].champ.thumbnail} alt={gridStatus[3].champ.thumbnail} className='img-fluid shrink-grow-image'></img>
              <span className='overflow-upwards'>{gridStatus[3].champ.name}</span>
            </>
            ) : (
              <button className="btn grid-square-button" onClick={() => handleSearchClick(4)} disabled={guessesLeft < 1}></button>
            )}
          </div>
          <div className="col text-center" id="cell-5">
          {gridStatus[4].answered ? (
            <>
              <img src={gridStatus[4].champ.thumbnail} alt={gridStatus[4].champ.thumbnail} className='img-fluid shrink-grow-image'></img>
              <span className='overflow-upwards'>{gridStatus[4].champ.name}</span>
            </>
            ) : (
              <button className="btn grid-square-button" onClick={() => handleSearchClick(5)} disabled={guessesLeft < 1}></button>
            )}
          </div>
          <div className="col text-center" id="cell-6">
          {gridStatus[5].answered ? (
            <>
              <img src={gridStatus[5].champ.thumbnail} alt={gridStatus[5].champ.thumbnail} className='img-fluid shrink-grow-image'></img>
              <span className='overflow-upwards'>{gridStatus[5].champ.name}</span>
            </>
            ) : (
              <button className="btn grid-square-button" onClick={() => handleSearchClick(6)} disabled={guessesLeft < 1}></button>
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
          <div className="col text-center" id="cell-7">
          {gridStatus[6].answered ? (
            <>
              <img src={gridStatus[6].champ.thumbnail} alt={gridStatus[6].champ.thumbnail} className='img-fluid shrink-grow-image'></img>
              <span className='overflow-upwards'>{gridStatus[6].champ.name}</span>
            </>
            ) : (
              <button className="btn grid-square-button" onClick={() => handleSearchClick(7)} disabled={guessesLeft < 1}></button>
            )}
          </div>
          <div className="col text-center" id="cell-8">
          {gridStatus[7].answered ? (
            <>
              <img src={gridStatus[7].champ.thumbnail} alt={gridStatus[7].champ.thumbnail} className='img-fluid shrink-grow-image'></img>
              <span className='overflow-upwards'>{gridStatus[7].champ.name}</span>
            </>
            ) : (
              <button className="btn grid-square-button" onClick={() => handleSearchClick(8)} disabled={guessesLeft < 1}></button>
            )}
          </div>
          <div className="col text-center" id="cell-9">
          {gridStatus[8].answered ? (
            <>
              <img src={gridStatus[8].champ.thumbnail} alt={gridStatus[8].champ.thumbnail} className='img-fluid shrink-grow-image'></img>
              <span className='overflow-upwards'>{gridStatus[8].champ.name}</span>
            </>
            ) : (
              <button className="btn grid-square-button" onClick={() => handleSearchClick(9)} disabled={guessesLeft < 1}></button>
            )}
          </div>
        </div>
        <SearchModal show={showSearchModal} onClose={handleModalClose} onSearch={handleSearch} chosenChamps={getChosenChamps(gridStatus)} />
        <ResultModal show={showResultModal} hasWon={gridStatus.every((item) => item.answered)} onClose={() => setshowResultModal(false)} />
      </div>
      <h4 className='score-texts'>{`Mana: ${guessesLeft}/9     Points: ${amountCorrect()}/9`}</h4>
    </div>
  );
}

export default Grid;
