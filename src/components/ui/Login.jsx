import React, { Component } from 'react';
import Modal from 'react-modal';
class PopupComponent extends Component {
    state = {
        isOpen: false
    }
    customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)'
        }
    };
    onClickHandel = () => {
        this.setState({ isOpen: !this.state.isOpen })
        console.log(this.state.isOpen)
    }
    render() {
        return (
            <>

                <Modal isOpen={this.props.isOpen} style={this.customStyles} onAfterOpen={this.afterOpenModal}>
                    <button className="button-Login">Continue Phone</button>
                    <button className="button-Login">Continue with Facebook</button>
                    <button className="button-Login">Continue With Google</button>
                    <button className="button-Login">Continue with email</button>
                    <button className="button-Login" onClick={this.props.popUpClose}>cencel</button>
                </Modal>
            </>
        )
    }
}

export default PopupComponent
