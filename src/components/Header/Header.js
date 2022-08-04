import { Typography } from "@mui/material";
import React from "react";
import styles from "./Header.module.css";

const Header = ({ title }) => {
  return (
    <header className={styles.header}>
      <Typography variant="h4">{title}</Typography>
    </header>
  );
};

export default Header;
