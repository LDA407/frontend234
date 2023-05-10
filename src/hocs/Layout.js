import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { check_authenticated, refresh_token, load_user } from '../redux/actions/auth';
import Footer from '../components/navigation/Footer';
import NavBar from '../components/navigation/NavBar';
import { connect } from 'react-redux';
import { useEffect } from 'react';


const Layout = (props) => {
  useEffect(()=>{
    props.check_authenticated()
    props.load_user()
    props.refresh_token()
  }, [])
    return (
      <div>
        <NavBar />
        <ToastContainer autoClose={5000} />
        {props.children}
        <Footer />
      </div>
    );
}



export default connect(null, {
  check_authenticated, load_user, refresh_token
}) ( Layout );