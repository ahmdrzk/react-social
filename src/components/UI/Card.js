import React from "react";

import classes from "./Card.module.css";

const Card = React.forwardRef(({ as, hasPadding, className, onClick, children }, ref) => {
  switch (as) {
    case "header":
      return (
        <header
          className={`${classes.container} ${hasPadding && classes.padding} ${className}`}
          onClick={onClick}
          ref={ref}
        >
          {children}
        </header>
      );

    case "article":
      return (
        <article
          className={`${classes.container} ${hasPadding && classes.padding} ${className}`}
          onClick={onClick}
          ref={ref}
        >
          {children}
        </article>
      );

    case "section":
      return (
        <section
          className={`${classes.container} ${hasPadding && classes.padding} ${className}`}
          onClick={onClick}
          ref={ref}
        >
          {children}
        </section>
      );

    case "aside":
      return (
        <aside
          className={`${classes.container} ${hasPadding && classes.padding} ${className}`}
          onClick={onClick}
          ref={ref}
        >
          {children}
        </aside>
      );

    default:
      return (
        <div
          className={`${classes.container} ${hasPadding && classes.padding} ${className}`}
          onClick={onClick}
          ref={ref}
        >
          {children}
        </div>
      );
  }
});

export default Card;
