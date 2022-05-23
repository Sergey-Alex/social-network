import React from 'react';
import classes from './Post.module.css'

export type PostPropsType = {
    message: string
    likeCount: number
}

const Post = ({message,likeCount}:PostPropsType) => {
    return (
        <div className={classes.item}>
            <img src="https://icon-library.com/images/icon-avatar/icon-avatar-19.jpg" alt="avatar"/>
                    {message}
            <div>
                <span>{likeCount}</span>
            </div>

        </div>
    );
};

export default Post;