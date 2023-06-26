import React from 'react';
import classes from './MyPost.module.css'
import Post from "./Post/Post";

import {PostDataTypes} from "../../../redux/profile-reducer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormsControls/FormsControls";


export type MyPostsPropsType = {
    postData: Array<PostDataTypes>
    addPostHandlerContainer: (values: string) => void
}

const MyPost = React.memo((props: MyPostsPropsType) => {
    let {
        postData,
        addPostHandlerContainer,
    } = props;

    let postElement = postData.map(p => <Post key={p.id} message={p.message} likeCount={p.likesCount}/>)


    const addPostHandler = (values: any) => {
        addPostHandlerContainer(values.textName)
    }

    return (
        <div className={classes.postsBlock}>
            <h3>MyPosts</h3>
            <PostReduxForm onSubmit={addPostHandler}/>
            <div className={classes.posts}>
                {postElement}
            </div>


        </div>
    );
});

export default MyPost;

const maxLength10 = maxLengthCreator(10)

const ReduxFormMyPost: React.FC<InjectedFormProps<MyPostsPropsType>> = (props) => {
    return <div>
        <form onSubmit={props.handleSubmit}>
            <Field component={Textarea} name={'textName'} validate={[required, maxLength10]} placeholder={'enter text'}/>
            <div>
                <button>Post</button>
            </div>
        </form>
    </div>
}

const PostReduxForm = reduxForm<MyPostsPropsType>({form: 'textNameMyPost'})(ReduxFormMyPost)
