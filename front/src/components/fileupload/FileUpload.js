import React, { useContext, useRef, useState } from "react";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import styled from "styled-components";
import { NameContext } from "../../App";
//import usePrevious from "../../hooks/usePrevious";
import {
  FileUploadContainer,
  FormField,
  DragDropText,
  UploadFileBtn,
  FilePreviewContainer,
  ImagePreview,
  PreviewContainer,
  PreviewList,
  FileMetaData,
  RemoveFileIcon,
  InputLabel,
} from "./fileUploadStyles";

const KILO_BYTES_PER_BYTE = 1000;
const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 500000;

const convertNestedObjectToArray = (nestedObj) =>
  Object.keys(nestedObj).map((key) => nestedObj[key]);

const convertBytesToKB = (bytes) => Math.round(bytes / KILO_BYTES_PER_BYTE);

const MainButton = styled.span`
  /*   margin-top: 1vh; */
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background-color: #ff0d1d;
  border: 0.0625rem solid transparent;
  border-radius: 0.25rem;
  color: #fff;
  cursor: pointer;
  font-family: sans-serif;
  font-size: 1.2rem;
  font-weight: 500;
  min-height: 3rem;
  text-decoration-line: none;
  /* width: 10em; */
  text-align: center;
  &:hover {
    background-color: #bd0d19;
  }
`;

const FileUpload = ({
  label,
  updateFilesCb,
  funct,
  show,
  maxFileSizeInBytes = DEFAULT_MAX_FILE_SIZE_IN_BYTES,
  ...otherProps
}) => {
  const fileInputField = useRef(null);
  const [files, setFiles] = useState({});
  const { clicked, setDataToProviderClicked } = useContext(NameContext);
  const handleUploadBtnClick = () => {
    fileInputField.current.click();
    setDataToProviderClicked(false);
  };

  //const prevCount = usePrevious(menu);

  //console.log(prevCount, "quee");

  const addNewFiles = (newFiles) => {
    for (let file of newFiles) {
      if (file.size <= maxFileSizeInBytes) {
        if (!otherProps.multiple) {
          return { file };
        }
        files[file.name] = file;
      }
    }
    return { ...files };
  };

  const callUpdateFilesCb = (files) => {
    const filesAsArray = convertNestedObjectToArray(files);
    updateFilesCb(filesAsArray);
  };

  const handleNewFileUpload = (e) => {
    const { files: newFiles } = e.target;
    if (newFiles.length) {
      let updatedFiles = addNewFiles(newFiles);
      setFiles(updatedFiles);
      callUpdateFilesCb(updatedFiles);
    }
  };

  const removeFile = (fileName) => {
    delete files[fileName];
    setFiles({ ...files });
    callUpdateFilesCb({ ...files });
  };

  return (
    <>
      <FileUploadContainer>
        <InputLabel>{label}</InputLabel>
        <DragDropText>Choose a file or drag it here</DragDropText>
        <UploadFileBtn type="button" onClick={handleUploadBtnClick}>
          <i
            className="fas"
            style={{
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <AiIcons.AiOutlineUpload />
          </i>

          <span> Upload {otherProps.multiple ? "files" : "a file"}</span>
        </UploadFileBtn>
        <FormField
          type="file"
          ref={fileInputField}
          onChange={handleNewFileUpload}
          title=""
          value=""
          {...otherProps}
        />
      </FileUploadContainer>

      {Object.keys(files).length === 0 || clicked === true ? null : (
        <>
          <FilePreviewContainer>
            <span
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              To Upload
            </span>
            <PreviewList>
              {Object.keys(files).map((fileName, index) => {
                let file = files[fileName];
                let isImageFile = file.type.split("/")[0] === "image";

                return (
                  <PreviewContainer key={fileName}>
                    <div>
                      {isImageFile && (
                        <ImagePreview
                          src={URL.createObjectURL(file)}
                          alt={`file preview ${index}`}
                        />
                      )}
                      <FileMetaData isImageFile={isImageFile}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            fontSize: "2rem",
                          }}
                        >
                          <span
                            style={{
                              display: "flex",
                              width: "fit-content",
                              height: "fit-content",
                              alignItems: "center",
                              justifyContent: "center",
                              /*  border: "1px solid red", */
                            }}
                          >
                            {file.name}
                          </span>
                          <aside>
                            <span
                              style={{
                                display: "flex",
                                height: "30px",
                                width: "fit-content",
                                alignItems: "center",
                                justifyContent: "center",
                                /*  border: "1px solid red", */
                                paddingLeft: "10px",
                              }}
                            >
                              {convertBytesToKB(file.size)} kb
                            </span>

                            <RemoveFileIcon
                              onClick={() => removeFile(fileName)}
                            >
                              <IoIcons.IoMdTrash
                                style={{
                                  height: "30px",
                                  /*  border: "3px solid green", */
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              />
                            </RemoveFileIcon>
                          </aside>
                        </div>
                      </FileMetaData>
                    </div>
                  </PreviewContainer>
                );
              })}
            </PreviewList>
          </FilePreviewContainer>
          <MainButton onClick={funct}>Submit</MainButton>
        </>
      )}
    </>
  );
};

export default FileUpload;
