import React from 'react';
import { Oval } from 'react-loader-spinner'
import "../../assets/admin/css/loader.css";

const Loader = () => {
    return (
        <div className='react-loader'>
            <Oval
                height={35}
                width={35}
                color="#ff0a32"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor="#00ee57"
                strokeWidth={4}
                strokeWidthSecondary={5}
            />
            <b>Please wait...</b>
        </div>
    )
}

export default Loader