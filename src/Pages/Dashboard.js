import React, { useEffect } from "react";
import Navbar from "../components/navbar";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router";
import Subnav from "../components/subnav";
import ShowItems from "../components/showItems";
import CreateFolder from "../components/createFolder";
import { useState } from "react";
import {
  getAllFiles,
  getAllFolders,
} from "../redux/actions/fileFolderActionCreator";
import FolderComponent from "../components/folderComponent";
import DashboardHome from "../components/dashboardHome";
import CreateFile from "../components/createFile";
import FileComponent from "../components/fileComponent/fileComponent.js";
import UploadFile from "../components/uploadFile";

function Dashboard() {
  const { isLoggedIn, isLoading, user, userFolders } = useSelector(
    (state) => ({
      isLoggedIn: state.auth.isAuthenticated,
      isLoading: state.fileFolders.isLoading,
      user: state.auth.user,
      userFolders: state.fileFolders.userFolders,
    }),
    shallowEqual
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [isCreateFolderModal, setIsCreateFolderModal] = useState(false);
  const [isCreateFileModal, setIsCreateFileModal] = useState(false);
  const [isFileUploadModal, setIsFileUploadModal] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }

    if (isLoggedIn && isLoading) {
      dispatch(getAllFolders(user.uid));
      dispatch(getAllFiles(user.uid));
    }
  }, []);

  const isFileOpen = location.pathname.includes("/dashboard/file");

  return (
    <>
      {isCreateFolderModal && (
        <CreateFolder setIsCreateFolderModal={setIsCreateFolderModal} />
      )}
      {isCreateFileModal && (
        <CreateFile setIsCreateFileModal={setIsCreateFileModal} />
      )}
      {
        isFileUploadModal && (
          <UploadFile setIsFileUploadModal={setIsFileUploadModal}/>
        )
      }
      <Navbar />
      {!isFileOpen ? (
        <>
          <Subnav
            setIsCreateFileModal={setIsCreateFileModal}
            setIsCreateFolderModal={setIsCreateFolderModal}
            setIsFileUploadModal = {setIsFileUploadModal}
          />
        </>
      ) : (
        ""
      )}

      <Routes>
        <Route path="" element={<DashboardHome />} />
        <Route path="/folder/:folderId" element={<FolderComponent />} />
        <Route path="/file/:fileId" element={<FileComponent />} />
      </Routes>
    </>
  );
}

export default Dashboard;
