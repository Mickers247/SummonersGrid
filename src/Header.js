// src/Header.js
import React, { useState } from 'react';
import { FaInfoCircle, FaTwitter } from 'react-icons/fa';

function Header() {
  const [showModal, setShowModal] = useState(true);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <header className="navbar navbar-dark header-bar">
      <div className="container">
        <h1 className="navbar-brand">Summoner's Grid</h1>
        <script type="text/javascript" src="https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js" data-name="bmc-button" data-slug="mickers247s" data-color="#FFDD00" data-emoji="🍺" data-font="Arial" data-text="Buy me a beer" data-outline-color="#000000" data-font-color="#000000" data-coffee-color="#ffffff" ></script>
        <div>
          <a href="https://www.buymeacoffee.com/mickers247s" target="_blank"><img className="coffee-button" src="https://cdn.buymeacoffee.com/buttons/v2/arial-yellow.png" alt="Buy Me A Coffee" /></a>
          <a href="https://twitter.com/summonersgrid" target="_blank" rel="noopener noreferrer">
          <button className="btn btn-info btn-twitter">
            <FaTwitter />
          </button>
          </a>
          <button className="btn btn-info" onClick={toggleModal}>
            <FaInfoCircle />
          </button>
        </div>
      </div>

      {/* Add the Modal */}
      {showModal && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Information</h5>
                <button type="button" className="close" onClick={toggleModal}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {/* Add your information content here */}
                This is some information you want to display in the modal.
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={toggleModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
