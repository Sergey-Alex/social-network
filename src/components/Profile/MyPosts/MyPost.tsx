import React, {ChangeEvent} from 'react';
import classes from './MyPost.module.css'
import Post from "./Post/Post";
import {ActionsType, AddPostAC, ChangeNewTextAC, PostDataTypes} from "../../../redux/state";



type MyPostsPropsType = {
    postData: Array<PostDataTypes>
    message: string
    dispatch: (action: ActionsType)=> void
}

const MyPost = ({postData, dispatch, message, }: MyPostsPropsType) => {
    let postElement = postData.map(p =>  <
        Post key={p.id} message={p.message} likeCount={p.likesCount}/>)


    const addPostHandler = () => {
            dispatch(AddPostAC(message))
    }

    const changeTextHandler = (event:ChangeEvent<HTMLTextAreaElement> ) => {
        dispatch(ChangeNewTextAC(event.currentTarget.value))
    }

    return (
        <div className={classes.postsBlock}>
            <h3>MyPosts</h3>
            <div>
                <div>
                    <textarea onChange={changeTextHandler}  value={message}></textarea>
                </div>
                <div>
                    <button onClick={addPostHandler}>Add Post</button>
                </div>
            </div>
            <div className={classes.posts}>
                {postElement}
            </div>


        </div>
    );
};

export default MyPost;