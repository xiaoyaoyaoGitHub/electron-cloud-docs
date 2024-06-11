import React, { useEffect, useState } from "react"
import useKeyPress from "../hooks/useKeyPress"
const FileList = ({ files = [], onSaveEdit, onFileDelete, onFileClick, selectFileId, }) => {

    const [editIndex, setEditIndex] = useState(null)
    const [editTitle, setEditTitle] = useState('')

    // 监听esc
    const keyPressedEsc = useKeyPress(27)
    const keyPressedEnter = useKeyPress(13)
    const onFileEdit = (file, index) => {
        setEditIndex(index)
        setEditTitle(file.title);

    }

    const closeSearch = () => {
        setEditIndex(null)
    }

    useEffect(() => {
        keyPressedEsc && closeSearch()
    }, [keyPressedEsc])

    useEffect(() => {
        if (keyPressedEnter) {
            const newFiles = files.concat();
            newFiles[editIndex] = {
                ...files[editIndex],
                title: editTitle
            }
            onSaveEdit(newFiles, newFiles[editIndex].id);
            closeSearch()

        }

    }, [keyPressedEnter])



    return <ul className="list-group list-group-flush ">
        {
            files.map((file, index) => <li key={index} onClick={() => onFileClick(file.id)} className={` ${selectFileId === file.id ? 'active' : ''} list-group-item  d-flex justify-content-between align-items-center`}>
                {
                    index !== editIndex ? <><span>
                        <i className="bi bi-markdown"></i> {file.title}
                    </span>
                        <span className="">
                            <i className="bi bi-pencil-square" onClick={(e) => {
                                e.stopPropagation()
                                onFileEdit(file, index)
                            }}></i>
                            <i className="bi bi-trash" onClick={(e) => {
                                e.stopPropagation()
                                onFileDelete(index)
                            }}></i>
                        </span></> :
                        <>
                            <div className="d-flex justify-content-between align-items-center">
                                <input type="text " onChange={(event) => { setEditTitle(event.target.value) }} className="form-control" value={editTitle} />
                                <button className="btn flex-shrink-0" type="button" onClick={() => closeSearch()} >
                                    <i className="bi bi-x-lg"></i>
                                </button>
                            </div>
                        </>
                }
            </li>)
        }


    </ul >
}

export default FileList