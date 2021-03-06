import React from 'react';
import Box from './Box';
import './App.css';
import convertCssColorNameToHex from 'convert-css-color-name-to-hex';
var Color = require('color');

class App extends React.Component {
  constructor(props) {
    super(props);

    let boxes = [];
    const numBoxes = 40;
    for (let i = 0; i < numBoxes; i++) {
      let randomColor = this.getRandomColor();
      boxes.push({
        id: i,
        color: randomColor
      });
    }

    this.state = {
      boxes,
      all: boxes,
      allChange: boxes,
      value: 'all',
      isChecked: false
    };
    
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
    this.handleChangeCheck = this.handleChangeCheck.bind(this);

    const newBoxes = this.state.boxes.slice();
    const randomBoxIndex = Math.floor(Math.random() * newBoxes.length);
    newBoxes[randomBoxIndex] = Object.assign({}, newBoxes[randomBoxIndex],
                                {color: this.getRandomColor()});
  }

  getRandomColor() {
    let colorIndex = Math.floor(Math.random() * this.props.allColors.length);
    return this.props.allColors[colorIndex];
  }

  handleChangeSelect = event => {
    if (event.target.value === 'all') {
      this.setState({
        value: event.target.value,
        boxes: this.state.all
      });
    } else {
      this.setState({
        value: event.target.value,
        boxes: this.state.allChange.filter((b) => {
          return b.color === event.target.value;
        })
      });
    }
  }



  handleChangeCheck = event => {

    function getSaturation(hex){
      var color = Color(hex);
      return color.isDark();
    }

    if (!this.state.isChecked) {
      this.setState({
        isChecked: true,
        boxes: this.state.allChange.filter((b) => {
          let hex = convertCssColorNameToHex(b.color);
          return getSaturation(hex) ? b.color : console.log('white');
        })
      });
    } else {
      this.setState({
        isChecked: false,
        boxes: this.state.all
      });

    }
  }

  reset = event => {
    this.setState({
      value: 'all',
      isChecked: false,
      boxes: this.state.all
    })
  }

  render() {

    const boxes = this.state.boxes.map(b =>
      <Box key={b.id} color={b.color} />,
    );

    const options = this.props.allColors.map((color, index) =>
      <option key={index} value={color}>{color}</option>,
    );

    return (
      <div className="App">
        <div className="container">
          <section>
            <h1>Random Color Squares</h1>
            <hr />
          </section>

          <section>
              <label className="widget">
                Pick your favorite color :
                <select className="form-control" value={this.state.value} onChange={this.handleChangeSelect}>
                  <option value="all">All</option>
                  {options}
                </select>
              </label>

              <div className="form-check widget">
                <input 
                  type="checkbox" 
                  name="saturation" 
                  id="checkSat"
                  className="form-check-input"
                  checked={this.state.isChecked}
                  onChange={this.handleChangeCheck} 
                />
                <label className="form-check-label" htmlFor="checkSat">
                  Dark color
                </label>
              </div>

              <button className="btn btn-primary widget" onClick={this.reset}>Reset</button>
          </section>

          <section>
            <hr />
            <div className="d-flex flex-wrap">
              {boxes}
            </div>
          </section>

        </div>
      </div>
    );
  }
}

App.defaultProps = {
  allColors: [
    "Red",
    "Orange",
    "Yellow",
    "Green",
    "Blue",
    "Purple",
    "Brown",
    "Magenta",
    "Tan",
    "Cyan",
    "Olive",
    "Maroon",
    "Navy",
    "Aquamarine",
    "Turquoise",
    "Silver",
    "Lime",
    "Teal",
    "Indigo",
    "Violet",
    "Pink",
    "Black",
    "White",
    "Gray"]
}

export default App;
