import "./Profile.scss";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts";
import { useContext, useState } from "react";
import { PersianContext } from "../../Context/PersianContext";
import { AuthContext } from "../../Context/AuthContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useLocation } from "react-router-dom";
import Update from '../../components/update/Update'
import Loading from "../../components/loading/Loading";
function Profile() {
  const { persian } = useContext(PersianContext);
  const { currentUser } = useContext(AuthContext);


  const [openUpdate,setOpenUpdate] = useState(false);
  const userId = useLocation().pathname.split('/')[2]


  const { isLoading, error, data } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      makeRequest.get("/users/find/" + userId).then((res) => res.data),
  });

  const { isLoading:rIsLoading,data:relationshipData } = useQuery({
    queryKey: ["relationships"],
    queryFn: () =>
      makeRequest.get("/relationships?followedId=" + userId).then((res) => res.data),
  });

  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: (following) => {
      if(following) return makeRequest.delete("/relationships?userId="+userId);
      return makeRequest.post('/relationships',{userId})
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["relationship"]);
    },
  });

    const handleFollow = () => {
      mutation.mutate(relationshipData.includes(currentUser.id));

    }



if(isLoading){
  return <div>Data is loading ...</div>
}

return (
    <div className="profile">
      <div className="images">
        <img className="cover" src={data.coverPic?'../../../upload/'+data.coverPic:'https://tokystorage.s3.amazonaws.com/images/default-cover.png'} alt="" />
        <img className="profilePic" src={data.profilePic?'../../../upload/'+data.profilePic:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1024px-Default_pfp.svg.png'} alt="" />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
            <span>{data.name}</span>
            <div className="info">
              <div className="item">
                <PlaceIcon />
                <span>{data.city}</span>
              </div>
              <div className="item">
                <LanguageIcon />
                <span>{data.website}</span>
              </div>
          </div>
          
            
          </div>
          <div className="right">
          {+userId === currentUser.id? (<button onClick={()=>setOpenUpdate(true)}>Update</button>):
              rIsLoading ? (<Loading/>):(<button onClick={handleFollow} style={{backgroundColor:`${relationshipData.includes(currentUser.id)?'grey':'rgb(58, 89, 152)'}`}}>{!relationshipData.includes(currentUser.id)?(!persian ? "Follow" : "دنبال کردن"):(!persian ? "Following" : "دنبال شده")}</button>)
            
            }
          </div>
        </div>
        <Posts userId ={userId} />
      </div>
      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data}/>}
    </div>
  );
}

export default Profile;
