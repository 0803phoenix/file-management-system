import { faArrowLeft, faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router'
import { updateFileData } from '../../redux/actions/fileFolderActionCreator';

function Header({fileName, fileData, prevFileData, fileId}) {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className='navbar navbar-expand-lg  navbar-light bg-white shadow-sm'>
      <p className='navbar-brand fw-bold ms-3 d-flex align-item-center mb-0'>{fileName}</p>
      {
        fileData !== prevFileData && <h6 className='my-0 fw-bold ms-5 text-danger'>*[Modified]*</h6>
      }
        
      <div className="navbar-nav ms-auto custom-flex">
        <div className="button-container d-flex align-items-center">
          <button className="btn btn-sm btn-success" disabled={fileData === prevFileData} onClick={()=>{
            dispatch(updateFileData(fileId, fileData))
          }}>
            <FontAwesomeIcon icon={faFloppyDisk}/>&nbsp;
             Save file
          </button>
          <button className="btn btn-sm btn-dark" onClick={()=> navigate(-1)}>
            <FontAwesomeIcon icon={faArrowLeft}/>&nbsp;
            Go back
          </button>
        </div>
      </div>
    </div>
  )
}

export default Header