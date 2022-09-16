import React, {ChangeEvent, useEffect, useState} from 'react';

type ProfileStatusType = {
    status: string
    updateStatus: (st: string) => void
}


const ProfileStatusWithHooks = (props: ProfileStatusType) => {

    const [editMode, setEditMode] = useState<boolean>(false);
    const [value, setValue] = useState<string>(props.status);

    useEffect(() => {
        setValue(props.status)
    },[props.status])
    //
    // state = {
    //     editMode: false,
    //     status: this.props.status
    //     //  onChange:
    // }
    // activateMode = () => {
    //     this.setState({
    //         editMode: true
    //     })
    // }
    // deactivateMode = () => {
    //     this.setState({
    //         editMode: false
    //     })
    //     this.props.updateStatus(this.state.status)
    // }
    // onStatusChange = (e: ChangeEvent<HTMLInputElement>)=> {
    //     this.setState({
    //         status: e.currentTarget.value
    //     })
    // }
    //
    // componentDidUpdate(prevProps: Readonly<ProfileStatusType>, prevState: Readonly<{}>) {
    //     if (prevProps.status !== this.props.status){
    //         this.setState({
    //             status: this.props.status
    //         })
    //     }
    // }
    const activateMode = () => {
        setEditMode(true)
    }
    const deActivateMode = () => {
        setEditMode(false)
        props.updateStatus(value)
    }

    const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    return (
        <div>
            {!editMode &&
                <div>
                <span onDoubleClick={activateMode}>{props.status}</span>
            </div>}
            {editMode && <div>
                <input value={value} onChange={onChangeStatus} onBlur={deActivateMode} autoFocus={true}/>
            </div>}
        </div>
    );


}

export default ProfileStatusWithHooks;
