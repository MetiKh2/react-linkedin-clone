import React, { useEffect, useState } from "react";
import styled from "styled-components";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import EventIcon from "@mui/icons-material/Event";
import ArticleIcon from "@mui/icons-material/Article";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ShareIcon from "@mui/icons-material/Share";
import RecommendIcon from "@mui/icons-material/Recommend";
import HandshakeIcon from "@mui/icons-material/Handshake";
import CommentIcon from "@mui/icons-material/Comment";
import SendIcon from "@mui/icons-material/Send";
import PostModal from "./PostModal";
import { connect } from "react-redux";
import { getArticlesApi } from "../actions";
import ReactPlayer from "react-player";
const Main = ({ user, loading, getArticlesApi, articles }) => {
  const [showModal, setShowModal] = useState("close");
  function handleClick(e) {
    e.preventDefault();
    if (e.target !== e.currentTarget) return;
    switch (showModal) {
      case "open":
        setShowModal("close");
        break;
      case "close":
        setShowModal("open");
        break;
      default:
        setShowModal("close");
        break;
    }
  }
  useEffect(() => {
    getArticlesApi();
  }, []);
  return (
    <>
      {articles.length == 0 ? (
        <p>There are no articles</p>
      ) : (
        <Container>
          <ShareBox>
            <div>
              {user && user.photoURL ? (
                <img src={user.photoURL} />
              ) : (
                <img src="/images/user.svg" />
              )}
              <button disabled={loading} onClick={handleClick}>
                Start a post
              </button>
            </div>
            <div>
              <button>
                <img src="/images/photo.svg" alt="" />
                <span>Photo</span>
              </button>
              <button>
                <VideoLibraryIcon
                  color="primary"
                  style={{ marginRight: 6, fontSize: 30 }}
                />
                <span>Video</span>
              </button>
              <button>
                <EventIcon
                  color="primary"
                  style={{ marginRight: 6, fontSize: 30 }}
                />
                <span>Event</span>
              </button>
              <button>
                <ArticleIcon
                  color="primary"
                  style={{ marginRight: 6, fontSize: 30 }}
                />
                <span>Article</span>
              </button>
            </div>
          </ShareBox>
          <Content>
            {loading && <img src={"/images/R.gif"} />}
            {articles.length > 0 &&
              articles.map((article, key) => {
               return <Article key={article.id}>
                  <SharedActor>
                    <a>
                      <img src={article.actor.image} alt="" />
                      <div>
                        <span>{article.actor.title}</span>
                        <span>{article.actor.description}</span>
                        <span>{article?.actor?.date?.toDate().toLocaleDateString()}</span>
                      </div>
                    </a>
                    <button>
                      <MoreHorizIcon />
                    </button>
                  </SharedActor>
                  <Description>{article?.description}</Description>
                  <SharedImg>
                    <a>
                      {
                        !article.shareImg&&article.video?<ReactPlayer width={'100%'} url={article.video}/>
                        :(article.shareImg&&
                        <img style={{width:'100%'}} src={article.shareImg}/>)
                      }
                    </a>
                  </SharedImg>
                  <SocialCount>
                    <li>
                      <button>
                        <RecommendIcon color="primary" />
                        <HandshakeIcon color="primary" />
                        <span>75</span>
                      </button>
                    </li>
                    <li>
                      <a>{article.comments} comments</a>
                    </li>
                  </SocialCount>
                  <SocialActions>
                    <button>
                      <RecommendIcon color="primary" />
                      <span>Like</span>
                    </button>
                    <button>
                      <CommentIcon color="primary" />
                      <span>Comment</span>
                    </button>
                    <button>
                      <ShareIcon color="primary" />
                      <span>Comment</span>
                    </button>
                    <button>
                      <SendIcon color="primary" />
                      <span>Comment</span>
                    </button>
                  </SocialActions>
                </Article>;
              })}
          </Content>
          <PostModal showModal={showModal} handleClick={handleClick} />
        </Container>
      )}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
    loading: state.articleState.loading,
    articles: state.articleState.articles,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getArticlesApi: () => dispatch(getArticlesApi()),
  };
};
const Container = styled.div`
  grid-area: main;
`;
const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: 0;
  box-shadow: 0 0 0 1px rgb(0 0 0 /15%), 0 0 0 rgb(0 0 0 /20%);
`;
const ShareBox = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  background-color: #fff;
  div {
    button {
      outline: none;
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
      line-height: 1.5;
      min-height: 48px;
      background: transparent;
      border: 0;
      display: flex;
      align-items: center;
      font-weight: 600;
    }
    :first-child {
      display: flex;
      align-items: center;
      padding: 8px 16px 0 16px;
      img {
        width: 40px;
        border-radius: 50%;
        margin-right: 8px;
      }
      button {
        margin: 4px 0;
        flex-grow: 1;
        border-radius: 35px;
        padding-left: 16px;
        border: 1px solid rgba(0, 0, 0, 0.125);
        background-color: #fff;
        text-align: left;
      }
    }
    :nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding-bottom: 4px;

      button {
        img {
          margin: 0 4px 0 -2px;
        }
        span {
          color: #70b5f9;
        }
      }
    }
  }
`;
const Article = styled(CommonCard)`
  padding: 0;
  margin: 0 0 8px;
  overflow: visible;
`;
const SharedActor = styled(CommonCard)`
  padding-right: 40px;
  flex-wrap: nowrap;
  padding: 0 16px 0 0;
  margin-bottom: 8px;
  align-items: center;
  display: flex;
  a {
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    text-decoration: none;
  }
  img {
    width: 48px;
    height: 48px;
    padding: 10px;
  }
  div {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    flex-basis: 0;
    margin-left: 8px;
    overflow: hidden;
    span {
      margin-top: 6px;
      text-align: left;
      :first-child {
        font-size: 14px;
        font-weight: bold;
        color: #000;
      }
      :nth-child(n + 1) {
        font-size: 12px;
        color: rgba(0, 0, 0, 0.6);
      }
    }
  }
  button {
    position: absolute;
    right: 12px;
    top: 0;
    background: transparent;
    border: 0;
    outline: 0;
  }
`;
const Description = styled.div`
  padding: 0 16px;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.9);
  font-size: 14px;
  text-align: left;
`;
const SharedImg = styled.div`
  margin-top: 8px;
  width: 100%;
  display: block;
  position: relative;
  background-color: #f9fafb;
  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;
const SocialCount = styled.ul`
  line-height: 1.3;
  display: flex;
  align-items: flex-start;
  overflow: auto;
  margin: 0 15px;
  padding: 8px 0;
  border-bottom: 1px solid #e9e5df;
  list-style: none;
  li {
    margin-right: 5px;
    font-size: 12px;
    button {
      display: flex;
    }
  }
`;
const SocialActions = styled.div`
  align-items: center;
  display: flex;
  justify-content: start;
  margin: 0;
  min-height: 48px;
  padding: 4px 8px;
  button {
    display: inline-flex;
    align-items: center;
    padding: 8px;
    color: #0a66c2;

    @media (min-width: 768px) {
      span {
        margin-left: 8px;
      }
    }
  }
`;
const Content = styled.div`
  text-align: center;
  img {
    width: 80px;
  }
`;

export default connect(mapStateToProps, mapDispatchToProps)(Main);
