import './App.scss';

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.min.css"
import FileSearch from './components/FileSearch';
import FileList from './components/FileList';
import TabList from './components/TabList';
import MDEditor from './components/MDEditor';

import originFiles from "./defaultFiles"

import { flattenArr, objToArr } from "./utils/flatten"
import { useState } from 'react';
function App() {

  // 总的文件列表
  const [files, setFiles] = useState(flattenArr(originFiles));

  // 编辑选中的文件
  const [selectFileId, setSelectFileId] = useState("");
  // 编辑的文件id集合
  const [activeFiles, setActiveFiles] = useState([]);
  const onFileSearch = (value) => {
    console.log('onFileSearch', value)
  }

  // tab 点击关闭
  const onFileClose = (id) => {

    const closeIdx = activeFiles.findIndex(file => file.id === id)
    if (closeIdx === -1) return

    if (id === selectFileId) {
      setSelectFileId(activeFiles[closeIdx - 1] ? activeFiles[closeIdx - 1].id : (activeFiles[closeIdx - 0 + 1] ? activeFiles[closeIdx - 0 + 1].id : ''))
    }
    console.log(selectFileId, 'selectFileId');
    const cloneActiveFiles = activeFiles.concat();
    cloneActiveFiles.splice(closeIdx, 1)
    setActiveFiles(cloneActiveFiles);
  }

  const onFileClick = (id) => {
    if (activeFiles.findIndex(file => file.id === id) === -1) {
      setActiveFiles([...activeFiles, files[id]])
    }
    setSelectFileId(id)
  }
  const onFileDelete = (id) => {
    const newFiles = Object.assign({}, files);
    onFileClose(id)
    // newFiles.splice(index, 1)
    delete newFiles[id]
    setFiles(newFiles)
  }

  const onSaveEdit = (files, id) => {
    console.log(files);
    setFiles(files);
    // 更新活跃文件标题
    const newActiveFiles = activeFiles.concat();
    const changeFileIndex = newActiveFiles.findIndex(file => file.id === id);
    if (changeFileIndex < 0) return;
    newActiveFiles[changeFileIndex] = files[id]
    setActiveFiles(newActiveFiles)

  }

  const addFile = () => {
    const newFiles = Object.assign({}, files);
    newFiles[((new Date()).getTime()).toString()] = {
      id: ((new Date()).getTime()).toString(),
      title: '未命名',
      content: `
        
        `
    }
    setFiles(newFiles)
    // setFiles([...files, {
    //   id: ((new Date()).getTime()).toString(),
    //   title: '未命名',
    //   content: `

    //         `
    // }])
  }

  return (
    <div className="App container-fluid" >
      <div className="row" style={{ height: "100vh" }}>
        <div className="col-md-3 left-panel h-100 d-flex flex-column border-end p-0 bg-light-subtle">
          <FileSearch className="" title='我的云文档' onFileSearch={(value) => onFileSearch(value)} />
          <div className="flex-grow-1">
            <FileList selectFileId={selectFileId} files={files} onFileClick={onFileClick} onFileDelete={onFileDelete} onSaveEdit={onSaveEdit} />
          </div>
          {/* 底部按钮 新增 导入 */}
          <div className="row container m-0 p-0">
            <button onClick={addFile} className="btn btn-primary col" type="button" style={{ '--bs-btn-border-radius': 0 }}>
              <i className="bi bi-plus-square-fill"></i> 新增
            </button>
            <button className="btn btn-success col" type="button" style={{ '--bs-btn-border-radius': 0 }}>
              <i className="bi bi-arrow-bar-up"></i> 导入
            </button>
          </div>
        </div>
        <div className="col-md-9 right-panel h-100 p-0 overflow-y-auto">
          {
            selectFileId !== '' ? <>
              <TabList files={activeFiles} selectFileId={selectFileId} onFileClose={onFileClose} onTabClick={(id) => { setSelectFileId(id) }} />
              <MDEditor onChangeMarkDown={() => { }} value={activeFiles.find(item => item.id === selectFileId)?.content || ''} /></> :
              <>
                <div className='d-flex justify-content-center align-items-center ' style={{ height: '100%' }}>
                  <span className="text-center fs-1 text-black-50 text-opacity-25 " >请选择或者新建MarkDown文档</span>
                </div>
              </>
          }

        </div>
      </div>
    </div >
  );
}

export default App;
