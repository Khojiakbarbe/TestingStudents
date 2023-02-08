import React, { useState } from 'react';
import { useTimer } from 'react-timer-hook';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'



function Timer({ expiryTimestamp }) {
    const {
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        restart,
    } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });


    const [testTime, setTestTime] = useState()

    const [disable, setDisable] = useState(true)

    return (


        <div style={{ textAlign: 'center' }}>

            {
                disable ?
                    <>
                        <UncontrolledDropdown>
                            <DropdownToggle
                                caret
                                color="white"        >
                                Select Time
                            </DropdownToggle>
                            <DropdownMenu >
                                <DropdownItem onClick={() => setTestTime('1')} >
                                    1
                                </DropdownItem>
                                <DropdownItem onClick={() => setTestTime('2')}>
                                    2
                                </DropdownItem>
                                <DropdownItem onClick={() => setTestTime('3')}>
                                    3
                                </DropdownItem>
                                <DropdownItem onClick={() => setTestTime('5')}>
                                    5
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>

                    </>
                    :
                    <>
                        <UncontrolledDropdown disabled>
                            <DropdownToggle
                                color="white"                            >
                                Select function is offed
                            </DropdownToggle>
                            <DropdownMenu white>
                                <DropdownItem onChange={(e) => setTestTime(e.target.value)} value='1'>
                                    1
                                </DropdownItem>
                                <DropdownItem onChange={(e) => setTestTime(e.target.value)} value='2'>
                                    2
                                </DropdownItem>
                                <DropdownItem onChange={(e) => setTestTime(e.target.value)} value='3'>
                                    3
                                </DropdownItem>
                                <DropdownItem onChange={(e) => setTestTime(e.target.value)} value='5'>
                                    5
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </>
            }

            <div style={{ fontSize: '100px' }}>
                <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
            </div>
            {
                minutes < 1 && seconds < 1 ?
                    <h1>Ended</h1>
                    :
                    <h1>testing</h1>
            }
            <p>{isRunning ? 'Running' : 'Not running'}</p>
            {
                disable ?
                    <button onClick={() => {
                        // Restarts to 5 minutes timer
                        const time = new Date();
                        time.setSeconds(time.getSeconds() + testTime * 60);
                        restart(time)
                        setDisable(false)
                    }} className="btn btn-danger">Start</button>
                    :
                    <button onClick={() => {
                        // Restarts to 5 minutes timer
                        const time = new Date();
                        time.setSeconds(time.getSeconds() + testTime * 60);
                        restart(time)
                        setDisable(false)
                    }} className="btn btn-primary" disabled>Your time is started</button>
            }


        </div>
    );
}

export default function App() {
    const time = new Date();
    time.setSeconds(time.getSeconds() + ''); // 10 minutes timer
    return (
        <div className='container mt-5 mb-5 w-50'>
            <Timer expiryTimestamp={time} />
        </div>
    );
}