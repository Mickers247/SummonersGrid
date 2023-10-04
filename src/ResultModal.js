// src/ResultModal.js
import React, { useState } from 'react';
import { Modal, Button, Toast } from 'react-bootstrap';
import victoryImage from './images/victory.png'
import defeatImage from './images/defeat.png'
import TweetButton from './TweetButton';
import copy from 'clipboard-copy';
import { FaClipboard } from 'react-icons/fa';

function ResultModal({ show, hasWon, gridStatus, onClose }) {

    const [showToast, setShowToast] = useState(false); // State for showing/hiding the Toast

    const message = hasWon ? 'You have won!' : 'You have lost :('

    const customText = `Summoner's Grid Results

    Score: 9/9
    ${gridStatus[0].answered ? '✅' : '🟥'}${gridStatus[1].answered ? '✅' : '🟥'}${gridStatus[2].answered ? '✅' : '🟥'} 
    ${gridStatus[3].answered ? '✅' : '🟥'}${gridStatus[4].answered ? '✅' : '🟥'}${gridStatus[5].answered ? '✅' : '🟥'} 
    ${gridStatus[6].answered ? '✅' : '🟥'}${gridStatus[7].answered ? '✅' : '🟥'}${gridStatus[8].answered ? '✅' : '🟥'}
    
    Play at: https://summonersgrid.com
    #SGOTD via @summonersgrid`;

    const handleCopyToClipboard = () => {
      copy(customText);
      setShowToast(true);
  };

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
        Share Results: 
        <TweetButton text={customText}/>
        <Button variant="secondary" onClick={handleCopyToClipboard}>
          <FaClipboard />
        </Button>
        <Button variant="primary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        delay={3000} // Auto-hide after 3 seconds
        autohide
        style={{
            position: 'absolute',
            top: 20,
            right: 20,
        }}
      >
        <Toast.Body>Results copied to clipboard!</Toast.Body>
      </Toast>

    </Modal>
  );
}

export default ResultModal;