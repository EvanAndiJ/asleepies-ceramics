import Modal from 'react-bootstrap/Modal';

type signOutProps = {
  show: boolean,
  onHide: ()=>void,
  signOut: ()=>void
}
const ModalSignOut = ({show,onHide,signOut}: signOutProps) => {
  return (
          <Modal show={show} onHide={onHide}>
            <Modal.Header>
              Are you sure you want to sign out?
            </Modal.Header>
            <Modal.Footer>
              <button onClick={signOut} className="addToCart">
                Sign Out
              </button>
              <button onClick={onHide} className="addToCart">
                Cancel
              </button>
            </Modal.Footer>
          </Modal>
  );
}


export default ModalSignOut;



