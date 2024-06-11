import React, { useEffect, useState } from "react";
import "./TabList.scss"

const TabList = ({ files, onTabClick, selectFileId, onFileClose }) => {

    const [activeIndex, setActiveIndex] = useState(selectFileId)
    const tabClick = (e) => {
        console.log(e);
        e.preventDefault();
        setActiveIndex(+(e.target.dataset.index))
        onTabClick(e.target.dataset.id)
    }
    const close = (e) => {
        e.stopPropagation();
        onFileClose(e.target.dataset.id)
    }

    useEffect(() => {
        setActiveIndex(files.findIndex(file => file.id === selectFileId))
    }, [selectFileId, files])

    return <ul className="nav nav-pills tab-list-components">
        {
            files.map((file, index) => <li className='nav-item' key={index}>
                <a className={`nav-link ${activeIndex === index ? 'active' : ''}`} href="#" data-id={file.id} data-index={index} onClick={tabClick}>{file.title} <i data-id={file.id} onClick={close} className="bi bi-x-lg icon-close"></i></a>
            </li>)
        }
    </ul>
}

export default TabList