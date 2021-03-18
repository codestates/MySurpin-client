import React from 'react'
import Surpin from '../components/Surpin'

const NewListsSection = () => {
  return (
    <div className="newListsSection">
      <div className="newlists__title"></div>
      <ul className="newlists__lists">
        <li className="newlists__list">
          <Surpin></Surpin>
        </li>
      </ul>
    </div>
  )
}

export default NewListsSection
