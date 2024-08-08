import React from 'react';
import { PropagateLoader} from 'react-spinners';
import './Loading.css';

const Loading = ({ loading }) => {
  return (
    <div className="loading-container">
      <PropagateLoader color="#ff6341" loading={loading} size={30} />
    </div>
  );
};

export default Loading;
