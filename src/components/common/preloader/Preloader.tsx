import React from 'react';
import preloader from "../../../assets/images/Spinner.svg";

type PreloaderType = {
    isFetching: boolean
}

const Preloader = () => {
    return (
        <div>
             <img src={preloader} alt='preloader'/>
        </div>
    );
};

export default Preloader;
