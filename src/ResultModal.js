// src/ResultModal.js
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import victoryImage from './images/victory.png'
import defeatImage from './images/defeat.png'
import TweetButton from './TweetButton';

function ResultModal({ show, hasWon, onClose }) {

    const message = hasWon ? 'You have won!' : 'You have lost :('
    const customText = `Summoner's Grid Results

    Score: 9/9
    ✅ ✅ ✅ 
    ✅ ✅ ✅ 
    ✅ ✅ ✅ 
    
    Play at: https://summonersgrid.com
    #SGOTD via @summonersgrid`;

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{message}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img className='results-image' src={hasWon ? victoryImage : defeatImage}></img>
        {
          hasWon ? (<div>Impressive! Come back tomorrow to continue the win streak!</div>) : (<div>Make sure to come back tomorrow to try again!</div>)
        }
      </Modal.Body>
      <Modal.Footer>
        { hasWon ? <TweetButton text={customText} /> : (<></>)}
        <Button variant="primary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ResultModal;