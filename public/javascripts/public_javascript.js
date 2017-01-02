//javascript
//========================================Public=========================================
function selfs()
{
	try
	{
		$.ajax({
                cache: true,
                type: "GET",
                url: "./self",
                datatype: "json",
                async: false,
                error: function (request) {

                },
                complete: function (data) {
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
                cache: true,
                type: "GET",
                url: "./logout",
                datatype: "json",
                async: false,
                error: function (request) {

                },
                complete: function (data) {
                    }
            });
	}
	catch (e) {}
}

function search()
{
	try
	{
		$.ajax({
                cache: true,
                type: "GET",
                url: "./search",
                datatype: "json",
                async: false,
                error: function (request) {

                },
                complete: function (data) {
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
    var data = {"uemail":email,"upwd":password};
	try
	{
		$.ajax({
                //cache: true,
                type: "POST",
                url: "./login",
                data: data,
                //data: $("#loginForm").serialize(),
                //datatype: "json",
                //async: false,
                error: function (request) {
                    alert(data);
                    document.getElementById('waring').value = "error";
                },
                success: function (data) {

                }
            });
	}
	catch (e) {}
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
	try
	{
		$.ajax({
                cache: true,
                type: "POST",
                url: "./register",
                data: $("#registerForm").serialize(),
                datatype: "json",
                async: false,
                error: function (request) {

                },
                complete: function (data) {
                    var info = eval("(" + data.responseText + ")");
                    try {
                        if (200 == info.code) {
                            document.getElementById('waring').innerText = info.message;
                        }
                        else if (500 == info.code) {
                            document.getElementById('waring').innerText = info.message;
                            return false;
                        }
                    }
                    catch (e) { }
                }
            });
	}
	catch (e) {}
}
//========================================home=========================================
function songDetial(obj)
{
	var songId=obj.id;
	try
	{
		$.ajax({
                cache: true,
                type: "POST",
                url: "./songDetial",
                data: songId,
                datatype: "json",
                async: false,
                error: function (request) {

                },
                complete: function (data) {
                    
                    }
            });
	}
	catch (e) {}
}
//========================================result=========================================

//========================================self=========================================
function ChangePass()
{
    noBlock_login();
    var oldPass = $("#oldPass").val();
    var newPass = $("#newPass").val();
    var data = {"oldPass":oldPass,"newPass":newPass};
    try
    {
        $.ajax({
            //cache: true,
            type: "POST",
            url: "./login",
            data: data,
            //data: $("#loginForm").serialize(),
            //datatype: "json",
            //async: false,
            error: function (request) {
                alert(request);
            },
            success: function (data) {
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