import Layout from "../../hocs/Layout";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { signup } from '../../redux/actions/auth'
import { Navigate } from "react-router";
// import { Loader } from "react-loader-spinner";



function Signup({signup, loading}) {

  useEffect(()=>{
    window.scrollTo(0,0)
  }, [])

  const [accountCreated, setAccountCreated ]= useState(false)
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    re_password: "",
  });

  const {
    full_name,
    email,
    password,
    re_password,
  } = formData

  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})
  const onSubmit = e => {
    e.preventDefault();
    signup(
      full_name,
      email,
      password,
      re_password
    );
    setAccountCreated(true);
  }

  if (accountCreated && !loading) {
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
            Register your account
          </h2>
        </div>
        <section className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={(e) => onSubmit(e)} className="space-y-6">
              {/* FULL NAME */}
              <section>
                <label
                  htmlFor="full_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <div className="mt-1">
                  <input
                    onChange={(e) => onChange(e)}
                    name="full_name"
                    value={full_name}
                    type="text"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </section>

              <section>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    onChange={(e) => onChange(e)}
                    name="email"
                    value={email}
                    type="email"
                    autoComplete="email"
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
                  Password
                </label>
                <div className="mt-1">
                  <input
                    onChange={(e) => onChange(e)}
                    name="password"
                    value={password}
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
                  Repeat Password
                </label>
                <div className="mt-1">
                  <input
                    onChange={(e) => onChange(e)}
                    name="re_password"
                    value={re_password}
                    type="password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </section>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </section>
      </section>
    </Layout>
  );
}
// coectar con el estado inicial
const mapStateToProps = state => ({
  loading: state.Auth.loading
})

export default connect(mapStateToProps, {signup}) (Signup);