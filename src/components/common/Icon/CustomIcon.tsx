import { Icon } from "@mui/material";

const CustomIcon = ({ children }) => {

  return (
    <Icon >
      {children}
    </Icon>
  );
};

// const CustomIcon = (iconStyle:any, children: any) => {


//   return <Icon style={iconStyle}>{children}</Icon>;
// };

export default CustomIcon;
