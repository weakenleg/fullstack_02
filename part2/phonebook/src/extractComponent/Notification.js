import React from 'react';

const Notification = ({ notification }) => {
    if (!notification) {
      return null;
    }
  
    const { message, type, key } = notification;
    const className = `notification ${type}`;
  
    return (
      <div key={key} className={className}>
        {type === 'error' ? (
          <span className="error-message">{message}</span>
        ) : (
          <span className="success-message">{message}</span>
        )}
      </div>
    );
  };
  
  
  export default Notification;
  
