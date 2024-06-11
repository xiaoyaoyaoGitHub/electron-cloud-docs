import React, { useState, useEffect, useRef } from "react";
import useKeyPress from "../hooks/useKeyPress";
const FileSearch = ({ title = '', onFileSearch }) => {

    const [inputActive, setInputActive] = useState(false);
    const [value, setValue] = useState('');
    const inputRef = useRef(null);

    // 监听esc
    const keyPressedEsc = useKeyPress(27)
    const keyPressedEnter = useKeyPress(13)

    useEffect(() => {
        if (keyPressedEsc && inputActive) closeSearch()
    }, [keyPressedEsc])

    useEffect(() => {
        if (keyPressedEnter && inputActive) onFileSearch(value)
    }, [keyPressedEnter])

    const closeSearch = () => {
        setInputActive(false);
        setValue('');
    }

    useEffect(() => {
        inputActive && inputRef.current.focus();
    }, [inputActive])





    return (
        <div className="file-search alert alert-primary m-0" >
            {
                !inputActive && <div className="d-flex justify-content-between align-items-center">
                    <span>
                        {title}
                    </span>

                    <button className="btn " type="button" onClick={() => setInputActive(true)}>
                        <i className="bi bi-search"></i> 搜索
                    </button>
                </div>
            }
            {
                inputActive && <div className="d-flex justify-content-between align-items-center">
                    <input ref={inputRef} onChange={(e) => {

                        setValue(e.target.value)
                    }} type="text " className="form-control" value={value} />
                    <button className="btn flex-shrink-0" type="button" onClick={(e) => closeSearch(e)}>
                        <i className="bi bi-x-lg"></i>
                    </button>
                </div>
            }
        </div>
    )
}

export default FileSearch