import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import { otpverification } from '../../Api/Auth.Api';

function OtpSubmit({ setOtpSubmit, Otpsubmit }) {
  const [otp, setOtp] = useState(null);

  const toastoptions = {
    position: 'bottom-left',
    autoClose: 2000,
    pauseOnHover: true,
    draggable: true,
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    otpverification(otp, (response) => {
      if (response.error === 'jwt expired') {
        toast.error('Your Otp valid only 5 minuts. Its already expaire', toastoptions);
      }
    });
  };

  return (
    <>
      <form
        onClick={(e) => handlesubmit(e)}
        className="form-div infoForm auth-form"
      >
        <h2>OTP verification</h2>
        <span className="Otp-reset-message">
          A verufucatuib code has been send to your email
          <span style={{ color: 'green' }}>{ Otpsubmit }</span>
          Check your Mail Box as well.
        </span>
        <div>
          <input
            type="text"
            placeholder="OTP"
            className="infoinput"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            name="OTP"
          />
        </div>
        {/* <span className={error ? 'error' : 'no-error'}>{error}</span> */}
        <div>
          <span className="link" onClick={() => setOtpSubmit(false)}>
            Go back
          </span>
        </div>

        <button className="button info-Button" type="submit">
          Send
        </button>
      </form>
      <ToastContainer />
    </>
  );
}

OtpSubmit.propTypes = {
  setOtpSubmit: PropTypes.string.isRequired,
  Otpsubmit: PropTypes.string.isRequired,
};

export default OtpSubmit;
