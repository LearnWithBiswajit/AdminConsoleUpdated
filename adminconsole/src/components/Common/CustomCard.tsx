import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/system';
const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function CustomCard(props:any) {
  return (
    <>
    <Box sx={{display: props.isHidden ? "none" : "block"}} width={"15%"} onClick={()=>props.onClick(props.title)}>
        <Card sx={{height:"300px", backgroundColor:props.backgroundColor, borderRadius:5, padding:"1.2em"}}>
            {/* {"#D1E9FC" - blue, #D0F2FF- green, #FFF7CD- Skin} */}
      <CardContent>
        <Stack justifyContent={"center"} alignItems={"center"}>
            <Stack sx={{color:props.iconColor, borderRadius:"50%", "backgroundImage":props.backgroundImage, width: "64px",
    height: "64px"}} alignItems={"center"} justifyContent={"center"} >
                {props.icon}
            </Stack>
            <Typography marginTop={"4rem"} fontFamily={"Cursive"} fontWeight={"bold"} fontSize={"1.7rem"} color={props.textColour}>
                {props.title}
            </Typography>
            <Typography marginTop={"1.5rem"} fontFamily={"Cursive"} fontWeight={"bold"} fontSize={"1.7rem"}>
                {props.count}
            </Typography>
        </Stack>
        
      </CardContent>
      <CardActions>
        
      </CardActions>
    </Card>
    </Box>
    </>
  );
}
