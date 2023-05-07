import uniqid from 'uniqid';
import { useState } from 'react';

import Building from '@/components/Building';
import Button from '@/components/Button';

function App() {
  const [buildings, setBuildings] = useState<{id: string}[]>([{
    id: uniqid(),
  }]);

  const addBuilding = (): void => {
    setBuildings((prev) => {
      return [...prev, {
        id: uniqid()
      }]
    })
  }

  const removeBuilding = (): void => {
    setBuildings((prev) => {
      return prev.slice(0, -1);
    })
  }

  return (
    <>
      {buildings.map((item) => (
        <Building key={item.id} />
      ))}

      <div className='flex-center'>
        <Button onClick={removeBuilding} disabled={buildings.length <= 1}>
          -
        </Button>
        <Button onClick={addBuilding}>
          +
        </Button>
      </div>
    </>
  )
}

export default App
