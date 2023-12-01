import './index.css'
import { quiz } from '../../../Constants'
import { useState, useEffect, useMemo, useContext } from 'react'
import play from '/play.png'
import { Link } from 'react-router-dom'
import { userSession } from '../../App';
const Quiz = () => {
    const [time, setTime] = useState({ ms: 0, s: 0, m: 0, h: 0 });
    const [storeTiming, setStoreTiming] = useState()
    const [interv, setInterv] = useState();
    const [status, setStatus] = useState(0);
    const { currentUser, setCurrentUser } = useContext(userSession)
    useEffect(() => {
        console.log('hello')
        console.log(currentUser)

    }, [currentUser])
    // Not started = 0
    // started = 1
    // stopped = 2

    const start = useMemo(() => () => {
        run();
        setStatus(1);
        setInterv(setInterval(run, 10));
    }, []);

    var updatedMs = time.ms, updatedS = time.s, updatedM = time.m, updatedH = time.h;

    const run = () => {
        if (updatedM === 60) {
            updatedH++;
            updatedM = 0;
        }
        if (updatedS === 60) {
            updatedM++;
            updatedS = 0;
        }
        if (updatedMs === 100) {
            updatedS++;
            updatedMs = 0;
        }
        updatedMs++;
        return setTime({ ms: updatedMs, s: updatedS, m: updatedM, h: updatedH });
    };

    const stop = () => {
        clearInterval(interv);
        setStatus(2);
        console.log(time)
        const data = JSON.parse(localStorage.getItem("userInfo"))

        //filteredData array ma auxa , tarw  condition true vaye paxi auta matra value return hunxa ani [O] gryo vane tyo array direct object ma convert hunxa ani sajilo hunxa 
        const filteredData = data.filter((value) => value.email == currentUser)[0]
        console.log(filteredData)
        //time vanne naya key value set gareko 
        if (filteredData?.time?.length) {
            filteredData.time.push( {"time":time,"score":score} )
        } else {
            filteredData.time = []
            filteredData.time.push( {"time":time,"score":score} )
        }
        //time vanne value lai local storage ma save gareko
        localStorage.setItem("userInfo", JSON.stringify(data))
        const datas = JSON.parse(localStorage.getItem("userInfo"))
        console.log(datas.map((value) => { console.log(value) }))
    };

    const reset = () => {
        clearInterval(interv);
        setStatus(0);
        setTime({ ms: 0, s: 0, m: 0, h: 0 })
    };


    const [currentIndex, setCurrentIndex] = useState(0)
    const [score, setScore] = useState(0)
    const [showScore, setShowScore] = useState(false)
    const [selectedOption, setSelectedOption] = useState('')
    const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
    const [qstnCount, setQstnCount] = useState(1)

    // Load Next Question
    const updateNextQuestion = () => {
        if (currentIndex < quiz.length - 1) {
            // Selected Option is correct or not
            // Option Selected or not 
            if (selectedOption === '') {
                alert('Select an Option')
            }

            else {
                if (selectedOption === quiz[currentIndex].correctAnswer) {
                    setScore((prev: any) => {
                        return prev + 1
                    })
                    console.log(score)
                }
                setCurrentIndex((prev: any) => {
                    return prev + 1
                })
                setSelectedOption('')
                setQstnCount(qstnCount + 1)
            }

        }
        else {
            // Rendering Questions or Showing Score
            setShowScore(true)
            stop()
        }
    }

    // Load Previous Question
    const updatePrevQuestion = () => {
        setCurrentIndex((prev: any) => {

            // At initial state disable next button
            if (currentIndex <= 0) {
                return prev = 0;
                setQstnCount(0)
            }
            else {
                return prev - 1
                setQstnCount(qstnCount - 1)
            }
        })


    }

    // Selected Option
    const checkOptions = (item: any) => {
        setSelectedOption(item)
        console.log(item)
        // if(currentIndex == quiz.length){
        //     stop()
        // }
    }

    // Restart Quiz after completing all question
    const restartQuiz = () => {
        setCurrentIndex(0);
        setScore(0);
        setShowScore(false)
        setQstnCount(1)
        reset()
    }

    // Function to shuffle options
    const shuffleOptions = (options: any) => {
        const shuffled = [...options];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    useEffect(() => {
        // Shuffle options when currentIndex changes
        if (currentIndex < quiz.length) {
            const options = [...quiz[currentIndex].option];
            const shuffledUseEffect = shuffleOptions(options);
            setShuffledOptions(shuffledUseEffect);
        }
    }, [currentIndex, quiz]);

    useEffect(() => {
        let interval = setInterval(run, 10)
        setInterv(interval)
        return () => {
            console.log('check stop')
            clearInterval(interval)
        }
    }, [])

    const LogOut = () => {
        setCurrentUser()
        localStorage.removeItem('currentUser')
    }



    return (
        <div className="quiz-main">
            {
                !showScore ? <div className="quiz-container">
                    <div style={{ width: "100%", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <div className='quiz-top'>
                            <div className='quiz-timer-div'>
                                <div className='quiz-timer-sub-div'>
                                    <p className='quiz-timer-time'>{(time.h >= 10) ? time.h : "0" + time.h}</p>
                                    <p className='quiz-timer-txt'>Hr</p>
                                </div>
                                <div className='quiz-timer-sub-div'>
                                    <p className='quiz-timer-time'>{(time.m >= 10) ? time.m : "0" + time.m}</p>
                                    <p className='quiz-timer-txt'>Min</p>
                                </div>
                                <div className='quiz-timer-sub-div'>
                                    <p className='quiz-timer-time'>{(time.s >= 10) ? time.s : "0" + time.s}</p>
                                    <p className='quiz-timer-txt'>Sec</p>
                                </div>
                            </div>
                            <p className='quiz-top-txt'>
                                {qstnCount}/{quiz.length}
                            </p>
                        </div>
                        <div className="quiz-question">
                            <p className='question-text'>Q{qstnCount}. {quiz[currentIndex].question}</p>
                        </div>
                        <div className="quiz-options-div">
                            <div className="quiz-options-box">
                                {
                                    shuffledOptions.map((item, index) => {
                                        return (
                                            <div className={`options ${selectedOption === item ? 'clicked' : ''}`} key={index} onClick={() => { checkOptions(item) }}>
                                                <p className='options-text'>{item}</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className='quiz-buttons-container'>
                        {/* disabled={currentIndex === 0} */}
                        <button className='quiz-button' onClick={() => { updatePrevQuestion() }} ><p className='quiz-button-text' >Prev</p></button>
                        {/* disabled={currentIndex === quiz.length-1} */}
                        <button className='quiz-button' onClick={() => { updateNextQuestion() }} ><p className='quiz-button-text'>Next</p></button>
                    </div>


                </div> : (<div className='score-box'>

                    <p className='scb-title'>Congratulations! </p>
                    <p className='scb-txt1'>You have done a great job </p>
                    <p className='scb-txt1'>Your Timing is {time.h} hrs {time.m} min {time.s} sec</p>
                    <p className='scb-txt2'>Score</p>
                    <p className='scb-txt3'>{score}/{quiz.length}</p>
                    <button className='quiz-button-restart' onClick={() => { restartQuiz() }}>
                        <img
                            src={play}
                            height={"50px"}
                            width={"50px"}
                        />
                        <Link to={'/startPage'}>
                            <p className='quiz-button-text-sb'>Play Again</p>

                        </Link>
                    </button>
                    <button className='logOut-btn' onClick={() => { LogOut() }}>
                        <Link to={'/'}>
                            Log Out
                        </Link>
                    </button>
                </div>)
            }
        </div>
    )
}

export default Quiz