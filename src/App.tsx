import React from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FileUploadWidget from './FileUploadWidget';
import { store } from './store';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <ToastContainer hideProgressBar={false} autoClose={false} />
      <div className="App">
        <div className="widget-container">
          <FileUploadWidget />
        </div>
      </div>
    </Provider>
  );
}

export default App;
