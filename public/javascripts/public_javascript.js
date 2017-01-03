//javascript
//========================================Public=========================================
function selfs()
{
    try
    {
        $.ajax({
            //cache: true,
            type: "Get",
            url: "/selfpage",
            //datatype: "json",
            //async: false,
            error: function (data,status) {
                window.location.href='/selfpage';
            },
            success: function (data,status) {
                window.location.href='/selfpage';
            }
        });
    }
    catch (e) {}
}
function logout()
{
    try
    {
        $.ajax({
            //cache: true,
            type: "POST",
            url: "/logout",
            // datatype: "json",
            // async: false,
            error: function (data,status) {

            },
            success: function (data,status) {
            }
        });
    }
    catch (e) {}
}

function search(obj)
{
    var name = obj.name;
    var info = $("#search_input").val();
    var data={"name":name,"info":info};
    try
    {
        $.ajax({
            //cache: true,
            type: "POST",
            url: "/search",
            data:data,
            //datatype: "json",
            //async: false,
            error: function (data,status) {
                window.location.href='/results';
            },
            success: function (data,status) {
                window.location.href='/results';
            }
        });
    }
    catch (e) {}
}

//========================================login=========================================
function noBlock_login() {
    document.getElementById('waring').innerHTML="";
    try {
        flag = 0;
        /* if (0 == document.getElementById('username').value)
         {
         document.getElementById('waring').innerHTML="name can not be block";
         flag = 1;
         } */
        if (0 == document.getElementById('email').value)
        {
            document.getElementById('waring').innerHTML="email can not be block";
            flag = 1;
        }
        if (0 == document.getElementById('password').value)
        {
            document.getElementById('waring').innerHTML="password can not be block";
            flag = 1;
        }
    }
    catch (e) {}
}

function loginSubmit()
{
    noBlock_login();
    var username = $("#email").val();
    var password = $("#password").val();
    var data = {"username":username,"upwd":password};
    $.ajax({
        type: "POST",
        url: "/login",
        data: data,
        error: function (data,status) {
            document.getElementById('waring').value = "error";
            //alert(data);
        },
        success: function (data,status) {
            //alert(data);
            document.getElementById('waring').value = data;
            if("登录成功"==data)
            {
                window.location.href='/homepage';
            }
        }
    });

}

function toRegister()
{
    window.location.href='/register';
    /*$.ajax({
        type: "POST",
        url: "/toRegister",
        //data: data,
        error: function (data,status) {
            //document.getElementById('waring').value = "error";
            window.location.href='/register';
        },
        success: function (data,status) {
            window.location.href='/register';
        }
    });*/

}

//========================================register=========================================
function noBlock_Register() {
    document.getElementById('waring').value="";
    try {
        flag = 0;
        if (0 == document.getElementById('username').value)
        {
            document.getElementById('waring').innerHTML="name can not be block";
            flag = 1;
        }
        if (0 == document.getElementById('email').value)
        {
            document.getElementById('waring').innerHTML="email can not be block";
            flag = 1;
        }
        if (0 == document.getElementById('password').value)
        {
            document.getElementById('waring').innerHTML="password can not be block";
            flag = 1;
        }
    }
    catch (e) {}
}

function registerSubmit()
{
    //noBlock_Register();
    //var usrName = $("#email").val();
    var username = $("#username").val();
    var password = $("#password").val();
    var data = {"username":username,"upwd":password};
    try
    {
        $.ajax({
            type: "POST",
            url: "/register",
            data: data,
            //datatype: "json",
            //async: false,
            error: function (data,status) {
                document.getElementById('waring').value = "error";
            },
            success: function (data,status) {
                document.getElementById('waring').value = data;
                if("注册成功"==data)
                {
                    window.location.href='/login';
                }
            }
        });
    }
    catch (e) {}
}

function toLogin()
{
    window.location.href='/login';
    /*$.ajax({
        type: "POST",
        url: "/toLogin",
        //data: data,
        error: function (data,status) {
            document.getElementById('waring').value = "error";
        },
        success: function (data,status) {
            //alert(data);
            document.getElementById('waring').value = data;
        }
    });*/

}
//========================================home=========================================
function songDetial(obj)
{
    var songId=obj.id;
    var data={"info":songId};
    alert(songId);
    try
    {
        $.ajax({
            //cache: true,
            type: "Post",
            url: "/play",
            data: data,
            //datatype: "json",
            //async: false,
            error: function (data,status) {
                window.location.href='/play';
            },
            success: function (data,status) {
                window.location.href='/play';
            }
        });
    }
    catch (e) {}
}
//========================================result=========================================

//========================================play=========================================
function sendMessage()
{
    var message = $("#sendInput").val();
    try
    {
        $.ajax({
            //cache: true,
            type: "POST",
            url: "/login",
            data: message,
            error: function (data,status) {
                alert(request);
            },
            success: function (data,status) {
                alert(data);
            }
        });
    }
    catch (e) {}
}

//========================================self=========================================
function ChangePass()
{
    //noBlock_login();
    var oldPass = $("#oldPass").val();
    var newPass = $("#newPass").val();
    var data = {"oldPass":oldPass,"newPass":newPass};
    try
    {
        $.ajax({
            //cache: true,
            type: "POST",
            url: "/changePass",
            data: data,
            error: function (data,status) {
                alert(request);
            },
            success: function (data,status) {
                alert(data);
            }
        });
    }
    catch (e) {}
}

function showForm()
{
    document.getElementById("changePassword").style.display="";
}