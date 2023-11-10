import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { uploadFile } from "../redux/actions/fileFolderActionCreator";
import { toast } from "react-toastify";
// import { createFile } from "../redux/actions/fileFolderActionCreator";
// import { createFolder } from "../redux/actions/fileFolderActionCreator";

function UploadFile({setIsFileUploadModal}) {
    const [file, setFile] = useState(null);
    const [success, setSuccess] = useState(false);
    const {userFiles, user, currentFolder, currentFolderData} = useSelector((state)=>({ 
        userFiles : state.fileFolders.userFiles,
        user: state.auth.user,
        currentFolder:state.fileFolders.currentFolder,
        currentFolderData: state.fileFolders.userFolders.find(
          (folder) => folder.docId === state.fileFolders.currentFolder
        ),
    }), shallowEqual);

    const dispatch = useDispatch();

    useEffect(()=>{
        if(success){
            setFile("")
            setSuccess(false);
            setIsFileUploadModal(false);
        }
    },[success])

    const checkFileAlreadyPresent = (name)=>{
        const filePresent = userFiles
        .filter(file=> file.data.parent === currentFolder)
        .find((folder)=> folder.data.name === name);
        if(filePresent){
            return true;
        }else{
            return false;
        }
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(file){
            console.log(file);
                if(!checkFileAlreadyPresent(file.name)){
                    const data = {
                        createdAt: new Date(),
                        name: file.name,
                        userId:user.uid,
                        createdBy:user.displayName,
                        path: currentFolder === "root"? []: [...currentFolderData.data.path, currentFolder],
                        parent:currentFolder,
                        lastAccessed: null,
                        updatedAt: new Date(),
                        extension: file.name.split(".")[1],
                        data:null,
                        url:"",
                    }
                    dispatch(uploadFile(file, data, setSuccess));
                    // toast.success("File uploaded as "+file.name);
                    setIsFileUploadModal(false);
                    console.log(data);
                }else{
                    toast.error("File with this name is already Present");
                }
 
        }else{
            toast.error("Field Can't be empty");
        }
        
    }
  return (
    <div
      className="col-md-12  position-fixed top-8 left-0 w-100 h-100"
      style={{ background: "rgba(0, 0, 0, 0.4)", zIndex:9999 }}
    >
      <div className="row align-items-center justify-content-center">
        <div className="col-md-5 mt-4 bg-white rounded p-4">
          <div className="d-flex justify-content-between">
            <h4>Upload File</h4>
            <button className="btn" onClick={()=>setIsFileUploadModal(false)}>
              <FontAwesomeIcon
                icon={faTimes}
                className="text-black"
                size="sm"
              />
            </button>
          </div>
          <hr />
          <div className="d-flex flex-column align-item-center">
            <form className="mt-3 w-100" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="file"
                  className="form-control"
                  id="file"
                  placeholder=""

                  onChange={(e)=>setFile(e.target.files[0])}
                />
              </div>
              <button type="submit" className="btn btn-primary mt-5 form-control">
                Upload File
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadFile;
