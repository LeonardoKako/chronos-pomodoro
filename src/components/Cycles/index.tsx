import styles from './styles.module.css';

import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';

export const Cycles = () => {
  const { state } = useTaskContext();

  const cyclesStep = Array.from({ length: state.currentCycle });

  const cycleDescription = {
    workTime: 'foco',
    shortBreakTime: 'descanço curto',
    longBreakTime: 'descanço longo',
  };

  return (
    <div className={styles.cycles}>
      <span>Ciclos: </span>
      <div className={styles.cycleDots}>
        {cyclesStep.map((_, idx) => {
          const nextCycle = getNextCycle(idx);
          const nextCycleType = getNextCycleType(nextCycle);
          return (
            <span
              key={idx}
              className={`${styles.cycleDot} ${styles[nextCycleType]}`}
              aria-label={`Indicador de ciclo de ${cycleDescription[nextCycleType]}`}
              title={`Indicador de ciclo de ${cycleDescription[nextCycleType]}`}
            ></span>
          );
        })}
      </div>
    </div>
  );
};
