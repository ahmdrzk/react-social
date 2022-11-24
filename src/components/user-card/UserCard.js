import { useContext } from "react";

import Card from "../UI/Card";
import Avatar from "../UI/Avatar";
import UserNameLink from "../UI/UserNameLink";
import classes from "./UserCard.module.css";

import { UserContext } from "../../store/user-context";

const UserCard = () => {
  const { authUser } = useContext(UserContext);

  const {
    id,
    name,
    country,
    image,
    following: { length: following },
    followers: { length: followers },
  } = authUser;

  return (
    <Card as="aside" className={classes.container}>
      <article>
        <div className={classes.background}>
          <Avatar image={image} alt={name} dimension={10} hasBorder={true} />
        </div>
        <div className={classes.content}>
          <UserNameLink userId={id}>{name}</UserNameLink>
          <span className={classes.country}>{country}</span>
          <ul className={classes.stats}>
            <li className={classes.statsItem}>
              <span>Following</span>
              <b>{following}</b>
            </li>
            <li className={classes.statsItem}>
              <span>Followers</span>
              <b>{followers}</b>
            </li>
          </ul>
        </div>
      </article>
    </Card>
  );
};

export default UserCard;
