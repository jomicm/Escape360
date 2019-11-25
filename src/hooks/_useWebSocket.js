import {useEffect, useRef} from 'react';

const useWebSocket = (url, onMessageHandler) => {
  const socket = useRef();
  const savedMessageHandler = useRef();
  
  useEffect(() => {
    savedMessageHandler.current = onMessageHandler;
    return () => {};
  }, [onMessageHandler]);

  useEffect(() => {
    socket.current = new WebSocket(url);
    console.log('connected from useSocket');
    const onMessageListener = (event) => {
      console.log('event', event);
      savedMessageHandler.current(event);
      // onMessageHandler(event);
    }
    socket.current.onmessage = onMessageListener
    socket.current.onopen = () => console.log('Connected to ', url)
    socket.current.onclose = () => console.log('Closed');
    return () => {
      socket.current.close()
    };
  }, [url])

  const send = message => {
    if (socket.current.readyState === 1)
      socket.current.send(message);
  }
  return { send };
};

export default useWebSocket;