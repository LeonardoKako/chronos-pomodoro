import './styles/theme.css';
import './styles/global.css';

import Home from './pages/Home';
import { TaskContextProvider } from './contexts/TaskContext/TaskContextProvider';
// import NotFound from './pages/NotFound';
// import AboutPomodoro from './pages/AboutPomodoro';

function App() {
  return (
    <>
      <TaskContextProvider>
        <Home />
      </TaskContextProvider>
    </>
  );
}

export default App;
