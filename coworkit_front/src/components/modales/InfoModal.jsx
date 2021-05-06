import React from 'react'
import Modal from './Modal'

export default function InfoModal({title, content,active, agreeAction }) {


        return (
            <Modal title={title} content={content } active={active} actionBtn={agreeAction}
            desableClicEscapeToCloseModal={true} desableClicOutsideToCloseModal={true}
            firstBtn={true} textBtn={"Aceptar"}/>
        )
    }