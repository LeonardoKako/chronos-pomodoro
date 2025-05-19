import { SaveIcon } from 'lucide-react';
import Container from '../../components/Container';
import { DefaultButton } from '../../components/DefaultButton';
import { DefaultInput } from '../../components/DefaultInput';
import Heading from '../../components/Heading';

import MainTemplate from '../../templates/MainTemplate';
import { useEffect, useRef } from 'react';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { showMessage } from '../../adapters/showMessage';
import { TaskActionTypes } from '../../contexts/TaskContext/taskActions';

function Settings() {
  const { state, dispatch } = useTaskContext();
  const workTimeInput = useRef<HTMLInputElement>(null);
  const shortBreakInput = useRef<HTMLInputElement>(null);
  const longBreakInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.title = 'Configurações - Chronos Pomodoro';
  }, []);

  function handleSaveSettings(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    showMessage.dissmiss();

    const workTime = Number(workTimeInput.current?.value);
    const shortBreakTime = Number(shortBreakInput.current?.value);
    const longBreakTime = Number(longBreakInput.current?.value);

    if (isNaN(workTime) || isNaN(shortBreakTime) || isNaN(longBreakTime)) {
      showMessage.error('Por favor use apenas números');
      return;
    }

    if (workTime < 1 || workTime > 99) {
      showMessage.error('Digite valores entre 1 e 99 para foco');
      return;
    }
    if (shortBreakTime < 1 || shortBreakTime > 15) {
      showMessage.error('Digite valores entre 1 e 15 para o descanso curto');
      return;
    }
    if (longBreakTime < 1 || longBreakTime > 40) {
      showMessage.error('Digite valores entre 1 e 40 para o descanso longo');
      return;
    }

    dispatch({
      type: TaskActionTypes.CHANGE_SETTINGS,
      payload: {
        workTime,
        shortBreakTime,
        longBreakTime,
      },
    });
    showMessage.sucess('Configurações salvas');
  }

  return (
    <>
      <MainTemplate>
        <Container>
          <Heading>Configurações</Heading>
        </Container>
        <Container>
          <p style={{ textAlign: 'center' }}>
            Modifique as configurações para tempo de foco, descanso curto e
            descanso longo
          </p>
        </Container>
        <Container>
          <form onSubmit={handleSaveSettings} className='form'>
            <div className='formRow'>
              <DefaultInput
                id='workTime'
                labelText='Foco'
                ref={workTimeInput}
                type='number'
                defaultValue={state.config.workTime}
              />
            </div>
            <div className='formRow'>
              <DefaultInput
                id='shortBreakTime'
                labelText='Descanso curto'
                ref={shortBreakInput}
                type='number'
                defaultValue={state.config.shortBreakTime}
              />
            </div>
            <div className='formRow'>
              <DefaultInput
                id='longBreakTime'
                labelText='Descanso longo'
                ref={longBreakInput}
                type='number'
                defaultValue={state.config.longBreakTime}
              />
            </div>
            <div className='formRow'>
              <DefaultButton
                icon={<SaveIcon />}
                aria-label='Salvar configurações'
                title='Salvar configurações'
              />
            </div>
          </form>
        </Container>
      </MainTemplate>
    </>
  );
}

export default Settings;
