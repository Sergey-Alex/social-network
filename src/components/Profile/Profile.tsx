import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
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