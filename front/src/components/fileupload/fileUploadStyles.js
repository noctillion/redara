import styled from "styled-components";

export const FileUploadContainer = styled.section`
  position: relative;
  margin: 25px 0 15px;
  border: 2px dotted lightgray;
  padding: 35px 20px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
`;

export const FormField = styled.input`
  font-size: 1rem;
  display: block;
  width: 100%;
  border: none;
  text-transform: none;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  &:focus {
    outline: none;
  }
`;

export const InputLabel = styled.label`
  top: -21px;
  font-size: 1rem;
  color: black;
  left: 0;
  position: absolute;
`;

export const DragDropText = styled.p`
  /* font-weight: bold; */
  font-size: 1rem;
  letter-spacing: 2.2px;
  margin-top: 0;
  margin-bottom: 20px;
  text-align: center;
`;

export const UploadFileBtn = styled.button`
  box-sizing: border-box;
  appearance: none;
  background-color: transparent;
  border: 1px solid black;
  cursor: pointer;
  font-size: 0.8rem;
  line-height: 1;
  padding: 1.1em 2.8em;
  text-align: center;
  text-transform: uppercase;
  /* font-weight: 700; */
  border-radius: 6px;
  /* color: #3498db; */
  color: green;
  position: relative;
  overflow: hidden;
  z-index: 1;
  transition: color 250ms ease-in-out;
  width: 20vw;
  display: flex;
  align-items: center;
  padding-right: 0;
  justify-content: center;
  &:after {
    content: "";
    position: absolute;
    display: block;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 100%;
    background: rgb(165, 170, 160);
    z-index: -1;
    transition: width 250ms ease-in-out;
  }
  i {
    font-size: 1rem;
    margin-right: 5px;
    border-right: 2px solid;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 20%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  @media only screen and (max-width: 500px) {
    width: 70%;
  }
  @media only screen and (max-width: 350px) {
    width: 100%;
  }
  &:hover {
    color: #fff;
    outline: 0;
    background: transparent;
    &:after {
      width: 110%;
    }
  }
  &:focus {
    outline: 0;
    background: transparent;
  }
  &:disabled {
    opacity: 0.4;
    filter: grayscale(100%);
    pointer-events: none;
  }
`;

export const FilePreviewContainer = styled.article`
  /*  border: 5px solid red; */
  margin-bottom: 35px;
  span {
    font-size: 1rem;
  }
`;

export const PreviewList = styled.section`
  display: flex;
  flex-direction: row;
  /* border: 5px solid blue; */
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  margin-top: 10px;
  @media only screen and (max-width: 400px) {
    flex-direction: column;
  }
`;

export const FileMetaData = styled.div`
  display: ${(props) => (props.isImageFile ? "none" : "flex")};
  //flex-direction: column;
  flex-wrap: wrap;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  border-radius: 6px;
  color: white;
  /* font-weight: bold; */
  background-color: rgba(5, 5, 5, 0.55);
  aside {
    margin-top: auto;
    display: flex;
    justify-content: space-between;
  }
`;

export const RemoveFileIcon = styled.i`
  cursor: pointer;
  &:hover {
    transform: scale(1.3);
  }
`;

export const PreviewContainer = styled.section`
  padding: 0.25rem;
  width: 100%;
  height: 50px;
  border-radius: 6px;
  box-sizing: border-box;
  /*   border: 6px solid violet; */
  &:hover {
    opacity: 0.55;
    ${FileMetaData} {
      display: flex;
    }
  }
  & > div:first-of-type {
    height: 100%;
    position: relative;
  }
  @media only screen and (max-width: 750px) {
    width: 100%;
  }
  @media only screen and (max-width: 500px) {
    width: 100%;
  }
  @media only screen and (max-width: 400px) {
    width: 100%;
    padding: 0 0 0.4em;
  }
`;

export const ImagePreview = styled.img`
  border-radius: 6px;
  width: 100%;
  height: 100%;
`;
