import React, { useState } from 'react';
import QRCode from 'qrcode.react';

const PaymentPopup = ({ dataToSend, onClose }) => {
    console.log(dataToSend);
    return (
        <div className="payment-popup">
            <div className="popup-content">
                <h2>Scan QR Code for Payment</h2>
                <QRCode value={dataToSend.qrCodeData} size={300} className="qr-code" />
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

const PaymentButton = ({ dataToSend }) => {
    const [showPopup, setShowPopup] = useState(false);

    const openPopup = () => {
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
    };
    return (
        <div>
            <button onClick={openPopup}>Open Payment Popup</button>

            {showPopup && (
                <PaymentPopup
                    dataToSend={{
                        qrCodeData: JSON.stringify(dataToSend, null, 2),
                    }}
                    onClose={closePopup}
                />
            )}
        </div>
    );
};

export default PaymentButton;
