import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileUpload,
  faFileCirclePlus,
  faFolderPlus,
} from "@fortawesome/free-solid-svg-icons";
import "./subnav.css";
import { Link, useNavigate } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { changeFolder } from "../redux/actions/fileFolderActionCreator";

function Subnav({ setIsCreateFileModal, setIsCreateFolderModal, setIsFileUploadModal }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentFolder, currentFolderData, userFolders } = useSelector(
    (state) => ({
      currentFolder: state.fileFolders.currentFolder,
      currentFolderData: state.fileFolders.userFolders.find(
        (folder) => folder.docId === state.fileFolders.currentFolder
      ),
      userFolders: state.fileFolders.userFolders,
    }),
    shallowEqual
  );
  const handleCreateFolder = () => {
    setIsCreateFolderModal(true);
    console.log("Button clicked");
  };
  const handleCreateFile = ()=>{
    setIsCreateFileModal(true);
  }
  const handleFileUpload = ()=>{
    setIsFileUploadModal(true);
  }

  const handleNavigate = (link, id) => {
    navigate(link);
    dispatch(changeFolder(id));
  };
  console.log(currentFolderData);

  return (
    <nav className="navbar navbar-expend-lg navbar-light bg-white px-4">
      <nav classnName="ms-5" aria-label="breadcrumb">
        <ol class="breadcrumb d-flex align-items-center mb-0">
          {currentFolder !== "root" ? (
            <>
              <button
                onClick={() => handleNavigate("/dashboard", "root")}
                className="breadcrumb-item btn btn-link text-decoration-none p-0"
              >
                Root
              </button>
              {currentFolderData?.data.path.map((folder, index) => (
                <button
                  key={index}
                  className="breadcrumb-item btn btn-link text-decoration-none p-0"
                  onClick={() =>
                    handleNavigate(
                      `/dashboard/folder/${
                        userFolders.find((fldr) => folder === fldr.docId).docId
                      }`,
                      userFolders.find((fldr) => folder === fldr.docId).docId
                    )
                  }
                >
                  {userFolders.find((fldr) => folder === fldr.docId).data.name}
                </button>
              ))}
              <li className="breadcrumb-item active">
                {currentFolderData?.data.name}
              </li>
            </>
          ) : (
              <li class="breadcrumb-item active">Root</li>
          )}
        </ol>
      </nav>
      <div className="navbar-nav ms-auto custom-flex">
        <div className="button-container d-flex align-items-center">
          <button className="btn btn-sm btn-outline-dark" onClick={handleFileUpload}>
            <FontAwesomeIcon icon={faFileUpload} />
            &nbsp; Upload file
          </button>
          <button className="btn btn-sm btn-outline-dark"
              onClick={handleCreateFile}>
            <FontAwesomeIcon icon={faFileCirclePlus} />
            &nbsp; Create file
          </button>
          <button
            className="btn btn-sm btn-outline-dark"
            onClick={handleCreateFolder}
          >
            <FontAwesomeIcon icon={faFolderPlus} />
            &nbsp; Create folder
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Subnav;
