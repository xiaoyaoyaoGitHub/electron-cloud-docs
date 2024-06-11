import React, { useEffect, useState } from "react"
import useKeyPress from "../hooks/useKeyPress"
import { objToArr } from "../utils/flatten"
const FileList = ({ files = {}, onSaveEdit, onFileDelete, onFileClick, selectFileId, }) => {

    const [editId, setEditId] = useState(null)
    const [editTitle, setEditTitle] = useState('')

    // 监听esc
    const keyPressedEsc = useKeyPress(27)
    const keyPressedEnter = useKeyPress(13)
    const onFileEdit = (file, index) => {
        setEditId(file.id)
        setEditTitle(file.title);

    }

    const closeSearch = () => {
        setEditId(null)
    }

    useEffect(() => {
        keyPressedEsc && closeSearch()
    }, [keyPressedEsc])

    useEffect(() => {
        if (keyPressedEnter) {
            console.log(files);
            const newFiles = Object.assign({}, files);
            newFiles[editId] = {
                ...files[editId],
                title: editTitle
            }
            onSaveEdit(newFiles, editId);
            closeSearch()

        }

    }, [keyPressedEnter])



    return <ul className="list-group list-group-flush ">
        {
            objToArr(files).map((file, index) => <li key={index} onClick={() => onFileClick(file.id)} className={` ${selectFileId === file.id ? 'active' : ''} list-group-item  d-flex justify-content-between align-items-center`}>
                {
                    file.id !== editId ? <><span>
                        <i className="bi bi-markdown"></i> {file.title}
                    </span>
                        <span className="">
                            <i className="bi bi-pencil-square" onClick={(e) => {
                                e.stopPropagation()
                                onFileEdit(file, index)
                            }}></i>
                            <i className="bi bi-trash" onClick={(e) => {
                                e.stopPropagation()
                                onFileDelete(file.id)
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