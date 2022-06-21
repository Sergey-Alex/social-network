import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ActionsType, PostDataTypes} from "../../redux/store";

import {StoreType} from "../../redux/redux-store";
import {MyPostContainer} from "./MyPosts/MyPostContainer";

// type ProfilePostData = {
//     postData: Array<PostDataTypes>
//     message: string
//     dispatch: (action: ActionsType) => void
//     store: StoreType
// }

const Profile = () => {

    return (
        <div>
            <ProfileInfo/>
            <MyPostContainer/>
        </div>

    );
};

export default Profile;