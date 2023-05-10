import Layout from "../../hocs/Layout";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router";
import { connect } from "react-redux";
import { reset_password_confirm } from "../../redux/actions/auth";
import { Oval } from "react-loader-spinner";



function PasswordConfirm({reset_password_confirm, loading}) {
  useEffect(() => {
    window.scrollTo(0.0);
  }, []);
  
  const params = useParams()
  const [requestSent, setRequestSent] = useState(false);
  const [formData, setFormData] = useState({
    new_password: "",
    re_new_password: "",
  });
  
  const { new_password, re_new_password } = formData;
  
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    reset_password_confirm(
      params.uid,
      params.token,
      new_password,
      re_new_password
    );
    setRequestSent(true);
  };
  
  if (requestSent && !loading) {
    return <Navigate to="/" />;
  }
  
  return (
    <Layout>
      <section className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Set your new password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">addressx</p>
        </div>
        <section className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={(e) => onSubmit(e)} className="space-y-6">
              <section>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  New Password
                </label>
                <div className="mt-1">
                  <input
                    onChange={(e) => onChange(e)}
                    name="new_password"
                    value={new_password}
                    type="password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </section>

              <section>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <div className="mt-1">
                  <input
                    onChange={(e) => onChange(e)}
                    name="re_new_password"
                    value={re_new_password}
                    type="password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </section>

              <div>
                {loading ? (
                  <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <Oval color="#fff" width={20} height={20} />
                  </button>
                ) : (
                  <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Confirm new Password
                  </button>
                )}
              </div>
            </form>
          </div>
        </section>
      </section>
    </Layout>
  );
}
// coectar con el estado inicial
const mapStateToProps = (state) => ({
  loading: state.Auth.loading,
});

export default connect(mapStateToProps, { reset_password_confirm })(PasswordConfirm);
