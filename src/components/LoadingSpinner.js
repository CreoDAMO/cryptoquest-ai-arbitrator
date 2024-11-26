const LoadingSpinner = () => (
  <div className="loading-spinner">
    <div className="spinner"></div>
    <style>
      {`
        .loading-spinner {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100px;
        }
        .spinner {
          width: 50px;
          height: 50px;
          border: 5px solid #ccc;
          border-top-color: #6366f1;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}
    </style>
  </div>
);

export default LoadingSpinner;
