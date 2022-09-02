const Search = ()=>{

  const keyword = document.getElementsByTagName("select")[0].value;
  
  keyword == 'star' ? SearchStar() : SearchConstellation();
};

const SearchStar = ()=>{
    
    let Value = document.getElementById("searchText").value.toLocaleLowerCase();
    starData.forEach((e) =>
    {
      if (Value == e.kor)
      {
        Value = e.eng;
      }
    });
    const StarTag = document.getElementById(Value);

    StarTag.style.backgroundColor = "rgb(255, 23, 23)";


    setTimeout(()=>{
        let Value = document.getElementById("searchText").value.toLocaleLowerCase();
        starData.forEach((e) =>
        {
          if (Value == e.kor)
          {
            Value = e.eng;
          }
        });
        const StarTag = document.getElementById(Value);

        StarTag.style.backgroundColor = "rgb(255, 255, 255)";

    },3000);
};

const SearchConstellation = ()=>{
  
  let Value = document.getElementById("searchText").value.toLocaleLowerCase();
  constellationData.forEach((e) => 
  {
    if (Value == e.kor)
    {
      Value = e.eng;
    }
  });

  const StarTagArr = document.getElementsByClassName(Value);

  [...StarTagArr].forEach((e)=>e.style.backgroundColor = "rgb(255, 23, 23)");

  setTimeout(()=>{
    let Value = document.getElementById("searchText").value.toLocaleLowerCase();
  
    constellationData.forEach((e) => 
    {
      if (Value == e.kor)
      {
        Value = e.eng;
      }
    });

    const StarTagArr = document.getElementsByClassName(Value);
  
    [...StarTagArr].forEach((e)=>e.style.backgroundColor = "rgb(255, 255, 255)");

  },3000);
};

const DataLender = (date) => {
fetch('https://ljy4096.github.io/StarMap/star.json')
  .then((response) => response.json())
  .then((data) => {


    data.forEach((e)=>{
        let result;
      
        if (!date)
        {
          result = getAltAz(e.Right_ascension, e.Declination);
        } else
        {
          result = getAltAz(e.Right_ascension, e.Declination, date);
        }
        const x = ((50 - 5*result[0]/9) * Math.cos((270-result[1])*Math.PI/180));
        const y = ((50-5*result[0]/9) * Math.sin((270-result[1])*Math.PI / 180));
        
        let container = document.getElementById("container");
        let StarTag = document.createElement("div");
        let tooltip = document.createElement("span");
        tooltip.appendChild(document.createTextNode(e.Star_Name));
        StarTag.appendChild(tooltip);

        StarTag.setAttribute("class","star");
        StarTag.setAttribute("Id",e.Star_Name.toLocaleLowerCase());
        StarTag.classList.add((e.Identity.split(" ")[2] ? e.Identity.split(" ")[1]+"_"+e.Identity.split(" ")[2] : e.Identity.split(" ")[1]).toLocaleLowerCase())

        StarTag.style.left = x+50+"%";
        StarTag.style.bottom = y+50+"%";
        StarTag.style.width = 9-2.2*e.Magnitude+"px";
        StarTag.style.height = 9-2.2*e.Magnitude+"px";
        switch (e.Spectral_class[0])
        {
          case "O":
            StarTag.style.backgroundColor = "rgb(180,180,255)";
            break;
          case "B":
            StarTag.style.backgroundColor = "rgb(220,220,255)";
            break;
          case "A":
            StarTag.style.backgroundColor = "rgb(255,255,255)";
            break;
          case "F":
            StarTag.style.backgroundColor = "rgb(255,255,220)";
            break;
          case "G":
            StarTag.style.backgroundColor = "rgb(255,255,180)";
            break;
          case "K":
            StarTag.style.backgroundColor = "rgb(255,210,180)";
            break;
          case "M":
            StarTag.style.backgroundColor = "rgb(255,180,180)";
            break;
          default:
            StarTag.style.backgroundColor = "rgb(255,255,255)";
        }

        container.appendChild(StarTag);
    });
  })
  .catch((error) => {
    console.error('실패:', error);
});
};

const Reload = () => {
  let container = document.getElementById("container");
  while (container.hasChildNodes()) container.removeChild(container.firstChild);

  const data = document.getElementById("dateInput").value+"T"+document.getElementById("timeInput").value;

  DataLender(new Date("T"? new Date : data));
}

  
  var getAltAz = ((ra, dec, date) => {
    const pi = Math.PI;
    const lat = 37; 
    const long = -127;
    
    if (!date) date = new Date();
    let alt, az;

    let year = date.getUTCFullYear();
    let month = date.getUTCMonth()+1;
    let day = date.getUTCDate();
    let hour = date.getUTCHours();
    let minute = date.getUTCMinutes();
    let second = date.getUTCSeconds();
    
    if (hour<0){
        hour+=24; 
        day--;
    }
    if (month == 1 || month == 2) {
        year--; 
        month+=12;
    }
    const JD = Math.floor(365.25*(year+4716))+Math.floor(30.601*(month+1))+day-1537.5;
    const JD_Seconds = JD + hour/24 + minute/1440 + second/86400;
    const t = (JD_Seconds - 2451545.0)/36525;
    const GMST = ((280.46061837 + 360.98564736629*(JD_Seconds - 2451545.0) + 0.000387933*(t**2)-(t**3)/38710000)%360+360)%360; 
    const LHA = (GMST - long - ra*15);


    alt = 180/pi*Math.asin(Math.sin(lat*pi/180)*Math.sin(dec*pi/180)+Math.cos(lat*pi/180)*Math.cos(dec*pi/180)*Math.cos(LHA*pi/180)); 
    az = 180/pi*Math.atan2(Math.sin(LHA*pi/180),(Math.cos(LHA*pi/180)*Math.cos(lat*pi/180)-Math.tan(dec*pi/180)*Math.cos(lat*pi/180)));
    
    return [alt,az];
    
  });

DataLender();