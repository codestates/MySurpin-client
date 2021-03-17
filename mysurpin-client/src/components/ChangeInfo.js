import React from 'react'

const ChangeInfo = ({ isChangeInfoFormOn }) => {
    return (
        <div className="changeInfo">
            {
                isChangeInfoFormOn
                    ? (
                        <div className="changeinfo__formOn">
                            <div className="changeinfo__title">
                                <div className="changeinfo__title__text"></div>
                                <img src="" alt="" />
                            </div>
                            <div className="changeinfo__form">
                                <input type="text" className="email__input" />
                                <input type="text" className="passwordnew__input" />
                                <input type="text" className="passwordcheck__input" />
                            </div>
                            <button className="changeinfo__btn"></button>
                        </div>
                    )
                    : (
                        <div className="changeinfo__formOff">
                            <div className="changeinfo__title"></div>
                            <div className="changeinfo__ment"></div>
                            <button className="changeinfo__btn"></button>
                        </div>
                    )
            }
        </div>
    )
}

export default ChangeInfo
