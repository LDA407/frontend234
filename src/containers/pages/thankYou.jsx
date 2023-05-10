import Layout from "../../hocs/Layout";
import { connect } from 'react-redux'
import { Navigate } from "react-router-dom";

const ThankYou = ({isAuthenticated}) => {
  if (!isAuthenticated ){
    return <Navigate to="/login"/>
  }
  return (
    <Layout>
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">
              Thank You
            </h2>
            <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Take control of your team.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProps = state => ({
    isAuthenticated: state.Auth.isAuthenticated
})

export default connect(mapStateToProps, {} )(ThankYou);
