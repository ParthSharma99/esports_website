import React, {useEffect} from 'react'
import PropTypes from 'prop-types'

function    ReferralPage(props) {
    const referralId = props.match.params.id;
    useEffect(() => {
        sessionStorage.setItem("referralId", referralId);
        window.location.href = "/";
      }, []);
    return (
        <div
            style={{
            display: "flex",
            justifyContent: "center",
            }}
        >
            {" "}
            Processing Referral...
        </div>
    );
}

ReferralPage.propTypes = {

}

export default ReferralPage
