import './styles/theme.css';
import './styles/global.css';

import { TaskContextProvider } from './contexts/TaskContext/TaskContextProvider';
import MessagesContainer from './components/MessagesContainer';
import MainRoute from './Routers/Route';

function App() {
  return (
    <>
      <TaskContextProvider>
        <MessagesContainer>
          <MainRoute />
        </MessagesContainer>
      </TaskContextProvider>
    </>
  );
}

export default App;
