import React, { Fragment } from 'react'

const Sushi = (props) => {
  return (
    <div onClick={props.handleConsumedSushi} className="sushi">
      <div className="plate"
           onClick={null}>
        {
          props.sushiObj.eaten ? null : <img src={props.sushiObj.img_url} width="100%" />
        }
      </div>
      <h4 className="sushi-details">
        {props.sushiObj.name} - ${props.sushiObj.price}
      </h4>
    </div>
  )
}

export default Sushi