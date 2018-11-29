var $={
    ajax=function(option){
        var xhr=new XMLHttpRequest();
        if(option.type.toLowerCase()=="get"){
            option.url=option.url+"?"+option.data;
            option.data=null;
        }
        option.beforeSend&&option.beforeSend();
        xhr.open(option.type,open.url);
        if(option.type.toLowerCase()=="post")
        {
            xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        }

        xhr.send(option.data);

        xhr.onreadystatechange=function(){
            if(xhr.readyState==4){
                if(xhr.status==200){
                    var result=xhr.responseText;
                    option.success&&option.success();
                }else{
                    option.error&&option.error();
                }
                option.complete&&option.complete();
            }
        }
    }
}