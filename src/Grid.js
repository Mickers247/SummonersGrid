// src/Grid.js
import React from 'react';

function Grid() {
  return (
    <div className="container">
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
            <button className="btn">Cell 1</button>
        </div>
        <div className="col text-center">
            <button className="btn btn-primary">Cell 2</button>
        </div>
        <div className="col text-center">
            <button className="btn btn-primary">Cell 3</button>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <div className="text-center">Label B</div>
        </div>
        <div className="col text-center">
          <button className="btn btn-primary">Cell 4</button>
        </div>
        <div className="col text-center">
            <button className="btn btn-primary">Cell 5</button>
        </div>
        <div className="col text-center">
            <button className="btn btn-primary">Cell 6</button>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <div className="text-center">Label C</div>
        </div>
        <div className="col text-center">
            <button className="btn btn-primary">Cell 7</button>
        </div>
        <div className="col text-center">
            <button className="btn btn-primary">Cell 8</button>
        </div>
        <div className="col text-center">
            <button className="btn btn-primary">Cell 9</button>
        </div>
      </div>
    </div>
  );
}

export default Grid;
