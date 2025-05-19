import styles from './styles.module.css';

import Container from '../../components/Container';
import { TrashIcon } from 'lucide-react';
import MainTemplate from '../../templates/MainTemplate';
import { DefaultButton } from '../../components/DefaultButton';
import Heading from '../../components/Heading';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { formatDate } from '../../utils/formatDate';
import { getTaskStatus } from '../../utils/getTaskStatus';
import { useEffect, useState } from 'react';
import { sortTasks, type SortTasksOptions } from '../../utils/sortTasks';
import { showMessage } from '../../adapters/showMessage';
import { TaskActionTypes } from '../../contexts/TaskContext/taskActions';

const History = () => {
  const { state, dispatch } = useTaskContext();
  const [confirmClear, setConfirmClear] = useState(false);
  const hasTasks = state.tasks.length > 0;

  const [sortTaskOptions, setSortTaskOptions] = useState<SortTasksOptions>(
    () => {
      return {
        tasks: sortTasks({ tasks: state.tasks }),
        field: 'startDate',
        direction: 'desc',
      };
    },
  );

  function handleSortTasks({ field }: Pick<SortTasksOptions, 'field'>) {
    const newDirection = sortTaskOptions.direction === 'desc' ? 'asc' : 'desc';

    setSortTaskOptions({
      tasks: sortTasks({
        direction: newDirection,
        tasks: sortTaskOptions.tasks,
        field,
      }),
      direction: newDirection,
      field,
    });
  }
  useEffect(() => {
    document.title = 'Histórico - Chronos Pomodoro';
  }, []);

  useEffect(() => {
    setSortTaskOptions(prevState => ({
      ...prevState,
      tasks: sortTasks({
        tasks: state.tasks,
        direction: prevState.direction,
        field: prevState.field,
      }),
    }));
  }, [state.tasks]);

  useEffect(() => {
    if (!confirmClear) return;
    setConfirmClear(false);
    dispatch({ type: TaskActionTypes.RESET_STATE });
  }, [confirmClear, dispatch]);

  useEffect(() => {
    return () => {
      showMessage.dissmiss();
    };
  }, []);

  function handleDeleteHistory() {
    showMessage.dissmiss();
    showMessage.confirm('Tem certeza?', confirmation => {
      setConfirmClear(confirmation);

      if (confirmation) {
        dispatch({ type: TaskActionTypes.RESET_STATE });
      }
    });
  }

  return (
    <MainTemplate>
      <Container>
        <Heading>
          <span>Histórico</span>
          {hasTasks && (
            <span className={styles.buttonContainer}>
              <DefaultButton
                icon={<TrashIcon />}
                color='red'
                aria-label='Apagar todo o histórico'
                title='Apagar todo o histórico'
                onClick={handleDeleteHistory}
              />
            </span>
          )}
        </Heading>
      </Container>
      <Container>
        {hasTasks && (
          <div className={styles.responsiveTable}>
            <table>
              <thead>
                <tr>
                  <th
                    onClick={() => handleSortTasks({ field: 'name' })}
                    className={styles.thSort}
                  >
                    Tarefa ↕
                  </th>
                  <th
                    onClick={() => handleSortTasks({ field: 'duration' })}
                    className={styles.thSort}
                  >
                    Duração ↕
                  </th>
                  <th
                    onClick={() => handleSortTasks({ field: 'startDate' })}
                    className={styles.thSort}
                  >
                    Data ↕
                  </th>
                  <th>Status</th>
                  <th>Tipo</th>
                </tr>
              </thead>
              <tbody>
                {sortTaskOptions.tasks.map(task => {
                  const translationType = {
                    workTime: 'Foco',
                    shortBreakTime: 'Descanso curto',
                    longBreakTime: 'Descanso longo',
                  };

                  return (
                    <tr key={task.id}>
                      <td>{task.name}</td>
                      <td>{task.duration}</td>
                      <td>{formatDate(task.startDate)}</td>
                      <td>{getTaskStatus(task, state.activeTask)}</td>
                      <td>{translationType[task.type]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        {!hasTasks && (
          <p style={{ textAlign: 'center' }}>Ainda não tarefas criadas.</p>
        )}
      </Container>
    </MainTemplate>
  );
};

export default History;
