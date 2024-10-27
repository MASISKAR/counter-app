import {useState, useEffect, useCallback, memo} from 'react';
import PropTypes from 'prop-types';
import {getInitialCount} from '../api/mockApi';
import {getRandomNumber} from '../utils/index.js';

function Counter({initialValue}) {
    const [count, setCount] = useState(initialValue || 0);
    const onDecrement = useCallback(() => setCount(count - 1), [count]);
    const onIncrement = useCallback(() => setCount(count + 1), [count]);
    const onRandomize = useCallback(() => setCount(getRandomNumber()), []);
    
    useEffect(() => {
      if (initialValue !== null) {
        return;
      }
      (async () => {
        const initialCount = await getInitialCount();
        setCount(initialCount);
      })();
    }, [initialValue]);
    
  return (
          <div>
          <button onClick={onDecrement}>Decrement -</button>
            <span>{count}</span>
          <button onClick={onIncrement}>Increment +</button>
          <button onClick={onRandomize}>Randomize</button>
          </div>
  );
}

Counter.propTypes = {
  initialValue: PropTypes.number || null,
};

export default memo(Counter);
