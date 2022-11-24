import { Link, useLocation, useRouteMatch } from "react-router-dom";

import Card from "../UI/Card";
import Avatar from "../UI/Avatar";
import Button from "../UI/Button";
import classes from "./ProfileIntro.module.css";

import useFollowing from "../../hooks/use-following";

const ProfileIntro = ({ user, isOwn }) => {
  const { id, name, country, status, image, following, followers, createdAt } = user;

  const location = useLocation();
  const { url } = useRouteMatch();

  const { isFollowed, isLoading, followUserHandler } = useFollowing(id);

  return (
    <Card as="section" className={`${classes.container} ${isOwn && classes.ownContainer}`}>
      <div className={classes.background}>
        <Avatar image={image} alt={name} dimension={10} hasBorder={true} />
        {isOwn ? (
          <Link to="/users/edit">
            <Button primary>Edit Profile</Button>
          </Link>
        ) : isFollowed ? (
          <Button secondary isLoading={isLoading} onClick={followUserHandler}>
            Unfollow
          </Button>
        ) : (
          <Button primary isLoading={isLoading} onClick={followUserHandler}>
            Follow
          </Button>
        )}
      </div>
      <div className={classes.userDetails}>
        <div>
          <span className={classes.userName}>{name}</span>
          <span className={classes.userCountry}>{country}</span>
        </div>
        <p className={classes.userStatus}>{status}</p>
        <ul className={classes.userStats}>
          <li>
            <Link
              to={{ pathname: `${url}/following`, state: { background: location } }}
              className={classes.userStatsItem}
            >
              <span>{following.length}</span>
              <span> Following</span>
            </Link>
          </li>
          <li>
            <Link
              to={{ pathname: `${url}/followers`, state: { background: location } }}
              className={classes.userStatsItem}
            >
              <span>{followers.length}</span>
              <span> Followers</span>
            </Link>
          </li>
          <li className={classes.userStatsItem}>
            <span>Joined: </span>
            <span>{new Date(createdAt).toDateString()}</span>
          </li>
        </ul>
      </div>
    </Card>
  );
};

export default ProfileIntro;
