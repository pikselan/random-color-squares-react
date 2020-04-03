import React from 'react';
import Box from './Box';
import './App.css';

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
      value: '',
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
    this.setState({
      value: event.target.value
    });

    console.log(this.state.value);
  }

  handleChangeCheck = event => {
    this.setState({
      isChecked: !this.state.isChecked
    });
    console.log(this.state.isChecked);
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
            <label>
              Pick your favorite color :
              <select value={this.state.value} onChange={this.handleChangeSelect}>
                {options}
              </select>
            </label>
            <br />
            <label>
              Darker :
              <input 
                type="checkbox" 
                name="saturation" 
                checked={this.state.isChecked}
                onChange={this.handleChangeCheck} 
              />
            </label>
        </div>
        <div className="container">
          <div className="d-flex flex-wrap">
            {boxes}
          </div>
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
