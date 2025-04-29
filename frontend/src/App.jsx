import React from 'react'
import Allroutes from './component/Allroutes';
import ProtectRoutes from './context/ProtectRotues';
const App = () => {
  return (
    <div style={{border:'1px solid',width : '100%'}}>
      <ProtectRoutes>
        <Allroutes/>
      </ProtectRoutes>
    </div>
);
}

export default App;