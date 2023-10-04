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

      {showModal && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">How To Play Summoner's Grid</h5>
                <button type="button" className="close" onClick={toggleModal}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <ul>
                  <li>Welcome to Summoner's Grid! This is a fun daily challenge inspired by games like <a href="https://www.immaculategrid.com/">Immaculate Grid</a>, <a href="https://pokedoku.com/">PokeDoku</a>, and <a href="https://loldle.net/">the Loldle</a>.
                  </li>
                  <li>The objective of the game is to fill in all 9 boxes in the grid with champions that correspond to the attributes listed!</li>
                  <li>You must accomplish this in only 9 guesses, no mistakes allowed.</li>
                  <li>There can me multiple champions for each answer, but you cannot reuse a champion once you have chosen it. Choose wisely in case you need a certain champion for another square.</li>
                  <li>The three rows will always be positions, but the columns can be many other attributes (i.e. Regions, Species). Hover over the attribute in order to double check what it pertains to.</li>
                  <li>Champion Data was largely reused from <a href="https://loldle.net/">the Loldle</a> in order to create some parity, but also my own data collection.</li>
                  <li>Regions are not only where the character originated from, but important regions for their respective lore. Many champions are linked to multiple regions.</li>
                  <li>New puzzles are generated everyday, so make sure to come back if you do not get all 9 today!</li>
                  <li>If you encounter issues, bugs, or have any general feedback, feel free to mention or message the twitter. The site is still actively being devloped so feel free to suggest new features!</li>
                  <li>Last updated on: 10/03/23</li>
                </ul>
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
