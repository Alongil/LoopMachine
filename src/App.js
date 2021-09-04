import Header from "./components/Layout/Header";
// import Controllers from "./components/Tracks/Controllers";
import Controllers from "./components/Tracks/Controllers";
import Container from 'react-bootstrap/Container';
import './index.css';

function App() {
  return (
    <Container className='main' >
      <Header />
      {/* <Controllers /> */}
      <Controllers />
    </Container>

  );
}

export default App;
