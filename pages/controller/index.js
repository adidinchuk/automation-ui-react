import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { Joystick } from 'react-joystick-component';
import Box from '@mui/material/Box'
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import Rover from '../../objects/Rover'

const IndexPage = () => {

    function stop() {
        return function () {
            //STOP
        };

    }

    const [joystick, setJoystick] = useState({ x: 0, y: 0 });
    const [binaryMotion, setBinaryMotion] = useState(true);

    const motionSwitchHandler = (event) => {
        setBinaryMotion(event.target.checked);
      };

    useEffect(() => {
        sendCommand(generateRCData());
    }, [joystick])

    function sendCommand(data) { 
        //SEND COMMAND
        console.log(data);
        console.log(binaryMotion);
     }

    function joystickStopHandler() { updateJoystick({ x: 0, y: 0 }); }


    function generateRCData() {
        var data = { x: 0, y: 0 };
        if (binaryMotion){
            if(Math.abs(joystick.x) > Math.abs(joystick.y))
                data = { x: Math.round(joystick.x), y: 0 };
            else
                data = { x: 0, y: Math.round(joystick.y) };    
        }else{
            data = { x: Math.round(joystick.x), y: Math.round(joystick.y) };
        }
        return data;
    }

    return (
        <Grid container justify="center" columns={{ xs: 2, sm: 4, md: 12 }} className="mobile-grid">
            <Grid item xs={12}>
                <div class="center-contents">
                    <FormControlLabel control={<Switch />} label="Binary motion" checked={binaryMotion} onChange={motionSwitchHandler}/>
                </div>
                
            </Grid>
            
            <Grid item xs={0} sm={2} md={6}>
                <Box display="flex" justifyContent="center" alignItems="center">
                    <div className='mobile-joystick'>
                        <Joystick size={180} sticky={false} minDistance={40} throttle={400} baseImage="/joystickOrient.png" stickImage="/joystickHead.png" move={setJoystick} stop={joystickStopHandler} ></Joystick>
                    </div>
                </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={12} sx={{ height: '40px' }}>
                <Button variant="outlined" color="error" sx={{ width: '100%' }} onClick={stop('emergency')}>
                    EMERGENCY STOP
                </Button>
            </Grid>
        </Grid>
    );
}

export default IndexPage;