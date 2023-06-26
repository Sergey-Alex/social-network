 import React, {ChangeEvent} from 'react';

type ProfileStatusType = {
    status: string
    updateStatus: (st: string) =>void
}


class ProfileStatus extends React.Component<ProfileStatusType> {

    state = {
        editMode: false,
        status: this.props.status
      //  onChange:
    }
    activateMode = () => {
       this.setState({
           editMode: true
       })
    }
    deactivateMode = () => {
       this.setState({
           editMode: false
       })
        this.props.updateStatus(this.state.status)
    }
    onStatusChange = (e: ChangeEvent<HTMLInputElement>)=> {
        this.setState({
            status: e.currentTarget.value
        })
    }

   componentDidUpdate(prevProps: Readonly<ProfileStatusType>, prevState: Readonly<{}>) {
        if (prevProps.status !== this.props.status){
            this.setState({
                status: this.props.status
            })
        }
   }


    render() {
        return (
            <div>
                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={this.activateMode}>{this.props.status}</span>
                    </div>}
                { this.state.editMode &&<div>
                    <input onChange={this.onStatusChange}  autoFocus onBlur={this.deactivateMode}  value = {this.state.status}/>
                </div>}
            </div>
        );
    }


}

export default ProfileStatus;
