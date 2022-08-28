import React from 'react';
import classes from './MyPost.module.css'
import Post from "./Post/Post";

import {PostDataTypes} from "../../../redux/profile-reducer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";


export type MyPostsPropsType = {
    //   message: string
    //  messageForNewPost: string
    postData: Array<PostDataTypes>
    addPostHandlerContainer: (values: string) => void
    // changeTextHandlerContainer: (text: string) => void
}

const MyPost = ({
                    postData,
                    //     messageForNewPost,
                    addPostHandlerContainer,
                    // changeTextHandlerContainer
                }: MyPostsPropsType) => {

    let postElement = postData.map(p => <Post key={p.id} message={p.message} likeCount={p.likesCount}/>)


    const addPostHandler = (values: any) => {
        addPostHandlerContainer(values.textName)
    }

    // const changeTextHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    //     changeTextHandlerContainer(event.currentTarget.value)
    // }

    return (
        <div className={classes.postsBlock}>
            <h3>MyPosts</h3>
            <PostReduxForm onSubmit={addPostHandler}/>
            {/*<ReduxFormMyPost changeTextHandler={changeTextHandler}*/}

            {/*                 value ={messageForNewPost} />*/}
            {/*<div>*/}
            {/*    <div>*/}
            {/*        <textarea onChange={changeTextHandler} value={messageForNewPost}></textarea>*/}
            {/*    </div>*/}
            {/*    <div>*/}
            {/*        <button onClick={addPostHandler}>Add Post</button>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className={classes.posts}>
                {postElement}
            </div>


        </div>
    );
};

export default MyPost;


const ReduxFormMyPost: React.FC<InjectedFormProps<MyPostsPropsType>> = (props) => {
    return <div>
        <form onSubmit={props.handleSubmit}>
            <Field component={'textarea'} name={'textName'}/>
            <div>
                <button>Post</button>
            </div>
        </form>
    </div>
}

const PostReduxForm = reduxForm<MyPostsPropsType>({form: 'textNameMyPost'})(ReduxFormMyPost)