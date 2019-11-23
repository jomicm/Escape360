// import {useEffect, useRef} from 'react';

const useWebSocket = (url, onMessageHandler) => {
    const socket = new WebSocket(url);
    console.log('connected from useSocket');
    const onMessageListener = (event) => {
      console.log('event', event);
      // savedMessageHandler.current(event);
      onMessageHandler(event);
    }
    socket.onmessage = onMessageListener
    socket.onopen = () => console.log('Connected to ', url)
    socket.onclose = () => console.log('Closed');
    // return () => {
    //   socket.current.close()
    // };
  // }, [url])

  const send = message => {
    console.log('socket.readyState', socket.readyState);
    if (socket.readyState === 1) {
      socket.send(message);
      console.log('message', message);
    }
  };

  const remove = message => {
    console.log('socket.readyState', socket.readyState);
    socket.close();
  }; 
  return { send, remove };
};

export default useWebSocket;