import React, { useState } from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import ShareIcon from "@mui/icons-material/Share";
import VideocamIcon from "@mui/icons-material/Videocam";
import CommentIcon from "@mui/icons-material/Comment";
import ReactPlayer from "react-player";
import ImageIcon from "@mui/icons-material/Image";
import { connect } from "react-redux";
import {serverTimestamp } from "firebase/firestore"; 
import { getArticlesApi, postArticleApi } from "../actions";
const PostModal = ({ handleClick, showModal, user,postArticleApi,getArticlesApi }) => {
  const [editorText, setEditorText] = useState("");
  const [shareImage, setShareImage] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [assetArea, setAssetArea] = useState("");
  function reset(e) {
    setEditorText("");
    setShareImage("");
    setVideoLink("");
    setAssetArea("");
    handleClick(e);
  }
  function handleChange(e) {
    const image = e.target.files[0];
    if (image === "" || image === undefined) {
      alert(`not an image , the file is a ${typeof image}`);
      return;
    }
    setShareImage(image);
  }
  function switchAssetArea(area) {
    setShareImage("");
    setVideoLink("");
    setAssetArea(area);
  }
  function postArticle(e) {
    e.preventDefault();
    if (e.target != e.currentTarget) return;
    const payload = {
        image:shareImage,
        video:videoLink,
        user:user,
        description:editorText,
        timeStamp:serverTimestamp()
    };
    postArticleApi(payload)
    reset(e)
  }
  return (
    <>
      {showModal == "open" && (
        <Container>
          <Content>
            <Header>
              <h2>Create a post</h2>
              <button onClick={(e) => reset(e)}>
                <CloseIcon color="error" />
              </button>
            </Header>
            <SharedContent>
              <UserInfo>
                {user.photoURL ? (
                  <img src={user?.photoURL} alt="" />
                ) : (
                  <img src="/images/user.svg" alt="" />
                )}
                <span>{user?.displayName}</span>
              </UserInfo>
              <Editor>
                <textarea
                  placeholder="What do you want to talk about ?"
                  autoFocus
                  value={editorText}
                  onChange={(e) => setEditorText(e.target.value)}
                ></textarea>
                {assetArea === "image" ? (
                  <UploadImage>
                    <input
                      type="file"
                      accept="image/gif, image/jpeg, image/png "
                      name="image"
                      id="file"
                      style={{ display: "none" }}
                      onChange={handleChange}
                    />
                    <p>
                      <label htmlFor="file">Select an image to shared</label>
                    </p>
                    {shareImage && (
                      <img src={URL.createObjectURL(shareImage)} />
                    )}
                  </UploadImage>
                ) : (
                  assetArea === "media" && (
                    <>
                      <input
                        type="text"
                        placeholder="Please enter a video link"
                        value={videoLink}
                        onChange={(e) => setVideoLink(e.target.value)}
                      />
                      {videoLink && (
                        <ReactPlayer width={"100%"} url={videoLink} />
                      )}
                    </>
                  )
                )}
              </Editor>
            </SharedContent>
            <ShareCreation>
              <AttachAssets>
                <AssetButton onClick={() => switchAssetArea("image")}>
                  <ImageIcon />
                </AssetButton>
                <AssetButton onClick={() => switchAssetArea("media")}>
                  <VideocamIcon />
                </AssetButton>
              </AttachAssets>
              <ShareComment>
                <AssetButton>
                  <CommentIcon />
                  Anyone
                </AssetButton>
              </ShareComment>
              <PostButton onClick={(e)=>postArticle(e)} disabled={!editorText}>Post</PostButton>
            </ShareCreation>
          </Content>
        </Container>
      )}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getArticlesApi: () => dispatch(getArticlesApi()),
    postArticleApi:(payload)=>dispatch(postArticleApi(payload))
  };
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  color: #000;
  background-color: rgba(0, 0, 0, 0.8);
  animation: fadeIn 0.3s;
`;
const Content = styled.div`
  width: 100%;
  max-width: 552px;
  background-color: #fff;
  max-height: 90%;
  overflow: initial;
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  top: 32px;
  margin: 0 auto;
`;
const Header = styled.div`
  display: block;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  font-size: 16px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 400;
  justify-content: space-between;
  display: flex;
  button {
    height: 40px;
    width: 40px;
    min-width: auto;
    color: rgba(0, 0, 0, 0.15);
    svg {
      pointer-events: none;
    }
  }
`;
const SharedContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  vertical-align: baseline;
  background: transparent;
  padding: 8px 12px;
`;
const ShareCreation = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 24px 12px 16px;
`;
const UserInfo = styled.div`
  display: flex;
  justify-content: start;
  padding: 12px 24px;
  align-items: center;
  svg,
  img {
    width: 40px !important;
    height: 40px !important;
    background-clip: content-box !important;
    border: 2px solid transparent !important;
    border-radius: 50% !important;
  }
  span {
    font-weight: 600;
    font-size: 16px;
    line-height: 1.5;
    margin-left: 5px;
  }
`;
const AssetButton = styled.button`
  display: flex;
  align-items: center;
  height: 40px;
  min-width: auto;
  color: rgba(0, 0, 0, 0.5);
`;
const AttachAssets = styled.div`
  align-items: center;
  display: flex;
  padding-right: 8px;
  ${AssetButton} {
    width: 100px;
  }
`;
const ShareComment = styled.div`
  padding-left: 8px;
  margin-right: auto;
  border-left: 1px solid rgba(0, 0, 0, 0.15);
  ${AssetButton} {
    svg {
      margin-right: 5px;
    }
  }
`;
const PostButton = styled.button`
  min-width: 60px;
  border-radius: 12px;
  padding: 7px 16px;
  background-color: ${(props) =>
    props.disabled ? "rgba(0,0,0,0.8)" : "#0a66c2"};
  color: #fff;
  :hover {
    background-color: #004182;
  }
`;
const Editor = styled.div`
  padding: 12px 24px;
  textarea {
    width: 100%;
    min-height: 100px;
    resize: none;
  }
  input {
    width: 100%;
    height: 35px;
    font-size: 16px;
    margin-bottom: 20px;
  }
`;
const UploadImage = styled.div`
  text-align: center;
  img {
    width: 100%;
  }
`;

export default connect(mapStateToProps, mapDispatchToProps)(PostModal);
