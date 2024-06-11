import React, { useState, useEffect } from "react";


const useKeyPress = (targetKey) => {
    const [keyPressed, setKeyPressed] = useState(false);
    const handleKeyDown = ({ keyCode }) => {
        if (keyCode === targetKey) {
            setKeyPressed(true)
        }
    }

    const handleKeyup = ({ keyCode }) => {
        if (keyCode === targetKey) {
            setKeyPressed(false)
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyup);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyup)
        }
    }, [])

    return keyPressed
}

export default useKeyPress