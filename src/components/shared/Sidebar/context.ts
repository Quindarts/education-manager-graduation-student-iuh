import { keyframes } from "@emotion/react";

const homePageIndex = 0;
const drawerWidth = '250px';
const hidedDrawerWidth = '76px';

const opacity__animations_out = keyframes`
  0% {
   transform: translateX(0); 
  }
  100% {
      transform: translateX(0); 
  }
`;

const opacity__animations_in = keyframes`
  0% {
   transform: translateX('0px'); 
  }
  100% {
    transform: translateX(0); 
  }
`;
const majorPayload = (majorId: string, majors: any[]) => {
    let major = {
        id: '',
        name: '',
    };
    majors.map((m: any) => {
        if (majorId === m._id) {
            major = {
                id: m._id,
                name: m.name,
            };
        }
    });
    return major;
};

export {
    homePageIndex, drawerWidth, hidedDrawerWidth, opacity__animations_out, opacity__animations_in, majorPayload
}