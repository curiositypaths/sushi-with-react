import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"

const numberOfSushiPiecesToDisplay = 4

const addEatenKeyToSushiObj = sushiObj => ({ ...sushiObj,eaten:false})

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sushi:[],
      sushiDisplayStartId:0,
      customerBalance: 55
    }
  }
  componentDidMount() {
    fetch(API).then(r=>r.json()).then(apiData=>{
      const sushiDataWithEatenState = apiData.map(addEatenKeyToSushiObj)
      this.setState({ sushi: sushiDataWithEatenState},()=>console.log(this.state))
    })
  }

  sushiToDisplay = (numberOfSushiPiecesToDisplay) => (this.state.sushi.slice(this.state.sushiDisplayStartId, this.state.sushiDisplayStartId + numberOfSushiPiecesToDisplay))

  showNextFourPieces = () => { this.setState(prevState => ({ sushiDisplayStartId: prevState.sushiDisplayStartId + numberOfSushiPiecesToDisplay}))}

  handleConsumedSushi = (event,sushiId) => {
    if (this.attemptToChargeCostumer(sushiId)) {
      const updatedSushiData = this.state.sushi.map(sushiObj => {
        const updatedSushiPiece = { ...sushiObj }
        if (sushiObj.id === sushiId) { updatedSushiPiece.eaten = true }
        return updatedSushiPiece
      })
      this.setState({ sushi: updatedSushiData }, () => console.log(this.state))
    } else {
      alert('We were not able to charge your CC')
    }
  }

  attemptToChargeCostumer = (sushiId) => {
    const sushiPrice = this.state.sushi.find(sushiObj => sushiObj.id === sushiId).price
    if (this.state.customerBalance >= sushiPrice) {
      this.setState(prevState => ({ customerBalance: prevState.customerBalance - sushiPrice}))
      return true
    } else {
      return false
    }
  }

  render() {
    return (
      <div className="app">
        <SushiContainer showMoreSushi={this.showNextFourPieces} handleConsumedSushi={this.handleConsumedSushi} sushi={this.sushiToDisplay(numberOfSushiPiecesToDisplay)}  />
        <Table customerBalance={this.state.customerBalance} />
      </div>
    );
  }
}

export default App;