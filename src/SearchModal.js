// src/SearchModal.js
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function SearchModal(props) {
  const { show, onClose, onSearch, chosenChamps } = props;
  const championList = [
    'Aatrox',
    'Ahri',
    'Akali',
    'Akshan',
    'Alistar',
    'Amumu',
    'Anivia',
    'Annie',
    'Aphelios',
    'Ashe',
    'Aurelion Sol',
    'Azir',
    'Bard',
    `Bel'Veth`,
    'Blitzcrank',
    'Brand',
    'Braum',
    'Briar',
    'Caitlyn',
    'Camille',
    'Cassiopeia',
    `Cho'Gath`,
    'Corki',
    'Darius',
    'Diana',
    'Draven',
    `Dr. Mundo`,
    'Ekko',
    'Elise',
    'Evelynn',
    'Ezreal',
    'Fiddlesticks',
    'Fiora',
    'Fizz',
    'Galio',
    'Gangplank',
    'Garen',
    'Gnar',
    'Gragas',
    'Graves',
    'Gwen',
    'Hecarim',
    'Heimerdinger',
    'Illaoi',
    'Irelia',
    'Ivern',
    'Janna',
    'Jarvan IV',
    'Jax',
    'Jayce',
    'Jhin',
    'Jinx',
    `Kai'Sa`,
    'Kalista',
    'Karma',
    'Karthus',
    'Kassadin',
    'Katarina',
    'Kayle',
    'Kayn',
    'Kennen',
    `Kha'Zix`,
    'Kindred',
    'Kled',
    `Kog'Maw`,
    `K'Sante`,
    'LeBlanc',
    'Lee Sin',
    'Leona',
    'Lillia',
    'Lissandra',
    'Lucian',
    'Lulu',
    'Lux',
    'Malphite',
    'Malzahar',
    'Maokai',
    'Master Yi',
    'Millio',
    'Miss Fortune',
    'Mordekaiser',
    'Morgana',
    'Naafiri',
    'Nami',
    'Nasus',
    'Nautilus',
    'Neeko',
    'Nidalee',
    'Nilah',
    'Nocturne',
    'Nunu & Willump',
    'Olaf',
    'Orianna',
    'Ornn',
    'Pantheon',
    'Poppy',
    'Pyke',
    'Qiyana',
    'Quinn',
    'Rakan',
    'Rammus',
    `Rek'Sai`,
    'Rell',
    'Renata Glasc',
    'Renekton',
    'Rengar',
    'Riven',
    'Rumble',
    'Ryze',
    'Samira',
    'Sejuani',
    'Senna',
    'Seraphine',
    'Sett',
    'Shaco',
    'Shen',
    'Shyvana',
    'Singed',
    'Sion',
    'Sivir',
    'Skarner',
    'Sona',
    'Soraka',
    'Swain',
    'Sylas',
    'Syndra',
    'Tahm Kench',
    'Taliyah',
    'Talon',
    'Taric',
    'Teemo',
    'Thresh',
    'Tristana',
    'Trundle',
    'Tryndamere',
    'Twisted Fate',
    'Twitch',
    'Udyr',
    'Urgot',
    'Varus',
    'Vayne',
    'Veigar',
    `Vel'Koz`,
    'Vex',
    'Vi',
    'Viego',
    'Viktor',
    'Vladimir',
    'Volibear',
    'Warwick',
    'Wukong',
    'Xayah',
    'Xerath',
    'Xin Zhao',
    'Yasuo',
    'Yone',
    'Yorick',
    'Yuumi',
    'Zac',
    'Zed',
    'Zeri',
    'Ziggs',
    'Zilean',
    'Zoe',
    'Zyra'
  ]
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleSuggestionClick = (selectedSuggestion) => {
    setSearchQuery(selectedSuggestion);
    setSuggestions([]); // Clear suggestions when a suggestion is clicked
    onSearch(selectedSuggestion);
    setSearchQuery('');
  };

  const updateSuggestions = (input) => {
    const filteredChampions = championList.filter((champion) =>
      champion.toLowerCase().includes(input.toLowerCase())
    );
    input === '' ? setSuggestions([]) : setSuggestions(filteredChampions);
  };

  const handleClose = () => {
    setSearchQuery(''); // Clear the search query when closing the modal
    setSuggestions([]);
    onClose();
  };


  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Search</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Search a champion"
            value={searchQuery}
            autoFocus
            onChange={(e) => {
              setSearchQuery(e.target.value);
              updateSuggestions(e.target.value);
            }}
          />
        </Form.Group>
        <ul className="suggestions">
          {suggestions
            .filter((suggestion) => !chosenChamps.includes(suggestion))
            .map((suggestion, index) => ( 
              <li className="suggestion" key={index} onClick={() => handleSuggestionClick(suggestion)}>
                <span className='suggestion-champ-name'>{suggestion}</span> 
                <button className="btn btn-primary select-button">Select</button>
              </li>
          ))}
        </ul>
      </Modal.Body>
    </Modal>
  );
}

export default SearchModal;
