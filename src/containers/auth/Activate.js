import Layout from "../../hocs/Layout";
import { useParams, Navigate } from "react-router";
import { useState } from "react";
import { activate } from "../../redux/actions/auth";
import { connect } from "react-redux";
import { Oval } from "react-loader-spinner";


const Activate = ({activate, loading}) => {
  const params = useParams();
  const [activated, setActivated] = useState(false);

  const activate_account = () => {
    const uid = params.uid;
    const token = params.token;
    console.log("activate_account", uid, token);
    activate(uid, token);
    setActivated(true);
  };

  if (activated && !loading) {
    return <Navigate to="/" />;
  }

  return (
    <Layout>
      <div className="">
        {loading ? (
          <button
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Oval color="#fff" width={20} height={20} />
          </button>
        ) : (
          <button
            onClick={activate_account}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Activate Account
          </button>
        )}
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  loading: state.Auth.loading,
});

export default connect(mapStateToProps, { activate })(Activate);
