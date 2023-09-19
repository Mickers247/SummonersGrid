// src/Header.js
import React, { useState } from 'react';

function Header() {
  const [showModal, setShowModal] = useState(true);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <header className="navbar navbar-dark bg-dark">
      <div className="container">
        <h1 className="navbar-brand">Summoner's Grid</h1>
        <button className="btn btn-info" onClick={toggleModal}>
          Info
        </button>
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
