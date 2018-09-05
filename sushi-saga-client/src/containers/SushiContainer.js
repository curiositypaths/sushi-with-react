import React, { Fragment } from 'react'
import MoreButton from '../components/MoreButton'
import Sushi from '../components/Sushi'

const SushiContainer = (props) => {
  return (
    <Fragment>
      <div className="belt">
        {
          props.sushi.map(sushiObj => <Sushi key={sushiObj.id} handleConsumedSushi={event => {props.handleConsumedSushi(event, sushiObj.id )}} sushiObj={sushiObj}/>)
        }
        <MoreButton showMoreSushi={props.showMoreSushi}/>
      </div>
    </Fragment>
  )
}

export default SushiContainer