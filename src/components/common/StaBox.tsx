import { Box, Typography, useTheme } from "@mui/material";

const StatBox = ({ title, subtitle, icon, progress, increase }) => {
  const theme = useTheme();

  return (
    <Box width="100%" m="0 30px">
      <Box display="flex" justifyContent="space-between">
        <Box>
          {icon}
          <Typography variant="h4" fontWeight="bold" sx={{ color: "red" }}>
            {title}
          </Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px">
        <Typography variant="h5" sx={{ color: "red" }}>
          {subtitle}
        </Typography>
        <Typography variant="h5" fontStyle="italic" sx={{ color: "red" }}>
          {increase}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatBox;
