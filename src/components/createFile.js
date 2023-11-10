import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { createFile } from "../redux/actions/fileFolderActionCreator";
import { toast } from "react-toastify";
// import { createFolder } from "../redux/actions/fileFolderActionCreator";

function CreateFile({setIsCreateFileModal}) {
    const [fileName, setFileName] = useState("");
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
            setFileName("")
            setSuccess(false);
            setIsCreateFileModal(false);
        }
    },[success])

    const checkFileAlreadyPresent = (name, ext)=>{
        if(!ext){
            name = name+".txt";
        }
        const filePresent = userFiles
        .filter(file=> file.data.parent === currentFolder)
        .find((folder)=> folder.data.name === name);
        if(filePresent){
            return true;
        }else{
            return false;
        }
    }
    const handleCreateFileName = (e)=>{
        setFileName(e.target.value);     
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(fileName){
            if(fileName.length>3){
                // check File extension
                let extension = false;
                if(fileName.split(".").length>1){
                    extension = true;
                }
                if(!checkFileAlreadyPresent(fileName, extension)){
                    const data = {
                        createdAt: new Date(),
                        name: extension ? fileName:`${fileName}.txt`,
                        userId:user.uid,
                        createdBy:user.displayName,
                        path: currentFolder === "root"? []: [...currentFolderData.data.path, currentFolder],
                        parent:currentFolder,
                        lastAccessed: null,
                        updatedAt: new Date(),
                        extension: extension? fileName.split(".")[1]:"txt",
                        data:"",
                        url:null,
                    }
                    dispatch(createFile(data, setSuccess));
                    toast.success("File created as "+fileName);
                    setIsCreateFileModal(false);
                    console.log(data);
                }else{
                    toast.error("File with this name is already Present");
                }
            }
            else{
                toast.error("File name can not be less than 3 characters")
            }
        }else{
            toast.error("File name can't be empty");
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
            <h4>Create File</h4>
            <button className="btn" onClick={()=>setIsCreateFileModal(false)}>
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
                  type="text"
                  className="form-control"
                  id="fileName"
                  placeholder="File Name e,g. file.txt, index.html etc."
                  value={fileName}
                  onChange={handleCreateFileName}
                />
              </div>
              <button type="submit" className="btn btn-primary mt-5 form-control">
                Create File
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateFile;
