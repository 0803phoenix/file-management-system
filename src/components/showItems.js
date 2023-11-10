import { faFileAlt, faFolder } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { changeFolder } from "../redux/actions/fileFolderActionCreator";

function ShowItems({ title, items, type }) {
  console.log(items);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDoubleClick = (itemId)=>{
    if(type === "folder"){
      dispatch(changeFolder(itemId));
      navigate(`/dashboard/folder/${itemId}`)
    }else{
      navigate(`/dashboard/file/${itemId}`)
    }
  }
  return (
    <div className="w-100">
      <h5 className="text-center border-bottom py-2">{title}</h5>
      <div className="row gap-2 p-4 flex-wrap">
        {items?.map((item, index) => {
          return (
            <p
              className="col-md-2 border py-3 text-center d-flex flex-column"
              key={index}
              onDoubleClick={() => handleDoubleClick(item.docId)}
            >
              {type === "folder" ? (
                <FontAwesomeIcon icon={faFolder} size="3x" className="mb-3" />
              ) : (
                <FontAwesomeIcon icon={faFileAlt} size="3x" className="mb-3" />
              )}
              {item.data.name}
            </p>
          );
        })}
      </div>
    </div>
  );
}

export default ShowItems;
