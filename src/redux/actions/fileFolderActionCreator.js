import {
  ADD_FILES,
  ADD_FOLDERS,
  CHANGE_FOLDER,
  CREATE_FILE,
  CREATE_FOLDER,
  SET_FILE_DATA,
  SET_LOADING,
} from "../type/fileFolderActionTypes";
import fire from "../../config/firebase";
import { toast } from "react-toastify";
const addFolder = (payload) => {
  return {
    type: CREATE_FOLDER,
    payload,
  };
};
const addFolders = (payload) => {
  return {
    type: ADD_FOLDERS,
    payload,
  };
};

const setLoading = (payload) => {
  return {
    type: SET_LOADING,
    payload,
  };
};

const setChangeFolder = (payload) => {
  return {
    type: CHANGE_FOLDER,
    payload,
  };
};
const addFiles = (payload) => {
  return {
    type: ADD_FILES,
    payload,
  };
};

const addFile = (payload) => {
  return {
    type: CREATE_FILE,
    payload,
  };
};

const setFileData = (payload) => {
  return {
    type: SET_FILE_DATA,
    payload,
  };
};

export const createFolder = (payload) => (dispatch) => {
  console.log(payload);
  fire
    .firestore()
    .collection("folders")
    .add(payload)
    .then(async (folder) => {
      const folderData = await (await folder.get()).data();
      console.log(folder.id);
      const folderId = folder.id;
      dispatch(addFolder({ data: folderData, docId: folderId }));
    });
};

export const getAllFolders = (userId) => (dispatch) => {
  dispatch(setLoading(true));
  fire
    .firestore()
    .collection("folders")
    .where("userId", "==", userId)
    .get()
    .then(async (folders) => {
      const allfolders = await folders.docs.map((folder) => ({
        data: folder.data(),
        docId: folder.id,
      }));
      dispatch(addFolders(allfolders));
      dispatch(setLoading(false));
    });
};

export const changeFolder = (folderId) => (dispatch) => {
  dispatch(setChangeFolder(folderId));
};

export const getAllFiles = (userId) => (dispatch) => {
  fire
    .firestore()
    .collection("files")
    .where("userId", "==", userId)
    .get()
    .then(async (files) => {
      const allFiles = await files.docs.map((file) => ({
        data: file.data(),
        docId: file.id,
      }));
      dispatch(addFiles(allFiles));
    });
};

export const createFile = (payload, setSuccess) => (dispatch) => {
  console.log(payload);
  fire
    .firestore()
    .collection("files")
    .add(payload)
    .then(async (file) => {
      const fileData = await (await file.get()).data();
      console.log(file.id);
      const fileId = file.id;
      // alert("File Created Successfully");
      dispatch(addFile({ data: fileData, docId: fileId }));
      setSuccess(true);
    })
    .catch((error) => setSuccess(false));
};

export const updateFileData = (fileId, data) => (dispatch) => {
  console.log("Updating file data with fileId:", fileId, "and data:", data);

  fire
    .firestore()
    .collection("files")
    .doc(fileId)
    .update({data})
    .then(() => {
      dispatch(setFileData({ fileId, data }));
      toast.success("File Saved successfully");
    })
    .catch((error) => {
      console.log(error);
      toast.error("Something went wrong");
    });
};

export const uploadFile = (file, data, setSuccess)=>(dispatch)=>{
  console.log(data);
  const uploadFileRef = fire.storage().ref(`files/${data.userId}/${data.name}`);

  uploadFileRef.put(file).on("state_changed", (snapshot)=>{
    const progress = Math.round(
      (snapshot.bytesTransferred / snapshot.totalBytes)*100
    );
    console.log("uploading this "+progress+"%");
  },
  (error)=>{
    console.log(error);
  },
  async ()=>{
    const fileURL = await uploadFileRef.getDownloadURL();
    const fullData  = {...data, url:fileURL}

    fire.firestore().collection('files').add(fullData).then(async (file)=>{
      const fileData = await (await file.get()).data();
      const fileId = file.id;
      dispatch(addFile({data:fileData, docId:fileId}));
      console.log(fileData);
      toast.success("File uploaded successfully");
      setSuccess(true);
    })
    .catch(error=>{
      setSuccess(false);
    })
  })
}
