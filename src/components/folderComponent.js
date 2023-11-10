import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ShowItems from "./showItems";
function FolderComponent() {
  const { folderId } = useParams();
  const { currentFolderData, childFolders, childCreatedFiles, childUploadedFiles, childFiles } = useSelector(
    (state) => ({
      currentFolderData: state.fileFolders.userFolders.find(
        (folder) => folder.docId === folderId
      ),
      childFolders: state.fileFolders.userFolders.filter(
        (folder) => folder.data.parent === folderId
      ),
      childFiles: state.fileFolders.userFiles.filter(
        (file) => file.data.parent === folderId 
      ),
      childCreatedFiles: state.fileFolders.userFiles.filter(
        (file) => file.data.parent === folderId && file.data.url === null
      ),
      childUploadedFiles: state.fileFolders.userFiles.filter(
        (file) => file.data.parent === folderId && file.data.data === null
      )
    }),
    shallowEqual
  );
  return (
    <div>
      {childFolders.length > 0 || childCreatedFiles.length >0 ||childUploadedFiles.length>0 ? (
        <>
          {childFolders.length > 0 && (
            <ShowItems
              title={"Created Folder"}
              type={"folder"}
              items={childFolders}
            />
          )}
          {childCreatedFiles.length > 0 && (
            <ShowItems
              title={"Created Files"}
              type={"file"}
              items={childFiles.filter((file) => file.data.url === null)}
            />
          )}
          {childUploadedFiles.length > 0 && (
            <ShowItems
              title={"Uploaded Files"}
              type={"file"}
              items={childFiles.filter((file) => file.data.data === null)}
            />
          )}
        </>
      ) : (
        <h1 className="text-center my-5">Empty Folder</h1>
      )}
    </div>
  );
}

export default FolderComponent;
