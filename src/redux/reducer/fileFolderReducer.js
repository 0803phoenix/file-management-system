import { ADD_FILES, ADD_FOLDERS, CHANGE_FOLDER, CREATE_FILE, CREATE_FOLDER, SET_FILE_DATA, SET_LOADING } from "../type/fileFolderActionTypes";

const initialState = {
    isLoading:true,
    currentFolder: "root",
    userFolders:[],
    userFiles: [],
    adminFolder: [],
    adminFiles: []
}

const fileFolderReducer = (state= initialState, action)=>{
    switch(action.type){
        case CREATE_FOLDER:
            return {
                ...state,
                userFolders: [ ...state.userFolders, action.payload],
            }
        case ADD_FOLDERS:
            return {
                ...state,
                userFolders:action.payload,
            }
        case SET_LOADING:
            return {
                ...state,
                isLoading:action.payload,
            }
        case CHANGE_FOLDER:
            return {
                ...state,
                currentFolder:action.payload,
            }
            case ADD_FILES:
                return {
                    ...state,
                    userFiles:action.payload,
                }
            case CREATE_FILE:
                return {
                    ...state,
                    userFiles:[...state.userFiles, action.payload]
                }
            case SET_FILE_DATA:
                const {fileId, data} = action.payload;
                const updatedUserFiles = state.userFiles.map((file) => {
                    if (file.docId === fileId) {
                      // Create a new object with the updated data property
                      return {
                        ...file,
                        data: {
                          ...file.data,
                          data: data,
                        },
                      };
                    }
                    return file;
                  });
                return {
                    ...state,
                    userFiles: updatedUserFiles,
                }
        default:return state;
    }
}

export default fileFolderReducer;