import React from 'react';
import classes from './MyPost.module.css'
import Post from "./Post/Post";
import {addPost, PostDataTypes} from "../../../redux/state";



type MyPostsPropsType = {
    postData: Array<PostDataTypes>
    addPost: (text: string)=> void
}

const MyPost = ({postData, addPost}: MyPostsPropsType) => {
    let postElement = postData.map(p =>  <
        Post message={p.message} likeCount={p.likesCount}/>)

    let newPostElement = React.createRef<HTMLTextAreaElement>()

    const addPostHandler = () => {
        if (newPostElement.current){
            addPost( newPostElement.current?.value)
        }
    }

    return (
        <div className={classes.postsBlock}>
            <h3>MyPosts</h3>
            <div>
                <div>
                    <textarea ref={newPostElement}></textarea>
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