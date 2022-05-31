import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getDocs, onSnapshot, orderBy, query } from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { auth, db, googleAuthProvider, storage } from "../firebase";
import { GET_ARTICLES, SET_LOADING_STATUS, SET_USER } from "./actionTypes";

export const setUser = (payload) => {
  return {
    type: SET_USER,
    user: payload,
  };
};
export const setLoading = (payload) => {
  return {
    type: SET_LOADING_STATUS,
    status: payload,
  };
};
export function signInApi() {
  return (dispatch) => {
    signInWithPopup(auth, googleAuthProvider)
      .then((result) => {
        dispatch(setUser(result.user));
      })
      .catch((error) => {
        alert(error.message);
      });
  };
}

export function getUserAuth() {
  return (dispatch) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user));
      }
    });
  };
}
export function signOutApi() {
  return (dispatch) => {
    signOut(auth)
      .then(() => {
        dispatch(setUser(null));
      })
      .catch((error) => {
        alert(error.message);
      });
  };
}

export function postArticleApi(payload) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    if (payload.image !== "") {
      const name = new Date().getTime() + payload.image.name;
      const storageRef = ref(storage, "images/" + name);
      console.log(storageRef);
      const uploadTask = uploadBytesResumable(storageRef, payload.image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (snapshot.state == "running") {
            console.log(`Progress : ${progress}%`);
          }
        },
        (error) => console.log(error.code),

        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await addDoc(collection(db, "articles"), {
              actor: {
                description: payload?.user?.email,
                title: payload?.user?.displayName,
                date: payload?.timeStamp,
                image: payload?.user?.photoURL,
              },
              video: "",
              shareImg: downloadURL,
              comments: 0,
              description: payload?.description,
            });
            dispatch(setLoading(false));
    });
        }
      );
    } else if (payload.video) {
      await addDoc(collection(db, "articles"), {
        actor: {
          description: payload?.user?.email,
          title: payload?.user?.displayName,
          date: payload?.timeStamp,
          image: payload?.user?.photoURL,
        },
        video: payload?.video,
        shareImg: "",
        comments: 0,
        description: payload?.description,
      });
      dispatch(setLoading(false))
    }
    else{
      await addDoc(collection(db, "articles"), {
        actor: {
          description: payload?.user?.email,
          title: payload?.user?.displayName,
          date: payload?.timeStamp,
          image: payload?.user?.photoURL,
        },
        video: '',
        shareImg: "",
        comments: 0,
        description: payload?.description,
      });
      dispatch(setLoading(false))
    }
  };
}
export function getArticlesApi() {
  return async (dispatch) => {
      const ref=collection(db, "articles")
      const q = query(ref,orderBy("actor.date","desc"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const list=querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
      dispatch(getArticles(list))
        });
  };
}
export const getArticles=(payload)=>{
  return {
    type:GET_ARTICLES,
    articles:payload
  }
}