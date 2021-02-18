import useSound from 'use-sound';
import './Switch.css';
import switchSfx from '../../sounds/switch.wav';

const Switch = ({func, id, checked, disabled, alwaysGreen, playSound = true}) => {
  const [play] = useSound(switchSfx);
  return (
    <label className='switch'>
      <input type='checkbox' disabled={disabled} checked={checked} onChange={(e) => {
        if(playSound)
          play(); 
        if(func) func({e, id});
      }}/>
      <span className={`slider ${alwaysGreen ? "green" : ""}`}></span>
    </label>
  );
};

export default Switch;