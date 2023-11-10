import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import ShowItems from "./showItems";

function DashboardHome() {
  const { isLoading, userFolders, userFiles } = useSelector(
    (state) => ({
      isLoading: state.fileFolders.isLoading,
      userFolders: state.fileFolders.userFolders.filter(
        (folder) => folder.data.parent === "root"
      ),
      userFiles: state.fileFolders.userFiles.filter(
        (file) => file.data.parent === "root"
      ),
    }),
    shallowEqual
  );

  // const files = [
  //   { data: { name: "New File" } },
  //   { data: { name: "New File1" } },
  // ];

  return (
    <div className="col-m-12 w-100 mt-4">
      {isLoading ? (
        <h1 className="display-1 my-5 text-center">Loading...</h1>
      ) : (
        <>
          <ShowItems
            title={"Created Folder"}
            type={"folder"}
            items={userFolders}
          />
          <ShowItems
            title={"Created Files"}
            type={"file"}
            items={userFiles.filter((file) => file.data.url === null)}
          />
          <ShowItems
            title={"Uploaded Files"}
            type={"file"}
            items={userFiles.filter((file) => file.data.data === null)}
          />
        </>
      )}
    </div>
  );
}

export default DashboardHome;
