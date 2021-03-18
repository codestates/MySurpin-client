import React from 'react'

const Withdrawal = ({ isChangeInfoFormOn }) => {
    return (
        <div className="withdrawal">
            {
                isChangeInfoFormOn
                    ? (
                        <div className="withdrawl_formOff">
                            <div className="widthdrawl__title"></div>
                            <div className="widthdrawl__ment"></div>
                            <button className="widthdrawl__btn"></button>
                        </div>
                    )
                    : (
                        <div className="withdrawl_formOn">
                            <div className="widthdrawl__title"></div>
                            <img className="widthdrawl__img" src="" alt="" />
                            <div className="widthdrawl-form">
                                <input className="widthdrawl-form__password__input" type="text" />
                            </div>
                            <button className="widthdrawl__btn"></button>
                        </div>
                    )
            }
        </div>
    )
}

export default Withdrawal
