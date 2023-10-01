import './index.css'
import quiz from '../../../Constants'
import { useState, useEffect } from 'react'
const Quiz = () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [score, setScore] = useState(0)
    const [showScore, setShowScore] = useState(false)
    const [selectedOption, setSelectedOption] = useState('')
    const [shuffledOptions, setShuffledOptions] = useState<string[]>([]); 

    // Load Next Question
    const updateNextQuestion = () => {
        if (currentIndex < quiz.length - 1) {

            // Selected Option is correct or not
            if (selectedOption === quiz[currentIndex].correctAnswer) {
                setScore((prev: any) => {
                    return prev + 1
                })
                console.log(score)
            }

            // Option Selected or not 
            if (selectedOption === '') {
                alert('Select an Option')
            }
            else {
                setCurrentIndex((prev: any) => {
                    return prev + 1
                })
                setSelectedOption('')
            }

        }
        else {
            // Rendering Questions or Showing Score
            setShowScore(true)
        }
    }

    // Load Previous Question
    const updatePrevQuestion = () => {
        setCurrentIndex((prev: any) => {

            // At initial state disable next button
            if (currentIndex <= 0) {
                return prev = 0;
            }
            else {
                return prev - 1
            }
        })

    }

    // Selected Option
    const checkOptions = (item: any) => {
        setSelectedOption(item)
        console.log(item)
    }

    // Restart Quiz after completing all question
    const restartQuiz = () => {
        setCurrentIndex(0);
        setScore(0);
        setShowScore(false)
    }

    // Function to shuffle options
    const shuffleOptions = (options:any) => {
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
    }, [currentIndex,quiz]);
    
    return (
        <div className="quiz-main">
            {
                !showScore ? <div className="quiz-container">
                    <div style={{ width: "100%", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <div className="quiz-question">
                            <p className='question-text'>{quiz[currentIndex].question}</p>
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
                    {score}/{quiz.length}

                </div> : (<div className='score-box'>
                    <h2>Your Score is </h2>
                    <h2>{score}/{quiz.length}</h2>
                    <button className='quiz-button-restart' onClick={() => { restartQuiz() }}><p className='quiz-button-text'>Restart</p></button>
                </div>)
            }
        </div>
    )
}

export default Quiz