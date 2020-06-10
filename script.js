// function get the JSON DATA from the API
function Get(yourUrl) {
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET", yourUrl, false);
    Httpreq.send(null);
    return Httpreq.responseText;
}
// json object
var data = JSON.parse(Get('https://gist.githubusercontent.com/rvsp/add40254aa126f045837fa5b51f47f1f/raw/4d724bfabf4cce7379a386e23bef6576ab99a2f9/pagination.json'));

var index = []; //empty array for paganation values every time next or previous is selected
// onload function 
function myfunction() {
    console.log(data)
    var divmain = document.createElement("div");
    divmain.id = 'divmain'
    divmain.className = 'container-fluid'
    divmain.style = 'height:100%;'
    // created div for heading
    var div1 = document.createElement("div");
    div1.style = "text-align:center; padding-top:30px; height: 30%;margin-bottom: 2%;";
    var heading = document.createElement('h1')
    heading.id = 'head1';
    heading.innerHTML = 'User Details'
    div1.appendChild(heading)
    divmain.appendChild(div1)
    // creating div for discription
    var div2 = document.createElement("div");
    div2.id = 'div2'
    div2.innerHTML = 'Click on the page number to view user deatils'
    divmain.appendChild(div2)
    document.body.appendChild(divmain)
    // creating div for pagnation
    var div3 = document.createElement("div");
    div3.id = 'div3'
    var div4 = document.createElement("div");
    div4.id = 'div4'
    div4.className = "pagination"
    var a1 = document.createElement("a");
    a1.href = '#';
    a1.setAttribute("onclick", "previous()");
    a1.innerHTML = 'Previous'
    div4.appendChild(a1)
    var div5 = document.createElement("div");
    div5.id = 'div5'
    div5.className = "pagination"
    for (i = 1; i <= 10; i++) {//for loop for creating 10 page numbers
        var a = document.createElement("a");
        a.id = i;
        a.href = '#'
        a.setAttribute("onclick", "displayData(" + i + ")");
        a.innerHTML = i;
        index.push(i)
        div5.appendChild(a)
    }
    div4.appendChild(div5)
    var a2 = document.createElement("a");
    a2.href = '#'
    a2.setAttribute("onclick", "next( )");
    a2.innerHTML = 'next'
    div4.appendChild(a2)
    div3.appendChild(div4)
    divmain.appendChild(div3)
}

// array for page choosen by user
var input = [];
var count = 0 // to maintain the next button click count
// function for next option button click
function next() {
    count += 1;
    var y = count;
    var indexNew1 = index;
    if (indexNew1[9]< 100) {
        index = []; //empty the index
        var div10 = document.createElement("div");
        div10.id = 'div10'
        div10.className = "pagination"
        for (i = 0; i < indexNew1.length; i++) {
            var a = document.createElement("a");
            a.id = indexNew1[i] + 1;
            a.href = '#'
            var temp = indexNew1[i] + 1;
            a.setAttribute("onclick", "displayData(" + temp + ")");
            a.innerHTML = indexNew1[i] + 1;
            index.push(indexNew1[i] + 1)
            div10.appendChild(a)
        }
        
    }
    var k = input.length - 1
        if (input.length == 0) {
            displayData(1)
        }
        else { displayData(input[k] + 1) }
        document.getElementById('div5').innerHTML = div10.innerHTML;
}

// function for previous option button click
function previous() {
    var k = input.length - 1
    if (input.length > 0) {
        displayData(input[k] - 1)
        var indexNew = index;
        // code to change page numbers on previous button click
        if (indexNew[9]> 10 ) {
            var div10 = document.createElement("div");
            div10.id = 'div10'
            div10.className = "pagination"
            index = [];
            for (i = 0; i < indexNew.length; i++) {
                var a = document.createElement("a");
                a.id = indexNew[i] - 1;
                a.href = '#'
                var temp = indexNew[i] - 1;
                a.setAttribute("onclick", "displayData(" + temp + ")");
                a.innerHTML = indexNew[i] - 1;
                index.push(indexNew[i] - 1)
                div10.appendChild(a)
            }
            document.getElementById('div5').innerHTML = div10.innerHTML;
        }
    }
}

// function to display user details
function displayData(x) {
    var j = x;
    input.push(j)
    var newArry = data.filter(element => {
        return element.id == x
    });
    var div6 = document.createElement("div");
    div6.id = 'div6'
    var div7 = document.createElement("div");
    div7.id = 'div7'
    var h1 = document.createElement("h3");
    h1.innerHTML = 'ID' + " " + "=" + " ";
    var p1 = document.createElement("h3");
    p1.style = 'color: rgb(175, 6, 85);font-style: italic;font-weight: bold;'
    p1.innerHTML = newArry[0].id;
    div7.appendChild(h1)
    div7.appendChild(p1)
    var div8 = document.createElement("div");
    div8.id = 'div8'
    var h2 = document.createElement("h3");
    h2.innerHTML = 'NAME' + " " + "=";
    var p2 = document.createElement("h3");
    p2.style = 'color: rgb(175, 6, 85);font-style: italic;font-weight: bold;'
    p2.innerHTML = newArry[0].name;
    div8.appendChild(h2)
    div8.appendChild(p2)
    var div9 = document.createElement("div");
    div9.id = 'div9'
    var h3 = document.createElement("h3");
    h3.innerHTML = 'EMAIL ID' + " " + "=" + " ";
    var p3 = document.createElement("h3");
    p3.style = 'color: rgb(175, 6, 85);font-style: italic;font-weight: bold;'
    p3.innerHTML = newArry[0].email;
    div9.appendChild(h3)
    div9.appendChild(p3)
    div6.appendChild(div7)
    div6.appendChild(div8)
    div6.appendChild(div9)
    console.log(newArry)
    document.getElementById('div2').innerHTML = div6.innerHTML;
}