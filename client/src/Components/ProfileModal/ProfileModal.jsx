import { Modal, useMantineTheme } from '@mantine/core';
import './ProfileModal.css'

function ProfileModal({ModalOpened,setModalOpened}) {
  const theme = useMantineTheme();

  return (
    <Modal
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      size="50%"
      opened = {ModalOpened}
      onClose = {()=>setModalOpened(false)}
    >
      <form className='infoForm'>
        <h3>Your info</h3>

        <div>
                    <input type="text"
                        placeholder='Work at'
                        className='infoinput'
                        name='workat' />
                </div>

                <div>
                    <input type="text"
                        placeholder='Lives In'
                        className='infoinput'
                        name='location' />
                </div>

                <div>
                    <input type="text"
                        placeholder='Status'
                        className='infoinput'
                        name='status' />
                </div>

                <div>
                    <input type="text"
                        placeholder='Password'
                        className='infoinput'
                        name='Password' />

                    <input type="text"
                        placeholder='Confirm Password'
                        className='infoinput' />
                </div>
                <div>
                </div>

                <div>
                    <button className='button info-Button'>Update Details</button>
                </div>
      </form>
    </Modal>
  );
}

export default ProfileModal;