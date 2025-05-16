import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';

const Tips = () => {
  const { state } = useTaskContext();
  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  const tipsForWhenActiveTask = {
    workTime: <span>Foque por {state.config.workTime}min</span>,
    shortBreakTime: <span>Descanse {state.config.shortBreakTime}min</span>,
    longBreakTime: <span>Aproveite guerreiro!</span>,
  };

  const tipsForNoWhenActiveTask = {
    workTime: <span>Próximo ciclo é de {state.config.workTime}min</span>,
    shortBreakTime: (
      <span>Próximo descanso é de {state.config.shortBreakTime}min</span>
    ),
    longBreakTime: <span>Próximo descanço será longo</span>,
  };
  return (
    <>
      {!!state.activeTask && tipsForWhenActiveTask[state.activeTask.type]}
      {!state.activeTask && tipsForNoWhenActiveTask[nextCycleType]}
    </>
  );
};

export default Tips;
