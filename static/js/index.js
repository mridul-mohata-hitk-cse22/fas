function login() {
    let data={
            username: document.getElementById("username").value,
            password: document.getElementById("password").value
        },
        xhr=new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (this.readyState == 4) {
            if(this.status == 200) {
                let r=JSON.parse(this.responseText);
                if(r.success) {
                    location.replace("/");
                }
            }
            else if(this.status==401){
                alert("Invalid Credentials");
            }
        }
    };
    xhr.open("POST", "/login");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(data));
}

function logout() {
    let xhr=new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            location.replace('/');
        }
    };
    xhr.open("DELETE", "/logout");
    xhr.send();
}

function attendance() {
    let data={
            attendance: [],
            count: document.getElementById("count").value,
            date: document.getElementById("date").value,
        },
        aic=document.getElementsByClassName("attendance-input"),
        classId=document.getElementById("class").value,
        xhr=new XMLHttpRequest();

    for(let i=0;i<aic.length;i++) {
        let e=aic[i];
        if(e.value > 0) {
            data.attendance.push({
                student: e.dataset.roll,
                value: parseInt(e.value)
            });
        }
    }

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let r=JSON.parse(this.responseText);
            if(r.success) {
                location.replace("/teacher");
            }
        }
    };
    xhr.open("POST", `/teacher/class/${classId}/attendance`);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(data));
}

function rate() {
    let fd=new FormData(document.getElementById("ratings-form")),
        xhr=new XMLHttpRequest(),
        classId=document.getElementById("class").value,
        data={};

    fd.forEach((value, key) => data[key] = value);

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let r=JSON.parse(this.responseText);
            if(r.success) {
                location.replace("/student");
            }
        }
    };
    xhr.open("POST", `/student/class/${classId}/rate`);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(data));   
}

function enableRatings(v) {
    v.disabled=true;
    let xhr=new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let r=JSON.parse(this.responseText);
            if(r.success) {
                document.getElementById("ratings").innerHTML='<p>Ratings are enabled for all classes</p>';
            }
        }
    };
    xhr.open("POST", `/admin/ratings/enable`);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
}

function teacher() {
    let id=document.getElementById("teacher").value;
    location.href=`/admin/teacher/${id}`;
}