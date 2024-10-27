import {useState, useCallback} from 'react';
import Counter from './components/Counter';
import { getUniqueId } from './utils';

function App() {
  const [counters, setCounters] = useState([{id: getUniqueId(), initialValue: null}]);
  
  // const onAddCounter = useCallback(() => setCounters([...counters, {id: getUniqueId(), initialValue: null}]), [counters]);
  
  // fixme m
  const onAddCounter = useCallback(() => {
    const newId = getUniqueId();
    console.log("Adding counter with ID:", newId); // Debugging line
    setCounters([...counters, { id: newId, initialValue: null }]);
  }, [counters]);
  
  
  return (
          <div>
            <h2>Counter APP</h2>
            {counters.map((counter) => (
              <Counter key={counter.id} initialValue={counter.initialValue}/>
            ))}
            <button className="add-counter" onClick={onAddCounter}>Add Counter</button>
          </div>
  )
}

export default App;
