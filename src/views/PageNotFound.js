//404 page, contains link back to the home page
import React from 'react';
import {Link} from "react-router-dom";

function PageNotFound() {
    return(
    <div>
        <h1> 404 </h1>
        <Link to="/"> Strona główna</Link>
    </div>
    );
}

export default PageNotFound;