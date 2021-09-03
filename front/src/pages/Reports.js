import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as AiIcons from "react-icons/ai";

import { NameContext } from "../App";
import FileUpload from "../components/fileupload/FileUpload";

const ListSectionCont = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  background-color: rgb(232, 234, 238);
  font-size: 3rem;
  justify-content: center;
  align-items: center;
`;

const ListSection = styled.div`
  width: 90%;
  height: fit-content;
  border: 1px solid green;
  background-color: rgb(215, 235, 200);
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 20px;
  border-radius: 3px;

  @media (max-width: 768px) {
    flex-direction: column;
    //width: 100%;
  }
`;

const CardCont = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 20vw;
  min-width: fit-content;
  height: fit-content;
  border: 1px solid black;
  font-size: 1.2rem;
  margin-bottom: 10px;
  background-color: #e5ce9c;
  padding: 5px;
  padding-right: 20px;
  margin-right: 10px;
  border-radius: 3px;
  @media (max-width: 768px) {
    width: 100%;
    //flex-basis: 70%;
  }
`;

const CloseX = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  position: absolute;
  top: 0;
  right: 0;
  background-color: red;
  color: white;
  border-radius: 3px;
`;

const ListUpMenu = styled.div`
  display: flex;
  width: 100%;
  height: fit-content;
  background-color: rgb(165, 170, 160);
  flex-wrap: wrap;
  margin-bottom: 20px;
  border-radius: 3px;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 10px;
`;

const ListUpTitle = styled.div`
  width: 90%;
  font-size: 2rem;
  height: fit-content;
  margin-bottom: 20px;
  border-radius: 3px;
  margin-top: 8vh;
`;

const SmallAuth = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  padding-left: 10px;
  padding-right: 10px;
  height: 40px;
  background-color: #3a7359;
  border-radius: 20px;
  font-size: 1rem;
  cursor: pointer;
  border: 0.0625rem solid transparent;
  margin-left: 10px;
  margin-bottom: 10px;
  color: white;
  &:hover {
    background-color: #bd0d19;
  }
`;

const FileUpCont = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
`;

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

export const Reports = () => {
  return (
    <div className="reports">
      <h1>Reports</h1>
      <div>
        During section Lists it is required to select the lorem ips .lorem Ipsum
        During section Lists it is required to select the lorem ips .lorem
        Ipsum, During section Lists it is required to select the lorem ips
        .lorem Ipsum
      </div>
    </div>
  );
};

export const ReportsOne = () => {
  const [authors, setAuthors] = useState([]);
  const { initial } = useContext(NameContext);
  const [newData, setNewData] = useState([]);
  console.log(authors, "author");
  console.log(newData, "newdataa");

  const sumArr = (array) => {
    const red = array.map((object) => {
      const autor = object.autor;
      return autor;
    });
    var result = [
      red.reduce((acc, n) => {
        for (var prop in n) {
          if (acc.hasOwnProperty(prop)) acc[prop] += n[prop];
          else acc[prop] = n[prop];
        }
        return acc;
      }, {}),
    ];

    var resulta = Object.keys(result[0]).map(function (key) {
      const fg = {
        author: key,
        sum: result[0][key],
        id: key[0] + key[3],
        isChecked: true,
      };
      return fg;
    });

    return resulta;
  };

  useEffect(() => {
    let res = sumArr(initial);
    setAuthors(res);
    /* console.log(res, "res"); */
  }, [initial]);

  const [newUserInfo, setNewUserInfo] = useState({
    profileImages: [],
  });

  const updateUploadedFiles = (files) =>
    setNewUserInfo({ ...newUserInfo, profileImages: files });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("file", data.profileImages[0]);

    console.log(formData, "formd");
    const res = await fetch("http://localhost:5000/lists", {
      method: "POST",
      body: formData,
    }).then((res) => res.json());

    const response = res;
    setNewData(response);
    /*       const result = processRaw(response);
      console.log(result);
      setUploaded(result); */

    /*     var result = Object.keys(response).map(function (key) {
        return { gene: key, author: response[key] };
      }); */
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(newUserInfo);
    //logic to create new user...
  };

  /*  useEffect(() => {
    let resA = sumArr(newData);
    console.log(resA, "lplplplplp");
  }, [newData]); */

  return (
    <>
      <ListSectionCont>
        <ListUpTitle />
        <ListUpTitle>Redox-related lists</ListUpTitle>
        <ListSection>
          <ListUpMenu>
            <SmallAuth>Burrows_2012</SmallAuth>
            <SmallAuth>Marura_2012</SmallAuth>
            <SmallAuth>Mra_2012</SmallAuth>
          </ListUpMenu>
          {/*   <h1>Reports/reports1</h1> */}
          {authors.map((aut) => {
            return (
              <CardCont key={aut.id}>
                <div>
                  <span>List source: </span>
                  {aut.author}
                </div>
                <div>
                  <span>AGI Number: </span>
                  {aut.sum}
                </div>
                <div>
                  <span>Pubmed: </span>
                  Link
                </div>

                <CloseX to="#">
                  <AiIcons.AiOutlineClose />
                </CloseX>
              </CardCont>
            );
          })}
        </ListSection>
      </ListSectionCont>
      <ListSectionCont>
        <ListUpTitle>Lists upload</ListUpTitle>
        <ListSection>
          {newData.length > 0 ? (
            <>
              <ListUpMenu>
                <SmallAuth>Burrows_2012</SmallAuth>
                <SmallAuth>Marura_2012</SmallAuth>
                <SmallAuth>Mra_2012</SmallAuth>
              </ListUpMenu>
              {/*   <h1>Reports/reports1</h1> */}
              {newData.map((aut) => {
                return (
                  <CardCont key={aut.id}>
                    <div>
                      <span>List source: </span>
                      {aut.author}
                    </div>
                    <div>
                      <span>AGI Number: </span>
                      {aut.genes.length}
                    </div>
                    <div>
                      <span>Pubmed: </span>
                      Link
                    </div>

                    <CloseX to="#">
                      <AiIcons.AiOutlineClose />
                    </CloseX>
                  </CardCont>
                );
              })}
            </>
          ) : null}

          <FileUpCont>
            <div>
              <form>
                <FileUpload
                  accept=".csv"
                  label=""
                  /* multiple */
                  updateFilesCb={updateUploadedFiles}
                />
                {/* <button type="submit">Create New User</button> */}
                <MainButton onClick={handleSubmit}>Submit</MainButton>
              </form>
            </div>
          </FileUpCont>

          {/*          <ListUpMenu>
            <SmallAuth>Burrows_2012</SmallAuth>
            <SmallAuth>Marura_2012</SmallAuth>
            <SmallAuth>Mra_2012</SmallAuth>
          </ListUpMenu>
          {authors.map((aut) => {
            return (
              <CardCont key={aut.id}>
                <div>
                  <span>List source: </span>
                  {aut.author}
                </div>
                <div>
                  <span>AGI Number: </span>
                  {aut.sum}
                </div>
                <div>
                  <span>Pubmed: </span>
                  Link
                </div>

                <CloseX to="#">
                  <AiIcons.AiOutlineClose />
                </CloseX>
              </CardCont>
            );
          })} */}
        </ListSection>
      </ListSectionCont>
    </>
  );
};

export const ReportsTwo = () => {
  return (
    <div className="reports">
      <h1>Reports/reports2</h1>
    </div>
  );
};

export const ReportsThree = () => {
  return (
    <div className="reports">
      <h1>Reports/reports3</h1>
    </div>
  );
};
