import React from 'react';

type ProfileStatusType = {
    status: string
}


class ProfileStatus extends React.Component<ProfileStatusType> {

    state = {
        editMode: false
      //  onChange:
    }
    activateMode = () => {
       this.setState({
           editMode: !this.state.editMode
       })
    }

    render() {
        return (
            <div>
                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={this.activateMode.bind(this)}>{this.props.status}</span>
                    </div>}
                { this.state.editMode &&<div>
                    <input autoFocus onBlur={this.activateMode.bind(this)}  value = {this.props.status}/>
                </div>}
            </div>
        );
    }


};

export default ProfileStatus;
