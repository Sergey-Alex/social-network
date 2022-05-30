import React, {ChangeEvent} from 'react';
import classes from './MyPost.module.css'
import Post from "./Post/Post";
import {PostDataTypes} from "../../../redux/state";



type MyPostsPropsType = {
    postData: Array<PostDataTypes>
    addPost: (text: string)=> void
    message: string
    changeNewText: (text: string) => void
}

const MyPost = ({postData, addPost, message, changeNewText}: MyPostsPropsType) => {
    let postElement = postData.map(p =>  <
        Post message={p.message} likeCount={p.likesCount}/>)


    const addPostHandler = () => {
            addPost(message)

    }

    const changeTextHandler = (event:ChangeEvent<HTMLTextAreaElement> ) => {
        changeNewText(event.currentTarget.value)
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