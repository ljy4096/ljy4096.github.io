const Data = [{Star_ID:0, Star_Name: "aaa", }, {x: 10, y: 20, name:"test2"}];
 
Data.forEach((e) =>{
    let container = document.getElementById("container");
    let StarTag = document.createElement("div");
    StarTag.setAttribute("class", "star");
    StarTag.setAttribute("id", e.name);

    StarTag.style.left = e.x+50+"%";
    StarTag.style.top = e.y+50+"%";

    container.appendChild(StarTag);

});
const searchStar = () => {
        const Value = document.getElementById("searchText").value;
        const StarTag = document.getElementById(Value);

        StarTag.style.backgroundColor = "red";

        setTimeout(() => {
           const Value = document.getElementById("searchText").value;
           const StarTag = document.getElementById(Value);

           StarTag.style.backgroundColor = "white";
        },3000);
    };  