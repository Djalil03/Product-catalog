import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notifications = () => {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      className="text-sm"
      toastClassName="bg-white shadow-lg rounded-lg border border-gray-200"
      // bodyClassName="text-gray-700"
      progressClassName="bg-blue-500"
    />
  )
}

export default Notifications