import React from 'react'
import ChangeInfo from '../components/ChangeInfo'
import Withdrawal from '../components/Withdrawal'

const EditUserInfo = () => {
  return (
    <div className="editUserInfo">
      <section className="changeinfo-section">
        <ChangeInfo></ChangeInfo>
      </section>
      <section className="widthdrawal-section">
        <Withdrawal></Withdrawal>
      </section>
    </div>
  )
}

export default EditUserInfo
