import React, {ChangeEvent} from 'react';
import classes from './MyPost.module.css'
import Post from "./Post/Post";

import {AddPostAC, ChangeNewTextAC} from "../../../redux/profile-reducer";
import {ActionsType, PostDataTypes} from "../../../redux/store";


export type MyPostsPropsType = {
    postData: Array<PostDataTypes>
    message: string
    addPostHandlerContainer: (text: string) => void
    changeTextHandlerContainer: (text:string) => void
}

const MyPost = ({
                    postData,
                    message,
                    addPostHandlerContainer,
                    changeTextHandlerContainer
                }: MyPostsPropsType) => {

    let postElement = postData.map(p => <Post key={p.id} message={p.message} likeCount={p.likesCount}/>)


    const addPostHandler = () => {
        addPostHandlerContainer(message)
    }

    const changeTextHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        changeTextHandlerContainer(event.currentTarget.value)
    }

    return (
        <div className={classes.postsBlock}>
            <h3>MyPosts</h3>
            <div>
                <div>
                    <textarea onChange={changeTextHandler} value={message}></textarea>
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
