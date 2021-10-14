import React, { useEffect } from "react";
import {server} from './server'

function App() {
  const [isInitialized, setIsInitialized] = React.useState(false)
  const [units, setUnits] = React.useState([])

  useEffect(() => {
    const fetchUnits = async() => {
      server.getUnits('x@x.com')
      /*const units = await server.getUnits('x@x.com')
      setUnits(units)
      setIsInitialized(true)*/
    }

    fetchUnits()
  }, []);

  return (
    <div>
      <h1>Zeta project test</h1>
    </div>
  );
}

export default App;
