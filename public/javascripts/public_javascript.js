//javascript
//========================================Public=========================================
function selfs()
{
	try
	{
		$.ajax({
                //cache: true,
                type: "GET",
                url: "/self",
                //datatype: "json",
                //async: false,
                error: function (data,status) {

                },
                success: function (data,status) {
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
                type: "GET",
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
                type: "Get",
                url: "/search",
                data:data,
                //datatype: "json",
                //async: false,
                error: function (data,status) {

                },
                success: function (data,status) {
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
    var data = {"uemail":username,"upwd":password};
		$.ajax({
                type: "POST",
                url: "/login",
                data: data,
                error: function (data,status) {
                    document.getElementById('waring').value = "error";
                    alert(data);
                },
                success: function (data,status) {
                    //alert(data);
                    document.getElementById('waring').value = data;
                }
            });

}

function toRegister()
{
    $.ajax({
        type: "POST",
        url: "/toRegister",
        data: data,
        error: function (data,status) {
            document.getElementById('waring').value = "error";
        },
        success: function (data,status) {
            //alert(data);
            document.getElementById('waring').value = data;
        }
    });

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
	noBlock_Register();
    var username = $("#email").val();
    var password = $("#password").val();
    var data = {"uemail":username,"upwd":password};
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
                    document.getElementById('waring').value = "success";
                }
            });
	}
	catch (e) {}
}

function toLogin()
{
    $.ajax({
        type: "POST",
        url: "/toLogin",
        data: data,
        error: function (data,status) {
            document.getElementById('waring').value = "error";
        },
        success: function (data,status) {
            //alert(data);
            document.getElementById('waring').value = data;
        }
    });

}
//========================================home=========================================
function songDetial(obj)
{
	var songId=obj.id;
	try
	{
		$.ajax({
                //cache: true,
                type: "POST",
                url: "/songDetial",
                data: songId,
                //datatype: "json",
                //async: false,
                error: function (data,status) {

                },
                success: function (data,status) {
                    
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