import Modal from 'react-bootstrap/Modal';

type welcomeProps = {
  show: boolean,
  onHide: ()=>void,
}
const WelcomeModal = ({show,onHide}: welcomeProps) => {
  return (
          <Modal show={show} onHide={onHide}>
            <Modal.Header>
             <h1>Welcome!</h1>
            </Modal.Header>
            <Modal.Body>
            <h4>My name is Evan</h4> 
            <p>I'm a web developer, artist, and potter. </p>
            <p>I built this webstore using the PERN stack, and deployed it with Heroku. </p>
            <p>This webstore is no longer live, but has been populated with sample products to showcase my front-end abilities. The back-end is simulated within the react app.</p>
            <p>The React App and Express Server code can be viewed 
              <a href="https://github.com/EvanAndiJ/asleepies-ceramics"> here</a></p>
            </Modal.Body>
            <Modal.Footer>
              <button onClick={onHide} className="addToCart">
                Close
              </button>
            </Modal.Footer>
          </Modal>
  );
}


export default WelcomeModal;



