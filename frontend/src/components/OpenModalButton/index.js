import React from 'react';
import { useModal } from '../../context/Modal';

function OpenModalButton({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (typeof onButtonClick === 'function') onButtonClick();
    if (typeof onModalClose === 'function') setOnModalClose(onModalClose);
    setModalContent(modalComponent);
  };
// might need to add a conditional here that says if button text = this than apply this class name????
  return (
    <>
    {buttonText === 'Log In' &&(<button className='log-in-button'onClick={onClick}>{buttonText}</button>)}
    {buttonText === 'Sign Up' &&(<button className='sign-up-button'onClick={onClick}>{buttonText}</button>)}
    {buttonText === 'Delete' &&(<button className='delete-button-modal'onClick={onClick}>{buttonText}</button>)}
    {buttonText === 'Post Your Review' &&(<button className='post-your-review-button-modal'onClick={onClick}>{buttonText}</button>)}



    </>

  );
}

export default OpenModalButton;
